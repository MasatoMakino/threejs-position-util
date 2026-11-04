import { BufferAttribute, BufferGeometry } from "three";
import { describe, expect, test } from "vitest";
import { getCenter } from "../src/index.js";

describe("Three.js Position Utilities - Edge Cases", () => {
  test("getCenter returns the bounding-box center, not the vertex centroid", () => {
    // Asymmetric vertices make the bounding-box center differ from the vertex centroid.
    const geometry = new BufferGeometry();
    const vertices = new Float32Array([10, 20, 30, -5, 15, -10, 0, 0, 0]);
    geometry.setAttribute("position", new BufferAttribute(vertices, 3));

    const center = getCenter(geometry);

    expect(center.x).toBeCloseTo(2.5, 5);
    expect(center.y).toBeCloseTo(10, 5);
    expect(center.z).toBeCloseTo(10, 5);
  });
});
