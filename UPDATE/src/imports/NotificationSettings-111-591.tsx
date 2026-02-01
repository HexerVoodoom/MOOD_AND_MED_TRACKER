import svgPaths from "./svg-04k7ddfifj";

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M15 18L9 12L15 6" id="Vector" stroke="var(--stroke-0, #18181B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[33554400px] shrink-0 size-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[28px] relative shrink-0 w-[116.641px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Segoe_UI:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#18181b] text-[20px]">Notificações</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white h-[104px] relative shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-[390px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center pl-[16px] relative size-full">
        <Button />
        <Heading />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[8px] top-0 w-[350px]" data-name="Heading 2">
      <p className="flex-[1_0_0] font-['Segoe_UI:Bold',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[#18181b] text-[12px] tracking-[1.2px] uppercase whitespace-pre-wrap">Lembretes de Humor</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_111_607)" id="Icon">
          <path d="M8 4V8L10.6667 9.33333" id="Vector" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39ee6532} id="Vector_2" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_111_607">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#eff6ff] relative rounded-[10px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-full relative shrink-0 w-[64px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="flex-[1_0_0] font-['Segoe_UI:Bold',sans-serif] leading-[20px] min-h-px min-w-px not-italic relative text-[#18181b] text-[14px] whitespace-pre-wrap">Manhã</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[1_0_0] h-[38.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Text />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[38.594px] items-center left-[16px] top-[16px] w-[108px]" data-name="Container">
      <Container6 />
      <Container7 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative rounded-[8px] shrink-0">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] py-[4px] relative">
        <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#18181b] text-[14px] text-center">09:20</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute content-stretch flex h-[38.594px] items-center left-[164.5px] top-[16px] w-[64px]" data-name="Text">
      <Frame />
    </div>
  );
}

function Container8() {
  return <div className="bg-white h-[16px] rounded-[33554400px] shrink-0 w-full" data-name="Container" />;
}

