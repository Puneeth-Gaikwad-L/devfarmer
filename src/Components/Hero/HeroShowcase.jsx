import { ArrowUpRight, Code2, MonitorSmartphone, Palette, Smartphone } from "lucide-react";
import { projects } from "../../util/util";

const byTitle = (title) => projects.find((project) => project.title === title);
const front = byTitle("KISAR");
const middle = byTitle("Cubicksmarks");
const back = byTitle("Savarkar Pratishtana");

// Same services as the contact form
const services = [
  { label: "Website Design", icon: MonitorSmartphone },
  { label: "Web Development", icon: Code2 },
  { label: "Branding", icon: Palette },
  { label: "Mobile Apps", icon: Smartphone },
];

// Tiny browser tab bar, sized in container units so it scales with the card
function MiniBar({ url }) {
  const address = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div className="flex items-center gap-[0.55cqw] border-b border-white/10 bg-surface-raised px-[1cqw] py-[0.7cqw]">
      <span className="size-[0.65cqw] rounded-full bg-white/25" />
      <span className="size-[0.65cqw] rounded-full bg-white/25" />
      <span className="size-[0.65cqw] rounded-full bg-white/25" />
      <span className="ml-[0.7cqw] truncate rounded-[0.3cqw] bg-white/5 px-[0.9cqw] py-[0.2cqw] text-[0.8cqw] text-brand-muted">
        {address}
      </span>
    </div>
  );
}

function Frame({ project, className, style }) {
  return (
    <div
      className={`absolute overflow-hidden rounded-[1cqw] border border-white/15 bg-surface-card shadow-[0_2.2cqw_4.5cqw_rgb(0_0_0/0.7)] ${className}`}
      style={style}>
      <MiniBar url={project.link} />
      <img
        src={project.src}
        alt=""
        width={2400}
        height={1290}
        className="block h-auto w-full"
        decoding="async"
      />
    </div>
  );
}

// The card that rises out of the hero. Sized entirely in container units (cqw) so it scales as
// one piece; the wrapper in Hero.jsx is the size container.
function HeroShowcase() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[radial-gradient(ellipse_at_85%_0%,rgb(59_10_107/0.75),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgb(0_229_255/0.07),transparent_45%),linear-gradient(145deg,#0c0714,#050505_72%)] p-[3cqw] text-white select-none">
      {/* hairline highlight along the top edge + faint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-violet/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:4cqw_4cqw] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]"
      />

      <div className="relative grid flex-1 grid-cols-[1fr_1fr] items-center gap-[2cqw]">
        {/* statement */}
        <div>
          <span className="inline-flex items-center gap-[0.7cqw] rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-[1.1cqw] py-[0.45cqw] text-[0.9cqw] font-semibold tracking-[0.14em] text-brand-cyan uppercase">
            <span className="size-[0.5cqw] rounded-full bg-brand-cyan" />
            Design · Development · Brand
          </span>
          <h3 className="mt-[1.6cqw] text-[3.2cqw] leading-[1.08] font-bold tracking-tight text-brand-white">
            <span className="block">Design that earns trust.</span>
            <span className="block bg-gradient-to-r from-brand-violet to-brand-cyan bg-clip-text text-transparent">
              Engineering that scales.
            </span>
          </h3>
          <p className="mt-[1.5cqw] max-w-[34cqw] text-[1.25cqw] leading-relaxed text-brand-muted">
            One focused team across strategy, design, development and launch.
          </p>
          <span className="mt-[2cqw] inline-flex items-center gap-[0.8cqw] rounded-full bg-brand-white px-[2cqw] py-[1.05cqw] text-[1.2cqw] font-semibold text-brand-black">
            View selected work
            <ArrowUpRight className="size-[1.5cqw]" aria-hidden="true" />
          </span>
        </div>

        {/* layered project collage */}
        <div className="relative h-full min-h-[24cqw]">
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 size-[26cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-violet/25 blur-[5cqw]"
          />
          <Frame
            project={back}
            className="top-[0%] left-[0%] z-0 w-[58%] opacity-70"
            style={{ transform: "rotate(-7deg)" }}
          />
          <Frame
            project={middle}
            className="top-[6%] right-[0%] z-10 w-[60%] opacity-90"
            style={{ transform: "rotate(5deg)" }}
          />
          <Frame
            project={front}
            className="bottom-[0%] left-[13%] z-20 w-[72%]"
            style={{ transform: "rotate(-1.5deg)" }}
          />
        </div>
      </div>

      {/* services */}
      <div className="relative mt-[2cqw] grid grid-cols-4 border-t border-white/10 pt-[1.7cqw]">
        {services.map(({ label, icon }, index) => {
          const ServiceIcon = icon;
          return (
            <div
              key={label}
              className={`flex items-center justify-center gap-[0.9cqw] text-[1.2cqw] font-semibold text-brand-white ${
                index > 0 ? "border-l border-white/10" : ""
              }`}>
              <ServiceIcon className="size-[2cqw] text-brand-cyan" aria-hidden="true" />
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HeroShowcase;
