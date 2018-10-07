import { Vector3, Matrix4 } from "three";
/**
 * Created by makinomasato on 2016/05/21.
 */
export class PositionUtil {
    /**
     * メッシュからのワールドポジション取得メソッド
     * @param mesh
     * @returns {Vector3}
     */
    static getWorldPosition(mesh) {
        let vec = PositionUtil.getLocalPosition(mesh);
        return vec.applyMatrix4(mesh.matrixWorld);
    }
    /**
     * メッシュからのlocalポジション取得メソッド
     * @param mesh
     * @returns {Vector3}
     */
    static getLocalPosition(mesh) {
        return this.getLocalPositionFromGeometry(mesh.geometry);
    }
    /**
     * ジオメトリからのlocalポジション取得メソッド
     * @param {Geometry} geo
     * @returns {Vector3}
     */
    static getLocalPositionFromGeometry(geo) {
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
    static get2DPosition(vec, camera, canvasW, canvasH) {
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
    static get2DPositionWithMesh(mesh, camera, canvasW, canvasH) {
        let p = PositionUtil.getWorldPosition(mesh);
        return PositionUtil.get2DPosition(p, camera, canvasW, canvasH);
    }
    /**
     * 直交座標から三次元極座標の半径を取得する
     * @param vec
     * @returns {number}
     */
    static getROfGlobe(vec) {
        return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
    }
    /**
     * 直交座標から極座標へ変換する
     * @param vector3
     * @returns {Polar}
     */
    static vector3ToPolar(vector3) {
        const vec = vector3.clone().normalize();
        let lng = -Math.atan2(-vec.z, -vec.x) - Math.PI / 2;
        if (lng < -Math.PI)
            lng += Math.PI * 2;
        let p = new Vector3(vec.x, 0, vec.z);
        p.normalize();
        let lat = Math.acos(p.dot(vec));
        if (vec.y < 0)
            lat *= -1;
        return new Polar(lng, lat);
    }
    /**
     * 極座標から直交座標へ変換する
     * @param polar
     * @returns {Vector3}
     */
    static polarToVector3(polar) {
        let out = new Vector3();
        //Y軸を反転
        //three.jsの座標系が右手座標系でY軸上向きなので
        let lat = Math.PI / 2 - polar.latitude;
        out.set(Math.sin(lat) * Math.sin(polar.longitude), Math.cos(lat), Math.sin(lat) * Math.cos(polar.longitude));
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
    static shiftMesh(mesh, pos) {
        let position = pos.clone();
        mesh.geometry.applyMatrix(new Matrix4().makeTranslation(-position.x, -position.y, -position.z));
        mesh.position.set(position.x, position.y, position.z);
    }
}
/**
 * 地球の緯度経度ベース極座標オブジェクト
 */
export class Polar {
    /**
     * コンストラクタ
     * @param lng 経度　単位ラジアン　180度 = Math.PI
     * @param lat 緯度　単位ラジアン
     */
    constructor(lng = 0, lat = 0) {
        this.longitude = lng;
        this.latitude = lat;
    }
    /**
     * 値の正規化を行う
     * 回転数のデータは失われる。
     */
    normalize() {
        this.longitude = Math.atan2(Math.sin(this.longitude), Math.cos(this.longitude));
        this.latitude = Math.atan2(Math.sin(this.latitude), Math.cos(this.latitude));
    }
    clone() {
        return new Polar(this.longitude, this.latitude);
    }
}
Polar.PI_2 = Math.PI * 2;
