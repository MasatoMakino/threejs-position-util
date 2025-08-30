# threejs-position-util

> measuring geometry positions for three.js

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![CI_Main](https://github.com/MasatoMakino/threejs-position-util/actions/workflows/ci_main.yml/badge.svg)](https://github.com/MasatoMakino/threejs-position-util/actions/workflows/ci_main.yml)

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=MasatoMakino&repo=threejs-position-util&show_owner=true)](https://github.com/MasatoMakino/threejs-position-util)

## Demo

View [Demo Page](https://masatomakino.github.io/threejs-position-util/demo/) and open console.

```
Vector3
x: 960
y: 540
z: 0
```

threejs-position-util output a geometry position on screen.

## Getting Started

### Install

```bash
npm install @masatomakino/threejs-position-util --save-dev
```

### Import

At first, import a class.

```js
import { PositionUtil } from "@masatomakino/threejs-position-util";
```

### Functions

[API documentation](https://masatomakino.github.io/threejs-position-util/api/index.html)

Call static functions in PositionUtil class.

```js
PositionUtil.getGeometryCenterInWorld(mesh);
PositionUtil.getGeometryCenterInLocal(mesh);
PositionUtil.get2DPositionWithMesh(mesh, camera, W, H);
```

Functions return a position as THREE.Vector3.

see also [demo page](https://masatomakino.github.io/threejs-position-util/demo/).

## License

[MIT licensed](LICENSE).
