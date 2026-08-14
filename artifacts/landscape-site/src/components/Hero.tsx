import { motion, useReducedMotion, type Variants } from 'framer-motion';

type HeroProps = {
  heroImage: string;
  siteName: string;
  tagline: string;
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero({ heroImage, siteName, tagline }: HeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-primary text-surface" aria-labelledby="hero-title">
      <motion.img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        initial={reduceMotion ? false : { scale: 1.08 }}
        animate={reduceMotion ? undefined : { scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/20" />
      <motion.div
        className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-28 md:py-40"
        variants={container}
        initial={reduceMotion ? 'show' : 'hidden'}
        animate="show"
      >
        <motion.p variants={item} className="font-medium uppercase tracking-[0.2em] text-accent">
          Landscape design, build &amp; maintenance
        </motion.p>
        <motion.h1
          id="hero-title"
          variants={item}
          className="font-display max-w-3xl text-4xl leading-[1.05] md:text-6xl"
        >
          Gardens and grounds built to be lived in, not just looked at.
        </motion.h1>
        <motion.p variants={item} className="max-w-xl text-lg text-surface/85">
          {tagline || `${siteName} plans, builds and maintains landscapes for developers, estate managers and homeowners who need it done right the first time.`}
        </motion.p>
        <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
          <a
            href="/get-quote"
            className="rounded-full bg-accent px-6 py-3 font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Get Your Free Quote
          </a>
          <a
            href="/projects"
            className="rounded-full border border-surface/40 px-6 py-3 font-semibold transition hover:border-surface hover:bg-surface/10"
          >
            View Our Work
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
