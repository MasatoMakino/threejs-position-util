import { Vector3, Matrix4 } from "three";
/**
 * Loaderで読み込んだジオメトリの位置の計測、ジオメトリのシフト操作をするクラスです。
 */
export class PositionUtil {
    /**
     * メッシュ内のジオメトリの重心座標を求める。
     * 原点はワールド座標。
     *
     * @param mesh
     * @returns {Vector3}
     */
    static getGeometryCenterInWorld(mesh) {
        let vec = PositionUtil.getGeometryCenterInLocal(mesh);
        if (mesh.parent) {
            mesh.parent.updateMatrixWorld(true);
        }
        return vec.applyMatrix4(mesh.matrixWorld);
    }
    /**
     * メッシュ内のジオメトリの重心座標を求める。
     * メッシュを原点とする座標を返す。
     * （例えばメッシュ原点を中心とする球体ジオメトリがある場合はVector3(0,0,0)を返す）
     *
     * @param mesh
     * @returns {Vector3}
     */
    static getGeometryCenterInLocal(mesh) {
        return this.getCenter(mesh.geometry);
    }
    /**
     * ジオメトリの重心座標を求める。
     * 座標原点はジオメトリを格納するメッシュの原点。
     *
     * @param {Geometry} geo
     * @returns {Vector3}
     */
    static getCenter(geo) {
        geo.computeBoundingBox();
        const boundingBox = geo.boundingBox;
        const position = new Vector3();
        position.subVectors(boundingBox.max, boundingBox.min);
        position.multiplyScalar(0.5);
        position.add(boundingBox.min);
        return position;
    }
    /**
     * グローバル座標から2Dスクリーン座標を取得する。
     * @param {Vector3} vec
     * @param {Camera} camera
     * @param {number} canvasW
     * @param {number} canvasH
     * @returns {Vector3}
     */
    static get2DPosition(vec, camera, canvasW, canvasH) {
        const vector = vec.clone().project(camera);
        vector.x = ((vector.x + 1) * canvasW) / 2;
        vector.y = ((-vector.y + 1) * canvasH) / 2;
        vector.z = 0;
        return vector;
    }
    /**
     * メッシュから2Dスクリーン座標を取得する。
     * @param {Mesh} mesh
     * @param {Camera} camera
     * @param {number} canvasW
     * @param {number} canvasH
     * @returns {Vector3}
     */
    static get2DPositionWithMesh(mesh, camera, canvasW, canvasH) {
        const p = PositionUtil.getGeometryCenterInWorld(mesh);
        return PositionUtil.get2DPosition(p, camera, canvasW, canvasH);
    }
    /**
     * 直交座標から三次元極座標の半径を取得する。
     * @param {Vector3} vec
     * @returns {number}
     */
    static getROfGlobe(vec) {
        return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
    }
    /**
     * 読み込み直後のメッシュとジオメトリの位置をずらす。
     * メッシュは移動し、ジオメトリは見かけ上同じ位置を維持する。
     *
     * ObjLoaderなどで読み込んだ直後のMeshは、全てGeometryの原点が(0,0,0)になっているため回転や拡大が意図通りに動かない。
     * 中心点を任意の場所にずらすことで操作が容易になる。
     *
     * @param mesh
     * @param pos meshの中心点になる座標
     */
    static shiftMesh(mesh, pos) {
        let position = pos.clone();
        //ジオメトリをずらす
        mesh.geometry.applyMatrix(new Matrix4().makeTranslation(-position.x, -position.y, -position.z));
        //メッシュを指定された中心点に移動する
        mesh.position.set(position.x, position.y, position.z);
    }
}
