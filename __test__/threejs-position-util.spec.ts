import {
  BufferGeometry,
  Camera,
  Mesh,
  Object3D,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Spherical,
  Vector3,
} from "three";
import { PositionUtil } from "../src/index.js";

describe("座標ユーティリティ", () => {
  // シーンを作成
  const scene = new Scene();
  const W = 1920;
  const H = 1080;
  const camera = new PerspectiveCamera(45, W / H, 1, 10000);
  camera.position.set(0, 0, 1000);
  scene.add(camera);

  test("ジオメトリ中心のワールド座標取得", () => {
    const geo = new SphereGeometry(10);
    const mesh = new Mesh(geo);
    PositionUtil.shiftMesh(mesh, new Vector3(-10, -10, -10));
    mesh.position.set(10, 10, 10);
    const container = new Object3D();
    container.position.set(10, 10, 10);
    container.add(mesh);
    scene.add(container);

    const vec = PositionUtil.getGeometryCenterInWorld(mesh);
    expect(vec).toEqual(new Vector3(30, 30, 30));
  });

  test("ジオメトリ中心のワールド座標取得 : シーンにaddされていないオブジェクト", () => {
    const geo = new SphereGeometry(10);
    const mesh = new Mesh(geo);
    PositionUtil.shiftMesh(mesh, new Vector3(-10, -10, -10));
    const expectPosition = new Vector3(10, 10, 10);

    /**
     * シーンにaddされていないMeshは、matrixWorldが存在しないためジオメトリの中心座標がそのまま返される。
     * mesh自体のpositionは無視される。
     */
    let vec = PositionUtil.getGeometryCenterInWorld(mesh);
    expect(vec).toEqual(expectPosition);

    /**
     * そのためmeshのpositionを移動して再計算しても結果は同じ。
     */
    mesh.position.set(10, 10, 10);
    vec = PositionUtil.getGeometryCenterInWorld(mesh);
    expect(vec).toEqual(expectPosition);
  });

  test("ジオメトリ中心のローカル座標取得", () => {
    const geo = new SphereGeometry(10);
    const mesh = new Mesh(geo);
    PositionUtil.shiftMesh(mesh, new Vector3(-10, -10, -10));
    mesh.position.set(10, 10, 10);
    const container = new Object3D();
    container.position.set(10, 10, 10);
    container.add(mesh);
    scene.add(container);

    const vec = PositionUtil.getGeometryCenterInLocal(mesh);

    //親Object3Dの移動やmeshの移動は無視して、ジオメトリの中心位置だけを取得する。
    //座標の基準はmeshの中心点
    expect(vec).toEqual(new Vector3(10, 10, 10));
  });

  test("スクリーン座標の取得", () => {
    const geo = new SphereGeometry(10);

    const addMesh = (
      geo: BufferGeometry,
      scene: Scene,
      camera: Camera,
      pos: Vector3,
    ) => {
      const mesh = new Mesh(geo);
      mesh.position.set(pos.x, pos.y, pos.z);
      scene.add(mesh);
      return PositionUtil.get2DPositionWithMesh(mesh, camera, W, H);
    };

    const vec0 = addMesh(geo, scene, camera, new Vector3(0, 0, 0));
    const vec1 = addMesh(geo, scene, camera, new Vector3(-200, 200, 0));
    const vec2 = addMesh(geo, scene, camera, new Vector3(350, -150, 0));
    const vec3 = addMesh(geo, scene, camera, new Vector3(350, -150, -600));

    expect(vec0).toEqual(new Vector3(W / 2, H / 2, 0));

    expect(vec1.x).toBeCloseTo(699.2649352637056);
    expect(vec1.y).toBeCloseTo(279.26493526370575);

    expect(vec2.x).toBeCloseTo(1416.286363288515);
    expect(vec2.y).toBeCloseTo(735.5512985522207);

    expect(vec3.x).toBeCloseTo(1245.1789770553219);
    expect(vec3.y).toBeCloseTo(662.2195615951379);
  });

  test("極座標半径の取得", () => {
    const vec = new Vector3(1932, 1688, 127);

    const spherical = new Spherical().setFromVector3(vec);
    const rad = PositionUtil.getROfGlobe(vec);

    expect(rad).toBe(spherical.radius);
  });
});
