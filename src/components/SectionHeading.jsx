import { Reveal } from "./Reveal";

export const SectionHeading = ({ eyebrow, title, accent, description }) => (
  <Reveal className="mb-12 text-center">
    {eyebrow && (
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
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
