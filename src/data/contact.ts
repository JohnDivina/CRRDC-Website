export interface DirectoryEntry {
  title: string;
  nameOrOffice: string;
  email: string;
  telephoneExt: string;
  serviceDescription: string;
}

export interface ContactInfo {
  campusName: string;
  parentUniversity: string;
  physicalAddress: string;
  buildingLocation: string;
  postalCode: string;
  cityProvince: string;
  country: string;
  plusCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapsEmbedUrl: string;
  mapsDirectUrl: string;
  officeHours: {
    days: string;
    hours: string;
    lunchBreak: string;
    timezone: string;
  };
  contactNumbers: {
    trunkline: string;
    extensions: string;
    mobileHotline: string;
    telefax: string;
  };
  officialEmails: {
    general: string;
    director: string;
    seedOrders: string;
    labServices: string;
  };
  socialChannels: {
    facebook: string;
    clsuPortal: string;
  };
  directory: DirectoryEntry[];
}

export const contactData: ContactInfo = {
  campusName: "Main Campus, Central Luzon State University",
  parentUniversity: "Central Luzon State University (CLSU)",
  physicalAddress: "Crops and Resources Research and Development Center (CRRDC) Complex",
  buildingLocation: "Research, Extension & Training (RET) Avenue, CLSU Main Campus",
  postalCode: "3120",
  cityProvince: "Science City of Muñoz, Nueva Ecija",
  country: "Philippines",
  plusCode: "PWHH+G26, Science City of Muñoz, Nueva Ecija",
  coordinates: {
    lat: 15.7337,
    lng: 120.9327,
  },
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Central%20Luzon%20State%20University%2C%20Science%20City%20of%20Mu%C3%B1oz%2C%20Nueva%20Ecija&t=&z=15&ie=UTF8&iwloc=&output=embed",
  mapsDirectUrl:
    "https://www.google.com/maps/search/?api=1&query=PWHH%2BG26+Science+City+of+Mu%C3%B1oz+Nueva+Ecija",
  officeHours: {
    days: "Monday – Friday",
    hours: "8:00 AM – 5:00 PM",
    lunchBreak: "12:00 PM – 1:00 PM (Public assistance desk remains operational)",
    timezone: "Philippine Standard Time (UTC+8)",
  },
  contactNumbers: {
    trunkline: "(+63 44) 456-7200",
    extensions: "ext. 7201 (Director's Office) / 7204 (Seed Lab) / 7208 (Admin)",
    mobileHotline: "(+63) 917-xxx-xxxx [Official Hotline]",
    telefax: "(+63 44) 456-7202",
  },
  officialEmails: {
    general: "crrdc@clsu.edu.ph",
    director: "director.crrdc@clsu.edu.ph",
    seedOrders: "crrdc.seeds@clsu.edu.ph",
    labServices: "crrdc.analytical@clsu.edu.ph",
  },
  socialChannels: {
    facebook: "https://facebook.com/clsuofficial",
    clsuPortal: "https://clsu.edu.ph",
  },
  directory: [
    {
      title: "Office of the Center Director",
      nameOrOffice: "[Center Director Name, Ph.D.]",
      email: "director.crrdc@clsu.edu.ph",
      telephoneExt: "Ext. 7201",
      serviceDescription: "Institutional partnerships, academic collaborations, research MOUs, and policy inquiries.",
    },
    {
      title: "Crops & Resources R&D Division",
      nameOrOffice: "[Division Chief, Ph.D.]",
      email: "crrdc.rdd@clsu.edu.ph",
      telephoneExt: "Ext. 7203",
      serviceDescription: "Crop breeding research trials, germplasm requests, scientific joint proposals.",
    },
    {
      title: "Seed & Planting Material Division",
      nameOrOffice: "[Division Chief, M.Sc.]",
      email: "crrdc.seeds@clsu.edu.ph",
      telephoneExt: "Ext. 7204",
      serviceDescription: "Foundation seed reservations, tissue-cultured plantlet orders, germination certificates.",
    },
    {
      title: "Technology Transfer & Incubation",
      nameOrOffice: "[Division Chief, M.Sc.]",
      email: "crrdc.ttcd@clsu.edu.ph",
      telephoneExt: "Ext. 7206",
      serviceDescription: "Farmer training requests, technology commercialization licenses, technoguide inquiries.",
    },
    {
      title: "Analytical Testing & Lab Services",
      nameOrOffice: "[Laboratory Services Unit]",
      email: "crrdc.analytical@clsu.edu.ph",
      telephoneExt: "Ext. 7208",
      serviceDescription: "Soil and water chemical assay submissions, molecular genotyping services, equipment bookings.",
    },
  ],
};
