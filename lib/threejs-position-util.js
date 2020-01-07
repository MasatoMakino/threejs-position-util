"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var three_1 = require("three");
/**
 * Loaderで読み込んだジオメトリの位置の計測、ジオメトリのシフト操作をするクラスです。
 */
var PositionUtil = /** @class */ (function () {
    function PositionUtil() {
    }
    /**
     * メッシュ内のジオメトリの重心座標を求める。
     * 原点はワールド座標。
     *
     * @param mesh
     * @returns {Vector3}
     */
    PositionUtil.getGeometryCenterInWorld = function (mesh) {
        var vec = PositionUtil.getGeometryCenterInLocal(mesh);
        if (mesh.parent) {
            mesh.parent.updateMatrixWorld(true);
        }
        return vec.applyMatrix4(mesh.matrixWorld);
    };
    /**
     * メッシュ内のジオメトリの重心座標を求める。
     * メッシュを原点とする座標を返す。
     * （例えばメッシュ原点を中心とする球体ジオメトリがある場合はVector3(0,0,0)を返す）
     *
     * @param mesh
     * @returns {Vector3}
     */
    PositionUtil.getGeometryCenterInLocal = function (mesh) {
        return this.getCenter(mesh.geometry);
    };
    /**
     * ジオメトリの重心座標を求める。
     * 座標原点はジオメトリを格納するメッシュの原点。
     * @param geo
     */
    PositionUtil.getCenter = function (geo) {
        geo.computeBoundingBox();
        var boundingBox = geo.boundingBox;
        var position = new three_1.Vector3();
        position.subVectors(boundingBox.max, boundingBox.min);
        position.multiplyScalar(0.5);
        position.add(boundingBox.min);
        return position;
    };
    /**
     * グローバル座標から2Dスクリーン座標を取得する。
     * @param {Vector3} vec
     * @param {Camera} camera
     * @param {number} canvasW
     * @param {number} canvasH
     * @returns {Vector3}
     */
    PositionUtil.get2DPosition = function (vec, camera, canvasW, canvasH) {
        var vector = vec.clone().project(camera);
        vector.x = ((vector.x + 1) * canvasW) / 2;
        vector.y = ((-vector.y + 1) * canvasH) / 2;
        vector.z = 0;
        return vector;
    };
    /**
     * メッシュから2Dスクリーン座標を取得する。
     * @param {Mesh} mesh
     * @param {Camera} camera
     * @param {number} canvasW
     * @param {number} canvasH
     * @returns {Vector3}
     */
    PositionUtil.get2DPositionWithMesh = function (mesh, camera, canvasW, canvasH) {
        var p = PositionUtil.getGeometryCenterInWorld(mesh);
        return PositionUtil.get2DPosition(p, camera, canvasW, canvasH);
    };
    /**
     * 直交座標から三次元極座標の半径を取得する。
     * @param {Vector3} vec
     * @returns {number}
     */
    PositionUtil.getROfGlobe = function (vec) {
        return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
    };
    /**
     * メッシュとジオメトリの位置をずらす。
     * メッシュは移動し、ジオメトリは見かけ上同じ位置を維持する。
     *
     * ObjLoaderなどで読み込んだ直後のMeshは、全てGeometryの原点が(0,0,0)になっているため回転や拡大が意図通りに動かない。
     * 中心点を任意の場所にずらすことで操作が容易になる。
     *
     * @param mesh
     * @param pos meshの中心点になる座標
     */
    PositionUtil.shiftMesh = function (mesh, pos) {
        var position = pos.clone();
        //ジオメトリをずらす
        mesh.geometry.applyMatrix(new three_1.Matrix4().makeTranslation(-position.x, -position.y, -position.z));
        //メッシュを指定された量ずらす
        mesh.position.add(position);
    };
    return PositionUtil;
}());
exports.PositionUtil = PositionUtil;
