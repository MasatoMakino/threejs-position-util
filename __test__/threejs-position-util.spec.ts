import {
  type BufferGeometry,
  type Camera,
  Mesh,
  Object3D,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Spherical,
  Vector3,
} from "three";
import { beforeEach, describe, expect, test } from "vitest";
import {
  get2DPositionWithMesh,
  getGeometryCenterInLocal,
  getGeometryCenterInWorld,
  getROfGlobe,
  shiftMesh,
} from "../src/index.js";

describe("ThreeJS Position Utilities", () => {
  const W = 1920;
  const H = 1080;
  let scene: Scene;
  let camera: PerspectiveCamera;

  beforeEach(() => {
    scene = new Scene();
    camera = new PerspectiveCamera(45, W / H, 1, 10000);
    camera.position.set(0, 0, 1000);
    scene.add(camera);
  });

  test("should return geometry center in world coordinates when mesh is in scene hierarchy", () => {
    const geo = new SphereGeometry(10);
    const mesh = new Mesh(geo);
    shiftMesh(mesh, new Vector3(-10, -10, -10));
    mesh.position.set(10, 10, 10);
    const container = new Object3D();
    container.position.set(10, 10, 10);
    container.add(mesh);
    scene.add(container);

    const vec = getGeometryCenterInWorld(mesh);
    expect(vec).toEqual(new Vector3(30, 30, 30));
  });

  test("should return geometry center ignoring mesh position when mesh is not added to scene", () => {
    const geo = new SphereGeometry(10);
    const mesh = new Mesh(geo);
    shiftMesh(mesh, new Vector3(-10, -10, -10));
    const expectPosition = new Vector3(10, 10, 10);

    /**
     * Meshes not added to the scene don't have an updated matrixWorld, so the geometry center is returned as-is.
     * The mesh's own position is ignored.
     */
    let vec = getGeometryCenterInWorld(mesh);
    expect(vec).toEqual(expectPosition);

    /**
     * Therefore, moving the mesh position and recalculating yields the same result.
     */
    mesh.position.set(10, 10, 10);
    vec = getGeometryCenterInWorld(mesh);
    expect(vec).toEqual(expectPosition);
  });

  test("should return geometry center relative to mesh origin ignoring parent transforms", () => {
    const geo = new SphereGeometry(10);
    const mesh = new Mesh(geo);
    shiftMesh(mesh, new Vector3(-10, -10, -10));
    mesh.position.set(10, 10, 10);
    const container = new Object3D();
    container.position.set(10, 10, 10);
    container.add(mesh);
    scene.add(container);

    const vec = getGeometryCenterInLocal(mesh);

    // Ignores parent Object3D movement and mesh movement, getting only geometry center position.
    // Coordinate reference is the mesh center point
    expect(vec).toEqual(new Vector3(10, 10, 10));
  });

  test("should convert 3D world positions to 2D screen coordinates accurately", () => {
    const geo = new SphereGeometry(10);

    const addMesh = (
      geo: BufferGeometry,
      scene: Scene,
      camera: Camera,
      pos: Vector3,
    ) => {
      const mesh = new Mesh(geo);
      mesh.position.set(pos.x, pos.y, pos.z);
      scene.add(mesh);
      return get2DPositionWithMesh(mesh, camera, W, H);
    };

    const vec0 = addMesh(geo, scene, camera, new Vector3(0, 0, 0));
    const vec1 = addMesh(geo, scene, camera, new Vector3(-200, 200, 0));
    const vec2 = addMesh(geo, scene, camera, new Vector3(350, -150, 0));
    const vec3 = addMesh(geo, scene, camera, new Vector3(350, -150, -600));

    expect(vec0).toEqual(new Vector3(W / 2, H / 2, 0));

    expect(vec1.x).toBeCloseTo(699.2649352637056);
    expect(vec1.y).toBeCloseTo(279.26493526370575);

    expect(vec2.x).toBeCloseTo(1416.286363288515);
    expect(vec2.y).toBeCloseTo(735.5512985522207);

    expect(vec3.x).toBeCloseTo(1245.1789770553219);
    expect(vec3.y).toBeCloseTo(662.2195615951379);
  });

  test("should calculate polar coordinate radius equivalent to Three.js Spherical.radius", () => {
    const vec = new Vector3(1932, 1688, 127);

    const spherical = new Spherical().setFromVector3(vec);
    const rad = getROfGlobe(vec);

    expect(rad).toBe(spherical.radius);
  });
});
