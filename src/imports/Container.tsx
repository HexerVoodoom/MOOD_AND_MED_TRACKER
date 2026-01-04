import svgPaths from "./svg-m93q78uj9x";

function Button() {
  return (
    <div className="absolute left-0 rounded-[6.8px] size-[24px] top-[20px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#7e7e7e] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container() {
  return (
    <div className="basis-0 bg-white grow h-[40px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 bg-[#e8e8e8] grow h-[40px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function PillVisualization() {
  return (
    <div className="absolute left-[160px] rounded-[3.35544e+07px] size-[40px] top-[21.81px]" data-name="PillVisualization">
      <div className="content-stretch flex items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container />
        <Container1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c8c8c8] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[112px]" data-name="Paragraph">
      <p className="absolute font-['Segoe_UI:Bold',sans-serif] leading-[20px] left-0 not-italic text-[#18181b] text-[14px] top-[20px] w-[108px]">{`Aspirin `}</p>
    </div>
  );
}

function Small() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-0 top-[43px] w-[42.953px]" data-name="Small">
      <p className="font-['Segoe_UI:Regular',sans-serif] leading-[19.6px] not-italic relative shrink-0 text-[#71717a] text-[14px] text-nowrap">100mg</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[64px] left-[31px] top-[-0.19px] w-[112px]" data-name="Container">
      <Paragraph />
      <Small />
    </div>
  );
}

function MdiClockOutline() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="mdi:clock-outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="mdi:clock-outline">
          <path d={svgPaths.p6be45f2} fill="var(--fill-0, black)" fillOpacity="0.5" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[142px] top-[-8.19px]" data-name="Paragraph">
      <MdiClockOutline />
      <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#18181b] text-[14px] text-nowrap text-right">08:00</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <PillVisualization />
      <Container2 />
      <Paragraph1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[98px] relative rounded-[16.4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#a7a7ae] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pb-px pt-[17px] px-[17px] relative size-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function MaterialSymbolsCheck() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:check">
          <path d={svgPaths.p217bb200} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#6e8c89] content-stretch flex items-center justify-center left-0 p-[2px] rounded-[6.8px] size-[24px] top-[20px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#e4e4e7] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
      <MaterialSymbolsCheck />
    </div>
  );
}

function Container5() {
  return (
    <div className="basis-0 bg-[#ffd93d] grow min-h-px min-w-px relative shrink-0 w-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container6() {
  return (
    <div className="basis-0 bg-[#ffa474] grow min-h-px min-w-px relative shrink-0 w-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function PillVisualization1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[40px] items-start left-[170px] overflow-clip rounded-[3.35544e+07px] top-[23.81px] w-[24px]" data-name="PillVisualization">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[112px]" data-name="Paragraph">
      <p className="absolute font-['Segoe_UI:Bold',sans-serif] leading-[20px] left-0 not-italic text-[#18181b] text-[14px] top-[20px] w-[108px]">Vitamin D</p>
    </div>
  );
}

function Small1() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-0 top-[43px] w-[42.953px]" data-name="Small">
      <p className="font-['Segoe_UI:Regular',sans-serif] leading-[19.6px] not-italic relative shrink-0 text-[#71717a] text-[14px] text-nowrap">1 dose</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[64px] left-[31px] top-[-0.19px] w-[112px]" data-name="Container">
      <Paragraph2 />
      <Small1 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[150px] top-[-8.19px]" data-name="Paragraph">
      <div className="relative shrink-0 size-[20px]" data-name="mdi:clock-outline">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
          <div className="absolute inset-[8.33%]" data-name="Vector">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
              <path d={svgPaths.p11183800} fill="var(--fill-0, black)" fillOpacity="0.5" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic opacity-75 relative shrink-0 text-[#18181b] text-[14px] text-nowrap text-right">08:00</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <Button1 />
      <PillVisualization1 />
      <Container7 />
      <Paragraph3 />
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[rgba(216,230,234,0.5)] h-[98px] opacity-75 relative rounded-[16.4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#aad5e8] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pb-px pt-[17px] px-[17px] relative size-full">
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute left-0 rounded-[6.8px] size-[24px] top-[20px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#e4e4e7] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
    </div>
  );
}

function Container10() {
  return (
    <div className="basis-0 bg-[#ffd93d] grow min-h-px min-w-px relative shrink-0 w-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container11() {
  return (
    <div className="basis-0 bg-[#ffa474] grow min-h-px min-w-px relative shrink-0 w-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function PillVisualization2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[40px] items-start left-[40px] overflow-clip rounded-[3.35544e+07px] top-[16px] w-[24px]" data-name="PillVisualization">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[55.266px]" data-name="Paragraph">
      <p className="absolute font-['Segoe_UI:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#18181b] text-[14px] top-[-1px] w-[48px]">Vitamin D</p>
    </div>
  );
}

function Small2() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-0 top-[43px] w-[41.094px]" data-name="Small">
      <p className="font-['Segoe_UI:Regular',sans-serif] leading-[19.6px] not-italic relative shrink-0 text-[#71717a] text-[14px] text-nowrap">1 dose</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[64px] left-[88px] top-0 w-[55.266px]" data-name="Container">
      <Paragraph4 />
      <Small2 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[159.27px] top-[22px] w-[33.234px]" data-name="Paragraph">
      <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#18181b] text-[14px] text-nowrap text-right">08:00</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <Button2 />
      <PillVisualization2 />
      <Container12 />
      <Paragraph5 />
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[98px] relative rounded-[16.4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#a7a7ae] border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pb-px pt-[17px] px-[17px] relative size-full">
          <Container13 />
        </div>
      </div>
    </div>
  );
}

export default function Container15() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative size-full" data-name="Container">
      <Container4 />
      <Container9 />
      <Container14 />
    </div>
  );
}