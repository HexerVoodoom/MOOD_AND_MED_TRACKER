import svgPaths from "./svg-t764pyg8ri";

function Heading() {
  return (
    <div className="absolute h-[28.594px] left-[24px] top-[12px] w-[226.5px]" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Roboto:Bold',sans-serif] font-bold leading-[28.6px] left-[112.77px] text-[#18181b] text-[22px] text-center top-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        Manhã
      </p>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-[#fdfdfd] overflow-clip relative rounded-tl-[24px] rounded-tr-[24px] size-full" data-name="Container">
      <div className="absolute left-[3px] size-[104px] top-[23px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104 104">
          <circle cx="52" cy="52" fill="url(#paint0_linear_96_519)" id="Ellipse 1" r="52" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_96_519" x1="52" x2="52" y1="0" y2="104">
              <stop stopColor="#FDC700" />
              <stop offset="1" stopColor="#FF8904" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Heading />
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
      <div className="absolute flex h-[16px] items-center justify-center left-[14px] top-[19px] w-[10.133px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "154" } as React.CSSProperties}>
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