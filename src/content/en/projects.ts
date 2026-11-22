type ProjectText = {
  client?: string;
  category: string;
  city?: string;
  description: string;
  tags: string[];
  scope: string[];
};

export const projectsTextEn: Record<string, ProjectText> = {
  pestify: {
    category: "Pest control, disinfection and rodent control",
    description:
      "Website for a Warsaw pest control company: separate pages for pests and services, a price list, certificates, a HACCP offer for businesses, a guide and online ordering.",
    tags: ["Services", "SEO", "Multilingual"],
    scope: [
      "Pages for pests and pest control services",
      "Price list and online ordering",
      "Certificates and a HACCP offer for businesses",
      "Guide, language switcher, light and dark mode",
    ],
  },
  omniway: {
    client: "Omniway, thermal imaging",
    category: "Thermal imaging diagnostics",
    city: "Greater Poland",
    description:
      "Website for a company that inspects buildings, installations and solar farms with thermal cameras across Poland: services, how an inspection works, a sample report and an online quote.",
    tags: ["Business", "Technical"],
    scope: [
      "Thermal imaging for buildings, installations and solar farms",
      "The inspection process step by step",
      "A sample camera image and report",
      "Service quote and a link to the PV Spectra platform",
    ],
  },
  "pv-spectra": {
    category: "AI platform for solar farms",
    description:
      "A workspace for analysing drone imagery and managing solar farms — an AI module detects panel faults and the maintenance team gets ready-made reports.",
    tags: ["SaaS", "AI", "Dashboard"],
    scope: ["Client panel with login", "AI module for analysing thermal images", "Fault maps and reports", "Product landing page"],
  },
  "sigma-sokolka": {
    client: "Hotel & Banquet Hall Sigma",
    category: "Hotel, wedding venue and restaurant",
    description:
      "An elegant hotel website presenting rooms, wedding halls and the restaurant — a dark, golden mood that sells the wedding before the couple even arrives.",
    tags: ["Hospitality", "Premium"],
    scope: ["Rooms and halls", "Interior gallery", "Guest reviews", "Map and contact with the number in the header"],
  },
  "jp-auto": {
    client: "JP-Auto Car Rental",
    category: "Car rental",
    description:
      "A rental company website with the full fleet, a price list and online booking. Customers browse the cars and send enquiries themselves.",
    tags: ["Web design", "Bookings"],
    scope: ["Fleet catalogue with prices", "Booking form", "Rental terms section", "Local SEO"],
  },
  "profesjonalne-remonty": {
    category: "Painting and construction work",
    city: "Greater Poland",
    description:
      "Website for a painting and construction company — a full presentation of services, completed work and the way of working, so customers know what to expect before they call.",
    tags: ["Business", "Premium"],
    scope: ["Services presentation", "Gallery of completed work", "How we work together", "Quote form"],
  },
  "rafal-sakowski": {
    client: "Rafał Sakowski, hypnotherapy",
    category: "Hypnotherapy and psychotherapy",
    description:
      "Website for a hypnotherapist from Gdynia: areas of therapy, the process step by step, certificates, patient reviews and a free first consultation with one phone call.",
    tags: ["Practice", "Personal brand", "SEO"],
    scope: [
      "Pages for areas of therapy: anxiety, insomnia, addictions",
      "How therapy works, and certificates",
      "Patient reviews and news",
      "Free phone consultation in the hero",
    ],
  },
  alicedecor: {
    client: "Alice Decor, window decor",
    category: "Made-to-measure curtains, sheers and blinds",
    description:
      "Website for a window decor studio from Grudziądz: curtains, sheers, blinds and curtain rods, the path from a free measurement to installation, a gallery and measurement booking.",
    tags: ["Services", "Premium", "Local"],
    scope: [
      "Curtains, sheers, blinds and curtain rods",
      "Four steps from the first call to installation",
      "Gallery of completed work",
      "Booking a free measurement",
    ],
  },
  "sk-sprzatanie": {
    client: "SK Sprzątanie (Stal Kar), cleaning",
    category: "Commercial and facility cleaning",
    description:
      "Website for a cleaning company from the Tricity and Starogard Gdański: eight services from offices to post-renovation cleaning, a simple four-step process, customer reviews and a free quote.",
    tags: ["Services", "Local", "Conversion"],
    scope: [
      "Services: offices, stairwells, windows, post-renovation and post-event cleaning",
      "A four-step process",
      "Customer reviews",
      "Free quote form and a quick phone call",
    ],
  },
  "agencja-prime": {
    client: "Prime, security agency",
    category: "Personal and property security agency",
    description:
      "Website for a Wrocław security agency: services from site security to 24/7 monitoring, client sectors, the process from audit to deployment, FAQ and a free quote, in a dark, golden mood.",
    tags: ["Business", "Premium"],
    scope: [
      "Six security services, each with its own description",
      "Sectors: offices, retail, construction sites, housing estates, events",
      "The process from audit to deployment",
      "FAQ, job openings and a quote form",
    ],
  },
  hydrotech: {
    category: "Leak detection and water damage drying",
    city: "Silesia",
    description:
      "Website for a company that locates leaks and dries buildings after flooding in Silesia, Zagłębie and Lesser Poland: services, dehumidifier rental, how the work goes, completed jobs and settling with the insurer.",
    tags: ["Services", "Local", "Conversion"],
    scope: [
      "Services: leak detection, drying, dehumidifier rental",
      "How the work goes and settling with the insurer",
      "Gallery of completed work",
      "Two phone numbers up front, available 24/7",
    ],
  },
  ozonerio: {
    category: "Ozone treatment for homes, cars and offices",
    description:
      "Website for a Warsaw company offering ozone treatment for flats, cars and offices: services, how ozone works, a price list with a treatment cost calculator and an offer for businesses.",
    tags: ["Services", "Calculator", "Local"],
    scope: ["Ozone treatment service pages", "Treatment cost calculator", "Price list and business offer", "How ozone works, explained"],
  },
  "znicze-sokolka": {
    category: "Online store for grave candles",
    description:
      "Store of a family business from Sokółka: classic and LED grave candles, refills, lanterns and custom flower arrangements, with a cart and a countdown to All Saints’ Day.",
    tags: ["Store", "E-commerce", "Local"],
    scope: [
      "Catalogue: candles, refills, lanterns, arrangements",
      "Cart and online orders",
      "Custom arrangements",
      "All Saints’ Day countdown",
    ],
  },
  "aneta-witoslaw": {
    client: "Aneta Witosław Psychology Practice",
    category: "Psychology practice",
    description:
      "A calm website for a psychology practice in Sokółka: services, about me, prices and booking an appointment, with information about available dates.",
    tags: ["Practice", "Personal brand"],
    scope: ["Services and approach", "About page", "Prices", "Booking and available dates"],
  },
  "auto-chomko": {
    category: "Used cars",
    description: "Website for a dealer of inspected used cars with documented history: cars for sale, buying, trade-ins and financing.",
    tags: ["Automotive", "Catalogue"],
    scope: ["Cars for sale", "Car buying and trade-ins", "Financing", "Contact with the number up front"],
  },
  "smart-bud": {
    category: "Interior finishing and paving",
    description:
      "Website for a Kraków company doing interior finishing and paving: renovations, tiling, painting, paving stones, driveways and patios, with a free quote.",
    tags: ["Business", "Construction"],
    scope: ["Finishing and paving services", "Completed work", "Customer reviews", "Free quote"],
  },
  "kawiarnia-u-relkowej": {
    category: "Café",
    description:
      "An atmospheric website for a café in Wyszków: coffee and desserts, the menu, live opening hours, address, prices and phone number up front.",
    tags: ["Restaurant", "Premium"],
    scope: ["Menu", "Live open/closed status", "About us", "Contact and directions"],
  },
  "kebab-nazar": {
    category: "Restaurant & menu",
    description: "A fiery kebab website with the menu, sauces, FAQ and phone orders with one tap.",
    tags: ["Restaurant", "Local"],
    scope: ["Menu with prices", "Sauces and extras section", "FAQ", "“Call and order” button"],
  },
  zacisze: {
    client: "Zacisze Restaurant",
    category: "Restaurant",
    description: "An atmospheric restaurant website with the menu, table booking and a look at the interior.",
    tags: ["Restaurant", "Bookings"],
    scope: ["Menu", "Table booking", "Interior gallery", "Directions map"],
  },
  "majster-bb": {
    category: "Renovation services",
    description: "A converting website for a renovation company with a portfolio and services — built to get the customer to call.",
    tags: ["Business", "Conversion"],
    scope: ["Portfolio of completed work", "Services", "Sticky call button", "Reviews"],
  },
  "kacik-smaku": {
    category: "Kebab & fast food",
    description: "An appetising website for a local eatery with the full menu, stats and a Facebook integration.",
    tags: ["Restaurant", "Menu"],
    scope: ["Full menu", "Facebook integration", "Opening hours", "Directions"],
  },
  "zak-auto": {
    client: "ZAK Auto car dealer",
    category: "Car dealership",
    description: "An elegant showcase of cars imported from Belgium and Germany, with full vehicle history.",
    tags: ["Automotive", "Catalogue"],
    scope: ["Car catalogue", "Vehicle history", "Financing", "Contact with a salesperson"],
  },
  "taxi-sokolka": {
    category: "Taxi services",
    description: "A simple, fast landing page with ride prices, reviews and the booking number right at the top.",
    tags: ["Landing page", "Local SEO"],
    scope: ["Ride prices", "Phone number in the hero", "Reviews", "Local SEO"],
  },
  "kino-ton": {
    client: "Kino TON — costume rental",
    category: "Carnival costume rental",
    description: "A website with a costume catalogue, prices and contact for customers in Białystok.",
    tags: ["Catalogue", "E-commerce"],
    scope: ["Costume catalogue", "Category filters", "Price list", "Contact"],
  },
  "weterynarz-lopaciuk": {
    client: "Łopaciuk Veterinary Clinic",
    category: "Veterinary clinic",
    description: "A calm, stylish veterinary clinic website with a full presentation of services.",
    tags: ["Healthcare", "Premium"],
    scope: ["Services and prices", "The team", "Opening hours", "Phone appointments"],
  },
};
