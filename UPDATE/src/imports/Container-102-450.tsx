import svgPaths from "./svg-ph8iksxisv";

function Heading() {
  return (
    <div className="absolute h-[28.594px] left-[24px] top-[12px] w-[226.5px]" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Roboto:Bold',sans-serif] font-bold leading-[28.6px] left-[112.77px] text-[#d9d9d9] text-[22px] text-center top-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        Noite
      </p>
      <div className="absolute left-[16px] size-[5px] top-[21px]">
        <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.75528 4.52254">
            <path d={svgPaths.p1bfcfb00} fill="var(--fill-0, white)" fillOpacity="0.86" id="Star 1" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[21px] size-[5px] top-[11px]">
        <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.75528 4.52254">
            <path d={svgPaths.p1bfcfb00} fill="var(--fill-0, white)" fillOpacity="0.86" id="Star 1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[46.466px] left-[195px] top-[5px] w-[41.036px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41.036 46.4665">
        <g id="Frame 14">
          <path d={svgPaths.p182f64c0} fill="url(#paint0_linear_102_454)" id="Subtract" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_102_454" x1="5.79905" x2="29.2878" y1="43.3159" y2="2.63225">
            <stop stopColor="#FFCC11" />
            <stop offset="1" stopColor="#FFF099" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-[#00092a] overflow-clip relative rounded-tl-[24px] rounded-tr-[24px] size-full" data-name="Container">
      <Heading />
      <Frame />
      <div className="absolute flex h-[16px] items-center justify-center left-[246px] top-[19px] w-[10.133px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-[10.133px] relative w-[16px]">
            <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8564 7.6">
                <path d={svgPaths.p1e9a0270} fill="var(--fill-0, #C5C5C5)" id="Polygon 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-[31px] size-[5px] top-[13px]">
        <div className="absolute inset-[0_2.45%_9.55%_2.45%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.75528 4.52254">
            <path d={svgPaths.p1bfcfb00} fill="var(--fill-0, white)" fillOpacity="0.86" id="Star 1" />
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[16px] items-center justify-center left-[19px] top-[22px] w-[10.133px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="-scale-y-100 flex-none rotate-90">
          <div className="h-[10.133px] relative w-[16px]">
            <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8564 7.6">
                <path d={svgPaths.p1e9a0270} fill="var(--fill-0, #C5C5C5)" id="Polygon 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}