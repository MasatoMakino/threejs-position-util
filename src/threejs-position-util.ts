/**
 * @fileoverview Three.js position calculation utilities
 *
 * Provides geometry center calculations, 3D-to-2D coordinate conversion,
 * polar coordinate radius computation, and mesh pivot point manipulation.
 * Useful for UI positioning and mesh transformations.
 */

import {
  type BufferGeometry,
  type Camera,
  Matrix4,
  type Mesh,
  Vector3,
} from "three";

/**
 * Calculate geometry center coordinates in world space.
 *
 * @param mesh - The mesh containing the geometry
 * @returns The center coordinates in world space
 */
export function getGeometryCenterInWorld(mesh: Mesh): Vector3 {
  const vec: Vector3 = getGeometryCenterInLocal(mesh);
  if (mesh.parent) {
    mesh.parent.updateMatrixWorld(true);
  }
  return vec.applyMatrix4(mesh.matrixWorld);
}

/**
 * Calculate geometry center coordinates in local mesh space.
 * Returns Vector3(0,0,0) for geometry centered at mesh origin.
 *
 * @param mesh - The mesh containing the geometry
 * @returns The center coordinates in local mesh space
 */
export function getGeometryCenterInLocal(mesh: Mesh): Vector3 {
  return getCenter(mesh.geometry);
}

/**
 * Calculate geometry bounding box center.
 *
 * @param geo - The geometry to analyze
 * @returns The center coordinates of the bounding box
 */
export function getCenter(geo: BufferGeometry): Vector3 {
  geo.computeBoundingBox();
  const boundingBox = geo.boundingBox;

  const position = new Vector3();
  position.subVectors(boundingBox.max, boundingBox.min);
  position.multiplyScalar(0.5);
  position.add(boundingBox.min);

  return position;
}

/**
 * Project 3D world coordinates to 2D screen space.
 * Origin (0,0) is top-left, (canvasW, canvasH) is bottom-right.
 *
 * @param vec - The 3D world coordinates to project
 * @param camera - The camera used for projection
 * @param canvasW - The width of the canvas in pixels
 * @param canvasH - The height of the canvas in pixels
 * @returns The 2D screen coordinates with z=0
 */
export function get2DPosition(
  vec: Vector3,
  camera: Camera,
  canvasW: number,
  canvasH: number,
): Vector3 {
  const vector = vec.clone().project(camera);
  vector.x = ((vector.x + 1) * canvasW) / 2;
  vector.y = ((-vector.y + 1) * canvasH) / 2;
  vector.z = 0;

  return vector;
}

/**
 * Project mesh center to 2D screen coordinates.
 * Useful for positioning UI elements relative to 3D objects.
 *
 * @param mesh - The mesh to project
 * @param camera - The camera used for projection
 * @param canvasW - The width of the canvas in pixels
 * @param canvasH - The height of the canvas in pixels
 * @returns The 2D screen coordinates of the mesh center
 */
export function get2DPositionWithMesh(
  mesh: Mesh,
  camera: Camera,
  canvasW: number,
  canvasH: number,
): Vector3 {
  const p = getGeometryCenterInWorld(mesh);
  return get2DPosition(p, camera, canvasW, canvasH);
}

/**
 * Calculate distance from origin using √(x² + y² + z²).
 *
 * @param vec - The Cartesian coordinates
 * @returns The distance from origin
 */
export function getROfGlobe(vec: Vector3): number {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
}

/**
 * Relocate mesh pivot point while maintaining visual position.
 * Useful for meshes from ObjLoader where geometry origin is (0,0,0),
 * making rotations and scaling work intuitively.
 *
 * @param mesh - The mesh to reposition
 * @param pos - New center point coordinates
 */
export function shiftMesh(mesh: Mesh, pos: Vector3): void {
  const position = pos.clone();
  // Shift the geometry
  mesh.geometry.applyMatrix4(
    new Matrix4().makeTranslation(-position.x, -position.y, -position.z),
  );
  // Move the mesh by the specified amount
  mesh.position.add(position);
}
