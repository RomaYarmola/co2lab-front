const items = [
  "CO₂ capture from biogas and fermentation",
  "Purification and liquefaction systems",
  "CO₂ reuse or commercial supply",
];

export default function BiogasList() {
  return (
    <ul className="flex flex-col gap-3 lg:gap-4">
      {items.map((text) => (
        <li key={text}>
          <div
            className="relative flex items-center min-h-[82px] lg:min-h-[104px] rounded-[18px] shadow-[inset_0px_4px_12.6px_0px_rgba(255,255,255,0.25)] backdrop-blur-[10px] bg-[linear-gradient(90deg,rgba(106,106,106,0.08)_0%,rgba(208,208,208,0.0064)_100%)] p-6 lg:p-8 text-[14px] lg:text-[16px] font-semibold leading-[120%] uppercase"
          >
            <div
              className="absolute inset-0 rounded-[20px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(91.17deg, rgba(148, 148, 148, 0.2) -0.34%, #C7C7C7 100.72%)",
                padding: "1px",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
              aria-hidden
            />
            {text}
          </div>
        </li>
      ))}
    </ul>
  );
}
