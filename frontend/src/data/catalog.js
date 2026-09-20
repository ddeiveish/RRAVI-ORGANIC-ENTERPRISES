export const CONTACT = {
  person: "Ravi Dwivedi",
  phones: ["+91 7570055669", "+91 7570016699"],
  emails: ["ravie5702@gmail.com", "deiveishdiwaakardwivedi@gmail.com"],
  location: "Uttar Pradesh, India",
};

export const waLink = (message) =>
  `https://wa.me/917570055669?text=${encodeURIComponent(message)}`;

export const DEFAULT_WA_MESSAGE =
  "Hello RRAVI ORGANIC ENTERPRISES, I'm interested in sourcing botanical products from India. Please share your catalogue and pricing.";

export const HERO_IMAGES = {
  farm: "https://images.unsplash.com/photo-1708592190037-a1b08aacf4ff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA5NzR8MHwxfHNlYXJjaHwzfHxvcmdhbmljJTIwZmFybSUyMGluZGlhJTIwaGFydmVzdCUyMGdyZWVuJTIwZmllbGQlMjBoZXJicyUyMGNhcmdvJTIwZXhwb3J0fGVufDB8fHx8MTc4OTkwOTI4OHww&ixlib=rb-4.1.0&q=85",
  sorting:
    "https://images.pexels.com/photos/20223766/pexels-photo-20223766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

export const MARQUEE_ITEMS = [
  "Ashwagandha",
  "Turmeric",
  "Moringa",
  "Shilajit",
  "Tulsi",
  "Neem",
  "Amla",
  "Ginger",
  "Brahmi",
  "Sandalwood",
  "Hibiscus",
  "Rosemary",
];

export const CATEGORIES = [
  {
    id: "herbal-extracts",
    num: "01",
    name: "Herbal Extracts",
    short: "Extracts",
    tagline:
      "Pure, potent, and naturally processed botanical extracts optimized for industrial and formulation stability.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=85&w=1200&auto=format&fit=crop",
    groups: [
      {
        title: "Premium Extracts",
        items: ["Ashwagandha", "Tulsi", "Shilajit", "Amla", "Boswellia Serrata", "Arjuna", "Chamomile"],
      },
      {
        title: "Botanical & Phytochemical Leaf Profiles",
        items: ["Rosemary", "Green Tea", "Ginkgo Biloba", "Henna Leaf", "Ivy Gourd", "Mulberry Leaf", "White Tea", "Sage Leaf"],
      },
      {
        title: "Seed, Root & Cortical Fractions",
        items: ["Fenugreek Seed", "Celery Seed", "Calamus Root", "Wild Yam", "Pumpkin Seed", "Pine Bark", "Kutki"],
      },
      {
        title: "Nutraceutical Isolates & Specializations",
        items: ["Resveratrol", "L-Theanine Powder", "Quercetin", "Omega-3 Powder"],
      },
    ],
  },
  {
    id: "premium-herbal-powders",
    num: "02",
    name: "Premium Herbal Powders",
    short: "Herbal Powders",
    tagline:
      "100% natural, nutrient-dense botanical milling, naturally processed to retain their beneficial properties.",
    image:
      "https://images.unsplash.com/photo-1615485500834-bc10199bc727?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHw0fHxoZXJiYWwlMjBleHRyYWN0cyUyMG9yZ2FuaWMlMjBwb3dkZXIlMjBzcGljZXMlMjB0dXJtZXJpYyUyMG1vcmluZ2F8ZW58MHx8fHwxNzg5OTA5Mjg4fDA&ixlib=rb-4.1.0&q=85",
    groups: [
      {
        title: "Ayurvedic & Wellness Matrices",
        items: ["Amla", "Bhringraj", "Brahmi", "Ashwagandha", "Shatavari", "Tulsi", "Giloy", "Hibiscus", "Fenugreek"],
      },
      {
        title: "Herbal & Culinary Matrices",
        items: ["Curry Leaves", "Mint", "Coriander", "Aloe Vera", "Arjuna", "Bael", "Jamun", "Triphala", "Isabgol", "Shikakai", "Reetha"],
      },
      {
        title: "Rhizomes, Alliums & Functional Spices",
        items: ["Turmeric", "Ginger", "Garlic", "Onion", "Kalonji", "Manjistha", "Nagarmotha", "Vetiver", "Licorice", "Senna", "Karela", "Drumstick", "Spirulina"],
      },
      {
        title: "Cosmetic Clays & Precious Woods",
        items: ["Multani Mitti", "Sandalwood"],
      },
    ],
  },
  {
    id: "therapeutic-herbal-oils",
    num: "03",
    name: "Therapeutic Herbal Oils",
    short: "Herbal Oils",
    tagline:
      "Premium natural, cold-pressed and therapeutic oils maintaining full biochemical integrity for global standards.",
    image:
      "https://images.pexels.com/photos/6694188/pexels-photo-6694188.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    groups: [
      {
        title: "Essential Carriers & Core Lipid Bases",
        items: ["Neem", "Amla", "Bhringraj", "Brahmi", "Coconut", "Castor", "Jojoba", "Argan", "Almond", "Sesame", "Mustard"],
      },
      {
        title: "Aromatic & Volatile Fractions",
        items: ["Tea Tree", "Eucalyptus", "Peppermint", "Lavender", "Rosemary", "Lemongrass", "Clove", "Cinnamon", "Patchouli", "Sandalwood"],
      },
      {
        title: "Targeted Biological Oils",
        items: ["Turmeric", "Tulsi", "Onion", "Garlic", "Hibiscus", "Fenugreek", "Ashwagandha", "Shatavari", "Kalonji", "Camphor", "Bael", "Guduchi", "Manjistha", "Nagarmotha", "Vetiver"],
      },
    ],
  },
  {
    id: "dehydrated-fruit-powders",
    num: "04",
    name: "Dehydrated Fruit Powders & Extracts",
    short: "Fruit Powders",
    tagline:
      "Vibrant, raw-material selected fruit concentrates rich in natural vitamins and antioxidant compounds.",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=85&w=1200&auto=format&fit=crop",
    groups: [
      {
        title: "Pomaceous, Citrus & Tropical Profiles",
        items: ["Grapefruit", "Mosambi", "Mango", "Banana", "Apple", "Pineapple", "Orange", "Lemon", "Papaya", "Pomegranate", "Guava", "Avocado"],
      },
      {
        title: "Berry & Core Traditional Fruits",
        items: ["Amla", "Bael Fruit", "Jamun", "Tamarind", "Kokum", "Mangosteen", "Sea Buckthorn", "Noni Fruit", "Elderberry", "Mulberry", "Grapes", "Strawberry", "Blueberry", "Raspberry", "Blackberry", "Cherry", "Cranberry", "Kiwi", "Dragon Fruit", "Passion Fruit", "Fig"],
      },
    ],
  },
  {
    id: "functional-vegetable-root-powders",
    num: "05",
    name: "Functional Vegetable & Root Powders",
    short: "Veg & Root",
    tagline:
      "Dehydrated whole food matrices designed for high solubility, dietary fiber retention, and clean labels.",
    image:
      "https://images.unsplash.com/photo-1606914469633-bd39206ea739?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwzfHxoZXJiYWwlMjBleHRyYWN0cyUyMG9yZ2FuaWMlMjBwb3dkZXIlMjBzcGljZXMlMjB0dXJtZXJpYyUyMG1vcmluZ2F8ZW58MHx8fHwxNzg5OTA5Mjg4fDA&ixlib=rb-4.1.0&q=85",
    groups: [
      {
        title: "Vegetable Concentrates",
        items: ["Potato", "Carrot", "Ginger", "Spinach", "Tomato", "Beetroot", "Onion", "Garlic", "Cabbage", "Broccoli", "Pumpkin", "Sweet Potato", "Green Peas", "Capsicum", "Bottle Gourd", "Bitter Gourd", "Drumstick", "Fenugreek Leaves", "Coriander Leaves", "Mint Leaves", "Curry Leaves", "Radish", "Turnip", "Cauliflower", "Zucchini", "Eggplant", "Okra", "Celery", "Parsley", "Kale", "Leek"],
      },
      {
        title: "Medicinal & Adaptogenic Roots",
        items: ["Ashwagandha", "Shatavari", "Turmeric", "Ginseng", "Ginger", "Beetroot", "Chicory", "Arrowroot", "Yam", "Carrot", "Licorice (Mulethi)", "Vetiver", "Safed Musli", "Kalmegh", "Kutki", "Lotus", "Rhubarb", "Costus"],
      },
    ],
  },
  {
    id: "seeds-flowers-carom",
    num: "06",
    name: "Seeds, Flowers & Carom Derivatives",
    short: "Seeds & Flowers",
    tagline:
      "Selected visual and biochemical grade reproductive plant structures for premium cosmetics and nutraceuticals.",
    image:
      "https://images.pexels.com/photos/7526031/pexels-photo-7526031.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    groups: [
      {
        title: "Flower Petal Powders",
        items: ["Rose", "Hibiscus", "Chamomile", "Lavender", "Jasmine", "Lotus", "Blue Pea", "Safflower", "Nagkesar", "Palash", "Kewra", "Mogra", "Tuberose", "Daisy", "Marigold", "Calendula", "Chrysanthemum", "Sunflower Petal", "Peony", "Elder Flower", "Orange Blossom", "Geranium", "Passion Flower", "Clitoria Ternatea", "Magnolia"],
      },
      {
        title: "Whole Botanical Seeds",
        items: ["Chia", "Poppy", "Pumpkin", "Hemp", "Flax", "Sunflower", "Sesame (White/Black)", "Watermelon", "Muskmelon", "Basil (Sabja)", "Quinoa", "Mustard", "Cumin", "Coriander", "Fennel", "Ajwain", "Fenugreek", "Nigella (Kalonji)", "Amaranth (Rajgira)", "Garden Cress (Aliv)", "Lotus (Makhana)", "Caraway", "Dill", "Anise"],
      },
      {
        title: "Fine-Ground Seed Powders",
        items: ["Ajwain", "Cumin", "Coriander", "Fenugreek", "Mustard", "Black Pepper", "White Pepper", "Celery", "Dill", "Carom", "Anise", "Castor", "Cardamom", "Flaxseed", "Chia", "Pumpkin", "Sunflower", "Nigella (Kalonji)", "Basil (Sabja)", "Watermelon", "Muskmelon", "Poppy", "Hemp"],
      },
    ],
  },
  {
    id: "authentic-bark-powders",
    num: "07",
    name: "Authentic Bark Powders",
    short: "Bark Powders",
    tagline:
      "Sterile-processed tree bark millings preserving high concentrations of tannins and primary active phytochemicals.",
    image:
      "https://images.unsplash.com/photo-1702041295331-840d4d9aa7c9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwyfHxoZXJiYWwlMjBleHRyYWN0cyUyMG9yZ2FuaWMlMjBwb3dkZXIlMjBzcGljZXMlMjB0dXJtZXJpYyUyMG1vcmluZ2F8ZW58MHx8fHwxNzg5OTA5Mjg4fDA&ixlib=rb-4.1.0&q=85",
    groups: [
      {
        title: "Available Selections",
        items: ["Arjuna", "Cinnamon", "Neem", "Babool", "Ashoka", "Willow", "Pine", "Oak", "Cascara", "Slippery Elm", "Magnolia", "Quassia", "Kurchi", "Lodhra", "Tejpat", "Sal", "Khair", "Devdaru", "Palash", "Varun", "Shirish", "Gular", "Peepal", "Jamun", "Ber"],
      },
    ],
  },
  {
    id: "moringa-range",
    num: "08",
    name: "Moringa Product Range",
    short: "Moringa",
    tagline:
      "The miracle tree, whole-plant — EU/US certified premium organic grades available as per requirement.",
    image:
      "https://images.pexels.com/photos/20527455/pexels-photo-20527455.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    groups: [
      { title: "Powders", items: ["Herbal — EU/US Certified Premium Organic (grades as per requirement)"] },
      { title: "Raw Products", items: ["Fresh Leaves", "Moringa Stem", "Roots", "Drumsticks", "Flower"] },
      { title: "Supplements", items: ["Capsules", "Tablets"] },
      { title: "Teas", items: ["Moringa Herbal Tea Chamomile", "Moringa Herbal Tea Tulsi"] },
      { title: "Oils", items: ["Moringa Pain Relief Oil", "Moringa Seed Oil", "Moringa Hair Oil"] },
    ],
  },
];

export const TOTAL_PRODUCTS = CATEGORIES.reduce(
  (sum, c) => sum + c.groups.reduce((s, g) => s + g.items.length, 0),
  0
);

export const MANIFESTO = [
  {
    num: "01",
    title: "Dependable Sourcing",
    text: "We work only with trusted, established and certified manufacturers and suppliers across India — so every product we quote is one we can actually deliver.",
  },
  {
    num: "02",
    title: "Consistent Quality",
    text: "Products are sourced to meet the standards of our overseas buyers, with the same specification honoured shipment after shipment.",
  },
  {
    num: "03",
    title: "Competitive Pricing",
    text: "Direct relationships with growers and processors keep our pricing sharp — without cutting corners on grade or handling.",
  },
  {
    num: "04",
    title: "Clear Communication",
    text: "One point of contact, honest timelines, and updates at every step of the buying process. No surprises, ever.",
  },
];
