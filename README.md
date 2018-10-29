# threejs-position-util

[![Build Status](https://travis-ci.org/MasatoMakino/threejs-position-util.svg?branch=master)](https://travis-ci.org/MasatoMakino/threejs-position-util)
[![Maintainability](https://api.codeclimate.com/v1/badges/fec771399093f1315350/maintainability)](https://codeclimate.com/github/MasatoMakino/threejs-position-util/maintainability)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

[Github repository](https://github.com/MasatoMakino/threejs-position-util)

measuring geometry positions for three.js

## Demo

View [Demo Page](https://masatomakino.github.io/threejs-position-util/demo.html) and open console.
```
Vector3
x: 960
y: 540
z: 0
```

threejs-position-util output a geometry position on screen. 

## Getting Started

### Install

threejs-position-util depend on [three.js](https://threejs.org/)

```bash
npm install three --save-dev
```

and

```bash
npm install https://github.com/MasatoMakino/threejs-position-util.git --save-dev
```

### Import

threejs-position-util is composed of ES6 modules and TypeScript d.ts files.

At first, import a class.

```js
import { PositionUtil } from "threejs-position-util";
```

### Functions

[API documentation](https://masatomakino.github.io/threejs-position-util/api/classes/_threejs_position_util_.positionutil.html)

Call static functions in PositionUtil class.

```js
PositionUtil.getGeometryCenterInWorld(mesh);
PositionUtil.getGeometryCenterInLocal(mesh);
PositionUtil.get2DPositionWithMesh(mesh, camera, W, H);
```

Functions return a position as THREE.Vector3.

see also [demo script](https://masatomakino.github.io/threejs-position-util/main.js).

## License

threejs-position-util is [MIT licensed](LICENSE).