import React from "react";
import { SvgType } from "@/types/SvgType";

const DashHomeSvg = ({ color, size }: SvgType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      width={size ? size : "20"}
      height={size ? size : "20"}
      fill={color ? color : "#000000"}
    >
      <path d="M22,5.644V2.5c0-.829-.672-1.5-1.5-1.5s-1.5,.671-1.5,1.5v1.089L15.076,.941c-1.869-1.262-4.283-1.262-6.152,0L2.424,5.327C.906,6.351,0,8.055,0,9.886v8.614c0,3.033,2.468,5.5,5.5,5.5h3c.828,0,1.5-.671,1.5-1.5V14.5c0-.276,.225-.5,.5-.5h3c.275,0,.5,.224,.5,.5v8c0,.829,.672,1.5,1.5,1.5h3c3.032,0,5.5-2.467,5.5-5.5V9.886c0-1.654-.739-3.204-2-4.242Zm-1,12.856c0,1.378-1.121,2.5-2.5,2.5h-1.5v-6.5c0-1.93-1.57-3.5-3.5-3.5h-3c-1.93,0-3.5,1.57-3.5,3.5v6.5h-1.5c-1.379,0-2.5-1.122-2.5-2.5V9.886c0-.833,.412-1.607,1.102-2.073L10.602,3.427c.85-.573,1.947-.573,2.797,0l6.5,4.387c.689,.465,1.102,1.24,1.102,2.072v8.614Z" />
    </svg>
  );
};

export default DashHomeSvg;
