import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";

export type Condition = "Excellent condition" | "Very good condition" | "Good condition";

export type Product = {
  id: string;
  brand: string;
  model: string;
  price: number;
  oldPrice?: number;
  category: string;
  color: string;
  sizes: number[];
  condition: Condition;
  conditionNotes: string;
  restoration: string;
  description: string;
  images: string[];
  stock: number;
  tags: ("featured" | "new" | "trending" | "sale" | "limited")[];
  addedAt: string;
};

export const CATEGORIES = [
  "Sneakers",
  "Boots",
  "Loafers",
  "Heels",
  "Vintage",
  "Limited Edition",
  "New Arrivals",
  "Sale",
] as const;

export const products: Product[] = [
  {
    id: "samba-cream-og",
    brand: "Adidas",
    model: "Samba OG 'Cream Leather'",
    price: 2490,
    category: "Sneakers",
    color: "Off-white",
    sizes: [40, 41, 42, 43, 44],
    condition: "Excellent condition",
    conditionNotes: "Nästan omärkt. Mycket lätt patina på gummisulan, inga repor i lädret.",
    restoration: "Djuprengjord, sulan blekt och ny vaxad snörning monterad.",
    description:
      "Den ikoniska Samba i mjukt gräddvitt läder med mockadetaljer. En tidlös silhuett som fungerar lika bra till kostym som till baggy denim.",
    images: [p7, p1, p8],
    stock: 3,
    tags: ["featured", "trending"],
    addedAt: "2026-08-20",
  },
  {
    id: "grey-suede-runner",
    brand: "New Balance",
    model: "990 Grey Suede",
    price: 1890,
    oldPrice: 2290,
    category: "Sneakers",
    color: "Grå",
    sizes: [39, 40, 42, 45],
    condition: "Very good condition",
    conditionNotes: "Lätt slitage på mockan vid tåhättan. Insidan fräsch, inga hål.",
    restoration: "Mockan uppborstad och färguppfriskad, mellansula rengjord.",
    description:
      "Grå mocka, mesh och en mellansula byggd för komfort. Den tysta lyxens löparsko – lika hemma i studion som på gatan.",
    images: [p1, p8, p7],
    stock: 2,
    tags: ["sale", "trending"],
    addedAt: "2026-08-02",
  },
  {
    id: "chelsea-cognac",
    brand: "Church's",
    model: "Chelsea Boot Cognac",
    price: 3450,
    category: "Boots",
    color: "Brun",
    sizes: [41, 42, 43, 44],
    condition: "Excellent condition",
    conditionNotes: "Läderet i toppskick. Endast diskreta veck över vristen.",
    restoration: "Ny gummiklack, näring och polering av hela ovanlädret.",
    description:
      "Handsydd chelsea i cognacfärgat kalvskinn med elastiska sidor och stackad klack. Bygger patina snyggare för varje år.",
    images: [p2, p8],
    stock: 1,
    tags: ["featured", "new"],
    addedAt: "2026-09-01",
  },
  {
    id: "patent-loafer-gold",
    brand: "Gucci",
    model: "Horsebit Loafer Patent",
    price: 4290,
    category: "Loafers",
    color: "Svart",
    sizes: [38, 39, 40, 41, 42],
    condition: "Very good condition",
    conditionNotes: "En mycket fin repa på höger häl, syns knappt. Beslagen är utan missfärgning.",
    restoration: "Lackläder polerat, innersula ersatt och kantfärg lagad.",
    description:
      "Svart lackläder med guldfärgat beslag. En loafer som lyfter allt från kritstrecksrandigt till slitna jeans.",
    images: [p3, p8],
    stock: 2,
    tags: ["featured", "limited"],
    addedAt: "2026-08-28",
  },
  {
    id: "red-pump-90",
    brand: "Prada",
    model: "Pointed Pump 90",
    price: 3190,
    category: "Heels",
    color: "Röd",
    sizes: [36, 37, 38, 39],
    condition: "Excellent condition",
    conditionNotes: "Använd en gång. Klacktoppar som nya.",
    restoration: "Nya klacktoppar och skyddsfilm under framfoten.",
    description:
      "Spetsig pump i högblank röd lack. 90 mm klack, italienskt hantverk, en statement-sko i renaste form.",
    images: [p4, p8],
    stock: 1,
    tags: ["new", "trending"],
    addedAt: "2026-09-05",
  },
  {
    id: "vintage-runner-84",
    brand: "Nike",
    model: "Vintage Runner '84",
    price: 2790,
    category: "Vintage",
    color: "Beige",
    sizes: [40, 41, 43],
    condition: "Good condition",
    conditionNotes:
      "Äkta vintage. Gulnad mellansula, mindre fläckar på mocka och synligt slitage vid häl – allt fotograferat.",
    restoration: "Skummet i mellansulan förstärkt, mocka rengjord, originalsnörning behållen.",
    description:
      "En löpare från mitten av åttiotalet i beige mesh och marinblå detaljer. Bärbar historia, restaurerad för att hålla i många år till.",
    images: [p5, p8],
    stock: 1,
    tags: ["featured", "limited"],
    addedAt: "2026-07-18",
  },
  {
    id: "black-gold-hightop",
    brand: "Jordan",
    model: "High 'Black & Gold'",
    price: 5490,
    category: "Limited Edition",
    color: "Svart",
    sizes: [41, 42, 44, 45],
    condition: "Excellent condition",
    conditionNotes: "Deadstock-nära. Ingen bärning utomhus, originalkartong ingår.",
    restoration: "Endast kontrollerad och konserverad – ingen restaurering behövd.",
    description:
      "Svart läder med metalliskt guld. Begränsad upplaga som sällan dyker upp i den här storleksskalan.",
    images: [p6, p8],
    stock: 1,
    tags: ["trending", "limited", "new"],
    addedAt: "2026-09-08",
  },
  {
    id: "street-court-cream",
    brand: "Converse",
    model: "Court Cream Leather",
    price: 1290,
    oldPrice: 1690,
    category: "Sale",
    color: "Off-white",
    sizes: [38, 39, 40, 41, 42, 43],
    condition: "Good condition",
    conditionNotes: "Synligt bärslitage på sulkanten och en liten fläck på vänster tå.",
    restoration: "Kemtvättad, sulkant vitad och nya snören.",
    description:
      "En låg court-modell i gräddvitt läder. Enkel, sliten på rätt sätt och prisvärd väg in i arkivet.",
    images: [p7, p1],
    stock: 4,
    tags: ["sale"],
    addedAt: "2026-06-30",
  },
];

export const BRANDS = [...new Set(products.map((p) => p.brand))].sort();
export const COLORS = [...new Set(products.map((p) => p.color))].sort();
export const SIZES = [...new Set(products.flatMap((p) => p.sizes))].sort((a, b) => a - b);
export const CONDITIONS: Condition[] = [
  "Excellent condition",
  "Very good condition",
  "Good condition",
];

export const formatPrice = (v: number) => `${v.toLocaleString("sv-SE")} kr`;

export const getProduct = (id: string) => products.find((p) => p.id === id);
