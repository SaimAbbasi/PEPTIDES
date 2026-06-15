'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { MagnifyingGlass, ArrowRight, Flask } from '@phosphor-icons/react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Category = 'research' | 'performance' | 'cosmetic' | 'cognitive' | 'metabolic'

interface Peptide {
  name: string
  category: Category
  sequence: string
  description: string
  researchAreas: string[]
  productSlug?: string // if sold in store
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const peptides: Peptide[] = [
  // ── Research ────────────────────────────────────────────────────────────
  {
    name: 'BPC-157',
    category: 'research',
    sequence: 'Synthetic peptide · 15 amino acids',
    description:
      'Body Protection Compound-157 is a partial sequence of human gastric juice protein BPC. It has been extensively studied for its cytoprotective and regenerative properties via modulation of the growth hormone receptor pathway and upregulation of VEGF-driven angiogenesis. Research indicates accelerated healing of tendon, ligament, muscle, and gastrointestinal tissue.',
    researchAreas: ['Tendon repair', 'Gut healing', 'Angiogenesis', 'Anti-inflammatory'],
    productSlug: 'bpc-157',
  },
  {
    name: 'TB-500',
    category: 'research',
    sequence: 'Thymosin Beta-4 fragment · 43 amino acids',
    description:
      'TB-500 is a synthetic version of the naturally occurring actin-sequestering peptide Thymosin Beta-4. It promotes cell migration and differentiation by binding G-actin and is studied for its potent anti-inflammatory and tissue-remodeling effects. Research applications include muscle repair, angiogenesis, and reduction of fibrous tissue formation.',
    researchAreas: ['Tissue repair', 'Anti-inflammatory', 'Actin regulation', 'Wound healing'],
    productSlug: 'tb-500',
  },
  {
    name: 'Selank',
    category: 'research',
    sequence: 'Synthetic heptapeptide · 7 amino acids',
    description:
      'Selank is an anxiolytic nootropic peptide derived from the endogenous tetrapeptide tuftsin. It modulates the GABAergic system and influences expression of BDNF, serotonin, and dopamine. Research focuses on anxiety reduction, stress resilience, and mild cognitive enhancement without sedation or dependence liability.',
    researchAreas: ['Anxiolytic', 'GABAergic modulation', 'Neuroprotection', 'Stress resilience'],
    productSlug: 'selank',
  },
  {
    name: 'Semax',
    category: 'research',
    sequence: 'ACTH(4-10) analog · 7 amino acids',
    description:
      'Semax is a synthetic analog of the ACTH(4-10) fragment with a Pro-Gly-Pro C-terminal extension that protects it from rapid enzymatic degradation. It robustly upregulates BDNF and NGF expression, making it a strong candidate for neuroprotection, stroke recovery, and cognitive enhancement research.',
    researchAreas: ['BDNF upregulation', 'Neuroprotection', 'Stroke recovery', 'Cognitive enhancement'],
    productSlug: 'semax',
  },
  {
    name: 'Epithalon',
    category: 'research',
    sequence: 'Synthetic tetrapeptide · 4 amino acids (Ala-Glu-Asp-Gly)',
    description:
      'Epithalon (Epitalon) is a tetrapeptide originally derived from the pineal gland extract Epithalamin. It is studied primarily for its ability to stimulate telomerase activity, which may lengthen telomeres and slow cellular aging. Research also explores its effects on melatonin production and circadian rhythm regulation.',
    researchAreas: ['Telomerase activation', 'Longevity', 'Antioxidant', 'Circadian regulation'],
    productSlug: 'epithalon',
  },
  {
    name: 'KPV',
    category: 'research',
    sequence: 'Alpha-MSH C-terminal tripeptide · 3 amino acids (Lys-Pro-Val)',
    description:
      'KPV is the C-terminal tripeptide fragment of alpha-melanocyte-stimulating hormone (alpha-MSH). It inhibits the NF-κB inflammatory signaling pathway independently of melanocortin receptors, making it a compelling subject for gut inflammation, skin barrier, and systemic anti-inflammatory research.',
    researchAreas: ['NF-κB inhibition', 'Anti-inflammatory', 'Gut health', 'Skin barrier'],
    productSlug: 'kpv',
  },
  {
    name: 'GHK-Cu',
    category: 'research',
    sequence: 'Copper tripeptide · 3 amino acids (Gly-His-Lys)',
    description:
      'GHK-Cu is a naturally occurring copper chelate with broad biological activity. It stimulates collagen, elastin, and glycosaminoglycan synthesis, supports angiogenesis, and activates antioxidant enzymes. Research spans wound healing, skin regeneration, hair follicle growth, and anti-inflammatory applications.',
    researchAreas: ['Collagen synthesis', 'Wound healing', 'Hair growth', 'Antioxidant'],
    productSlug: 'ghk-cu',
  },
  {
    name: 'Thymalin',
    category: 'research',
    sequence: 'Thymic polypeptide extract · multiple peptides',
    description:
      'Thymalin is a polypeptide preparation isolated from the thymus gland, used in research for its immune-modulating properties. It promotes T-cell differentiation and maturation, restores immune balance in aging or immunocompromised models, and is studied in the context of longevity and immune system rehabilitation.',
    researchAreas: ['Immune modulation', 'T-cell differentiation', 'Longevity', 'Thymus support'],
    productSlug: 'thymalin',
  },
  {
    name: 'Dihexa',
    category: 'research',
    sequence: 'HGF-derived hexapeptide · 6 amino acids',
    description:
      'Dihexa is an angiotensin IV analog derived from hepatocyte growth factor (HGF). It acts on the HGF/MET receptor system to potently promote synaptogenesis — the formation of new synaptic connections. Research suggests it may be among the most potent pro-cognitive compounds ever tested in rodent models.',
    researchAreas: ['Synaptogenesis', 'Cognitive enhancement', 'Neuroprotection', 'Memory'],
    productSlug: 'dihexa',
  },
  {
    name: 'SS-31',
    category: 'research',
    sequence: 'Mitochondria-targeted tetrapeptide · 4 amino acids (D-Arg-Dmt-Lys-Phe)',
    description:
      'SS-31 (Elamipretide) is a cell-permeable peptide that selectively concentrates in the inner mitochondrial membrane, where it interacts with cardiolipin to stabilize cristae structure and reduce mitochondrial reactive oxygen species. Research focuses on heart failure, ischemia-reperfusion injury, and age-related mitochondrial dysfunction.',
    researchAreas: ['Mitochondrial function', 'Cardioprotection', 'ROS reduction', 'Ischemia-reperfusion'],
  },
  {
    name: 'LL-37',
    category: 'research',
    sequence: 'Cathelicidin antimicrobial peptide · 37 amino acids',
    description:
      'LL-37 is the only human cathelicidin and is a key component of innate immune defense. It exhibits broad-spectrum antimicrobial activity against bacteria, fungi, and enveloped viruses while also modulating inflammatory signaling. Research explores its roles in wound healing, autoimmunity, and cancer biology.',
    researchAreas: ['Antimicrobial', 'Innate immunity', 'Wound healing', 'Immunomodulation'],
  },
  {
    name: 'Thymosin Alpha-1',
    category: 'research',
    sequence: 'Thymic peptide · 28 amino acids',
    description:
      'Thymosin Alpha-1 (Tα1) is a naturally occurring thymic peptide that modulates both innate and adaptive immune responses. It enhances dendritic cell function, promotes T-helper cell activity, and increases NK cell cytotoxicity. Research spans viral infection, cancer immunotherapy, and chronic inflammatory disease.',
    researchAreas: ['T-cell maturation', 'Immune modulation', 'Antiviral', 'NK cell activity'],
  },
  {
    name: 'Cerebrolysin',
    category: 'research',
    sequence: 'Neurotrophic peptide mixture · low molecular weight fragments',
    description:
      'Cerebrolysin is a neuropeptide preparation derived from purified porcine brain protein. It contains small peptide fragments that mimic the effects of endogenous neurotrophic factors (BDNF, NGF, CNTF, GDNF). Research applications include Alzheimer\'s disease, stroke recovery, traumatic brain injury, and vascular dementia.',
    researchAreas: ['Neuroprotection', 'Neuroplasticity', 'Alzheimer\'s research', 'Stroke recovery'],
  },
  {
    name: 'NAD+ / NMN',
    category: 'research',
    sequence: 'Nucleotide precursor · non-peptide analog',
    description:
      'Nicotinamide adenine dinucleotide (NAD+) and its precursor NMN are central to cellular energy metabolism and sirtuin-mediated DNA repair. Research into NAD+ supplementation explores its role in counteracting age-related metabolic decline, mitochondrial efficiency, and PARP-mediated genomic stability.',
    researchAreas: ['Cellular energy', 'Sirtuin activation', 'DNA repair', 'Longevity'],
  },
  {
    name: 'PT-141 / Bremelanotide',
    category: 'research',
    sequence: 'Melanocortin receptor agonist · 7 amino acids',
    description:
      'PT-141 (Bremelanotide) is a synthetic analog of the hormone melanocyte-stimulating hormone (MSH) that acts as an agonist at melanocortin receptors, particularly MC3R and MC4R. Unlike PDE5 inhibitors, it works centrally via hypothalamic pathways. Research encompasses sexual dysfunction and melanocortin system pharmacology.',
    researchAreas: ['MC4R agonism', 'Melanocortin system', 'Central nervous system', 'Hormonal signaling'],
  },

  // ── Performance ─────────────────────────────────────────────────────────
  {
    name: 'Ipamorelin',
    category: 'performance',
    sequence: 'Selective GHRP pentapeptide · 5 amino acids',
    description:
      'Ipamorelin is a highly selective growth hormone releasing peptide (GHRP) that mimics ghrelin at the GHSR-1a receptor to stimulate pulsatile GH release from the pituitary. Its selectivity means it has minimal effect on cortisol or prolactin, making it one of the cleanest GH secretagogues studied to date.',
    researchAreas: ['GH secretion', 'Body composition', 'Recovery', 'Metabolic research'],
    productSlug: 'ipamorelin',
  },
  {
    name: 'CJC-1295',
    category: 'performance',
    sequence: 'GHRH analog with DAC · 30 amino acids',
    description:
      'CJC-1295 is a synthetic analog of growth hormone-releasing hormone (GHRH) with a drug affinity complex (DAC) that allows covalent binding to serum albumin, dramatically extending its half-life to several days. Research focuses on sustained elevation of GH and IGF-1 levels for body composition and metabolic studies.',
    researchAreas: ['Sustained GH elevation', 'IGF-1 modulation', 'Body composition', 'Recovery'],
    productSlug: 'cjc-1295',
  },
  {
    name: 'GHRP-2',
    category: 'performance',
    sequence: 'GH secretagogue hexapeptide · 6 amino acids',
    description:
      'GHRP-2 is a synthetic hexapeptide that acts as a potent agonist of the GHSR-1a (ghrelin) receptor, stimulating growth hormone release from the pituitary. It produces a strong, dose-dependent GH pulse with moderate effects on prolactin and cortisol. Research uses it as a tool compound for studying the GH axis.',
    researchAreas: ['GHSR-1a agonism', 'GH pulse', 'Pituitary research', 'Metabolic effects'],
    productSlug: 'ghrp-2',
  },
  {
    name: 'GHRP-6',
    category: 'performance',
    sequence: 'GH secretagogue hexapeptide · 6 amino acids',
    description:
      'GHRP-6 is a synthetic hexapeptide GH secretagogue structurally related to GHRP-2. It strongly stimulates ghrelin receptors and is notable for its pronounced appetite-stimulating side effect mediated by hypothalamic neuropeptide Y upregulation. Research examines its anabolic, lipolytic, and gastrointestinal effects.',
    researchAreas: ['GH secretion', 'Appetite stimulation', 'Anabolic effects', 'Ghrelin receptor'],
  },
  {
    name: 'HGH Fragment 176-191',
    category: 'performance',
    sequence: 'HGH C-terminal fragment · 16 amino acids',
    description:
      'HGH Fragment 176-191 is the C-terminal lipolytic region of human growth hormone. It retains the fat-metabolizing properties of full-length HGH without stimulating IGF-1 production or promoting insulin resistance. Research focuses on its selective role in lipolysis, adipogenesis inhibition, and anti-obesity mechanisms.',
    researchAreas: ['Lipolysis', 'Fat metabolism', 'Anti-obesity', 'Body composition'],
    productSlug: 'hgh-fragment-176-191',
  },
  {
    name: 'Tesamorelin',
    category: 'performance',
    sequence: 'Stabilized GHRH analog · 44 amino acids',
    description:
      'Tesamorelin is a synthetic stabilized analog of endogenous GHRH with a trans-3-hexenoic acid modification that increases metabolic stability. It stimulates pituitary GH secretion in a physiologically pulsatile manner. Research has focused on visceral adiposity reduction, metabolic syndrome, and lipodystrophy-associated conditions.',
    researchAreas: ['Visceral fat reduction', 'GHRH analog', 'Metabolic syndrome', 'Lipodystrophy'],
    productSlug: 'tesamorelin',
  },
  {
    name: 'Hexarelin',
    category: 'performance',
    sequence: 'Potent GHRP hexapeptide · 6 amino acids',
    description:
      'Hexarelin is a potent synthetic hexapeptide GH secretagogue that is one of the most efficacious GHSR-1a agonists known. Beyond GH release, it also binds CD36 scavenger receptors on cardiac cells and has been studied for direct cardioprotective and anti-ischemic properties independent of its GH-releasing activity.',
    researchAreas: ['GH secretion', 'Cardioprotection', 'CD36 binding', 'Ischemia research'],
  },
  {
    name: 'IGF-1 LR3',
    category: 'performance',
    sequence: 'Long-acting IGF-1 analog · 83 amino acids',
    description:
      'IGF-1 LR3 is a recombinant analog of insulin-like growth factor 1 with an N-terminal 13 amino acid extension and Arg substitution at position 3. These modifications reduce IGF binding protein affinity, extending the half-life to approximately 20–30 hours. Research examines its potent anabolic, myogenic, and protein synthesis effects.',
    researchAreas: ['Muscle protein synthesis', 'Myogenesis', 'Anabolic signaling', 'Cell proliferation'],
  },
  {
    name: 'MGF',
    category: 'performance',
    sequence: 'Mechano Growth Factor · IGF-1 splice variant',
    description:
      'Mechano Growth Factor (MGF) is an alternatively spliced variant of IGF-1 produced locally in muscle tissue in response to mechanical load. It activates muscle satellite cells (stem cells) and initiates the repair and hypertrophy cascade. Research examines its role in muscle regeneration, especially following injury or exercise stress.',
    researchAreas: ['Satellite cell activation', 'Muscle hypertrophy', 'Regeneration', 'Mechanical signaling'],
  },
  {
    name: 'PEG-MGF',
    category: 'performance',
    sequence: 'PEGylated Mechano Growth Factor · extended half-life',
    description:
      'PEG-MGF is a PEGylated form of Mechano Growth Factor where polyethylene glycol chains are attached to increase aqueous solubility and dramatically extend the plasma half-life from minutes to several days. Research explores whether this extended exposure window improves muscle satellite cell activation outcomes vs. native MGF.',
    researchAreas: ['Extended half-life', 'Satellite cell activation', 'Muscle repair', 'Bioavailability'],
  },

  // ── Cosmetic ────────────────────────────────────────────────────────────
  {
    name: 'Matrixyl 3000',
    category: 'cosmetic',
    sequence: 'Palmitoyl tripeptide-1 + palmitoyl tetrapeptide-7 blend',
    description:
      'Matrixyl 3000 is a combination of two matrikine peptides — palmitoyl tripeptide-1 (Pal-GHK) and palmitoyl tetrapeptide-7 (Pal-GQPR) — that signal dermal fibroblasts to increase production of collagen I, collagen III, fibronectin, and hyaluronic acid. Research documents significant wrinkle reduction and dermal matrix restoration.',
    researchAreas: ['Collagen I & III synthesis', 'Wrinkle reduction', 'Dermal matrix', 'Fibroblast signaling'],
  },
  {
    name: 'Argireline',
    category: 'cosmetic',
    sequence: 'Acetyl hexapeptide-3 · 6 amino acids',
    description:
      'Argireline (Acetyl Hexapeptide-3) is a synthetic hexapeptide that competes with SNAP-25 for the SNARE complex, partially inhibiting neurotransmitter release at the neuromuscular junction. This reduces repetitive facial muscle contractions, decreasing the formation of expression lines. Widely used in topical anti-aging cosmetic research.',
    researchAreas: ['SNARE inhibition', 'Expression line reduction', 'Neurocosmetic', 'Anti-aging'],
    productSlug: 'argireline',
  },
  {
    name: 'Leuphasyl',
    category: 'cosmetic',
    sequence: 'Enkephalin mimic pentapeptide · 5 amino acids',
    description:
      'Leuphasyl is a pentapeptide that mimics enkephalins and acts on opioid receptors at the neuromuscular junction to reduce muscle contraction signaling. It works through a complementary but distinct mechanism to Argireline, targeting pre-synaptic adenylyl cyclase pathways, making it synergistic when combined in formulations.',
    researchAreas: ['Muscle relaxation', 'Enkephalin mimic', 'Synergistic with Argireline', 'Expression lines'],
  },
  {
    name: 'Palmitoyl Tripeptide-1',
    category: 'cosmetic',
    sequence: 'Pal-GHK · palmitic acid + 3 amino acids',
    description:
      'Palmitoyl Tripeptide-1 (Pal-GHK) is the palmitoylated form of the copper-binding tripeptide Gly-His-Lys. The palmitate chain enhances skin penetration through the lipophilic stratum corneum. It stimulates extracellular matrix protein synthesis including collagen and fibronectin via TGF-β and MAPK signaling pathways in fibroblasts.',
    researchAreas: ['Dermal matrix stimulation', 'Collagen synthesis', 'Fibroblast activation', 'Skin penetration'],
  },
  {
    name: 'SNAP-8',
    category: 'cosmetic',
    sequence: 'Extended Argireline variant · 8 amino acids',
    description:
      'SNAP-8 is an octapeptide extension of Argireline that incorporates an additional N-terminal sequence to more completely mimic the SNAP-25 binding domain. By competitively blocking the full SNARE complex assembly, it is proposed to achieve greater inhibition of vesicular acetylcholine release than the shorter Argireline variant.',
    researchAreas: ['SNARE complex inhibition', 'Anti-wrinkle', 'Neurocosmetic', 'Expression line reduction'],
  },
  {
    name: 'Syn-Ake',
    category: 'cosmetic',
    sequence: 'Synthetic viper venom mimic tripeptide · 3 amino acids',
    description:
      'Syn-Ake is a synthetic tripeptide inspired by the neurotoxic peptide waglerin-1 found in Temple Viper (Tropidolaemus wagleri) venom. It acts as a reversible antagonist of the muscular nicotinic acetylcholine receptor (mnAChR) to reduce voltage-dependent sodium channel activation, leading to temporary muscle relaxation for topical cosmetic applications.',
    researchAreas: ['nAChR antagonism', 'Muscle relaxation', 'Neuromuscular junction', 'Anti-wrinkle'],
  },
  {
    name: 'Copper Peptide GHK',
    category: 'cosmetic',
    sequence: 'Copper tripeptide · 3 amino acids (Gly-His-Lys)',
    description:
      'GHK (Glycyl-L-histidyl-L-lysine) is the parent compound of GHK-Cu, studied extensively in the cosmetic context for wound healing, angiogenesis promotion, skin remodeling, and anti-inflammatory signaling. It also modulates gene expression broadly, activating genes associated with tissue repair while suppressing those linked to inflammation and cancer progression.',
    researchAreas: ['Wound healing', 'Angiogenesis', 'Skin remodeling', 'Anti-inflammatory'],
  },

  // ── Metabolic / Cognitive ────────────────────────────────────────────────
  {
    name: 'AOD-9604',
    category: 'metabolic',
    sequence: 'HGH C-terminal fragment · 15 amino acids (177-191 with Tyr)',
    description:
      'AOD-9604 is a modified form of HGH Fragment 176-191 with a tyrosine amino acid added to the N-terminus for improved stability. It stimulates lipolysis and inhibits lipogenesis via non-IGF-1-mediated pathways, making it selective for fat metabolism without the growth-promoting or diabetogenic effects of full-length HGH.',
    researchAreas: ['Anti-obesity', 'Lipolysis', 'Fat metabolism', 'Metabolic syndrome'],
  },
  {
    name: 'Semaglutide (GLP-1 RA)',
    category: 'metabolic',
    sequence: 'GLP-1 receptor agonist · 31 amino acids',
    description:
      'Semaglutide is a long-acting GLP-1 receptor agonist with ~94% sequence homology to native GLP-1. Fatty acid and linker modifications enable albumin binding, extending its half-life to approximately one week. Research spans type 2 diabetes management, obesity treatment, and emerging cardiovascular and neuroprotective applications.',
    researchAreas: ['GLP-1 receptor agonism', 'Glucose regulation', 'Obesity research', 'Cardiovascular'],
  },
  {
    name: 'Tirzepatide',
    category: 'metabolic',
    sequence: 'GIP/GLP-1 dual agonist · 39 amino acids',
    description:
      'Tirzepatide is a first-in-class dual glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1) receptor agonist. Its dual incretin action produces superior glycemic control and weight reduction compared to selective GLP-1 agonists in clinical studies. Research continues to explore its metabolic and organ-protective mechanisms.',
    researchAreas: ['GIP/GLP-1 dual agonism', 'Metabolic syndrome', 'Insulin sensitivity', 'Weight regulation'],
  },
  {
    name: 'Kisspeptin',
    category: 'metabolic',
    sequence: 'KISS1-derived peptide · 10–54 amino acids (various forms)',
    description:
      'Kisspeptin (formerly metastin) is a neuropeptide encoded by the KISS1 gene that acts as the primary upstream activator of the hypothalamic-pituitary-gonadal (HPG) axis via GPR54 receptors on GnRH neurons. Research investigates its role in puberty onset, fertility regulation, and the neuroendocrine control of reproduction.',
    researchAreas: ['GnRH stimulation', 'Reproductive axis', 'Fertility research', 'HPG axis'],
  },
  {
    name: 'Oxytocin',
    category: 'cognitive',
    sequence: 'Neurohypophysial nonapeptide · 9 amino acids',
    description:
      'Oxytocin is an endogenous neuropeptide produced in the paraventricular and supraoptic nuclei of the hypothalamus. Beyond its classical roles in parturition and lactation, research has expanded to its central actions on social bonding, trust, anxiety modulation, and pain perception. It is a valuable tool compound for studying social neuroscience.',
    researchAreas: ['Social bonding', 'Anxiety modulation', 'Neuropeptide signaling', 'Reproductive biology'],
  },
]

// ---------------------------------------------------------------------------
// Category config
// ---------------------------------------------------------------------------

const CATEGORIES: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'research', label: 'Research' },
  { value: 'performance', label: 'Performance' },
  { value: 'cosmetic', label: 'Cosmetic' },
  { value: 'cognitive', label: 'Cognitive' },
  { value: 'metabolic', label: 'Metabolic' },
]

