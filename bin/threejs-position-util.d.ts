import { Vector3, Mesh, Camera, Geometry, BufferGeometry } from "three";
/**
 * Loaderで読み込んだジオメトリの位置の計測、ジオメトリのシフト操作をするクラスです。
 */
export declare class PositionUtil {
    /**
     * メッシュ内のジオメトリの重心座標を求める。
     * 原点はワールド座標。
     *
     * @param mesh
     * @returns {Vector3}
     */
    static getGeometryCenterInWorld(mesh: Mesh): Vector3;
    /**
     * メッシュ内のジオメトリの重心座標を求める。
     * メッシュを原点とする座標を返す。
     * （例えばメッシュ原点を中心とする球体ジオメトリがある場合はVector3(0,0,0)を返す）
     *
     * @param mesh
     * @returns {Vector3}
     */
    static getGeometryCenterInLocal(mesh: Mesh): Vector3;
    /**
     * ジオメトリの重心座標を求める。
     * 座標原点はジオメトリを格納するメッシュの原点。
     * @param geo
     */
    static getCenter(geo: Geometry | BufferGeometry): Vector3;
    /**
     * グローバル座標から2Dスクリーン座標を取得する。
     * @param {Vector3} vec
     * @param {Camera} camera
     * @param {number} canvasW
     * @param {number} canvasH
     * @returns {Vector3}
     */
    static get2DPosition(vec: Vector3, camera: Camera, canvasW: number, canvasH: number): Vector3;
    /**
     * メッシュから2Dスクリーン座標を取得する。
     * @param {Mesh} mesh
     * @param {Camera} camera
     * @param {number} canvasW
     * @param {number} canvasH
     * @returns {Vector3}
     */
    static get2DPositionWithMesh(mesh: Mesh, camera: Camera, canvasW: number, canvasH: number): Vector3;
    /**
     * 直交座標から三次元極座標の半径を取得する。
     * @param {Vector3} vec
     * @returns {number}
     */
    static getROfGlobe(vec: Vector3): number;
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
    static shiftMesh(mesh: Mesh, pos: Vector3): void;
}
//# sourceMappingURL=threejs-position-util.d.ts.map