import { useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';

type NavLink = { label: string; href: string };

const links: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Client Feedback', href: '/feedback' },
  { label: 'Contact', href: '/contact' },
];

const menuVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

export default function SiteNav({ siteName }: { siteName: string }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="font-display text-xl font-semibold text-ink" onClick={close}>
          {siteName}
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink md:flex" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-secondary">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="/get-quote"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-surface transition hover:bg-secondary md:inline-block"
        >
          Get a Quote
        </a>

        <button
          type="button"
          className="relative z-50 grid h-10 w-10 place-items-center rounded-full border border-ink/15 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <motion.span
            className="absolute h-0.5 w-5 bg-ink"
            animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="absolute h-0.5 w-5 bg-ink"
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="absolute h-0.5 w-5 bg-ink"
            animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-surface/98 backdrop-blur md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.nav
              className="flex h-full flex-col items-start justify-center gap-6 px-10"
              aria-label="Mobile"
              variants={menuVariants}
              initial="hidden"
              animate="show"
            >
              {links.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  variants={linkVariants}
                  className="font-display text-4xl text-ink"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                variants={linkVariants}
                href="/get-quote"
                onClick={close}
                className="mt-4 rounded-full bg-primary px-6 py-3 text-base font-semibold text-surface"
              >
                Get a Quote
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
