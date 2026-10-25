import Brand from "../Brand/Brand";
import { Mail, Phone } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
];

function Footer() {
  return (
    <footer className="border-t border-brand-amethyst-border/70 bg-surface-base py-10 text-brand-muted">
      <div className="site-container">
        <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-start sm:gap-8">
          <div className="w-[190px]">
            <a href="#home" aria-label="DevFarmer home" className="block w-full">
              <Brand width={125} />
            </a>
            <p className="mt-2 w-full pl-6 text-left text-sm leading-relaxed">
              Web and software development for brands.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="self-center pl-6 sm:justify-self-center sm:pl-0">
            <h2 className="mb-3 text-sm font-semibold text-brand-white sm:text-center">Useful links</h2>
            <ul className="flex flex-col items-start gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a className="hover:text-brand-cyan" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <address className="w-full pl-6 not-italic sm:w-auto sm:justify-self-end sm:pl-0">
            <h2 className="text-sm font-semibold text-brand-white">Contact info</h2>
            <div className="mt-3 flex flex-col items-start gap-3">
              <a
                className="inline-flex items-start gap-2 text-sm text-brand-cyan hover:text-white"
                href="mailto:Devfarmer1@gmail.com">
                <Mail size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block text-xs font-semibold text-brand-muted-deep">Email</span>
                  <span className="underline underline-offset-4">Devfarmer1@gmail.com</span>
                </span>
              </a>
              <a
                className="inline-flex items-start gap-2 text-sm text-brand-cyan hover:text-white"
                href="tel:+919008899542">
                <Phone size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block text-xs font-semibold text-brand-muted-deep">Phone</span>
                  <span className="underline underline-offset-4">+91 90088 99542</span>
                </span>
              </a>
            </div>
          </address>
        </div>

        <div className="mt-6 border-t border-brand-amethyst-border/70 pt-4">
          <p className="text-center text-xs text-brand-muted-deep">
            © {new Date().getFullYear()} DevFarmer
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;