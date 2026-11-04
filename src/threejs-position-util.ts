import {
  type BufferGeometry,
  type Camera,
  Matrix4,
  type Mesh,
  Vector3,
} from "three";

export function getGeometryCenterInWorld(mesh: Mesh): Vector3 {
  const vec: Vector3 = getGeometryCenterInLocal(mesh);
  /**
   * Parent check is required: calling mesh.updateWorldMatrix(true, true) without parent
   * fails for meshes not added to scene, returning Vector3(0,0,0) instead of expected coordinates.
   *
   * Root cause: When parent === null, Three.js uses `matrixWorld.copy(matrix)` but the local
   * matrix may not be properly initialized/updated, resulting in zero transformation.
   */
  if (mesh.parent) {
    mesh.updateWorldMatrix(true, true);
  }

  return vec.applyMatrix4(mesh.matrixWorld);
}

export function getGeometryCenterInLocal(mesh: Mesh): Vector3 {
  return getCenter(mesh.geometry);
}

/**
 * Calculate geometry bounding box center.
 */
export function getCenter(geo: BufferGeometry): Vector3 {
  geo.computeBoundingBox();
  const boundingBox = geo.boundingBox!;

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
 * @returns The 2D screen coordinates with z=0
 */
export function get2DPosition(
  vec: Vector3,
  camera: Camera,
  canvasW: number,
  canvasH: number,
): Vector3 {
  camera.updateMatrixWorld();
  const vector = vec.clone().project(camera);
  vector.x = ((vector.x + 1) * canvasW) / 2;
  vector.y = ((-vector.y + 1) * canvasH) / 2;
  vector.z = 0;

  return vector;
}

/**
 * Project mesh center to 2D screen coordinates.
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
 * Calculate distance from origin.
 */
export function getROfGlobe(vec: Vector3): number {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
}

/**
 * Relocate mesh pivot point while maintaining visual position.
 * The visual position stays the same only when the mesh has no rotation and a scale of 1.
 *
 * @param pos - New center point coordinates
 */
export function shiftMesh(mesh: Mesh, pos: Vector3): void {
  const position = pos.clone();
  mesh.geometry.applyMatrix4(
    new Matrix4().makeTranslation(-position.x, -position.y, -position.z),
  );
  mesh.position.add(position);
}
