import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'zh'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')

  const translations = {
    en: {
      // Header
      'header.logo': 'Awadough',
      'nav.products': 'Products',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      
      // Hero
      'hero.title': 'Artisan Bakery',
      'hero.subtitle': 'Fresh baked goods made with love and tradition',
      
      // Products
      'products.title': 'Our Products',
      'products.all': 'All Products',
      'products.showAll': 'Show All Products',
      
      // Categories
      'category.breads': 'Artisan Breads',
      'category.breads.desc': 'Freshly baked daily using traditional methods',
      'category.pastries': 'Pastries',
      'category.pastries.desc': 'Buttery, flaky pastries made with care',
      'category.cakes': 'Cakes & Desserts',
      'category.cakes.desc': 'Handcrafted cakes for every occasion',
      'category.sandwiches': 'Sandwiches & Savory',
      'category.sandwiches.desc': 'Fresh sandwiches and savory treats',
      'category.drinks': 'Coffee & Drinks',
      'category.drinks.desc': 'Artisan coffee and refreshing beverages',
      
      // Products
      'product.sourdough': 'Sourdough Loaf',
      'product.sourdough.desc': 'Traditional 24-hour fermented sourdough',
      'product.wholewheat': 'Whole Wheat Bread',
      'product.wholewheat.desc': 'Nutritious whole grain bread',
      'product.baguette': 'French Baguette',
      'product.baguette.desc': 'Crispy crust with soft interior',
      'product.rye': 'Rye Bread',
      'product.rye.desc': 'Dense, flavorful rye loaf',
      'product.croissant': 'Butter Croissant',
      'product.croissant.desc': 'Classic French butter croissant',
      'product.painchocolat': 'Pain au Chocolat',
      'product.painchocolat.desc': 'Chocolate-filled croissant',
      'product.almondcroissant': 'Almond Croissant',
      'product.almondcroissant.desc': 'Filled with almond cream',
      'product.danish': 'Danish Pastry',
      'product.danish.desc': 'Fruit-topped Danish',
      'product.victoria': 'Victoria Sponge',
      'product.victoria.desc': 'Classic British cake with jam and cream',
      'product.carrot': 'Carrot Cake',
      'product.carrot.desc': 'Moist cake with cream cheese frosting',
      'product.eclair': 'Chocolate Éclair',
      'product.eclair.desc': 'Choux pastry with chocolate glaze',
      'product.lemontart': 'Lemon Tart',
      'product.lemontart.desc': 'Tangy lemon curd in pastry shell',
      'product.hamsandwich': 'Ham & Cheese Sandwich',
      'product.hamsandwich.desc': 'Premium ham with aged cheddar',
      'product.chickenwrap': 'Chicken Avocado Wrap',
      'product.chickenwrap.desc': 'Grilled chicken with fresh avocado',
      'product.quiche': 'Vegetarian Quiche',
      'product.quiche.desc': 'Daily selection of veggie quiche',
      'product.salmon': 'Smoked Salmon Bagel',
      'product.salmon.desc': 'With cream cheese and capers',
      'product.flatwhite': 'Flat White',
      'product.flatwhite.desc': 'Double shot with steamed milk',
      'product.cappuccino': 'Cappuccino',
      'product.cappuccino.desc': 'Classic Italian coffee',
      'product.orange': 'Fresh Orange Juice',
      'product.orange.desc': 'Freshly squeezed daily',
      'product.hotchocolate': 'Artisan Hot Chocolate',
      'product.hotchocolate.desc': 'Rich Belgian chocolate',
      
      // About
      'about.title': 'Our Story',
      'about.text1': 'Founded in 2020, Awadough is dedicated to bringing you the finest artisan breads and pastries. We use traditional techniques combined with the best local ingredients.',
      'about.text2': 'Every morning, our bakers start work before dawn to ensure you get the freshest products. From our family to yours, we put love into every bite.',
      
      // Footer
      'footer.contact': 'Contact',
      'footer.ordering': 'Online Ordering',
      'footer.follow': 'Follow Us',
      'footer.orderDeadline': 'Order by Monday 12pm',
      'footer.pickup': 'Pick up Wednesday',
      'footer.delivery': 'Delivery Thursday',
      'footer.copyright': '© 2025 Awadough Bakery. All rights reserved.',
    },
    zh: {
      // Header
      'header.logo': '阿瓦面包坊',
      'nav.products': '产品',
      'nav.about': '关于我们',
      'nav.contact': '联系方式',
      
      // Hero
      'hero.title': '手工烘焙坊',
      'hero.subtitle': '用爱心和传统工艺制作的新鲜烘焙食品',
      
      // Products
      'products.title': '我们的产品',
      'products.all': '所有产品',
      'products.showAll': '显示所有产品',
      
      // Categories
      'category.breads': '手工面包',
      'category.breads.desc': '每日新鲜烘焙，采用传统工艺',
      'category.pastries': '酥点',
      'category.pastries.desc': '精心制作的黄油酥皮点心',
      'category.cakes': '蛋糕与甜点',
      'category.cakes.desc': '为各种场合手工制作的蛋糕',
      'category.sandwiches': '三明治与咸点',
      'category.sandwiches.desc': '新鲜三明治和美味咸点',
      'category.drinks': '咖啡与饮品',
      'category.drinks.desc': '手工咖啡和清爽饮品',
      
      // Products
      'product.sourdough': '酸面团面包',
      'product.sourdough.desc': '传统24小时发酵酸面团',
      'product.wholewheat': '全麦面包',
      'product.wholewheat.desc': '营养全谷物面包',
      'product.baguette': '法式长棍',
      'product.baguette.desc': '外脆内软',
      'product.rye': '黑麦面包',
      'product.rye.desc': '紧实美味的黑麦面包',
      'product.croissant': '黄油羊角包',
      'product.croissant.desc': '经典法式黄油羊角包',
      'product.painchocolat': '巧克力可颂',
      'product.painchocolat.desc': '巧克力夹心可颂',
      'product.almondcroissant': '杏仁可颂',
      'product.almondcroissant.desc': '杏仁奶油夹心',
      'product.danish': '丹麦酥',
      'product.danish.desc': '水果装饰丹麦酥',
      'product.victoria': '维多利亚海绵蛋糕',
      'product.victoria.desc': '经典英式果酱奶油蛋糕',
      'product.carrot': '胡萝卜蛋糕',
      'product.carrot.desc': '湿润蛋糕配奶油奶酪糖霜',
      'product.eclair': '巧克力闪电泡芙',
      'product.eclair.desc': '巧克力釉面泡芙',
      'product.lemontart': '柠檬塔',
      'product.lemontart.desc': '酸甜柠檬凝乳塔',
      'product.hamsandwich': '火腿奶酪三明治',
      'product.hamsandwich.desc': '优质火腿配陈年切达奶酪',
      'product.chickenwrap': '鸡肉牛油果卷',
      'product.chickenwrap.desc': '烤鸡肉配新鲜牛油果',
      'product.quiche': '素食法式咸派',
      'product.quiche.desc': '每日精选蔬菜咸派',
      'product.salmon': '烟熏三文鱼贝果',
      'product.salmon.desc': '配奶油奶酪和刺山柑',
      'product.flatwhite': '馥芮白',
      'product.flatwhite.desc': '双份浓缩配蒸奶',
      'product.cappuccino': '卡布奇诺',
      'product.cappuccino.desc': '经典意式咖啡',
      'product.orange': '鲜榨橙汁',
      'product.orange.desc': '每日新鲜榨取',
      'product.hotchocolate': '手工热巧克力',
      'product.hotchocolate.desc': '浓郁比利时巧克力',
      
      // About
      'about.title': '我们的故事',
      'about.text1': '阿瓦面包坊成立于2020年，致力于为您带来最优质的手工面包和糕点。我们采用传统技术，结合最好的本地食材。',
      'about.text2': '每天清晨，我们的面包师在黎明前就开始工作，确保您能品尝到最新鲜的产品。从我们的家人到您的家人，我们在每一口中都注入了爱。',
      
      // Footer
      'footer.contact': '联系方式',
      'footer.ordering': '在线订购',
      'footer.follow': '关注我们',
      'footer.orderDeadline': '周一中午12点前下单',
      'footer.pickup': '周三自取',
      'footer.delivery': '周四配送',
      'footer.copyright': '© 2023 阿瓦面包坊。保留所有权利。',
    }
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
