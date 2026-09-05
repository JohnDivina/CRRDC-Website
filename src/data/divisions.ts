export interface Division {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  description: string;
  src: string;
  button: string;
  headTitle: string;
  headNamePlaceholder: string;
  keyResponsibilities: string[];
  priorityPrograms: string[];
}

export const divisionsData: Division[] = [
  {
    id: "icd",
    code: "ICD",
    name: "Information and Communications Division",
    subtitle: "Digital Agriculture, Public Information & Knowledge Management",
    description:
      "Spearheads digital systems, agricultural media development, scientific publication dissemination, and institutional ICT infrastructure across CRRDC. Operates multimedia studios, information portals, and farmer-targeted communication campaigns.",
    src: "/images/placeholders/division-01.jpg",
    button: "Explore Division",
    headTitle: "Division Chief",
    headNamePlaceholder: "[Division Chief, Ph.D. — Information & Communications]",
    keyResponsibilities: [
      "Development and maintenance of digital agriculture portals (Resursee, Seed Registry)",
      "Production of vetted technoguides, multimedia bulletins, and documentary materials",
      "Operation of the Multimedia Editing and Management Operations (MEMO) Studio",
      "Dissemination of agricultural research publications and scientific datasets",
    ],
    priorityPrograms: [
      "Digital Farm Advisory & AgroClimate Portal Initiative",
      "Multimedia Knowledge Dissemination for Rural Agrarian Communities",
      "Institutional Seed Information & E-Commerce Integration",
      "Research Data Repository & Open Science Management",
    ],
  },
  {
    id: "cmd",
    code: "CMD",
    name: "Crop Management Division",
    subtitle: "Precision Agronomy, Crop Protection & Agro-Ecological Systems",
    description:
      "Focuses on applied crop management, integrated pest and disease diagnosis, soil fertility evaluation, and sustainable cultural practices tailored to climate-resilient farming in Central Luzon.",
    src: "/images/placeholders/division-02.jpg",
    button: "Explore Division",
    headTitle: "Division Chief",
    headNamePlaceholder: "[Division Chief, Ph.D. — Crop Management]",
    keyResponsibilities: [
      "Integrated pest, disease, and weed management protocol formulation",
      "Soil fertility mapping and biological nutrient supplementation trials",
      "Field diagnostics of emerging agricultural pathogens and invasive insect species",
      "Crop calendar optimization for variable climatic rainfall patterns",
    ],
    priorityPrograms: [
      "Bacterial Wilt & Fungal Pathogen Biological Control Program",
      "Lowland Vegetable Cropping System Resilience Trials",
      "Precision Fertigation and Soil Organic Matter Regeneration",
      "Farmer Field Schools on Climate-Smart Crop Husbandry",
    ],
  },
  {
    id: "frpd",
    code: "FRPD",
    name: "Farm Resources and Post-harvest Division",
    subtitle: "Post-Harvest Technology, Farm Mechanization & Resource Valorization",
    description:
      "Pioneers engineering and technological solutions to eliminate post-harvest losses, design efficient processing equipment, and convert agricultural by-products and biomass into renewable bioenergy and value-added goods.",
    src: "/images/placeholders/division-03.jpg",
    button: "Explore Division",
    headTitle: "Division Chief",
    headNamePlaceholder: "[Division Chief, M.Sc. — Farm Resources & Post-harvest]",
    keyResponsibilities: [
      "Controlled atmosphere cold storage, dehydration, and packaging research",
      "Agricultural mechanization testing and precision machinery prototyping",
      "Biomass and bioenergy characterization from agricultural crop residues",
      "Primary processing protocols for high-value tropical fruits and grains",
    ],
    priorityPrograms: [
      "Post-Harvest Loss Reduction for Bulbing Vegetables and Fruits",
      "Biomass Conversion and Solar Drying Modernization",
      "Small-Scale Farm Implement Calibration and Field Testing",
      "Waste-to-Resource Circular Bioeconomy Initiative",
    ],
  },
  {
    id: "pbgrd",
    code: "PBGRD",
    name: "Plant Breeding and Genetic Resources Division",
    subtitle: "Varietal Improvement, Marker-Assisted Selection & Germplasm Conservation",
    description:
      "Drives the core genetic research mandate of CRRDC. Breeds superior, drought-resilient, pest-resistant crop cultivars, conducts marker-assisted selection, and conserves vital plant genetic resources and landraces.",
    src: "/images/placeholders/division-04.jpg",
    button: "Explore Division",
    headTitle: "Division Chief",
    headNamePlaceholder: "[Division Chief, Ph.D. — Plant Breeding & Genetics]",
    keyResponsibilities: [
      "Varietal development of specialty rice, grain legumes, and commercial vegetables",
      "Maintenance, documentation, and seed banking of indigenous germplasm accessions",
      "Molecular marker genotyping and tissue culture clonal micropropagation",
      "Foundation and registered seed multiplication of approved crop selections",
    ],
    priorityPrograms: [
      "Submergence- and Drought-Tolerant Rice Breeding Initiative",
      "Biofortified Legume & Indigenous Vegetable Germplasm Conservation",
      "Disease-Free Micropropagated Banana and Root Crop Clonal Pipeline",
      "National Cooperative Testing (NCT) Regional Varietal Release",
    ],
  },
];
