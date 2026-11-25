import type { LegalDoc } from "@/data/legal";

/* The words of a legal document. Used by the popup and by the /privacy and
   /terms pages so they always match. */
export default function LegalBody({
  doc,
  titleId,
}: {
  doc: LegalDoc;
  titleId?: string;
}) {
  return (
    <>
      <h2
        id={titleId}
        className="pr-16 font-inter text-2xl font-semibold text-[#171717] sm:text-3xl"
      >
        {doc.title}
      </h2>
      <p className="mb-4 mt-1 font-inter text-xs text-[#98A2B3]">
        Last updated: {doc.updated}
      </p>

      {doc.sections.map((s) => (
        <section key={s.title}>
          <h3 className="mb-1 mt-4 font-inter text-base font-semibold text-[#171717]">
            {s.title}
          </h3>
          <p className="font-inter">{s.body}</p>
        </section>
      ))}
    </>
  );
}
