import svgPaths from "./svg-xeg5zlly6l";

function Heading() {
  return (
    <div className="absolute h-[28.594px] left-[24px] top-[12px] w-[226.5px]" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Roboto:Bold',sans-serif] font-bold leading-[28.6px] left-[112.77px] text-[#18181b] text-[22px] text-center top-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        Tarde
      </p>
      <div className="absolute flex h-[16px] items-center justify-center left-[-5px] top-[7px] w-[10.133px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "154" } as React.CSSProperties}>
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

export default function Container() {
  return (
    <div className="bg-[#fbf6e2] overflow-clip relative rounded-tl-[24px] rounded-tr-[24px] size-full" data-name="Container">
      <Heading />
      <div className="absolute left-[176px] size-[78.696px] top-[-40px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78.6956 78.6956">
          <circle cx="39.3478" cy="39.3478" fill="url(#paint0_linear_96_531)" id="Ellipse 2" r="39.3478" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_96_531" x1="39.3478" x2="39.3478" y1="0" y2="78.6956">
              <stop stopColor="#FDC700" />
              <stop offset="1" stopColor="#FF8904" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute flex h-[16px] items-center justify-center left-[245.43px] top-[19px] w-[10.133px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "154" } as React.CSSProperties}>
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
    </div>
  );
}