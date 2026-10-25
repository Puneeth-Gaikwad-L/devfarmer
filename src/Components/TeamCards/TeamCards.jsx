function TeamCards({ name, position, img }) {
  return (
    <article className="min-w-0">
      <img
        src={img}
        alt={`${name}, ${position}`}
        className="aspect-square w-full rounded-lg bg-brand-amethyst/45 object-contain object-center"
        loading="lazy"
      />
      <h3 className="mt-4 break-words text-base font-semibold text-brand-white sm:text-lg">
        {name}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-brand-cyan">{position}</p>
    </article>
  );
}

export default TeamCards;
