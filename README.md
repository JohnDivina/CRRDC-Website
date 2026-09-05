# Crops and Resources Research and Development Center (CRRDC)
## Central Luzon State University (CLSU) — Institutional Web Portal

Official institutional website for the **Crops and Resources Research and Development Center (CRRDC)** at **Central Luzon State University (CLSU)**, Science City of Muñoz, Nueva Ecija, Philippines.

Operating under the **Office of the Vice President for Research and Extension (OVPRE)**, CRRDC is the premier agricultural science and natural resources research institution mandated to lead crop breeding, seed production, postharvest biotechnology, and sustainable agronomy.

---

## 🏛️ Institutional Features

- **Dual University Branding:** Official CLSU Seal and CRRDC emblem integrated with Philippine Republic GovBar guidelines.
- **Apple/iOS System Typography:** Clean SF Pro typography stack (`-apple-system`, `BlinkMacSystemFont`, `SF Pro Display/Text`).
- **Restrained Color Palette:** Authentic CLSU Green (`#008736`), Green Cobra (`#124d26`), and Gold (`#eab308`).
- **Four Core Operating Divisions:**
  1. *Crops & Resources Research and Development Division (CRRDD)*
  2. *Seed & Planting Material Production Division (SPMPD)*
  3. *Technology Transfer & Commercialization Division (TTCD)*
  4. *Administrative & Technical Support Services Division (ATSSD)*
- **Ten Research Laboratories & Facilities:** Interactive explorer covering Tissue Culture, Molecular Breeding, Soil & Water Analysis, Seed Testing, Postharvest Processing, Crop Protection Clinic, Smart Greenhouse, Agricultural Machinery, GIS & Remote Sensing, and Field Experimental Plots.
- **Priority Agricultural Commodities:** High-value lowland vegetables, specialty rice, grain legumes, clonal fruits, and bio-energy crops.
- **Digital Systems Showcase:** Featuring the *Resursee Platform* (Integrated Crop Resources & Plant Doctor), Certified Seed Registry, LabAccess booking, and AgroClimate Advisory Hub.
- **Verified Campus Location:** Embedded interactive Google Maps with Plus Code (`PWHH+G26, Muñoz, Nueva Ecija`) and administrative directory.

---

## 🚀 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** TypeScript 5
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/) & [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 📂 Project Structure

```
crrdc-website/
├── public/
│   ├── images/              # Campus banners & imagery
│   └── logos/               # Official CLSU & CRRDC seals
├── src/
│   ├── app/
│   │   ├── globals.css      # CLSU OKLCH/Hex tokens & typography
│   │   ├── layout.tsx       # Institutional metadata & SEO
│   │   └── page.tsx         # Assembled institutional portal
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, GovBar
│   │   ├── sections/        # Hero, Overview, Divisions, Facilities, Research, Systems, Contact
│   │   └── ui/              # Button, card, and accessible primitives
│   ├── data/                # Centralized typed data files
│   │   ├── institution.ts   # Mandate, Vision, Mission, Pillars
│   │   ├── divisions.ts     # 4 Divisions data
│   │   ├── facilities.ts    # 10 Laboratories specifications
│   │   ├── research.ts      # Commodities, metrics, thrusts, papers
│   │   ├── digitalSystems.ts# Digital platforms (Resursee, etc.)
│   │   └── contact.ts       # Coordinates, directory, office hours
│   └── lib/                 # Utility helpers (cn, etc.)
└── package.json
```

---

## 📜 Institutional Affiliation

**Central Luzon State University**  
Science City of Muñoz, Nueva Ecija 3120, Philippines  
Chartered under Republic Act No. 4067  
Website: [clsu.edu.ph](https://clsu.edu.ph)
