import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Check, ChevronRight, Menu, Minus, Plus, X } from "lucide-react";

const img = (name: string) => `/__mockup/images/${name}`;

const services = [
  ["01", "Landscape architecture", "Site-led plans that make a property's long view feel inevitable."],
  ["02", "Garden design", "Planting compositions with a seasonal rhythm and a strong sense of place."],
  ["03", "Hard landscape", "Stone, timber, brick and water detailed for a lifetime of weathering."],
  ["04", "Planting design", "Ecologies that are beautiful in month one — and more so in year ten."],
  ["05", "Earthworks & drainage", "Invisible infrastructure that keeps a landscape healthy, safe and usable."],
  ["06", "Irrigation systems", "Quiet, efficient watering designed around the actual needs of the site."],
  ["07", "Estate management", "A considered maintenance programme for landscapes that keep maturing."],
  ["08", "Build & delivery", "One accountable team from first set-out to the final planted edge."],
  ["09", "Aftercare", "Hands-on stewardship through the crucial first seasons of growth."],
];

const projects = [
  { title: "The Long Garden", type: "Private estate · Surrey", image: img("verdant-estate.jpg"), tags: ["Private estates", "Planting"] },
  { title: "A House Among Pines", type: "Residential · West Sussex", image: img("verdant-courtyard.jpg"), tags: ["Residential", "Landscape architecture"] },
  { title: "Northbank Campus", type: "Commercial · London", image: img("verdant-campus.jpg"), tags: ["Commercial", "Build & delivery"] },
];

