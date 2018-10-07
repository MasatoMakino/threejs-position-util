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