function Button1() {
  return (
    <div className="absolute bg-[#80c4c1] content-stretch flex flex-col h-[24px] items-start left-[292px] pl-[28px] pr-[4px] pt-[4px] rounded-[33554400px] top-[23.3px] w-[48px]" data-name="Button">
      <Container8 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[71.594px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#18181b] border-b border-solid inset-0 pointer-events-none" />
      <Container5 />
      <Text1 />
      <Button1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_111_603)" id="Icon">
          <path d="M8 4V8L10.6667 9.33333" id="Vector" stroke="var(--stroke-0, #FF8904)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39ee6532} id="Vector_2" stroke="var(--stroke-0, #FF8904)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_111_603">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[rgba(255,137,4,0.1)] relative rounded-[10px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-full relative shrink-0 w-[64px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="flex-[1_0_0] font-['Segoe_UI:Bold',sans-serif] leading-[20px] min-h-px min-w-px not-italic relative text-[#18181b] text-[14px] whitespace-pre-wrap">Tarde</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="flex-[1_0_0] h-[38.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Text2 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[38.594px] items-center left-[16px] top-[16px] w-[108px]" data-name="Container">
      <Container11 />
      <Container12 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[164.5px] px-[12px] py-[4px] rounded-[8px] top-[21.3px]">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#18181b] text-[14px] text-center">09:20</p>
    </div>
  );
}

function Container13() {
  return <div className="bg-white h-[16px] rounded-[33554400px] shrink-0 w-full" data-name="Container" />;
}

function Button2() {
  return (
    <div className="absolute bg-[#80c4c1] content-stretch flex flex-col h-[24px] items-start left-[292px] pl-[28px] pr-[4px] pt-[4px] rounded-[33554400px] top-[23.3px] w-[48px]" data-name="Button">
      <Container13 />
    </div>
  );
}

function Container14() {
  return <div className="bg-white h-[16px] rounded-[33554400px] shrink-0 w-full" data-name="Container" />;
}

function Button3() {
  return (
    <div className="absolute bg-[#80c4c1] content-stretch flex flex-col h-[24px] items-start left-[292px] pl-[28px] pr-[4px] pt-[4px] rounded-[33554400px] top-[23.3px] w-[48px]" data-name="Button">
      <Container14 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[71.594px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#18181b] border-b border-solid inset-0 pointer-events-none" />
      <Container10 />
      <Frame1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_111_599)" id="Icon">
          <path d="M8 4V8L10.6667 9.33333" id="Vector" stroke="var(--stroke-0, #AD46FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39ee6532} id="Vector_2" stroke="var(--stroke-0, #AD46FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_111_599">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[#faf5ff] relative rounded-[10px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-full relative shrink-0 w-[64px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="flex-[1_0_0] font-['Segoe_UI:Bold',sans-serif] leading-[20px] min-h-px min-w-px not-italic relative text-[#18181b] text-[14px] whitespace-pre-wrap">Noite</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="flex-[1_0_0] h-[38.594px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Text3 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[38.594px] items-center left-[16px] top-[16px] w-[108px]" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[164.5px] px-[12px] py-[4px] rounded-[8px] top-[21.3px]">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#18181b] text-[14px] text-center">09:20</p>
    </div>
  );
}

function Container19() {
  return <div className="bg-white h-[16px] rounded-[33554400px] shrink-0 w-full" data-name="Container" />;
}

function Button4() {
  return (
    <div className="absolute bg-[#80c4c1] content-stretch flex flex-col h-[24px] items-start left-[292px] pl-[28px] pr-[4px] pt-[4px] rounded-[33554400px] top-[23.3px] w-[48px]" data-name="Button">
      <Container19 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[70.594px] relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Frame2 />
      <Button4 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-white h-[215.781px] left-0 rounded-[16px] top-[28px] w-[358px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container4 />
        <Container9 />
        <Container15 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#18181b] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[243.781px] relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container3 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[8px] top-0 w-[350px]" data-name="Heading 2">
      <p className="flex-[1_0_0] font-['Segoe_UI:Bold',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[#18181b] text-[12px] tracking-[1.2px] uppercase whitespace-pre-wrap">Medicamentos</p>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1e6eff00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p5baad20} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-[#80c4c1] h-[32px] relative rounded-[10px] shrink-0 w-[29.453px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.016px] relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="flex-[1_0_0] h-[40px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Segoe_UI:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#18181b] text-[14px] top-[-1px] w-[165px] whitespace-pre-wrap">Me lembre de tomar meus medicamentos</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-center left-[16px] top-[16px] w-[279.672px]" data-name="Container">
      <Container24 />
      <Text4 />
    </div>
  );
}

function Container25() {
  return <div className="bg-white h-[16px] rounded-[33554400px] shrink-0 w-full" data-name="Container" />;
}

function Button5() {
  return (
    <div className="absolute bg-[#80c4c1] content-stretch flex flex-col h-[24px] items-start left-[295.67px] pl-[28px] pr-[4px] pt-[4px] rounded-[33554400px] top-[24px] w-[48px]" data-name="Button">
      <Container25 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Button5 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-white h-[74px] left-0 rounded-[16px] top-[28px] w-[358px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container22 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#18181b] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[102px] relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container21 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[58.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Segoe_UI:Regular',sans-serif] leading-[19.5px] left-0 not-italic text-[#1447e6] text-[12px] top-[-1px] w-[300px] whitespace-pre-wrap">As notificações ajudam você a manter a consistência nos registros e no tratamento. Você pode alterar os horários clicando sobre eles.</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-[#eff6ff] h-[92.5px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#dbeafe] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[17px] px-[17px] relative size-full">
        <Paragraph />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[518.281px] relative shrink-0 w-[390px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start pt-[16px] px-[16px] relative size-full">
        <Container2 />
        <Container20 />
        <Container26 />
      </div>
    </div>
  );
}

export default function NotificationSettings() {
  return (
    <div className="bg-[#f8f9fa] content-stretch flex flex-col items-start relative size-full" data-name="NotificationSettings">
      <Container />
      <Container1 />
    </div>
  );
}