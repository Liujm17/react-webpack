//entry，output等的gongg路径
const fs = require("fs");
const { resolve } = require("path");



const moduleFileExtensions = [
    "web.mjs",
    "mjs",
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
  ];
  const appDirectory = fs.realpathSync(process.cwd());
  const resolveApp = (relativePath) => resolve(appDirectory, relativePath);
  const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find((extension) =>
      fs.existsSync(resolveFn(`${filePath}.${extension}`))
    );

    if (extension) {
      return resolveFn(`${filePath}.${extension}`);
    }

    return resolveFn(`${filePath}.js`);
  };
  //入口计算后的路径
  const appIndexJs = resolveModule(resolveApp, "src/index");


module.exports={
     //入口计算后的路径
    appIndexJs,
    outputPath: resolveApp("dist")
}


