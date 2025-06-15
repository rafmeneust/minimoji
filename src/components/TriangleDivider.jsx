export default function TriangleDivider() {
  return (
    <div
      className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 z-10"
      aria-hidden="true"
    >
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-[128%] h-[100px]"
      >
        <path
          d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z"
          className="fill-white dark:fill-gray-800"
        ></path>
      </svg>
    </div>
  );
}