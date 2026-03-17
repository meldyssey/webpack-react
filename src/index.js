import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root";

/*
React 19와 ReactDOM.render API 호환성 문제입니다. 원인 분석:
- React 19 버전: package.json:18-19에서 React 19.2.4 사용 중
- Deprecated API 사용: src/index.js:5에서 ReactDOM.render 사용
- React 18+: ReactDOM.render가 deprecated되고 createRoot API로 변경됨
*/
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
