const path = require("path");

module.exports = {
  // 웹팩이 빌드할 파일을 알려주는 역할
  entry: "./src/test.js",
  // 웹팩에서 빌드를 완료하면 output에 명시되어 있는 정보를 통해 빌드 파일을 생성
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/build")
  },
  // 웹팩 빌드 옵션으로 production은 최적화되어 빌드되어지는 특징을 가지고 있고 development는 빠르게 빌드하는 특징, none 같은 경우는 아무 기능 없이 웹팩으로 빌드
  mode: "none"
};