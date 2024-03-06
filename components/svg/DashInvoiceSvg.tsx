import React from "react";
import { SvgType } from "@/types/SvgType";

const DashInvoiceSvg = ({ color, size }: SvgType) => {
  return (
    <svg
      id="Layer_1"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      width={size ? size : "20"}
      height={size ? size : "20"}
      fill={color ? color : "#000000"}
    >
      <path d="m17 12.5a1.5 1.5 0 0 1 -1.5 1.5h-7a1.5 1.5 0 0 1 0-3h7a1.5 1.5 0 0 1 1.5 1.5zm-4.5 3.5h-4a1.5 1.5 0 0 0 0 3h4a1.5 1.5 0 0 0 0-3zm9.5-7.843v10.343a5.506 5.506 0 0 1 -5.5 5.5h-9a5.506 5.506 0 0 1 -5.5-5.5v-13a5.506 5.506 0 0 1 5.5-5.5h6.343a5.462 5.462 0 0 1 3.889 1.611l2.657 2.657a5.464 5.464 0 0 1 1.611 3.889zm-3 10.343v-9.5h-4a2 2 0 0 1 -2-2v-4h-5.5a2.5 2.5 0 0 0 -2.5 2.5v13a2.5 2.5 0 0 0 2.5 2.5h9a2.5 2.5 0 0 0 2.5-2.5z" />
    </svg>
  );
};

export default DashInvoiceSvg;
