export type FlowerProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  size: "Petite" | "Classic" | "Grand";
  occasion: "Romantic" | "Celebration" | "Sympathy" | "Everyday";
  colorPalette: string[];
};

export type Review = {
  id: string;
  name: string;
  avatarColor: string;
  order: string;
  message: string;
};

export const NAV_ITEMS: {
  id: "home" | "products" | "cart" | "custom";
  label: string;
}[] = [
  { id: "home", label: "Beranda" },
  { id: "products", label: "Koleksi" },
  { id: "cart", label: "Keranjang" },
  { id: "custom", label: "Custom Order" },
];

export const ADMIN_ACCOUNT = {
  email: "admin@fleurelle.id",
  password: "fleurelle123",
  name: "Admin Fleurélle",
} as const;

export const FEATURED_OCCASIONS: {
  id: FlowerProduct["occasion"];
  title: string;
  blurb: string;
}[] = [
  {
    id: "Romantic",
    title: "Romansa Sehari-Hari",
    blurb:
      "Buket lembut dengan sentuhan pastel untuk menyampaikan rasa sayang paling hangat.",
  },
  {
    id: "Celebration",
    title: "Momen Perayaan",
    blurb:
      "Warna ceria dan aroma segar untuk menyemarakkan ulang tahun maupun baby shower.",
  },
  {
    id: "Sympathy",
    title: "Kasih dan Doa",
    blurb:
      "Kombinasi putih-hijau yang menenangkan untuk menemani momen belasungkawa.",
  },
  {
    id: "Everyday",
    title: "Just Because",
    blurb:
      "Buket manis yang siap menghangatkan hari siapa pun dengan penuh kehangatan.",
  },
];

