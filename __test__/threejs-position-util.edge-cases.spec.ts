import {
  BufferAttribute,
  BufferGeometry,
  Mesh,
  PerspectiveCamera,
  SphereGeometry,
  Vector3,
} from "three";
import { describe, expect, test } from "vitest";
import {
  get2DPosition,
  get2DPositionWithMesh,
  getCenter,
  getGeometryCenterInLocal,
  getGeometryCenterInWorld,
  getROfGlobe,
} from "../src/index.js";

describe("ThreeJS Position Utilities - Edge Cases", () => {
  describe("Empty and Minimal Geometry Edge Cases", () => {
    test("should handle empty BufferGeometry gracefully", () => {
      const emptyGeometry = new BufferGeometry();
      const mesh = new Mesh(emptyGeometry);

      // Empty geometry results in empty Box3 after computeBoundingBox
      emptyGeometry.computeBoundingBox();
      expect(emptyGeometry.boundingBox).toBeDefined();
      expect(emptyGeometry.boundingBox?.isEmpty()).toBe(true);

      // Functions should handle invalid boundingBox gracefully
      expect(() => getGeometryCenterInLocal(mesh)).not.toThrow();
      expect(() => getGeometryCenterInWorld(mesh)).not.toThrow();
    });

    test("should handle geometry with single vertex", () => {
      const geometry = new BufferGeometry();
      const vertices = new Float32Array([5, 10, 15]); // Single point
      geometry.setAttribute("position", new BufferAttribute(vertices, 3));

      const mesh = new Mesh(geometry);
      const center = getGeometryCenterInLocal(mesh);

      // Center should be the single vertex position
      expect(center).toEqual(new Vector3(5, 10, 15));
    });

    test("should handle geometry with minimal vertex data", () => {
      const geometry = new BufferGeometry();
      const vertices = new Float32Array([
        0,
        0,
        0, // vertex 1
        1,
        0,
        0, // vertex 2
      ]);
      geometry.setAttribute("position", new BufferAttribute(vertices, 3));

      const mesh = new Mesh(geometry);
      const center = getGeometryCenterInLocal(mesh);

      // Center should be midpoint between the two vertices
      expect(center).toEqual(new Vector3(0.5, 0, 0));
    });

    test("should handle geometry with zero-area surface", () => {
      const geometry = new BufferGeometry();
      const vertices = new Float32Array([
        0,
        0,
        0, // vertex 1
        0,
        0,
        0, // vertex 2 (same position)
        0,
        0,
        0, // vertex 3 (same position)
      ]);
      geometry.setAttribute("position", new BufferAttribute(vertices, 3));

      const mesh = new Mesh(geometry);
      const center = getGeometryCenterInLocal(mesh);

      // All vertices at same position, center should be that position
      expect(center).toEqual(new Vector3(0, 0, 0));
    });
  });

  describe("Matrix State Edge Cases", () => {
    test("should handle camera with outdated matrixWorld", () => {
      const camera = new PerspectiveCamera(45, 16 / 9, 0.1, 1000);
      camera.updateProjectionMatrix();
      camera.position.set(100, 100, 100);
      // Intentionally don't call camera.updateMatrixWorld()

      const mesh = new Mesh(new SphereGeometry(10));
      mesh.position.set(0, 0, 0);

      // Should handle stale camera matrix gracefully
      expect(() => get2DPositionWithMesh(mesh, camera, 800, 600)).not.toThrow();

      const result = get2DPositionWithMesh(mesh, camera, 800, 600);
      expect(result).toBeInstanceOf(Vector3);
      expect(typeof result.x).toBe("number");
      expect(typeof result.y).toBe("number");
      expect(result.z).toBe(0);
    });
  });

  describe("Boundary Value Edge Cases", () => {
    test("should handle extreme coordinate values within Number constraints", () => {
      const largeValue = Number.MAX_SAFE_INTEGER / 1000; // Keep it reasonable for calculations
      const vector = new Vector3(largeValue, largeValue, largeValue);

      const radius = getROfGlobe(vector);

      expect(Number.isFinite(radius)).toBe(true);
      expect(radius).toBeGreaterThan(0);
      expect(radius).toBeCloseTo(Math.sqrt(largeValue * largeValue * 3), 6);
    });

    test("should handle very small canvas dimensions gracefully", () => {
      const camera = new PerspectiveCamera(45, 1, 0.1, 1000);
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 100);
      camera.updateMatrixWorld();

      const position = new Vector3(0, 0, 0);

      // Very small width (1 pixel)
      const result1 = get2DPosition(position, camera, 1, 600);
      expect(typeof result1.x).toBe("number");
      expect(typeof result1.y).toBe("number");
      expect(Number.isFinite(result1.x)).toBe(true);
      expect(Number.isFinite(result1.y)).toBe(true);
      expect(result1.z).toBe(0);

      // Very small height (1 pixel)
      const result2 = get2DPosition(position, camera, 800, 1);
      expect(typeof result2.x).toBe("number");
      expect(typeof result2.y).toBe("number");
      expect(Number.isFinite(result2.x)).toBe(true);
      expect(Number.isFinite(result2.y)).toBe(true);
      expect(result2.z).toBe(0);

      // Both very small (edge case but realistic)
      const result3 = get2DPosition(position, camera, 1, 1);
      expect(typeof result3.x).toBe("number");
      expect(typeof result3.y).toBe("number");
      expect(Number.isFinite(result3.x)).toBe(true);
      expect(Number.isFinite(result3.y)).toBe(true);
      expect(result3.z).toBe(0);
    });

    test("should handle negative canvas dimensions mathematically", () => {
      const camera = new PerspectiveCamera(45, 1, 0.1, 1000);
      camera.updateProjectionMatrix();
      camera.position.set(0, 0, 100);
      camera.updateMatrixWorld();

      const position = new Vector3(0, 0, 0);

      // Negative dimensions (mathematically valid but unusual)
      const result = get2DPosition(position, camera, -800, -600);

      expect(typeof result.x).toBe("number");
      expect(typeof result.y).toBe("number");

      // Mapping formula in get2DPosition handles negative canvas dimensions
      // Position (0,0,0) maps to screen center: (-800/2, -600/2) = (-400, -300)
      expect(result.x).toBeCloseTo(-400, 1);
      expect(result.y).toBeCloseTo(-300, 1);
      expect(result.z).toBe(0);
    });

    test("should handle very small non-zero coordinates", () => {
      const smallValue = Number.MIN_VALUE;
      const vector = new Vector3(smallValue, smallValue, smallValue);

      const radius = getROfGlobe(vector);

      expect(radius).toBeGreaterThanOrEqual(0);
      expect(Number.isFinite(radius)).toBe(true);
    });
  });

  describe("Complex Geometry Edge Cases", () => {
    test("should handle geometry with extreme bounding box", () => {
      const geometry = new BufferGeometry();
      const vertices = new Float32Array([
        -1000000,
        -1000000,
        -1000000, // Min extreme
        1000000,
        1000000,
        1000000, // Max extreme
      ]);
      geometry.setAttribute("position", new BufferAttribute(vertices, 3));

      const mesh = new Mesh(geometry);
      const center = getGeometryCenterInLocal(mesh);

      // Center should be at origin for symmetric extremes
      expect(center.x).toBeCloseTo(0, 5);
      expect(center.y).toBeCloseTo(0, 5);
      expect(center.z).toBeCloseTo(0, 5);
    });

    test("should handle getCenter with custom BufferGeometry edge cases", () => {
      const geometry = new BufferGeometry();

      // Create asymmetric geometry
      const vertices = new Float32Array([
        10,
        20,
        30, // vertex 1
        -5,
        15,
        -10, // vertex 2
        0,
        0,
        0, // vertex 3
      ]);
      geometry.setAttribute("position", new BufferAttribute(vertices, 3));

      const center = getCenter(geometry);

      // Should calculate proper center from min/max bounds
      expect(center.x).toBeCloseTo(2.5, 5); // (10 + (-5)) / 2
      expect(center.y).toBeCloseTo(10, 5); // (20 + 0) / 2
      expect(center.z).toBeCloseTo(10, 5); // (30 + (-10)) / 2
    });
  });

  describe("Camera Configuration Edge Cases", () => {
    test("should handle extreme camera FOV values", () => {
      // Very wide FOV
      const wideFovCamera = new PerspectiveCamera(179, 1, 0.1, 1000);
      wideFovCamera.updateProjectionMatrix();
      wideFovCamera.position.set(0, 0, 100);

      const position = new Vector3(10, 10, 0);
      const result1 = get2DPosition(position, wideFovCamera, 800, 600);

      expect(result1).toBeInstanceOf(Vector3);
      expect(typeof result1.x).toBe("number");
      expect(typeof result1.y).toBe("number");
      expect(result1.z).toBe(0);

      // Very narrow FOV
      const narrowFovCamera = new PerspectiveCamera(1, 1, 0.1, 1000);
      narrowFovCamera.updateProjectionMatrix();
      narrowFovCamera.position.set(0, 0, 100);

      const result2 = get2DPosition(position, narrowFovCamera, 800, 600);

      expect(result2).toBeInstanceOf(Vector3);
      expect(typeof result2.x).toBe("number");
      expect(typeof result2.y).toBe("number");
      expect(result2.z).toBe(0);
    });

    test("should handle extreme camera near/far planes", () => {
      // Very close near plane
      const closeCamera = new PerspectiveCamera(45, 1, 0.001, 1000);
      closeCamera.updateProjectionMatrix();
      closeCamera.position.set(0, 0, 1);

      const position = new Vector3(0, 0, 0);
      const result = get2DPosition(position, closeCamera, 800, 600);

      expect(result).toBeInstanceOf(Vector3);
      expect(typeof result.x).toBe("number");
      expect(typeof result.y).toBe("number");
      expect(result.z).toBe(0);
    });
  });
});
