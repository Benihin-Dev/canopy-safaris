interface HeadingProps {
  title: string;
  textColor: string;
  lineColor: string; // from-[#0e291c]
}

export default function Heading({ title, textColor, lineColor }: HeadingProps) {
  return (
    <div className="w-full flex items-center justify-center gap-3 font-poppins ">
      <div
        className={`w-14 h-0.5 rounded-r-4xl bg-linear-to-l ${lineColor} to-transparent`}
      ></div>
      <p
        className={`uppercase text-sm text-center scale-y-90 font-medium ${textColor}`}
      >
        {title}
      </p>
      <div
        className={`w-14 h-0.5 rounded-l-4xl bg-linear-to-r ${lineColor} to-transparent`}
      ></div>
    </div>
  );
}
