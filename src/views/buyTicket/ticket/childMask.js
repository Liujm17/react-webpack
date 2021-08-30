import React, { useContext,} from "react";
import {ThemeContext} from './ticket'
function ChildMask() {
    const theme = useContext(ThemeContext);
  return (
      <div>data:{console.log(theme)}</div>
  )
  // return (
  //   <ThemeContext.Consumer>
  //     {(value)=><div>data:{console.log(value)}</div>}
  //     </ThemeContext.Consumer>
  // );
}

export default ChildMask;
