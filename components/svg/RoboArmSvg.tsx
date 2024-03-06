import React from "react";
import { SvgType } from "@/types/SvgType";

const RoboArmSvg = ({ color, size }: SvgType) => {
  return (
    <svg
      id="Layer_1"
      enableBackground="new 0 0 512 512"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      width={size ? size : "20"}
      height={size ? size : "20"}
      fill={color ? color : "#000000"}
    >
      <path
        clipRule="evenodd"
        d="m458.833 197.954c6.44-6.59 10.419-15.594 10.419-25.515 0-19.803-15.838-35.965-35.511-36.512l-69.789-79.746c-3.007-20.088-20.375-35.544-41.288-35.544-11.162 0-21.306 4.411-28.804 11.57l-225.213 138.451c-17.158 9.308-28.997 27.201-29.746 47.875h-.016c-.024.688-.037 1.382-.037 2.079 0 2.029.112 4.033.32 6.008l9.292 168.047c-6.411 10.415-10.572 22.352-11.807 35.135h-2.582c-14.376-.001-26.071 10.592-26.071 23.612v29.949c0 4.418 3.582 8 8 8h205.597c4.418 0 8-3.582 8-8v-29.949c0-13.021-11.696-23.613-26.073-23.613h-2.579c-2.234-23.115-14.047-43.456-31.403-57.029l-30.402-114.915 176.026-154.404c.496.09.993.177 1.495.25l79.544 69.755c.262 9.516 4.175 18.133 10.394 24.497-26.419 10.444-45.167 36.219-45.167 66.307 0 25.347 13.64 48.995 35.596 61.717 2.475 1.435 5.528 1.437 8.005.01 2.479-1.429 4.006-4.071 4.006-6.932v-51.085l23.029-13.297 23.028 13.297v51.816c0 2.826 1.491 5.443 3.924 6.884 1.256.743 2.665 1.116 4.076 1.116 1.322 0 2.646-.328 3.846-.985 22.858-12.532 37.058-36.497 37.058-62.541 0-30.089-18.747-55.864-45.167-66.308zm-58.589-42.233-62.186-54.533c10.691-4.257 19.217-12.804 23.446-23.509l54.505 62.282c-6.749 3.486-12.277 9.011-15.765 15.76zm-77.579-119.084c14.199 0 25.752 11.553 25.752 25.752s-11.553 25.752-25.752 25.752-25.752-11.553-25.752-25.752 11.553-25.752 25.752-25.752zm-227.027 143.185c22.491 0 40.789 18.298 40.789 40.789s-18.298 40.789-40.789 40.789c-20.933 0-38.226-15.853-40.522-36.183l-.263-4.763c.085-22.418 18.346-40.632 40.785-40.632zm117.959 273.592v21.949h-189.597v-21.949c0-4.127 4.612-7.613 10.071-7.613h169.452c5.46 0 10.074 3.486 10.074 7.613zm-108.337-41.366c0-7.465 6.072-13.537 13.537-13.537s13.538 6.072 13.538 13.537-6.073 13.537-13.538 13.537-13.537-6.072-13.537-13.537zm79.581 17.753h-42.454c3.731-4.945 5.948-11.094 5.948-17.753 0-16.287-13.251-29.537-29.538-29.537s-29.537 13.25-29.537 29.537c0 6.658 2.216 12.808 5.947 17.753h-42.45c3.966-32.93 32.06-58.541 66.04-58.541 33.982 0 62.078 25.611 66.044 58.541zm-34.859-68.405c-9.628-3.944-20.153-6.136-31.185-6.136-21.26 0-40.665 8.083-55.312 21.333l-6.317-114.254c10.125 9.342 23.64 15.062 38.47 15.062 10.952 0 21.185-3.125 29.868-8.518zm2.252-136.31c.116-1.478.193-2.968.193-4.475 0-27.045-19.009-49.719-44.363-55.403l173.01-106.358c-.099 1.168-.161 2.346-.161 3.539 0 14.127 7.059 26.629 17.828 34.188zm259.944-52.647c0-11.325 9.213-20.538 20.538-20.538 11.324 0 20.537 9.213 20.537 20.538 0 11.324-9.213 20.537-20.537 20.537-11.325.001-20.538-9.212-20.538-20.537zm58.917 131.618v-40.704c0-2.858-1.524-5.499-4-6.928l-31.028-17.915c-1.237-.715-2.618-1.072-4-1.072-1.381 0-2.763.357-4 1.072l-31.029 17.915c-2.476 1.429-4 4.069-4 6.928v39.383c-9.852-10.196-15.606-23.978-15.606-38.474 0-30.484 24.801-55.285 55.285-55.285 30.483 0 55.284 24.801 55.284 55.285-.001 15.212-6.247 29.509-16.906 39.795zm-375.457-55.762c15.265 0 27.684-12.419 27.684-27.684s-12.419-27.684-27.684-27.684-27.684 12.419-27.684 27.684 12.419 27.684 27.684 27.684zm0-39.367c6.442 0 11.684 5.241 11.684 11.684s-5.241 11.684-11.684 11.684-11.684-5.241-11.684-11.684 5.241-11.684 11.684-11.684zm214.359-146.539c0-6.997 5.671-12.668 12.668-12.668 6.996 0 12.668 5.672 12.668 12.668s-5.672 12.668-12.668 12.668c-6.997 0-12.668-5.672-12.668-12.668z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default RoboArmSvg;