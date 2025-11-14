export type FlowerProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  size: "Petite" | "Classic" | "Grand";
  occasion: "Romantic" | "Celebration" | "Sympathy" | "Everyday";
  colorPalette: string[];
  category: "buket-bunga" | "bunga-meja" | "modern-pastel-flower" | "papan-bunga-congratulation";
};

export const PRODUCT_CATEGORIES = [
  { id: "buket-bunga", label: "Buket Bunga" },
  { id: "bunga-meja", label: "Bunga Meja" },
  { id: "modern-pastel-flower", label: "Modern Pastel Flower" },
  { id: "papan-bunga-congratulation", label: "Papan Bunga Congratulation" },
] as const;

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
  // Kategori: Buket Bunga
  {
    id: "buket-romantic-blush",
    name: "Buket Romantic Blush",
    description:
      "Rangkaian mawar pastel dengan ranunculus dan eucalyptus silver dollar untuk nuansa romantis yang lembut. Sempurna untuk menyampaikan rasa sayang.",
    price: 650000,
    image:
      "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=900&q=80",
    size: "Classic",
    occasion: "Romantic",
    colorPalette: ["#f9c7cf", "#fae9ed", "#dfeeea"],
    category: "buket-bunga",
  },
  {
    id: "buket-celebration-pastel",
    name: "Buket Celebration Pastel",
    description:
      "Campuran gerbera, spray rose, dan baby breath bernuansa pink pastel yang ceria namun elegan. Cocok untuk merayakan momen bahagia.",
    price: 540000,
    image:
      "https://images.unsplash.com/photo-1527885572883-8193da44d1d3?auto=format&fit=crop&w=900&q=80",
    size: "Petite",
    occasion: "Celebration",
    colorPalette: ["#fcb7c8", "#fff5f8", "#e2f0e8"],
    category: "buket-bunga",
  },
  {
    id: "buket-elegant-white",
    name: "Buket Elegant White",
    description:
      "Peony putih, lisianthus, dan daun olive memberikan kesan bersih, tulus, dan menenangkan. Ideal untuk berbagai momen spesial.",
    price: 720000,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
    size: "Grand",
    occasion: "Sympathy",
    colorPalette: ["#ffffff", "#f7f7f7", "#d5e8da"],
    category: "buket-bunga",
  },
  {
    id: "buket-sweet-mini",
    name: "Buket Sweet Mini",
    description:
      "Mini buket mawar spray dan wax flower, favorit untuk hadiah spontan penuh manis. Ukuran compact yang mudah dibawa.",
    price: 320000,
    image:
      "https://images.unsplash.com/photo-1509042239860-f55d1f475aa1?auto=format&fit=crop&w=900&q=80",
    size: "Petite",
    occasion: "Everyday",
    colorPalette: ["#ffe4ec", "#fff8f1", "#d8ede1"],
    category: "buket-bunga",
  },
  // Kategori: Bunga Meja
  {
    id: "meja-classic-pastel",
    name: "Bunga Meja Classic Pastel",
    description:
      "Rangkaian bunga meja elegan dengan kombinasi mawar pastel, eucalyptus, dan baby breath. Sempurna untuk menghias meja makan atau meja kerja dengan sentuhan natural yang menenangkan.",
    price: 450000,
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
    size: "Petite",
    occasion: "Everyday",
    colorPalette: ["#f9dce4", "#fff7f4", "#dbeee1"],
    category: "bunga-meja",
  },
  {
    id: "meja-minimalist-white",
    name: "Bunga Meja Minimalist White",
    description:
      "Komposisi bunga putih minimalis dengan mawar, eucalyptus, dan baby breath. Cocok untuk dekorasi meja kerja atau meja makan dengan gaya modern.",
    price: 420000,
    image:
      "https://images.unsplash.com/photo-1521026720998-be56677c3f1d?auto=format&fit=crop&w=900&q=80",
    size: "Petite",
    occasion: "Everyday",
    colorPalette: ["#fff8f1", "#f3f3f3", "#dbeade"],
    category: "bunga-meja",
  },
  {
    id: "meja-luxury-arrangement",
    name: "Bunga Meja Luxury Arrangement",
    description:
      "Rangkaian bunga meja mewah dengan peony, ranunculus, dan hydrangea dalam vas elegan. Menghadirkan kesan premium untuk acara penting.",
    price: 680000,
    image:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=900&q=80",
    size: "Classic",
    occasion: "Celebration",
    colorPalette: ["#fdeff2", "#fff5f8", "#e4f1e6"],
    category: "bunga-meja",
  },
  // Kategori: Modern Pastel Flower
  {
    id: "modern-pastel-contemporary",
    name: "Modern Pastel Flower Contemporary",
    description:
      "Komposisi bunga modern dengan palet pastel kontemporer. Menggabungkan ranunculus, peony, dan lisianthus dalam vas minimalis untuk dekorasi ruangan yang stylish dan fresh.",
    price: 780000,
    image:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=900&q=80",
    size: "Grand",
    occasion: "Celebration",
    colorPalette: ["#fdeff2", "#fff5f8", "#e4f1e6"],
    category: "modern-pastel-flower",
  },
  {
    id: "modern-pastel-dreamy",
    name: "Modern Pastel Flower Dreamy",
    description:
      "Tulip pastel dan ranunculus buttercream dengan aksen dusty miller untuk nuansa dreamy. Desain modern yang cocok untuk interior kontemporer.",
    price: 880000,
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    size: "Grand",
    occasion: "Romantic",
    colorPalette: ["#fbe9e7", "#fdeced", "#e0f0e4"],
    category: "modern-pastel-flower",
  },
  {
    id: "modern-pastel-lush",
    name: "Modern Pastel Flower Lush",
    description:
      "Hydrangea pastel, mawar spray, dan viburnum hijau membentuk komposisi lush penuh volume. Gaya modern yang memukau untuk dekorasi ruangan.",
    price: 940000,
    image:
      "https://images.unsplash.com/photo-1511288598101-27e89ac85d30?auto=format&fit=crop&w=900&q=80",
    size: "Grand",
    occasion: "Celebration",
    colorPalette: ["#fde0e8", "#fff2f7", "#d8eade"],
    category: "modern-pastel-flower",
  },
  // Kategori: Papan Bunga Congratulation
  {
    id: "papan-congratulation-elegant",
    name: "Papan Bunga Congratulation Elegant",
    description:
      "Papan bunga ucapan selamat dengan desain mewah dan elegan. Dihiasi rangkaian bunga segar dalam bentuk papan yang cocok untuk wisuda, promosi, atau momen prestasi lainnya.",
    price: 1200000,
    image:
      "https://images.unsplash.com/photo-1582794543139-8ac38803e6c8?auto=format&fit=crop&w=900&q=80",
    size: "Grand",
    occasion: "Celebration",
    colorPalette: ["#ffe4ec", "#fff8f1", "#d8eade"],
    category: "papan-bunga-congratulation",
  },
  {
    id: "papan-congratulation-luxury",
    name: "Papan Bunga Congratulation Luxury",
    description:
      "Papan bunga ucapan selamat dengan desain mewah dan mewah. Kombinasi bunga premium dengan dekorasi pita dan aksesori elegan untuk momen spesial.",
    price: 1500000,
    image:
      "https://images.unsplash.com/photo-1520256862855-398228c41684?auto=format&fit=crop&w=900&q=80",
    size: "Grand",
    occasion: "Celebration",
    colorPalette: ["#ffd8d2", "#fff0e9", "#d8e7dc"],
    category: "papan-bunga-congratulation",
  },
  {
    id: "papan-congratulation-grand",
    name: "Papan Bunga Congratulation Grand",
    description:
      "Papan bunga ucapan selamat ukuran besar dengan rangkaian bunga segar yang melimpah. Sempurna untuk acara besar seperti wisuda atau promosi jabatan.",
    price: 1800000,
    image:
      "https://images.unsplash.com/photo-1509042239860-8d5c8f4961d9?auto=format&fit=crop&w=900&q=80",
    size: "Grand",
    occasion: "Celebration",
    colorPalette: ["#ffe4c9", "#fff3ed", "#d8eadc"],
    category: "papan-bunga-congratulation",
  },
  // Tambahan produk Buket Bunga
  {
    id: "buket-spring-garden",
    name: "Buket Spring Garden",
    description:
      "Rangkaian bunga segar dengan warna-warni pastel yang ceria. Kombinasi tulip, daisy, dan baby breath untuk nuansa musim semi yang menyegarkan.",
    price: 580000,
    image:
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=900&q=80",
    size: "Classic",
    occasion: "Celebration",
    colorPalette: ["#ffe4ec", "#fff5f8", "#dbeee2"],
    category: "buket-bunga",
  },
  {
    id: "buket-lavender-dream",
    name: "Buket Lavender Dream",
    description:
      "Buket elegan dengan sentuhan lavender dan ungu pastel. Mawar lavender, eucalyptus, dan statice menciptakan kesan dreamy dan romantis.",
    price: 720000,
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
    size: "Grand",
    occasion: "Romantic",
    colorPalette: ["#e0d4e8", "#f5f0f8", "#d8eade"],
    category: "buket-bunga",
  },
  // Tambahan produk Bunga Meja
  {
    id: "meja-romantic-centerpiece",
    name: "Bunga Meja Romantic Centerpiece",
    description:
      "Centerpiece bunga meja dengan mawar merah muda dan peony putih. Sempurna untuk dekorasi meja makan romantis atau acara spesial.",
    price: 550000,
    image:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=900&q=80",
    size: "Classic",
    occasion: "Romantic",
    colorPalette: ["#f9c7cf", "#fdeff2", "#dfeeea"],
    category: "bunga-meja",
  },
  {
    id: "meja-minimalist-elegance",
    name: "Bunga Meja Minimalist Elegance",
    description:
      "Rangkaian bunga meja minimalis dengan fokus pada kesederhanaan dan keanggunan. Cocok untuk dekorasi meja kerja modern.",
    price: 480000,
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
    size: "Petite",
    occasion: "Everyday",
    colorPalette: ["#fff8f1", "#f3f3f3", "#dbeade"],
    category: "bunga-meja",
  },
  // Tambahan produk Modern Pastel Flower
  {
    id: "modern-pastel-serenity",
    name: "Modern Pastel Flower Serenity",
    description:
      "Komposisi bunga modern dengan nuansa tenang dan menenangkan. Kombinasi pastel soft yang cocok untuk ruangan dengan tema zen.",
    price: 850000,
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    size: "Grand",
    occasion: "Everyday",
    colorPalette: ["#fbe9e7", "#fdeced", "#e0f0e4"],
    category: "modern-pastel-flower",
  },
  {
    id: "modern-pastel-vibrant",
    name: "Modern Pastel Flower Vibrant",
    description:
      "Rangkaian bunga modern dengan warna pastel yang lebih vibrant. Menghadirkan energi positif dan keceriaan untuk ruangan.",
    price: 920000,
    image:
      "https://images.unsplash.com/photo-1511288598101-27e89ac85d30?auto=format&fit=crop&w=900&q=80",
    size: "Grand",
    occasion: "Celebration",
    colorPalette: ["#fde0e8", "#fff2f7", "#d8eade"],
    category: "modern-pastel-flower",
  },
  // Tambahan produk Papan Bunga Congratulation
  {
    id: "papan-congratulation-deluxe",
    name: "Papan Bunga Congratulation Deluxe",
    description:
      "Papan bunga ucapan selamat dengan desain deluxe dan premium. Dilengkapi dengan dekorasi pita emas dan aksesori mewah.",
    price: 2000000,
    image:
      "https://images.unsplash.com/photo-1582794543139-8ac38803e6c8?auto=format&fit=crop&w=900&q=80",
    size: "Grand",
    occasion: "Celebration",
    colorPalette: ["#ffe4ec", "#fff8f1", "#d8eade"],
    category: "papan-bunga-congratulation",
  },
  {
    id: "papan-congratulation-standard",
    name: "Papan Bunga Congratulation Standard",
    description:
      "Papan bunga ucapan selamat dengan ukuran standar. Cocok untuk berbagai acara seperti ulang tahun, promosi, atau achievement lainnya.",
    price: 950000,
    image:
      "https://images.unsplash.com/photo-1520256862855-398228c41684?auto=format&fit=crop&w=900&q=80",
    size: "Classic",
    occasion: "Celebration",
    colorPalette: ["#ffd8d2", "#fff0e9", "#d8e7dc"],
    category: "papan-bunga-congratulation",
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
