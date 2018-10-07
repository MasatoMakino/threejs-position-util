import { PositionUtil } from "../src/threejs-position-util";
import * as THREE from "three";

import Spherical = THREE.Spherical;
import Vector3 = THREE.Vector3;

describe("座標ユーティリティ", () => {
  // シーンを作成
  const scene = new THREE.Scene();

  // test("空のテスト", () => {
  //     expect(false).toEqual(false);
  // });
});

/*
describe("極座標クラス", () => {
  const R = 10;
  const PI_H = Math.PI / 2;

  test("新規オブジェクト", () => {
    const poler = new Polar(0, PI_H);
    expect(poler.longitude).toEqual(0);
    expect(poler.latitude).toEqual(PI_H);
    expect(Polar.polarToVector3(poler)).toEqual({ x: 0, y: 1, z: 0 });
  });

  test("Sphericalとの包括的比較", () => {
    for (let lng = -PI_H; lng < Math.PI * 2 - PI_H; lng += 0.0174 * 10) {
      for (let lat = -PI_H; lat < Math.PI * 2 - PI_H; lat += 0.0174 * 10) {
        const polar = new Polar(lng, lat);
        const spherical: Spherical = new Spherical(R, PI_H - lat, lng);
        const shpericalVec: Vector3 = new Vector3().setFromSpherical(spherical);
        const polarVec: Vector3 = Polar.polarToVector3(polar).multiplyScalar(R);
        expect(shpericalVec.x).toBeCloseTo(polarVec.x);
        expect(shpericalVec.y).toBeCloseTo(polarVec.y);
        expect(shpericalVec.z).toBeCloseTo(polarVec.z);
      }
    }
  });
});
*/
