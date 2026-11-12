import { Reveal } from "./Reveal";

export const SectionHeading = ({ eyebrow, title, accent, description }) => (
  <Reveal className="mb-12 text-center">
    {eyebrow && (
      /* A pill rather than bare caps — it gives every section the same
         recognisable opening mark instead of a stray line of small text. */
      <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl font-bold md:text-4xl">
      {title} {accent && <span className="text-gradient">{accent}</span>}
    </h2>
    {description && (
      <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
        {description}
      </p>
    )}
  </Reveal>
);
