import { pagesEn, legalEn } from "./pages/en";

const en = {
  common: {
    readMore: "Read more",
    learnMore: "Learn more",
    contactUs: "Contact us",
    requestQuote: "Request a quote",
    requestDetails: "Request details",
    getConsultation: "Get a consultation",
    exploreSolutions: "Explore Solutions",
    exploreTechnologies: "Explore technologies",
    requestSupplyDetails: "Request Supply Details",
    backToCatalog: "Back to catalog",
    backToBlog: "Back to blog",
    home: "Home",
    loading: "Loading…",
    sending: "Sending…",
    showMore: "Show more",
    showLess: "Show less",
    all: "All",
    close: "Close",
    previous: "Previous",
    next: "Next",
    page: "Page",
    of: "of",
    notFoundTitle: "Page not found",
    notFoundText:
      "The page you are looking for has been moved or no longer exists.",
    goHome: "Go to homepage",
  },

  nav: {
    home: "Home",
    supply: "Supply",
    catalog: "Catalog",
    solutions: "Solutions",
    engineeringSolutions: "Engineering Solutions",
    equipmentAndSystems: "Equipment and systems",
    industriesWeServe: "Industries we serve",
    blog: "Blog",
    about: "About",
    contacts: "Contacts",
    mobileMenu: "Mobile menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageSwitcher: "Change language",
  },

  footer: {
    tagline:
      "Capture, purify and reuse CO₂ at the source — closing the carbon loop for industry.",
    company: "Company",
    support: "Support",
    contacts: "Contacts",
    termsOfUse: "Terms of Use",
    privacyPolicy: "Privacy Policy",
    rights: "All rights reserved.",
    developedBy: "Developed by",
  },

  forms: {
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "your@email.com",
    phone: "Phone",
    company: "Company",
    companyPlaceholder: "Company name",
    message: "Message",
    messagePlaceholder: "Tell us about your project",
    submit: "Send message",
    submitting: "Sending…",
    successTitle: "Thank you!",
    successText: "We have received your request and will get back to you soon.",
    errorTitle: "Something went wrong",
    errorText: "Please try again or contact us directly by email.",
    required: "This field is required",
    invalidEmail: "Invalid email address",
    invalidPhone: "Invalid phone number",
    nameLength: "The field must contain between 2 and 30 characters",
    nameChars: "Allowed letters and hyphens, apostrophes, quotes",
    companyMax: "Company name must be at most 100 characters",
    messageMax: "Message must be at most 1000 characters",
    consent:
      "By submitting this form you agree to our Privacy Policy and the processing of your data.",
    fullNamePlaceholder: "Full name*",
    emailAddressPlaceholder: "Email address",
    sendRequest: "Send Request",
    sendUsAMessage: "Send us a message",
    sentTitle: "Your message has been sent",
    sentText: "We have received your message and will get back to you shortly.",
    failedTitle: "Something went wrong",
    failedText: "Try submitting the form later.",
  },

  catalog: {
    title: "Product catalog",
    heading: "Cryogenic equipment and CO₂ systems catalog",
    intro:
      "Cryogenic tanks for liquid CO₂, nitrogen, oxygen and argon, cryogenic cylinders, ambient and CO₂ vaporizers, CO₂ quality control laboratory equipment and turnkey gas supply system installation.",
    allCategories: "All categories",
    categories: "Categories",
    filters: "Filters",
    resetFilters: "Reset filters",
    applyFilters: "Apply",
    sortBy: "Sort by",
    sortNewest: "Newest first",
    sortNameAsc: "Name A–Z",
    sortNameDesc: "Name Z–A",
    search: "Search products",
    searchPlaceholder: "Search by name or model…",
    resultsCount: "{count} products",
    noResults: "No products match your filters",
    noResultsHint: "Try removing some filters or clearing the search.",
    viewProduct: "View product",
    inCategory: "In category",
    productsIn: "Products in {category}",
    breadcrumb: "Catalog",
  },

  product: {
    specifications: "Specifications",
    description: "Description",
    features: "Key features",
    applications: "Applications",
    documents: "Documents and datasheets",
    downloadDatasheet: "Download datasheet",
    requestPrice: "Request a price",
    requestQuoteFor: "Request a quote for {product}",
    similarProducts: "Similar products",
    relatedProducts: "You may also need",
    gallery: "Gallery",
    checkAllPhotos: "View all photos",
    previousImage: "Previous image",
    nextImage: "Next image",
    imageCounter: "{current} of {total}",
    hideThumbnails: "Hide thumbnails",
    showThumbnails: "Show thumbnails",
    openGallery: "Open gallery",
    sku: "SKU",
    model: "Model",
    category: "Category",
    availability: "Availability",
    inStock: "In stock",
    onRequest: "On request",
    madeToOrder: "Made to order",
    priceOnRequest: "Price on request",
    ctaTitle: "Need this equipment for your plant?",
    ctaText:
      "Our engineers will size the system for your process, volumes and site conditions.",
    faq: "Frequently asked questions",
  },

  blog: {
    title: "Blog",
    heading: "CO₂ insights, engineering and industry news",
    intro:
      "Practical articles on carbon capture, CO₂ purification, dry ice, cryogenic storage and decarbonisation of industrial processes.",
    allPosts: "All posts",
    categories: "Categories",
    readingTime: "{minutes} min read",
    publishedOn: "Published",
    updatedOn: "Updated",
    author: "Author",
    relatedPosts: "Related articles",
    readArticle: "Read article",
    noPosts: "No articles published yet",
    noPostsHint: "Come back soon — we publish new material regularly.",
    tableOfContents: "Table of contents",
    share: "Share",
    breadcrumb: "Blog",
    latest: "Latest articles",
  },

  cta: {
    consultationTitle: "Ready to build your CO₂ ecosystem?",
    consultationText:
      "Get a tailored solution for your production, purification or utilization needs.",
    consultationButton: "Request consultation",
    supportTitle: "Start your CO₂ project with expert support",
    supportText:
      "From concept to commissioning, we ensure your CO₂ facility is delivered efficiently and reliably.",
    supportButton: "Request support",
    buildTitle: "Let's build together",
    buildText:
      "Tell us about your needs — we'll craft a CO₂ solution tailored to your operations.",
    buildButton: "Contact us",
    imageAlt: "CO₂ Lab engineering team at work",
  },

  thanks: {
    title: "Thank you for your request",
    subtitle:
      "We have received your enquiry. An engineer will get back to you within one business day with a solution and an estimate.",
    step1: "We check the details and, if anything is unclear, call you back.",
    step2: "We select the equipment for your consumption and site conditions.",
    step3: "You get a quotation with the scope of supply and lead time.",
    urgent: "Urgent? Call or write to us directly:",
    readBlog: "Read the blog",
  },
  seo: {
    siteName: "CO₂ Lab",
    home: {
      title: "CO₂ Capture & Reuse Solutions for Industry",
      description:
        "Capture, purify and reuse CO₂ at the source. Closing the carbon loop with efficient, scalable clean-tech solutions for industry.",
    },
    about: {
      title: "About CO₂ Lab — Engineering-First CO₂ Technology",
      description:
        "CO₂ Lab designs, builds and supports carbon capture and reuse systems. Engineering-first approach, end-to-end responsibility, certified quality.",
    },
    contacts: {
      title: "Contact CO₂ Lab",
      description:
        "Talk to our CO₂ engineers about capture, purification, liquefaction and supply. Get a technical consultation and a project quote.",
    },
    supply: {
      title: "CO₂ Production and Supply",
      description:
        "Full-cycle CO₂ production and supply. From biogenic CO₂ capture to dry ice manufacturing and reliable distribution — certified quality and long-term supply.",
    },
    engineeringSolutions: {
      title: "CO₂ Engineering Solutions",
      description:
        "End-to-end CO₂ engineering: capture, purification, liquefaction, utilisation, dry ice and monitoring systems designed for industrial processes.",
    },
    equipmentAndSystems: {
      title: "CO₂ Equipment and Systems",
      description:
        "Modular CO₂ capture units, cryogenic tanks, liquefaction and purification systems. Certified equipment engineered for continuous industrial duty.",
    },
    industriesWeServe: {
      title: "Industries We Serve — CO₂ Solutions by Sector",
      description:
        "CO₂ solutions for biogas, food and beverage, chemical, recycling and logistics industries. Sector-specific capture, supply and utilisation systems.",
    },
    catalog: {
      title: "Cryogenic tanks, vaporizers and CO₂ equipment catalog",
      description:
        "Cryogenic storage tanks for liquid CO₂, nitrogen, oxygen and argon (10–100 m³), cryogenic cylinders, ambient and CO₂ vaporizers, CO₂ quality control and turnkey installation. Supply across Ukraine.",
    },
    blog: {
      title: "CO₂ Blog — Carbon Capture Insights and Industry News",
      description:
        "Articles on carbon capture, CO₂ purification, dry ice, cryogenic storage and decarbonisation of industrial processes from the CO₂ Lab engineering team.",
    },
    termsOfUse: {
      title: "Terms of Use",
      description:
        "Terms and conditions governing the use of the CO₂ Lab website and services.",
    },
    privacyPolicy: {
      title: "Privacy Policy",
      description:
        "How CO₂ Lab collects, uses and protects your personal data in accordance with GDPR.",
    },
    thanks: {
      title: "Thank you for your request",
      description: "Your enquiry has been received. Our engineers will contact you shortly.",
    },
    notFound: {
      title: "Page not found",
      description: "The page you are looking for does not exist.",
    },
  },
  pages: pagesEn,
  legal: legalEn,
};

export default en;

/** Структура словника. Усі локалі мають реалізувати той самий набір ключів. */
export type Messages = typeof en;
