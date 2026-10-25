const steps = [
  { title: "Discovery", desc: "We understand your goals and vision." },
  { title: "Planning", desc: "We outline the roadmap and define milestones." },
  { title: "Design", desc: "We craft a sleek, intuitive, and modern experience." },
  { title: "Development", desc: "We build with precision using the latest tech stack." },
  { title: "Launch", desc: "We deploy, test, and ensure everything runs flawlessly." },
];

export default function ProcessSteps() {
  return (
    <section id="process" className="scroll-mt-24 theme-section py-20 md:py-28">
      <div className="site-container">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase text-brand-cyan">
            How we do it
          </p>
          <h2 className="mt-3 text-3xl font-bold text-brand-white sm:text-4xl">
            A clear path from first conversation to launch
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-muted">
            Each stage keeps the work focused, visible, and connected to your goals.
          </p>
        </div>

        <ol className="mt-12 grid border-t border-brand-amethyst-border/60 md:grid-cols-2 xl:grid-cols-5">
          {steps.map((step, index) => (
            <li key={step.title} className="border-b border-brand-amethyst-border/60 py-6 pr-6">
              <p className="text-sm font-semibold text-brand-cyan">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-lg font-semibold text-brand-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}