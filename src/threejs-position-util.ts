import {
  type BufferGeometry,
  type Camera,
  Matrix4,
  type Mesh,
  Vector3,
} from "three";

/**
 * Calculate the center coordinates of geometry within a mesh.
 * The origin is in world coordinates.
 *
 * @param mesh
 * @returns {Vector3}
 */
export function getGeometryCenterInWorld(mesh: Mesh): Vector3 {
  const vec: Vector3 = getGeometryCenterInLocal(mesh);
  if (mesh.parent) {
    mesh.parent.updateMatrixWorld(true);
  }
  return vec.applyMatrix4(mesh.matrixWorld);
}

/**
 * Calculate the center coordinates of geometry within a mesh.
 * Returns coordinates with the mesh as the origin.
 * (For example, returns Vector3(0,0,0) for sphere geometry centered at the mesh origin)
 *
 * @param mesh
 * @returns {Vector3}
 */
export function getGeometryCenterInLocal(mesh: Mesh): Vector3 {
  return getCenter(mesh.geometry);
}

/**
 * Calculate the center coordinates of geometry.
 * The coordinate origin is at the origin of the mesh containing the geometry.
 * @param geo
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
 * Convert global coordinates to 2D screen coordinates.
 * @param {Vector3} vec
 * @param {Camera} camera
 * @param {number} canvasW
 * @param {number} canvasH
 * @returns {Vector3}
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
 * Get 2D screen coordinates from a mesh.
 * @param {Mesh} mesh
 * @param {Camera} camera
 * @param {number} canvasW
 * @param {number} canvasH
 * @returns {Vector3}
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
 * Get the radius of three-dimensional polar coordinates from Cartesian coordinates.
 * @param {Vector3} vec
 * @returns {number}
 */
export function getROfGlobe(vec: Vector3): number {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
}

/**
 * Shift the position of mesh and geometry.
 * The mesh moves while the geometry maintains its apparent position.
 *
 * Meshes loaded immediately after using ObjLoader etc. have all Geometry origins at (0,0,0),
 * which prevents rotation and scaling from working as intended.
 * Moving the center point to an arbitrary location makes operations easier.
 *
 * @param mesh
 * @param pos coordinates that will become the center point of the mesh
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