const CATEGORY_STYLES: Record<Category, string> = {
  research: 'text-blue-400 bg-blue-400/10',
  performance: 'text-green-400 bg-green-400/10',
  cosmetic: 'text-pink-400 bg-pink-400/10',
  cognitive: 'text-purple-400 bg-purple-400/10',
  metabolic: 'text-orange-400 bg-orange-400/10',
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PeptidesPage() {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return peptides.filter((p) => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.researchAreas.some((a) => a.toLowerCase().includes(q))
      return matchCat && matchSearch
    })
  }, [activeCategory, search])

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section className="relative border-b border-border-subtle bg-surface overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wider uppercase">
            <Flask size={14} />
            Research Reference
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-primary mb-4 leading-tight">
            Peptide Research Library
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-6">
            A comprehensive reference for researchers. Explore mechanisms, applications, and the
            science behind each peptide.
          </p>
          <p className="text-text-muted text-sm bg-surface-elevated border border-border-subtle rounded-lg px-4 py-2 inline-block">
            All information is for educational and research purposes only. Not intended for human
            use.
          </p>
        </div>
      </section>

      {/* ── Controls ── */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Category tabs */}
          <div className="flex items-center gap-1 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat.value
                    ? 'bg-accent text-black'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              placeholder="Search peptides…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Result count */}
        <p className="text-text-muted text-sm mb-8">
          Showing{' '}
          <span className="text-text-primary font-semibold">{filtered.length}</span> of{' '}
          <span className="text-text-primary font-semibold">{peptides.length}</span> peptides
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted text-lg">No peptides match your search.</p>
            <button
              onClick={() => {
                setSearch('')
                setActiveCategory('all')
              }}
              className="mt-4 text-accent text-sm hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((peptide) => (
              <PeptideCard key={peptide.name} peptide={peptide} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Peptide Card
