import React from "react";

import { SvgType } from "@/types/SvgType";

const InvoiceSvg = ({ color, size }: SvgType) => {
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
      <path d="m16,15c0-1.654,1.346-3,3-3h4.985c.01-.127.015-.255.015-.384v-6.616c0-2.757-2.243-5-5-5h-10c-2.757,0-5,2.243-5,5v10c0,2.757,2.243,5,5,5h7v-5Zm3-1c-.552,0-1,.448-1,1v4.483c.31-.176.599-.396.858-.655l3.677-3.677c.346-.346.635-.733.862-1.151h-4.397Zm-4,10h-6C4.038,24,0,19.963,0,15v-7c0-.553.448-1,1-1s1,.447,1,1v7c0,3.859,3.14,7,7,7h6c.553,0,1,.447,1,1s-.447,1-1,1Z" />
    </svg>
  );
};

export default InvoiceSvg;
