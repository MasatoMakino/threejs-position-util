import { Vector3, Mesh, Camera, Geometry, Matrix4 } from "three";

/**
 * Created by makinomasato on 2016/05/21.
 */

export class PositionUtil {
  /**
   * メッシュからのワールドポジション取得メソッド
   * @param mesh
   * @returns {Vector3}
   */
  public static getWorldPosition(mesh: Mesh): Vector3 {
    let vec: Vector3 = PositionUtil.getLocalPosition(mesh);
    return vec.applyMatrix4(mesh.matrixWorld);
  }

  /**
   * メッシュからのlocalポジション取得メソッド
   * @param mesh
   * @returns {Vector3}
   */
  public static getLocalPosition(mesh: Mesh): Vector3 {
    return this.getLocalPositionFromGeometry(mesh.geometry as Geometry);
  }

  /**
   * ジオメトリからのlocalポジション取得メソッド
   * @param {Geometry} geo
   * @returns {Vector3}
   */
  public static getLocalPositionFromGeometry(geo: Geometry): Vector3 {
    geo.computeBoundingBox();
    let boundingBox = geo.boundingBox;

    let position = new Vector3();
    position.subVectors(boundingBox.max, boundingBox.min);
    position.multiplyScalar(0.5);
    position.add(boundingBox.min);

    return position;
  }

  /**
   * グローバル座標から2Dスクリーン座標を取得するメソッド
   * @param vec
   * @param camera
   * @param canvasW
   * @param canvasH
   * @returns {Vector3}
   */
  public static get2DPosition(
    vec: Vector3,
    camera: Camera,
    canvasW: number,
    canvasH: number
  ): Vector3 {
    const vector = vec.clone().project(camera);
    vector.x = ((vector.x + 1) * canvasW) / 2;
    vector.y = ((-vector.y + 1) * canvasH) / 2;

    return vector;
  }

  /**
   * メッシュから2Dスクリーン座標を取得するメソッド
   * @param mesh
   * @param camera
   * @param canvasW
   * @param canvasH
   * @returns {Vector3}
   */
  public static get2DPositionWithMesh(
    mesh: Mesh,
    camera: Camera,
    canvasW: number,
    canvasH: number
  ): Vector3 {
    let p = PositionUtil.getWorldPosition(mesh);
    return PositionUtil.get2DPosition(p, camera, canvasW, canvasH);
  }

  /**
   * 直交座標から三次元極座標の半径を取得する
   * @param vec
   * @returns {number}
   */
  public static getROfGlobe(vec: Vector3): number {
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
  }

  /**
   * 読み込み直後のメッシュの原点をずらす。
   * ObjLoaderなどで読み込んだ直後のMeshは、全てGeometryの原点が(0,0,0)になっているため回転や拡大が意図通りに動かない
   * 中心点を任意の場所にずらすことで操作が容易になる。
   *
   * @param mesh
   * @param pos meshの中心点になる座標
   */
  public static shiftMesh(mesh: Mesh, pos: Vector3): void {
    let position = pos.clone();
    mesh.geometry.applyMatrix(
      new Matrix4().makeTranslation(-position.x, -position.y, -position.z)
    );
    mesh.position.set(position.x, position.y, position.z);
  }
}
