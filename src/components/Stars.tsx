import { FaStar } from "react-icons/fa";

export default function Stars({
  n,
  className = "size-4",
}: {
  n: number;
  className?: string;
}) {
  return (
    <div
      className="flex gap-0.5 text-[#f59e0b]"
      role="img"
      aria-label={`${n} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          className={`${className} ${i < n ? "" : "opacity-25"}`}
        />
      ))}
    </div>
  );
}
