import React from "react";
import { SvgType } from "@/types/SvgType";

const ErrorSvg = ({ color, size }: SvgType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      id="Capa_1"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      width={size ? size : "20"}
      height={size ? size : "20"}
      fill={color ? color : "#000000"}
    >
      <g>
        <path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256C511.847,114.678,397.322,0.153,256,0z M256,448   c-106.039,0-192-85.961-192-192S149.961,64,256,64s192,85.961,192,192C447.882,361.99,361.99,447.882,256,448z" />
        <path d="M256,321.941c17.673,0,32-14.327,32-32V140.608c0-17.673-14.327-32-32-32s-32,14.327-32,32v149.333   C224,307.614,238.327,321.941,256,321.941z" />
        <circle cx="256.107" cy="373.333" r="32" />
      </g>
    </svg>
  );
};

export default ErrorSvg;
