# threejs-position-util

> Convert 3D Three.js world coordinates to 2D screen positions for UI overlays

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

threejs-position-util converts a 3D geometry position to 2D screen coordinates (CSS pixels; origin at top-left), ideal for positioning HTML UI elements over 3D objects.

## Use Cases

- UI Overlays: Position tooltips, labels, or info panels above 3D models
- HUD Elements: Create heads-up displays that follow 3D objects
- Interactive Markers: Place clickable HTML buttons over specific 3D locations
- Data Visualization: Add 2D charts or text that correspond to 3D data points

## Getting Started

### Install

```bash
npm install @masatomakino/threejs-position-util --save-dev
```

### Import

Import the utility functions from the module:

```js
import { 
  get2DPosition, 
  get2DPositionWithMesh,
  getGeometryCenterInWorld,
  getGeometryCenterInLocal
} from "@masatomakino/threejs-position-util";
```

### Primary Functions

The main purpose of this library is to convert 3D positions to 2D screen coordinates:

#### `get2DPositionWithMesh(mesh, camera, canvasW, canvasH)`
Convert a mesh's center position directly to 2D screen coordinates. This is the most commonly used function for positioning UI elements over 3D objects.

```js
const screenPos = get2DPositionWithMesh(myMesh, camera, 1920, 1080);
// Position an HTML element at the mesh location
htmlElement.style.left = `${screenPos.x}px`;
htmlElement.style.top = `${screenPos.y}px`;
```

#### `get2DPosition(vec3, camera, canvasW, canvasH)`
Convert any 3D world position to 2D screen coordinates.

```js
const worldPosition = new THREE.Vector3(10, 5, -20);
const screenPos = get2DPosition(worldPosition, camera, 1920, 1080);
```

### Additional Utility Functions

#### Position Calculation
```js
// Get mesh center in world coordinates
const worldCenter = getGeometryCenterInWorld(mesh);

// Get mesh center in local coordinates  
const localCenter = getGeometryCenterInLocal(mesh);
```

All functions return a position as `THREE.Vector3`.

[API documentation](https://masatomakino.github.io/threejs-position-util/api/index.html) | [Demo page](https://masatomakino.github.io/threejs-position-util/demo/)

## License

[MIT licensed](LICENSE).
