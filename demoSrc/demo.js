import * as THREE from "three";
import { PositionUtil } from "../esm/index.js";

const W = 1920;
const H = 1080;

const onDomContentsLoaded = () => {
  // シーンを作成
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W / H, 1, 10000);
  camera.position.set(0, 0, 1000);
  scene.add(camera);

  const renderOption = {
    canvas: document.getElementById("webgl-canvas"),
    antialias: true,
  };
  const renderer = new THREE.WebGLRenderer(renderOption);
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(W, H);
  renderer.setPixelRatio(window.devicePixelRatio);

  const geo = new THREE.SphereGeometry(10);

  addMesh(geo, scene, camera, new THREE.Vector3(0, 0, 0));
  addMesh(geo, scene, camera, new THREE.Vector3(-200, 200, 0));
  addMesh(geo, scene, camera, new THREE.Vector3(350, -150, 0));

  addMesh(geo, scene, camera, new THREE.Vector3(350, -150, -600));

  //平行光源オブジェクト(light)の設定
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

  renderer.render(scene, camera);
};

const addMesh = (geo, scene, camera, pos) => {
  const mesh = new THREE.Mesh(geo);
  mesh.position.set(pos.x, pos.y, pos.z);
  scene.add(mesh);
  console.log(PositionUtil.get2DPositionWithMesh(mesh, camera, W, H));
};

/**
 * DOMContentLoaded以降に初期化処理を実行する
 */
window.onload = onDomContentsLoaded;
