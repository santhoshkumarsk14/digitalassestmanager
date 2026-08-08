import { type FormEvent, type ReactNode, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, Menu, Minus, Plus, Upload, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const image = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

const services = [
  ['01', 'Landscape architecture', "Site-led plans that make a property's long view feel inevitable."],
  ['02', 'Garden design', 'Planting compositions with a seasonal rhythm and a strong sense of place.'],
  ['03', 'Hard landscape', 'Stone, timber, brick and water detailed for a lifetime of weathering.'],
  ['04', 'Planting design', 'Ecologies that are beautiful in month one — and more so in year ten.'],
  ['05', 'Earthworks & drainage', 'Invisible infrastructure that keeps a landscape healthy, safe and usable.'],
  ['06', 'Irrigation systems', 'Quiet, efficient watering designed around the actual needs of the site.'],
  ['07', 'Estate management', 'A considered maintenance programme for landscapes that keep maturing.'],
  ['08', 'Build & delivery', 'One accountable team from first set-out to the final planted edge.'],
  ['09', 'Aftercare', 'Hands-on stewardship through the crucial first seasons of growth.'],
] as const;

const projects = [
  { title: 'The Long Garden', type: 'Private estate · Surrey', image: image('verdant-estate.jpg'), tags: ['Private estates', 'Planting'] },
  { title: 'A House Among Pines', type: 'Residential · West Sussex', image: image('verdant-courtyard.jpg'), tags: ['Residential', 'Landscape architecture'] },
  { title: 'Northbank Campus', type: 'Commercial · London', image: image('verdant-campus.jpg'), tags: ['Commercial', 'Build & delivery'] },
];

const process = [
  ['01', 'Walk the site', 'We start with a visit, a conversation and a proper look at the land.'],
  ['02', 'Set the direction', 'A considered concept, cost plan and programme make the next move tangible.'],
  ['03', 'Make it real', 'Our build team coordinates every trade, detail and planting window.'],
  ['04', 'Stay close', 'Aftercare gives the landscape time, knowledge and attention to settle in.'],
];

type QuoteData = { service: string; property: string; timeline: string; budget: string; details: string; photos: File[] };
const initialQuote: QuoteData = { service: '', property: '', timeline: '', budget: '', details: '', photos: [] };

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="mono mb-5 text-[#C47B47]">{children}</p>;
}

function QuoteForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuoteData>(initialQuote);
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState('');
  const fields = [
    { label: 'What can we help with?', key: 'service' as const, options: ['Landscape architecture', 'Garden design', 'Build & delivery', 'Estate management', 'Not sure yet'] },
    { label: 'Tell us about the property', key: 'property' as const, options: ['Private home', 'Private estate', 'Commercial campus', 'Development / planning', 'Other'] },
    { label: 'When are you hoping to begin?', key: 'timeline' as const, options: ['As soon as possible', 'Within 6 months', '6–12 months', 'I am still exploring'] },
    { label: 'What is the investment range?', key: 'budget' as const, options: ['£50k–£100k', '£100k–£250k', '£250k–£500k', '£500k+', 'I need guidance'] },
  ];
  const update = (key: keyof QuoteData, value: string) => setData((current) => ({ ...current, [key]: value }));
  const next = () => {
    if (step < 4) setStep(step + 1);
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  };
  if (sent) {
    return <div className="border border-[#C8BFA8]/40 p-7 md:p-9" data-testid="status-quote-success">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-[#C47B47] text-[#18352B]"><Check size={18} /></span>
      <h3 className="display mt-7 text-3xl">A good place to begin.</h3>
      <p className="mt-4 max-w-sm text-[#C8BFA8]">Thank you. Your brief is safely with us. We will come back to you within two working days.</p>
      <button type="button" onClick={() => { setSent(false); setStep(0); setData(initialQuote); }} className="mt-7 border-b border-[#C8BFA8] pb-1 text-sm" data-testid="button-new-quote">Send another brief</button>
    </div>;
  }
  return <form onSubmit={submit} className="border border-[#C8BFA8]/40 p-5 md:p-8" data-testid="form-quote">
    <div className="mb-8 flex items-center justify-between border-b border-[#C8BFA8]/25 pb-5">
      <span className="mono text-[#C8BFA8]">Brief / 0{step + 1} of 05</span>
      <div className="flex gap-1.5">{Array.from({ length: 5 }, (_, index) => <span key={index} className={`h-1 w-7 ${index <= step ? 'bg-[#C47B47]' : 'bg-[#C8BFA8]/30'}`} />)}</div>
    </div>
    {step < 4 && <fieldset>
      <legend className="display text-3xl leading-tight">{fields[step].label}</legend>
      <div className="mt-7 grid gap-2">
        {fields[step].options.map((option) => <button key={option} type="button" onClick={() => update(fields[step].key, option)} className={`flex w-full items-center justify-between border px-4 py-3.5 text-left text-sm transition ${data[fields[step].key] === option ? 'border-[#C47B47] bg-[#C47B47] text-[#18352B]' : 'border-[#C8BFA8]/35 hover:border-[#C8BFA8]'}`} data-testid={`button-quote-${fields[step].key}-${option.toLowerCase().replaceAll(' ', '-')}`}>
          {option}<Check size={15} className={data[fields[step].key] === option ? 'opacity-100' : 'opacity-0'} />
        </button>)}
      </div>
    </fieldset>}
    {step === 4 && <fieldset>
      <legend className="display text-3xl leading-tight">A few more details, if you have them.</legend>
      <label className="mono mt-7 block text-[#C8BFA8]">Your note<textarea value={data.details} onChange={(event) => setData((current) => ({ ...current, details: event.target.value }))} required rows={5} placeholder="The site, the ambition, the question..." className="mt-3 block w-full resize-none border-b border-[#C8BFA8]/45 bg-transparent py-2 font-sans text-base normal-case tracking-normal text-[#E7E3D4] outline-none placeholder:text-[#C8BFA8]/55" data-testid="input-quote-details" /></label>
      <label className="mt-7 flex cursor-pointer items-center gap-3 border border-dashed border-[#C8BFA8]/45 p-4 text-sm text-[#C8BFA8] hover:border-[#C47B47]">
        <Upload size={16} /><span>{fileName || 'Add site photographs (optional)'}</span>
        <input type="file" accept="image/*" multiple className="sr-only" onChange={(event) => { const files = Array.from(event.target.files ?? []); setData((current) => ({ ...current, photos: files })); setFileName(files.length ? `${files.length} photograph${files.length > 1 ? 's' : ''} selected` : ''); }} data-testid="input-quote-photos" />
      </label>
    </fieldset>}
    <div className="mt-8 flex justify-between gap-3">
      {step > 0 ? <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 border-b border-[#C8BFA8]/60 pb-1 text-sm" data-testid="button-quote-back"><ChevronLeft size={15} /> Back</button> : <span />}
      {step < 4 ? <button type="button" disabled={!data[fields[step].key]} onClick={next} className="inline-flex items-center gap-3 bg-[#C47B47] px-5 py-3 text-sm font-semibold text-[#18352B] disabled:cursor-not-allowed disabled:opacity-40" data-testid="button-quote-next">Continue <ChevronRight size={15} /></button> : <button type="submit" className="inline-flex items-center gap-3 bg-[#C47B47] px-5 py-3 text-sm font-semibold text-[#18352B]" data-testid="button-quote-submit">Send your brief <ArrowUpRight size={15} /></button>}
    </div>
  </form>;
}

function Home() {
  const [openService, setOpenService] = useState<number | null>(null);
  const [filter, setFilter] = useState('All work');
  const [menuOpen, setMenuOpen] = useState(false);
  const filteredProjects = useMemo(() => filter === 'All work' ? projects : projects.filter((project) => project.tags.includes(filter)), [filter]);
  const closeMenu = () => setMenuOpen(false);
  return <main className="verdant min-h-screen overflow-hidden bg-[#E7E3D4] text-[#18352B]">
    <header className="relative z-20 flex items-center justify-between px-5 py-5 md:px-10" data-testid="header-site">
      <a href="#top" className="flex items-center gap-3" aria-label="Verdant home" data-testid="link-home"><span className="grid h-9 w-9 place-items-center border border-[#18352B] text-lg display">V</span><span className="display text-xl">Verdant<span className="text-[#C47B47]">.</span></span></a>
      <nav className="hidden items-center gap-8 md:flex mono" aria-label="Primary navigation"><a href="#work" data-testid="link-nav-work">Selected work</a><a href="#studio" data-testid="link-nav-studio">The studio</a><a href="#services" data-testid="link-nav-services">Services</a></nav>
      <a href="#contact" className="hidden border-b border-[#18352B] pb-1 text-sm font-medium md:block" data-testid="link-site-visit">Request a site visit <ArrowUpRight className="ml-2 inline h-4 w-4" /></a>
      <button className="md:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">{menuOpen ? <X /> : <Menu />}</button>
      {menuOpen && <div className="absolute right-5 top-16 w-56 border border-[#18352B] bg-[#E7E3D4] p-5 shadow-xl md:hidden" data-testid="menu-mobile"><a onClick={closeMenu} href="#work" className="block py-2 mono" data-testid="link-mobile-work">Selected work</a><a onClick={closeMenu} href="#studio" className="block py-2 mono" data-testid="link-mobile-studio">The studio</a><a onClick={closeMenu} href="#services" className="block py-2 mono" data-testid="link-mobile-services">Services</a><a onClick={closeMenu} href="#contact" className="block py-2 mono" data-testid="link-mobile-contact">Contact</a></div>}
    </header>

    <section id="top" className="relative min-h-[710px] bg-[#18352B] text-[#E7E3D4]" aria-labelledby="hero-title">
      <div className="plan-grid contours absolute inset-0 opacity-90" />
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 px-5 pb-14 pt-20 md:grid-cols-12 md:px-10 md:pt-24">
        <div className="reveal z-10 md:col-span-7"><p className="mono mb-8 text-[#C8BFA8]">Landscape architecture / construction studio</p><h1 id="hero-title" className="display max-w-4xl text-[clamp(4rem,9vw,9.5rem)] leading-[.88]">Places to<br /><em className="text-[#C47B47]">belong</em> to.</h1><p className="mt-10 max-w-md text-base leading-7 text-[#C8BFA8]">We design and build enduring landscapes for people who care how a place feels, functions and grows over time.</p><div className="mt-10 flex flex-wrap gap-5"><a href="#contact" className="bg-[#C47B47] px-6 py-4 text-sm font-semibold text-[#18352B] transition hover:-translate-y-1" data-testid="link-hero-quote">Request a site visit <ArrowUpRight className="ml-5 inline h-4 w-4" /></a><a href="#work" className="border border-[#C8BFA8]/50 px-6 py-4 text-sm transition hover:border-[#E7E3D4]" data-testid="link-hero-work">View our work <ArrowDownRight className="ml-5 inline h-4 w-4" /></a></div></div>
        <div className="relative mt-16 min-h-[360px] md:col-span-5 md:mt-0"><div className="absolute -right-10 top-0 h-[390px] w-[calc(100%+20px)] overflow-hidden border border-[#C8BFA8]/30 md:h-[470px]"><img src={image('verdant-hero.jpg')} alt="Limestone terrace opening into a meadow garden" className="h-full w-full object-cover opacity-80 mix-blend-luminosity" loading="eager" data-testid="img-hero" /><div className="absolute inset-0 bg-[#18352B]/25" /></div><div className="absolute bottom-6 left-4 z-10 bg-[#E7E3D4] px-4 py-3 text-[#18352B]"><span className="mono">Site 014 / W. Sussex</span><p className="display mt-1 text-xl">A garden, resolved.</p></div><span className="absolute -right-2 top-[-24px] mono text-[#C8BFA8]">01° 02′ 48″ N</span></div>
      </div><div className="absolute bottom-5 left-5 flex items-center gap-3 text-[#C8BFA8] md:left-10"><span className="h-px w-10 bg-[#C47B47]" /><span className="mono">Scroll to explore</span></div>
    </section>

    <section id="studio" className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36"><SectionLabel>01 / Our approach</SectionLabel><div className="md:col-span-7"><h2 className="display text-5xl leading-[.98] md:text-7xl">The drawing is only<br /><span className="text-[#795E48]">the beginning.</span></h2><p className="mt-10 max-w-xl text-lg leading-8 text-[#3D4A48]">A successful landscape is felt before it is noticed. Our designers, horticulturalists and makers work as one team — reading the land, selecting materials and building with the patience of a garden.</p></div><div className="border-l border-[#795E48]/40 pl-6 md:col-span-3 md:mt-28"><p className="mono mb-4">Material note / 014</p><p className="display text-2xl">“Nothing should look newly installed.”</p><p className="mt-5 text-sm leading-6 text-[#3D4A48]">We specify things that gain character rather than lose it: hand-cut stone, honest timber, and plants with a future.</p></div></section>

    <section id="services" className="bg-[#C8BFA8] px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-[1440px]"><div className="mb-14 flex items-end justify-between"><div><SectionLabel>02 / What we do</SectionLabel><h2 className="display text-5xl md:text-7xl">From first line<br />to living landscape.</h2></div><span className="mono hidden md:block">All disciplines in-house</span></div><div className="grid border-t border-[#18352B]/30 md:grid-cols-3">{services.map(([number, title, description], index) => <button key={title} onClick={() => setOpenService(openService === index ? null : index)} className="group border-b border-[#18352B]/30 p-5 text-left transition hover:bg-[#E7E3D4]/40 md:p-7" aria-expanded={openService === index} data-testid={`button-service-${index + 1}`}><div className="flex items-start justify-between"><span className="mono text-[#C47B47]">{number}</span>{openService === index ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4 transition group-hover:rotate-90" />}</div><h3 className="display mt-10 text-2xl">{title}</h3>{openService === index && <p className="mt-4 max-w-xs text-sm leading-6 text-[#3D4A48]">{description}</p>}</button>)}</div></div></section>

    <section id="work" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><SectionLabel>03 / Selected work</SectionLabel><h2 className="display text-5xl md:text-7xl">Grounded in<br /><span className="text-[#795E48]">somewhere specific.</span></h2></div><div className="flex flex-wrap gap-2" role="group" aria-label="Filter selected work">{['All work', 'Private estates', 'Residential', 'Commercial'].map((category) => <button key={category} onClick={() => setFilter(category)} className={`border px-3 py-2 text-xs ${filter === category ? 'border-[#18352B] bg-[#18352B] text-[#E7E3D4]' : 'border-[#18352B]/30'}`} data-testid={`button-filter-${category.toLowerCase().replaceAll(' ', '-')}`}>{category}</button>)}</div></div><div className="mt-14 grid gap-10 md:grid-cols-12">{filteredProjects.map((project, index) => <article key={project.title} className={`group ${index === 1 ? 'md:col-span-5 md:mt-24' : 'md:col-span-7'}`} data-testid={`card-project-${index}`}><div className="relative aspect-[1.25] overflow-hidden bg-[#795E48]"><img src={project.image} alt={`${project.title}, ${project.type}`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" data-testid={`img-project-${index}`} /><span className="absolute left-4 top-4 bg-[#E7E3D4] px-3 py-2 mono">0{index + 1} / 03</span></div><div className="mt-5 flex justify-between border-b border-[#18352B]/30 pb-5"><div><h3 className="display text-3xl">{project.title}</h3><p className="mt-2 text-sm text-[#3D4A48]">{project.type}</p></div><ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-1 group-hover:-translate-y-1" /></div></article>)}</div>{filteredProjects.length === 0 && <p className="border-t border-[#18352B]/25 py-10 text-sm text-[#3D4A48]">No projects in this category yet. Try another view.</p>}</section>

    <section className="bg-[#3D4A48] px-5 py-24 text-[#E7E3D4] md:px-10 md:py-32"><div className="mx-auto grid max-w-[1440px] gap-14 md:grid-cols-12"><div className="md:col-span-5"><SectionLabel>04 / Trust, in context</SectionLabel><h2 className="display text-5xl leading-none md:text-7xl">Good work<br />leaves a trace.</h2></div><div className="md:col-span-7"><p className="max-w-2xl text-xl leading-8 text-[#C8BFA8]">We are members of the Society of Garden Designers and registered with BALI. Those badges matter because they hold us to a standard — not because they make the work for us.</p><div className="mt-14 grid grid-cols-2 gap-8 border-t border-[#E7E3D4]/25 pt-8 md:grid-cols-4">{[['18', 'years shaping places'], ['42', 'sites delivered'], ['7', 'design awards'], ['100%', 'in-house delivery']].map(([value, label]) => <div key={label} data-testid={`stat-${label.replaceAll(' ', '-')}`}><p className="display text-4xl">{value}</p><p className="mono mt-2 text-[#C8BFA8]">{label}</p></div>)}</div><div className="mt-14 flex flex-wrap gap-10 text-sm"><span className="flex items-center gap-3"><Check className="text-[#C47B47]" /> BALI Registered Contractor</span><span className="flex items-center gap-3"><Check className="text-[#C47B47]" /> SGD Accredited Practice</span></div></div></div></section>

    <section className="grid bg-[#E7E3D4] md:grid-cols-2" aria-label="Client feedback"><div className="min-h-[440px] bg-[#795E48]"><img src={image('verdant-courtyard.jpg')} alt="Water basin and planting in a quiet courtyard" loading="lazy" className="h-full w-full object-cover opacity-90" data-testid="img-testimonial" /></div><div className="flex flex-col justify-center px-5 py-20 md:px-16"><SectionLabel>05 / A client's view</SectionLabel><blockquote className="display max-w-xl text-4xl leading-[1.08] md:text-5xl">“Verdant understood the character of the house before we had found the words for it.”</blockquote><p className="mt-8 text-sm text-[#3D4A48]">— Eleanor Hart, private client · Haslemere</p><div className="mt-12 flex gap-2"><span className="h-1 w-8 bg-[#C47B47]" /><span className="h-1 w-2 bg-[#C8BFA8]" /><span className="h-1 w-2 bg-[#C8BFA8]" /></div></div></section>

    <section className="border-t border-[#18352B]/20 px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-[1440px]"><SectionLabel>06 / The process</SectionLabel><h2 className="display max-w-2xl text-5xl md:text-7xl">A clear route<br />through the wild.</h2><div className="mt-16 grid gap-8 md:grid-cols-4">{process.map(([number, title, description]) => <div key={number} className="border-t border-[#18352B] pt-5"><span className="mono text-[#C47B47]">{number}</span><h3 className="display mt-8 text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-[#3D4A48]">{description}</p></div>)}</div></div></section>

    <section id="contact" className="bg-[#18352B] px-5 py-24 text-[#E7E3D4] md:px-10 md:py-32"><div className="mx-auto grid max-w-[1440px] gap-16 md:grid-cols-12"><div className="md:col-span-6"><SectionLabel>07 / Start a conversation</SectionLabel><h2 className="display text-6xl leading-[.9] md:text-8xl">Let's find<br /><em className="text-[#C47B47]">your</em> ground.</h2><p className="mt-8 max-w-md text-[#C8BFA8]">Tell us a little about the site, the ambition and where you are in the process. We will come back to you within two working days.</p><div className="mt-10 flex flex-wrap gap-5 text-sm text-[#C8BFA8]"><a href="tel:+441483907214" className="border-b border-[#C8BFA8]/50 pb-1" data-testid="link-phone">+44 (0) 1483 907 214</a><a href="mailto:hello@verdant.studio" className="border-b border-[#C8BFA8]/50 pb-1" data-testid="link-email">hello@verdant.studio</a></div></div><div className="md:col-span-5 md:col-start-8"><QuoteForm /></div></div></section>

    <footer className="bg-[#18352B] px-5 pb-8 text-[#E7E3D4] md:px-10"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-10 border-t border-[#C8BFA8]/30 pt-8 md:flex-row"><div><p className="display text-3xl">Verdant<span className="text-[#C47B47]">.</span></p><p className="mt-3 max-w-xs text-sm text-[#C8BFA8]">Landscape architecture and construction for places with a future.</p></div><div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm"><a href="#work" data-testid="link-footer-work">Selected work</a><a href="#services" data-testid="link-footer-services">Services</a><a href="#studio" data-testid="link-footer-studio">The studio</a><a href="#contact" data-testid="link-footer-contact">Contact</a></div><div className="text-sm text-[#C8BFA8]"><p>+44 (0) 1483 907 214</p><p className="mt-2">hello@verdant.studio</p><p className="mt-5 mono">Surrey · London · South East</p></div></div><p className="mx-auto mt-14 max-w-[1440px] mono text-[#C8BFA8]/60">© 2024 Verdant Studio / Built with patience</p></footer>
  </main>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;