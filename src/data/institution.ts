export interface InstitutionPillar {
  title: string;
  description: string;
  icon: string;
}

export interface InstitutionalLeader {
  role: string;
  name: string;
  credentials?: string;
  division?: string;
  status: "active" | "placeholder";
}

export interface InstitutionInfo {
  university: {
    name: string;
    acronym: string;
    motto: string;
    established: number;
    website: string;
    sealUrl: string;
  };
  center: {
    name: string;
    acronym: string;
    parentOffice: string;
    establishedYear: number;
    logoUrl: string;
    tagline: string;
    mandate: string;
    vision: string;
    mission: string;
    coreValues: { title: string; description: string }[];
  };
  pillars: InstitutionPillar[];
  leadership: InstitutionalLeader[];
}

export const institutionData: InstitutionInfo = {
  university: {
    name: "Central Luzon State University",
    acronym: "CLSU",
    motto: "Excellence in Agricultural Higher Education, Research, and Innovation",
    established: 1907,
    website: "https://clsu.edu.ph",
    sealUrl: "/logos/clsu-logo.png",
  },
  center: {
    name: "Crops and Resources Research and Development Center",
    acronym: "CRRDC",
    parentOffice: "Office of the Vice President for Research and Extension (OVPRE)",
    establishedYear: 1985,
    logoUrl: "/logos/crrdc-logo.png",
    tagline: "Advancing Science-Driven Agriculture and Resource Sustainability in Central Luzon",
    mandate:
      "The Crops and Resources Research and Development Center (CRRDC) serves as the primary agricultural and natural resources research arm of Central Luzon State University. Mandated to lead pioneering crop breeding, sustainable agronomy, postharvest biotechnology, and technology commercialization, CRRDC generates high-impact science that empowers farming communities, secures food systems, and drives countryside development.",
    vision:
      "A premier national center of excellence in crop science and resource development fostering climate-resilient agriculture, breakthrough bio-innovations, and competitive farming enterprises in the Philippines and Southeast Asia.",
    mission:
      "To generate cutting-edge agricultural technologies, conserve vital plant genetic resources, develop climate-smart farming solutions, and accelerate technology diffusion through collaborative partnerships with stakeholders, government agencies, and industry leaders.",
    coreValues: [
      {
        title: "Scientific Rigor",
        description: "Adherence to the highest international standards of agricultural research and peer-reviewed methodology.",
      },
      {
        title: "Agricultural Sovereignty",
        description: "Dedication to domestic food security, farmer empowerment, and sustainable rural livelihood enhancement.",
      },
      {
        title: "Environmental Stewardship",
        description: "Pioneering regenerative practices, ecological soil management, and biodiversity preservation.",
      },
      {
        title: "Institutional Integrity",
        description: "Transparent governance, ethical resource stewardship, and accountable public service as a state university center.",
      },
    ],
  },
  pillars: [
    {
      title: "Crop Breeding & Germplasm Security",
      description:
        "Developing high-yielding, pest-resistant, and climate-tolerant crop varieties while curating an extensive germplasm repository of indigenous and traditional cultivars.",
      icon: "Dna",
    },
    {
      title: "Agro-Ecological & Soil Health Science",
      description:
        "Advancing precision nutrient management, biological control agents, organic soil amendments, and resilient cropping sequences for Central Luzon river basins.",
      icon: "Sprout",
    },
    {
      title: "Postharvest Engineering & Bioprocessing",
      description:
        "Engineering modern postharvest technologies, minimizing postharvest losses, and valorizing agricultural by-products into high-value functional compounds.",
      icon: "Cpu",
    },
    {
      title: "Technology Transfer & Enterprise Incubation",
      description:
        "Bridging laboratory discoveries into farmers' fields through certified seed dissemination, agribusiness incubation, and multi-agency demonstration platforms.",
      icon: "Share2",
    },
  ],
  leadership: [
    {
      role: "Center Director",
      name: "[Center Director Name, Ph.D.]",
      credentials: "Professor & Scientist, Crops and Resources R&D",
      status: "placeholder",
    },
    {
      role: "Head, Crops & Resources R&D Division",
      name: "[Division Head Name, Ph.D.]",
      credentials: "Associate Professor, Plant Breeding & Genetics",
      division: "CRRDD",
      status: "placeholder",
    },
    {
      role: "Head, Seed & Material Production Division",
      name: "[Division Head Name, M.Sc.]",
      credentials: "Chief Agronomist & Seed Production Specialist",
      division: "SPMPD",
      status: "placeholder",
    },
    {
      role: "Head, Technology Transfer & Commercialization Division",
      name: "[Division Head Name, M.Sc.]",
      credentials: "Extension Specialist & Technology Transfer Officer",
      division: "TTCD",
      status: "placeholder",
    },
    {
      role: "Head, Administrative & Technical Support Services",
      name: "[Unit Head Name, CPA/MPA]",
      credentials: "Administrative Officer V",
      division: "ATSSD",
      status: "placeholder",
    },
  ],
};
