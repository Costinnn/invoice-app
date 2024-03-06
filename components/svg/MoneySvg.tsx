import React from "react";

type SvgType = {
  color?: string;
  size?: number;
};
const MoneySvg = ({ color, size }: SvgType) => {
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
      <path d="m15.5,0c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5Zm7,5c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5Zm-7,3h2.333L22.5,0h-2.333l-4.667,8Zm-4-3c0,1.657-2.574,3-5.75,3S0,6.657,0,5s2.574-3,5.75-3,5.75,1.343,5.75,3Zm0,13.5v2c0,1.995-2.472,3.5-5.75,3.5s-5.75-1.505-5.75-3.5v-2c0,1.971,2.396,3.5,5.75,3.5s5.75-1.529,5.75-3.5Zm0-4v2c0,1.995-2.472,3.5-5.75,3.5s-5.75-1.505-5.75-3.5v-2c0,1.971,2.396,3.5,5.75,3.5s5.75-1.529,5.75-3.5Zm0-4v2c0,1.995-2.472,3.5-5.75,3.5S0,14.495,0,12.5v-2c0,1.971,2.396,3.5,5.75,3.5s5.75-1.529,5.75-3.5Zm0-4v2c0,1.995-2.472,3.5-5.75,3.5S0,10.495,0,8.5v-2c0,1.971,2.396,3.5,5.75,3.5s5.75-1.529,5.75-3.5Zm11.5,6.5c0,1.657-2.574,3-5.75,3s-5.75-1.343-5.75-3,2.574-3,5.75-3,5.75,1.343,5.75,3Zm0,5.5v2c0,1.995-2.472,3.5-5.75,3.5s-5.75-1.505-5.75-3.5v-2c0,1.971,2.396,3.5,5.75,3.5s5.75-1.529,5.75-3.5Zm0-4v2c0,1.995-2.472,3.5-5.75,3.5s-5.75-1.505-5.75-3.5v-2c0,1.971,2.396,3.5,5.75,3.5s5.75-1.529,5.75-3.5Z" />
    </svg>
  );
};

export default MoneySvg;
