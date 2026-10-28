// Fake browser tab bar (traffic-light dots + address pill) shared by the hero preview and project cards
function BrowserBar({ url }) {
  const address = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-white/10 bg-surface-raised px-4 py-2.5">
      <span className="size-2.5 rounded-full bg-white/20" />
      <span className="size-2.5 rounded-full bg-white/20" />
      <span className="size-2.5 rounded-full bg-white/20" />
      <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-1 text-xs text-brand-muted">
        {address}
      </span>
    </div>
  );
}

export default BrowserBar;
