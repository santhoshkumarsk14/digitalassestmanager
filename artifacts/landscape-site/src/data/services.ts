export type Service = {
  slug: string;
  title: string;
  summary: string;
  detail: string;
};

export const services: Service[] = [
  {
    slug: 'landscape-master-plan',
    title: 'Landscape Master Plan',
    summary: 'Site-wide planning that sequences phased development without boxing in future changes.',
    detail:
      'We survey the site, map constraints (drainage, load, access, sunlight) and produce a phased master plan tenders and contractors can build against for years, not just one season.',
  },
  {
    slug: 'design-installation',
    title: 'Design & Installation',
    summary: 'Concept through planting day, run by the same team so nothing gets lost in handover.',
    detail:
      'One team carries a project from concept sketch to final planted edge, so the design intent that won approval is the design intent that gets built.',
  },
  {
    slug: 'maintenance',
    title: 'Maintenance',
    summary: 'Scheduled upkeep that keeps a landscape maturing instead of just staying alive.',
    detail:
      'Standing contracts covering pruning, feeding, pest management and irrigation checks, scoped to the actual growth cycle of what we planted — not a generic monthly visit.',
  },
  {
    slug: 'artificial-grass-lighting',
    title: 'Artificial Grass & Lighting',
    summary: 'Low-maintenance turf and landscape lighting for spaces that need to look sharp year-round.',
    detail:
      'Artificial turf systems built on proper drainage bases, paired with low-voltage landscape lighting that shapes the space after dark instead of just illuminating it.',
  },
  {
    slug: 'tree-pruning-removal',
    title: 'Tree Pruning & Removal',
    summary: 'ISA-certified arborists protecting tree health and property safety.',
    detail:
      'Certified arborists assess structural risk before any cut is made, so pruning improves the tree\'s long-term health rather than just its shape this season.',
  },
  {
    slug: 'aquatic-gardens',
    title: 'Aquatic Gardens',
    summary: 'Ponds, waterfalls and water features engineered to stay clear with minimal upkeep.',
    detail:
      'Filtration and circulation sized correctly from day one, so ponds and water features stay clear without a standing chemical-dosing routine.',
  },
  {
    slug: 'auto-irrigation',
    title: 'Auto Irrigation',
    summary: 'Zoned irrigation systems that reduce water waste and manual watering.',
    detail:
      'Zoned, sensor-aware irrigation reduces water waste and manual watering, and gets tuned seasonally so beds get exactly what they need.',
  },
  {
    slug: 'vertical-greenwall',
    title: 'Vertical Greenwall',
    summary: 'Structural living walls on automated drip irrigation, built for long-term coverage.',
    detail:
      'Greenwalls engineered for structural load and drainage, with automated irrigation loops and a planting palette chosen for even, long-term coverage.',
  },
  {
    slug: 'construction',
    title: 'Construction',
    summary: 'Hardscape and structural build work — decking, retaining walls, paving, drainage.',
    detail:
      'In-house hardscape and structural crews handle decking, retaining walls, paving and drainage, coordinated directly with structural engineers where load or waterproofing is involved.',
  },
];