// ---------------------------------------------------------------------------

function PeptideCard({ peptide }: { peptide: Peptide }) {
  const categoryStyle = CATEGORY_STYLES[peptide.category]
  const categoryLabel =
    peptide.category.charAt(0).toUpperCase() + peptide.category.slice(1)

  return (
    <article className="bg-surface border border-border-subtle rounded-xl p-6 flex flex-col gap-4 hover:border-accent/30 transition-colors group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-text-primary font-bold text-xl leading-tight group-hover:text-accent transition-colors">
          {peptide.name}
        </h2>
        <span
          className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryStyle}`}
        >
          {categoryLabel}
        </span>
      </div>

      {/* Sequence / type */}
      <p className="text-text-muted text-xs font-mono tracking-wide">{peptide.sequence}</p>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed flex-1">
        {peptide.description}
      </p>

      {/* Research areas */}
      <div>
        <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-2">
          Key Research Areas
        </p>
        <div className="flex flex-wrap gap-1.5">
          {peptide.researchAreas.map((area) => (
            <span
              key={area}
              className="text-xs text-text-secondary bg-surface-elevated border border-border-subtle px-2.5 py-1 rounded-full"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto pt-2 border-t border-border-subtle">
        {peptide.productSlug ? (
          <Link
            href={`/products/${peptide.productSlug}`}
            className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold hover:gap-2.5 transition-all"
          >
            View Product
            <ArrowRight size={14} />
          </Link>
        ) : (
          <span className="text-text-muted text-xs font-medium bg-surface-elevated border border-border-subtle px-3 py-1.5 rounded-full">
            Research Only
          </span>
        )}
      </div>
    </article>
  )
}