export const INITIAL_PRODUCTS: FlowerProduct[] = [
  {
    id: "blush-aurora",
    name: "Blush Aurora",
    description:
      "Rangkaian mawar asil pastel dengan ranunculus dan eucalyptus silver dollar untuk nuansa romantis yang lembut.",
    price: 650000,
    image:
      "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=900&q=80",
    size: "Classic",
    occasion: "Romantic",
    colorPalette: ["#f9c7cf", "#fae9ed", "#dfeeea"],
  },
  {
    id: "morning-dew",
    name: "Morning Dew",
    description:
      "Peony putih, lisianthus, dan daun olive memberikan kesan bersih, tulus, dan menenangkan.",
    price: 720000,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
    size: "Grand",
    occasion: "Sympathy",
    colorPalette: ["#ffffff", "#f7f7f7", "#d5e8da"],
  },
  {
    id: "sugar-petal",
    name: "Sugar Petal",
    description:
      "Campuran gerbera, spray rose, dan baby breath bernuansa pink pastel yang ceria namun elegan.",
    price: 540000,
    image:
      "https://images.unsplash.com/photo-1527885572883-8193da44d1d3?auto=format&fit=crop&w=900&q=80",
    size: "Petite",
    occasion: "Celebration",
    colorPalette: ["#fcb7c8", "#fff5f8", "#e2f0e8"],
  },
  {
    id: "sage-whisper",
    name: "Sage Whisper",
    description:
      "Anthurium hijau pucat bertemu mawar krem dan hydrangea putih untuk komposisi kontemporer.",
    price: 690000,
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
    size: "Classic",
    occasion: "Everyday",
    colorPalette: ["#fdf7f4", "#e4f1e6", "#c8d8cd"],
  },
  {
    id: "petite-souvenir",
    name: "Petite Souvenir",
    description:
      "Mini buket mawar spray dan wax flower, favorit untuk hadiah spontan penuh manis.",
    price: 320000,
    image:
      "https://images.unsplash.com/photo-1509042239860-f55d1f475aa1?auto=format&fit=crop&w=900&q=80",
    size: "Petite",
    occasion: "Everyday",
    colorPalette: ["#ffe4ec", "#fff8f1", "#d8ede1"],
  },
  {
    id: "celestial-bliss",
    name: "Celestial Bliss",
    description:
      "Tulip pastel dan ranunculus buttercream dengan aksen dusty miller untuk nuansa dreamy.",
    price: 880000,
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    size: "Grand",
    occasion: "Romantic",
    colorPalette: ["#fbe9e7", "#fdeced", "#e0f0e4"],
  },
  {
    id: "lily-cotton",
    name: "Lily Cotton",
    description:
      "Lily oriental putih, rose ivory, dan pom-pom chrysanthemum untuk sentuhan modern elegan.",
    price: 760000,
    image:
      "https://images.unsplash.com/photo-1519681392104-54f6c1c81d9d?auto=format&fit=crop&w=900&q=80",
    size: "Classic",
    occasion: "Sympathy",
    colorPalette: ["#fff8f8", "#f1f7f2", "#d8e9dd"],
  },
  {
    id: "pastel-parade",
    name: "Pastel Parade",
    description:
      "Kombinasi mawar kuning pucat, carnation peach, dan viburnum hijau memberi energi baru.",
    price: 610000,
    image:
      "https://images.unsplash.com/photo-1509042239860-8d5c8f4961d9?auto=format&fit=crop&w=900&q=80",
    size: "Classic",
    occasion: "Celebration",
    colorPalette: ["#ffe4c9", "#fff3ed", "#d8eadc"],
  },
  {
    id: "velvet-dusk",
    name: "Velvet Dusk",
    description:
      "Mawar dusty rose dan hellebores plum dengan aksen eucalyptus baby blue untuk kesan dramatis.",
    price: 710000,
    image:
      "https://images.unsplash.com/photo-1522682460632-1f77b81795f5?auto=format&fit=crop&w=900&q=80",
    size: "Classic",
    occasion: "Romantic",
    colorPalette: ["#e0aebf", "#f2d9e1", "#cbded5"],
  },
  {
    id: "spring-sonata",
    name: "Spring Sonata",
    description:
      "Ranunculus peach, sweet pea putih, dan chamomile segar menghadirkan keceriaan musim semi.",
    price: 680000,
    image:
      "https://images.unsplash.com/photo-1520256862855-398228c41684?auto=format&fit=crop&w=900&q=80",
    size: "Classic",
    occasion: "Celebration",
    colorPalette: ["#ffd8d2", "#fff0e9", "#d8e7dc"],
  },
  {
    id: "linen-breeze",
    name: "Linen Breeze",
    description:
      "Kombinasi mawar putih, dried bunny tail, dan daun olive yang elegan untuk suasana minimalis.",
    price: 590000,
    image:
      "https://images.unsplash.com/photo-1521026720998-be56677c3f1d?auto=format&fit=crop&w=900&q=80",
    size: "Petite",
    occasion: "Everyday",
    colorPalette: ["#fff8f1", "#f3f3f3", "#dbeade"],
  },
  {
    id: "garden-gleam",
    name: "Garden Gleam",
    description:
      "Hydrangea pastel, mawar spray, dan viburnum hijau membentuk buket lush penuh volume.",
    price: 940000,
    image:
      "https://images.unsplash.com/photo-1511288598101-27e89ac85d30?auto=format&fit=crop&w=900&q=80",
    size: "Grand",
    occasion: "Celebration",
    colorPalette: ["#fde0e8", "#fff2f7", "#d8eade"],
  },
  {
    id: "tender-halo",
    name: "Tender Halo",
    description:
      "Lisianthus putih, mawar blush, dan pampas mini menghadirkan buket airy untuk berbagai momen.",
    price: 670000,
    image:
      "https://images.unsplash.com/photo-1522048369776-57443dc33c73?auto=format&fit=crop&w=900&q=80",
    size: "Classic",
    occasion: "Everyday",
    colorPalette: ["#ffe8ef", "#fff5f8", "#dbeee2"],
  },
];

export const REVIEWS: Review[] = [
  {
    id: "r-anindya",
    name: "Anindya Rahma",
    avatarColor: "#f9c7cf",
    order: "Blush Aurora — Anniversary",
    message:
      "Team sangat membantu memilih buket yang pas. Pas datang, bunganya segar dan penataan warnanya lembut banget. Pasangan aku suka sekali!",
  },
  {
    id: "r-yohanes",
    name: "Yohanes Pradipta",
    avatarColor: "#d5e8da",
    order: "Custom buket baby shower",
    message:
      "Brief aku direspon cepat, hasilnya rapi dan wangi. Pengiriman juga tepat waktu, jadi nyaman banget pesan di sini.",
  },
  {
    id: "r-nadia",
    name: "Nadia Kusuma",
    avatarColor: "#fde0e8",
    order: "Pastel Parade — Ulang tahun",
    message:
      "Warnanya persis seperti di foto, lembut tapi tetap ceria. Bunganya bertahan cantik sampai beberapa hari. Rekomen!",
  },
];

export const PRODUCTS = INITIAL_PRODUCTS;
