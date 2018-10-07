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
   * 直交座標から極座標へ変換する
   * @param vector3
   * @returns {Polar}
   */
  public static vector3ToPolar(vector3: Vector3): Polar {
    const vec = vector3.clone().normalize();

    let lng = -Math.atan2(-vec.z, -vec.x) - Math.PI / 2;
    if (lng < -Math.PI) lng += Math.PI * 2;

    let p = new Vector3(vec.x, 0, vec.z);
    p.normalize();
    let lat = Math.acos(p.dot(vec));
    if (vec.y < 0) lat *= -1;

    return new Polar(lng, lat);
  }

  /**
   * 極座標から直交座標へ変換する
   * @param polar
   * @returns {Vector3}
   */
  public static polarToVector3(polar: Polar): Vector3 {
    let out = new Vector3();

    //Y軸を反転
    //three.jsの座標系が右手座標系でY軸上向きなので
    let lat = Math.PI / 2 - polar.latitude;

    out.set(
      Math.sin(lat) * Math.sin(polar.longitude),
      Math.cos(lat),
      Math.sin(lat) * Math.cos(polar.longitude)
    );

    return out;
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

/**
 * 地球の緯度経度ベース極座標オブジェクト
 */
export class Polar {
  public longitude: number;
  public latitude: number;
  public static readonly PI_2 = Math.PI * 2;

  /**
   * コンストラクタ
   * @param lng 経度　単位ラジアン　180度 = Math.PI
   * @param lat 緯度　単位ラジアン
   */
  constructor(lng: number = 0, lat: number = 0) {
    this.longitude = lng;
    this.latitude = lat;
  }

  /**
   * 値の正規化を行う
   * 回転数のデータは失われる。
   */
  public normalize(): void {
    this.longitude = Math.atan2(
      Math.sin(this.longitude),
      Math.cos(this.longitude)
    );
    this.latitude = Math.atan2(
      Math.sin(this.latitude),
      Math.cos(this.latitude)
    );
  }

  public clone(): Polar {
    return new Polar(this.longitude, this.latitude);
  }
}
