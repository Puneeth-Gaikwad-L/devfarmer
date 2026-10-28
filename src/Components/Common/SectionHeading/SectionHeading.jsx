// The one heading style for page sections: small cyan label, big headline, gradient accent words.
function SectionHeading({ eyebrow, title, accent, className = "" }) {
  return (
    <div className={`max-w-4xl ${className}`}>
      <p className="text-sm font-semibold tracking-[0.18em] text-brand-cyan uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-4xl leading-[1.1] font-semibold text-brand-white md:text-5xl">
        {title}{" "}
        <span className="bg-gradient-to-r from-brand-violet to-brand-cyan bg-clip-text text-transparent">
          {accent}
        </span>
      </h2>
    </div>
  );
}

export default SectionHeading;