export function Homepage() {
  const [openService, setOpenService] = useState<number | null>(null);
  const [filter, setFilter] = useState("All work");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const filtered = useMemo(() => filter === "All work" ? projects : projects.filter(p => p.tags.includes(filter)), [filter]);

  return (
    <main className="verdant min-h-screen overflow-hidden bg-[#E7E3D4] text-[#18352B]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .verdant { --moss:#18352B; --slate:#3D4A48; --wash:#E7E3D4; --sand:#C8BFA8; --timber:#795E48; --amber:#C47B47; font-family:'DM Sans',sans-serif; }
        .verdant .display { font-family:'Fraunces',serif; font-weight:500; letter-spacing:-.045em; }
        .verdant .mono { font-family:'IBM Plex Mono',monospace; letter-spacing:.08em; text-transform:uppercase; font-size:10px; }
        .plan-grid { background-image:linear-gradient(rgba(231,227,212,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(231,227,212,.12) 1px,transparent 1px); background-size:32px 32px; }
        .contours { background-image: repeating-radial-gradient(ellipse at 30% 40%, transparent 0 34px, rgba(24,53,43,.13) 35px 36px, transparent 37px 66px); }
        .reveal { animation: rise .8s cubic-bezier(.2,.7,.2,1) both; }
        @keyframes rise { from { opacity:0; transform:translateY(18px) } to { opacity:1; transform:none } }
        @media (prefers-reduced-motion:reduce) { .reveal { animation:none } * { scroll-behavior:auto!important } }
      `}</style>

      <header className="relative z-20 flex items-center justify-between px-5 py-5 md:px-10">
        <a href="#" className="flex items-center gap-3" aria-label="Verdant home">
          <span className="grid h-9 w-9 place-items-center border border-[#18352B] text-lg display">V</span>
          <span className="display text-xl">Verdant<span className="text-[#C47B47]">.</span></span>
        </a>
        <nav className="hidden items-center gap-8 md:flex mono">
          <a href="#work" className="hover:text-[#C47B47]">Selected work</a><a href="#studio" className="hover:text-[#C47B47]">The studio</a><a href="#services" className="hover:text-[#C47B47]">Services</a>
        </nav>
        <a href="#contact" className="hidden border-b border-[#18352B] pb-1 text-sm font-medium md:block">Request a site visit <ArrowUpRight className="ml-2 inline h-4 w-4" /></a>
        <button className="md:hidden" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        {menuOpen && <div className="absolute right-5 top-16 w-52 border border-[#18352B] bg-[#E7E3D4] p-5 shadow-xl md:hidden"><a onClick={() => setMenuOpen(false)} href="#work" className="block py-2 mono">Selected work</a><a onClick={() => setMenuOpen(false)} href="#services" className="block py-2 mono">Services</a><a onClick={() => setMenuOpen(false)} href="#contact" className="block py-2 mono">Contact</a></div>}
      </header>

      <section className="relative min-h-[710px] bg-[#18352B] text-[#E7E3D4]">
        <div className="plan-grid contours absolute inset-0 opacity-90" />
        <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 px-5 pb-14 pt-20 md:grid-cols-12 md:px-10 md:pt-24">
          <div className="reveal z-10 md:col-span-7">
            <p className="mono mb-8 text-[#C8BFA8]">Landscape architecture / construction studio</p>
            <h1 className="display max-w-4xl text-[clamp(4rem,9vw,9.5rem)] leading-[.88]">Places to<br /><em className="text-[#C47B47]">belong</em> to.</h1>
            <p className="mt-10 max-w-md text-base leading-7 text-[#C8BFA8]">We design and build enduring landscapes for people who care how a place feels, functions and grows over time.</p>
            <div className="mt-10 flex flex-wrap gap-5"><a href="#contact" className="bg-[#C47B47] px-6 py-4 text-sm font-semibold text-[#18352B] transition hover:-translate-y-1">Request a site visit <ArrowUpRight className="ml-5 inline h-4 w-4" /></a><a href="#work" className="border border-[#C8BFA8]/50 px-6 py-4 text-sm transition hover:border-[#E7E3D4]">View our work <ArrowDownRight className="ml-5 inline h-4 w-4" /></a></div>
          </div>
          <div className="relative mt-16 min-h-[360px] md:col-span-5 md:mt-0">
            <div className="absolute -right-10 top-0 h-[390px] w-[calc(100%+20px)] overflow-hidden border border-[#C8BFA8]/30 md:h-[470px]"><img src={img("verdant-hero.jpg")} alt="Limestone terrace opening into a meadow garden" className="h-full w-full object-cover opacity-80 mix-blend-luminosity" loading="eager" /><div className="absolute inset-0 bg-[#18352B]/25" /></div>
            <div className="absolute bottom-6 left-4 z-10 bg-[#E7E3D4] px-4 py-3 text-[#18352B]"><span className="mono">Site 014 / W. Sussex</span><p className="display mt-1 text-xl">A garden, resolved.</p></div>
            <span className="absolute -right-2 top-[-24px] mono text-[#C8BFA8]">01° 02′ 48″ N</span>
          </div>
        </div>
        <div className="absolute bottom-5 left-5 flex items-center gap-3 text-[#C8BFA8] md:left-10"><span className="h-px w-10 bg-[#C47B47]" /><span className="mono">Scroll to explore</span></div>
      </section>

      <section id="studio" className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <p className="mono text-[#C47B47] md:col-span-2">01 / Our approach</p>
        <div className="md:col-span-7"><h2 className="display text-5xl leading-[.98] md:text-7xl">The drawing is only<br /><span className="text-[#795E48]">the beginning.</span></h2><p className="mt-10 max-w-xl text-lg leading-8 text-[#3D4A48]">A successful landscape is felt before it is noticed. Our designers, horticulturalists and makers work as one team — reading the land, selecting materials and building with the patience of a garden.</p></div>
        <div className="border-l border-[#795E48]/40 pl-6 md:col-span-3 md:mt-28"><p className="mono mb-4">Material note / 014</p><p className="display text-2xl">“Nothing should look newly installed.”</p><p className="mt-5 text-sm leading-6 text-[#3D4A48]">We specify things that gain character rather than lose it: hand-cut stone, honest timber, and plants with a future.</p></div>
      </section>

      <section id="services" className="bg-[#C8BFA8] px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-[1440px]"><div className="mb-14 flex items-end justify-between"><div><p className="mono mb-4 text-[#C47B47]">02 / What we do</p><h2 className="display text-5xl md:text-7xl">From first line<br />to living landscape.</h2></div><span className="mono hidden md:block">All disciplines in-house</span></div><div className="grid border-t border-[#18352B]/30 md:grid-cols-3">{services.map(([n, title, desc], i) => <button key={title} onClick={() => setOpenService(openService === i ? null : i)} className="group border-b border-[#18352B]/30 p-5 text-left transition hover:bg-[#E7E3D4]/40 md:p-7"><div className="flex items-start justify-between"><span className="mono text-[#C47B47]">{n}</span>{openService === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4 transition group-hover:rotate-90" />}</div><h3 className="display mt-10 text-2xl">{title}</h3>{openService === i && <p className="mt-4 max-w-xs text-sm leading-6 text-[#3D4A48]">{desc}</p>}</button>)}</div></div></section>

      <section id="work" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="mono mb-4 text-[#C47B47]">03 / Selected work</p><h2 className="display text-5xl md:text-7xl">Grounded in<br /><span className="text-[#795E48]">somewhere specific.</span></h2></div><div className="flex flex-wrap gap-2">{["All work", "Private estates", "Residential", "Commercial"].map(x => <button key={x} onClick={() => setFilter(x)} className={`border px-3 py-2 text-xs ${filter === x ? "border-[#18352B] bg-[#18352B] text-[#E7E3D4]" : "border-[#18352B]/30"}`}>{x}</button>)}</div></div><div className="mt-14 grid gap-10 md:grid-cols-12">{filtered.map((p, i) => <article key={p.title} className={`group md:col-span-${i === 1 ? "5" : "7"} ${i === 1 ? "md:mt-24" : ""}`}><div className="relative aspect-[1.25] overflow-hidden bg-[#795E48]"><img src={p.image} alt={`${p.title}, ${p.type}`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><span className="absolute left-4 top-4 bg-[#E7E3D4] px-3 py-2 mono">0{i + 1} / 03</span></div><div className="mt-5 flex justify-between border-b border-[#18352B]/30 pb-5"><div><h3 className="display text-3xl">{p.title}</h3><p className="mt-2 text-sm text-[#3D4A48]">{p.type}</p></div><ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-1 group-hover:-translate-y-1" /></div></article>)}</div></section>

      <section className="bg-[#3D4A48] px-5 py-24 text-[#E7E3D4] md:px-10 md:py-32"><div className="mx-auto grid max-w-[1440px] gap-14 md:grid-cols-12"><div className="md:col-span-5"><p className="mono mb-6 text-[#C47B47]">04 / Trust, in context</p><h2 className="display text-5xl leading-none md:text-7xl">Good work<br />leaves a trace.</h2></div><div className="md:col-span-7"><p className="max-w-2xl text-xl leading-8 text-[#C8BFA8]">We are members of the Society of Garden Designers and registered with BALI. Those badges matter because they hold us to a standard — not because they make the work for us.</p><div className="mt-14 grid grid-cols-2 gap-8 border-t border-[#E7E3D4]/25 pt-8 md:grid-cols-4"><div><p className="display text-4xl">18</p><p className="mono mt-2 text-[#C8BFA8]">years shaping places</p></div><div><p className="display text-4xl">42</p><p className="mono mt-2 text-[#C8BFA8]">sites delivered</p></div><div><p className="display text-4xl">7</p><p className="mono mt-2 text-[#C8BFA8]">design awards</p></div><div><p className="display text-4xl">100%</p><p className="mono mt-2 text-[#C8BFA8]">in-house delivery</p></div></div><div className="mt-14 flex flex-wrap gap-10 text-sm"><span className="flex items-center gap-3"><Check className="text-[#C47B47]" /> BALI Registered Contractor</span><span className="flex items-center gap-3"><Check className="text-[#C47B47]" /> SGD Accredited Practice</span></div></div></div></section>

      <section className="grid bg-[#E7E3D4] md:grid-cols-2"><div className="min-h-[440px] bg-[#795E48]"><img src={img("verdant-courtyard.jpg")} alt="Water basin and planting in a quiet courtyard" loading="lazy" className="h-full w-full object-cover opacity-90" /></div><div className="flex flex-col justify-center px-5 py-20 md:px-16"><p className="mono mb-8 text-[#C47B47]">05 / A client's view</p><blockquote className="display max-w-xl text-4xl leading-[1.08] md:text-5xl">“Verdant understood the character of the house before we had found the words for it.”</blockquote><p className="mt-8 text-sm text-[#3D4A48]">— Eleanor Hart, private client · Haslemere</p><div className="mt-12 flex gap-2"><span className="h-1 w-8 bg-[#C47B47]" /><span className="h-1 w-2 bg-[#C8BFA8]" /><span className="h-1 w-2 bg-[#C8BFA8]" /></div></div></section>

      <section className="border-t border-[#18352B]/20 px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-[1440px]"><p className="mono mb-5 text-[#C47B47]">06 / The process</p><h2 className="display max-w-2xl text-5xl md:text-7xl">A clear route<br />through the wild.</h2><div className="mt-16 grid gap-8 md:grid-cols-4">{[["01", "Walk the site", "We start with a visit, a conversation and a proper look at the land."], ["02", "Set the direction", "A considered concept, cost plan and programme make the next move tangible."], ["03", "Make it real", "Our build team coordinates every trade, detail and planting window."], ["04", "Stay close", "Aftercare gives the landscape time, knowledge and attention to settle in."]].map(x => <div key={x[0]} className="border-t border-[#18352B] pt-5"><span className="mono text-[#C47B47]">{x[0]}</span><h3 className="display mt-8 text-2xl">{x[1]}</h3><p className="mt-3 text-sm leading-6 text-[#3D4A48]">{x[2]}</p></div>)}</div></div></section>

      <section id="contact" className="bg-[#18352B] px-5 py-24 text-[#E7E3D4] md:px-10 md:py-32"><div className="mx-auto grid max-w-[1440px] gap-16 md:grid-cols-12"><div className="md:col-span-7"><p className="mono mb-7 text-[#C47B47]">07 / Start a conversation</p><h2 className="display text-6xl leading-[.9] md:text-8xl">Let's find<br /><em className="text-[#C47B47]">your</em> ground.</h2><p className="mt-8 max-w-md text-[#C8BFA8]">Tell us a little about the site, the ambition and where you are in the process. We will come back to you within two working days.</p></div><form className="md:col-span-5" onSubmit={e => { e.preventDefault(); setSent(true); }}><label className="mono block border-b border-[#C8BFA8]/40 py-4 text-[#C8BFA8]">Your name<input required className="mt-2 block w-full bg-transparent text-lg outline-none" /></label><label className="mono block border-b border-[#C8BFA8]/40 py-4 text-[#C8BFA8]">Email address<input required type="email" className="mt-2 block w-full bg-transparent text-lg outline-none" /></label><label className="mono block border-b border-[#C8BFA8]/40 py-4 text-[#C8BFA8]">A note about the site<textarea required rows={2} className="mt-2 block w-full resize-none bg-transparent text-lg outline-none" /></label><button className="mt-8 bg-[#C47B47] px-6 py-4 font-semibold text-[#18352B]">{sent ? "Thank you — we'll be in touch" : "Request a site visit"} <ChevronRight className="ml-4 inline h-4 w-4" /></button></form></div></section>

      <footer className="bg-[#18352B] px-5 pb-8 text-[#E7E3D4] md:px-10"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-10 border-t border-[#C8BFA8]/30 pt-8 md:flex-row"><div><p className="display text-3xl">Verdant<span className="text-[#C47B47]">.</span></p><p className="mt-3 max-w-xs text-sm text-[#C8BFA8]">Landscape architecture and construction for places with a future.</p></div><div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm"><a href="#work">Selected work</a><a href="#services">Services</a><a href="#studio">The studio</a><a href="#contact">Contact</a></div><div className="text-sm text-[#C8BFA8]"><p>+44 (0) 1483 907 214</p><p className="mt-2">hello@verdant.studio</p><p className="mt-5 mono">Surrey · London · South East</p></div></div><p className="mx-auto mt-14 max-w-[1440px] mono text-[#C8BFA8]/60">© 2024 Verdant Studio / Built with patience</p></footer>
    </main>
  );
}

export default Homepage;