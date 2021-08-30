import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useReducer
} from "react";
// import { useNumber } from "../../hooks/commonHooks";
import A from "./a";
import B from "./b";

// 第二个参数：state的reducer处理函数
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const About = () => {
  var [a, setA] = useState(0);
  const [b, setB] = useState(0);
  // const Apage =useMemo(()=>{
  //   return
  // })
  const Apage = useMemo(() => {
    return a;
  }, [a]);
  return (
    <div>
      <A a={a} />
      <B b={b} add={() => setB(b + 1)} />
      <p onClick={() => setA(a + 1)}>
        {Apage}:{b}
      </p>
    </div>
  );
};

export default About;
