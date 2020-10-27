const { parallel, series } = require("gulp");

const doc = require("gulptask-tsdoc").generateTask();
const server = require("gulptask-dev-server").generateTask("./docs/demo");

const { bundleDemo, watchDemo } = require("gulptask-demo-page").generateTasks({
  body: `<canvas id="webgl-canvas" width="1920" height="1080"></canvas>`,
});
const { tsc, tscClean, watchTsc } = require("gulptask-tsc").generateTasks({
  projects: ["tsconfig.json", "tsconfig.esm.json"],
});

const watchTasks = async () => {
  watchDemo();
  watchTsc();
};

exports.tsc = series(tsc);
exports.start_dev = series(watchTasks, server);
exports.build = series(tsc, parallel(bundleDemo, doc));
exports.build_clean = series(tscClean, parallel(bundleDemo, doc));
