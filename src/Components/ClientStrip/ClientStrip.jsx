import { projects } from "../../util/util";

// Real shipped work as a slow marquee. The list is doubled so the loop is seamless.
function ClientStrip() {
  const names = [...projects, ...projects];

  return (
    <section
      aria-label="Selected clients"
      className="marquee relative overflow-hidden border-y border-brand-amethyst-border/50 py-6">
      <p className="site-container mb-4 text-center text-xs font-semibold tracking-[0.2em] text-brand-muted-deep uppercase">
        Brands we&apos;ve built for
      </p>
      <div className="marquee-track">
        {names.map((project, index) => (
          <a
            key={`${project.title}-${index}`}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={index >= projects.length ? -1 : 0}
            aria-hidden={index >= projects.length}
            className="flex shrink-0 items-center gap-10 px-5 text-2xl font-semibold text-brand-text-soft/60 transition-colors hover:text-brand-cyan sm:text-4xl">
            {project.title}
            <span aria-hidden="true" className="text-brand-cyan/50">
              ✦
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default ClientStrip;
