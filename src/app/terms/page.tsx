import LegalBody from "@/components/LegalBody";
import { terms } from "@/data/legal";

export const metadata = { title: "Terms and Conditions — Canopy Safaris" };

export default function Page() {
  return (
    <>
      {/* dark band so the white nav text stays readable at the top */}
      <div className="bg-[#2b1d10] pb-6 pt-28" />
      <section className="bg-[#f0eee5] px-6 py-14 md:px-12">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 text-[15px] leading-relaxed text-[#344054] shadow-xl sm:p-10">
          <LegalBody doc={terms} />
        </div>
      </section>
    </>
  );
}
