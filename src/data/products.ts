export interface Product {
  id: number | string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: 'breads',
    name: 'Artisan Breads',
    description: 'Freshly baked daily using traditional methods'
  },
  {
    id: 'pastries',
    name: 'Pastries',
    description: 'Buttery, flaky pastries made with care'
  },
  {
    id: 'cakes',
    name: 'Cakes & Desserts',
    description: 'Handcrafted cakes for every occasion'
  },
  {
    id: 'sandwiches',
    name: 'Sandwiches & Savory',
    description: 'Fresh sandwiches and savory treats'
  },
  {
    id: 'drinks',
    name: 'Coffee & Drinks',
    description: 'Artisan coffee and refreshing beverages'
  }
];

export const products: Product[] = [
  // Breads
  {
    id: 'sourdough',
    name: 'Sourdough Loaf',
    description: 'Traditional 24-hour fermented sourdough',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8fc?w=800',
    category: 'breads'
  },
  {
    id: 'wholewheat',
    name: 'Whole Wheat Bread',
    description: 'Nutritious whole grain bread',
    price: 3.75,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
    category: 'breads'
  },
  {
    id: 'baguette',
    name: 'French Baguette',
    description: 'Crispy crust with soft interior',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800',
    category: 'breads'
  },
  {
    id: 'rye',
    name: 'Rye Bread',
    description: 'Dense, flavorful rye loaf',
    price: 4.25,
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800',
    category: 'breads'
  },
  
  // Pastries
  {
    id: 'croissant',
    name: 'Butter Croissant',
    description: 'Classic French butter croissant',
    price: 3.25,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
    category: 'pastries'
  },
  {
    id: 'painchocolat',
    name: 'Pain au Chocolat',
    description: 'Chocolate-filled croissant',
    price: 3.75,
    image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=800',
    category: 'pastries'
  },
  {
    id: 'almondcroissant',
    name: 'Almond Croissant',
    description: 'Filled with almond cream',
    price: 4.25,
    image: 'https://images.unsplash.com/photo-1623334044303-241021148842?w=800',
    category: 'pastries'
  },
  {
    id: 'danish',
    name: 'Danish Pastry',
    description: 'Fruit-topped Danish',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1593536844214-608495591257?w=800',
    category: 'pastries'
  },
  
  // Cakes
  {
    id: 'victoria',
    name: 'Victoria Sponge',
    description: 'Classic British cake with jam and cream',
    price: 4.95,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    category: 'cakes'
  },
  {
    id: 'carrot',
    name: 'Carrot Cake',
    description: 'Moist cake with cream cheese frosting',
    price: 5.25,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800',
    category: 'cakes'
  },
  {
    id: 'eclair',
    name: 'Chocolate Éclair',
    description: 'Choux pastry with chocolate glaze',
    price: 3.95,
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800',
    category: 'cakes'
  },
  {
    id: 'lemontart',
    name: 'Lemon Tart',
    description: 'Tangy lemon curd in pastry shell',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800',
    category: 'cakes'
  },
  
  // Sandwiches
  {
    id: 'hamsandwich',
    name: 'Ham & Cheese Sandwich',
    description: 'Premium ham with aged cheddar',
    price: 6.95,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800',
    category: 'sandwiches'
  },
  {
    id: 'chickenwrap',
    name: 'Chicken Avocado Wrap',
    description: 'Grilled chicken with fresh avocado',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800',
    category: 'sandwiches'
  },
  {
    id: 'quiche',
    name: 'Vegetarian Quiche',
    description: 'Daily selection of veggie quiche',
    price: 5.75,
    image: 'https://images.unsplash.com/photo-1605959210877-80c936955692?w=800',
    category: 'sandwiches'
  },
  {
    id: 'salmon',
    name: 'Smoked Salmon Bagel',
    description: 'With cream cheese and capers',
    price: 8.95,
    image: 'https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?w=800',
    category: 'sandwiches'
  },
  
  // Drinks
  {
    id: 'flatwhite',
    name: 'Flat White',
    description: 'Double shot with steamed milk',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1611564494260-6f21b80af7ea?w=800',
    category: 'drinks'
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Classic Italian coffee',
    price: 3.25,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800',
    category: 'drinks'
  },
  {
    id: 'orange',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed daily',
    price: 4.25,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800',
    category: 'drinks'
  },
  {
    id: 'hotchocolate',
    name: 'Artisan Hot Chocolate',
    description: 'Rich Belgian chocolate',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=800',
    category: 'drinks'
  }
];
