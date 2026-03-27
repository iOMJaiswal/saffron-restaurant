import 'dotenv/config';
import sql from './db.js';

async function seed() {
  // Create schema
  await sql`
    CREATE TABLE IF NOT EXISTS menu_items (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price NUMERIC NOT NULL,
      description TEXT,
      image_url TEXT,
      is_veg SMALLINT DEFAULT 0,
      is_special SMALLINT DEFAULT 0,
      spice_level SMALLINT DEFAULT 1,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      booking_ref TEXT UNIQUE NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      adults INTEGER DEFAULT 2,
      children INTEGER DEFAULT 0,
      occasion TEXT,
      occasion_note TEXT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      special_requests TEXT,
      dietary_requirements TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  // Clear existing data
  await sql`DELETE FROM bookings`;
  await sql`DELETE FROM menu_items`;

const menuItems = [
  // Starters
  {
    name: 'Seekh Kebab',
    category: 'Starters',
    price: 495,
    description: 'Hand-minced lamb skewers infused with aromatic spices, chargrilled in our tandoor and served with mint chutney.',
    image_url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',
    is_veg: 0,
    is_special: 1,
    spice_level: 2
  },
  {
    name: 'Paneer Tikka',
    category: 'Starters',
    price: 425,
    description: 'Cubes of fresh cottage cheese marinated in saffron yoghurt, roasted to perfection in the tandoor.',
    image_url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',
    is_veg: 1,
    is_special: 0,
    spice_level: 1
  },
  {
    name: 'Malai Broccoli',
    category: 'Starters',
    price: 395,
    description: 'Tender broccoli florets coated in a rich cashew and cream marinade, lightly charred.',
    image_url: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400',
    is_veg: 1,
    is_special: 0,
    spice_level: 1
  },
  {
    name: 'Rawas Fish Tikka',
    category: 'Starters',
    price: 595,
    description: 'Indian salmon fillets marinated in Kashmiri chilli and carom seeds, cooked in the tandoor.',
    image_url: 'https://images.unsplash.com/photo-1606491956689-2ea866880049?w=400',
    is_veg: 0,
    is_special: 1,
    spice_level: 2
  },
  {
    name: 'Dahi Ke Sholay',
    category: 'Starters',
    price: 375,
    description: 'Crispy hung-curd rolls stuffed with spiced lentils, served with tamarind glaze.',
    image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
    is_veg: 1,
    is_special: 0,
    spice_level: 1
  },
  {
    name: 'Gilafi Kebab',
    category: 'Starters',
    price: 525,
    description: 'Succulent minced lamb kebabs wrapped with peppers and onions, grilled on skewers.',
    image_url: 'https://images.unsplash.com/photo-1628294896516-344152572ee8?w=400',
    is_veg: 0,
    is_special: 0,
    spice_level: 2
  },

  // Breads
  {
    name: 'Garlic Naan',
    category: 'Breads',
    price: 125,
    description: 'Soft leavened bread topped with roasted garlic and fresh coriander from our tandoor.',
    image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
    is_veg: 1,
    is_special: 0,
    spice_level: 1
  },
  {
    name: 'Laccha Paratha',
    category: 'Breads',
    price: 115,
    description: 'Multi-layered flaky whole wheat bread, crisped to golden perfection.',
    image_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
    is_veg: 1,
    is_special: 0,
    spice_level: 1
  },
  {
    name: 'Missi Roti',
    category: 'Breads',
    price: 105,
    description: 'Rustic gram flour flatbread seasoned with spices and fresh herbs.',
    image_url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400',
    is_veg: 1,
    is_special: 0,
    spice_level: 1
  },
  {
    name: 'Peshwari Naan',
    category: 'Breads',
    price: 155,
    description: 'Sweet naan stuffed with coconut, raisins, and crushed almonds.',
    image_url: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400',
    is_veg: 1,
    is_special: 1,
    spice_level: 1
  },
  {
    name: 'Kulcha',
    category: 'Breads',
    price: 135,
    description: 'Stuffed leavened bread with spiced potato and onion filling, baked in the tandoor.',
    image_url: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400',
    is_veg: 1,
    is_special: 0,
    spice_level: 1
  },

  // Mains
  {
    name: 'Dal Makhani',
    category: 'Mains',
    price: 445,
    description: 'Black lentils slow-cooked overnight with butter, cream, and smoky spices. A Saffron signature.',
    image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
    is_veg: 1,
    is_special: 1,
    spice_level: 1
  },
  {
    name: 'Butter Chicken',
    category: 'Mains',
    price: 545,
    description: 'Tandoori chicken simmered in a velvety tomato-butter sauce with a touch of honey and fenugreek.',
    image_url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
    is_veg: 0,
    is_special: 1,
    spice_level: 1
  },
  {
    name: 'Lamb Rogan Josh',
    category: 'Mains',
    price: 695,
    description: 'Slow-braised Kashmiri lamb in a rich sauce of Kashmiri chillies, fennel, and yoghurt.',
    image_url: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=400',
    is_veg: 0,
    is_special: 1,
    spice_level: 3
  },
  {
    name: 'Paneer Makhani',
    category: 'Mains',
    price: 475,
    description: 'Fresh cottage cheese in a luscious tomato-cream gravy with a hint of sweetness.',
    image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400',
    is_veg: 1,
    is_special: 0,
    spice_level: 1
  },
  {
    name: 'Prawn Masala',
    category: 'Mains',
    price: 745,
    description: 'Tiger prawns cooked in a vibrant coconut and curry leaf sauce, coastal-style.',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    is_veg: 0,
    is_special: 0,
    spice_level: 2
  },
  {
    name: 'Dum Aloo',
    category: 'Mains',
    price: 425,
    description: 'Baby potatoes stuffed with paneer and spices, slow-cooked in a rich cashew gravy.',
    image_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
    is_veg: 1,
    is_special: 0,
    spice_level: 2
  },

  // Biryanis
  {
    name: 'Awadhi Gosht Biryani',
    category: 'Biryanis',
    price: 695,
    description: 'Lucknowi-style lamb biryani layered with saffron rice, slow-cooked on dum for three hours.',
    image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',
    is_veg: 0,
    is_special: 1,
    spice_level: 2
  },
  {
    name: 'Hyderabadi Dum Biryani',
    category: 'Biryanis',
    price: 645,
    description: 'Fragrant basmati rice and tender chicken sealed with dough and slow-cooked in the Hyderabadi tradition.',
    image_url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400',
    is_veg: 0,
    is_special: 1,
    spice_level: 2
  },
  {
    name: 'Subz Biryani',
    category: 'Biryanis',
    price: 525,
    description: 'Seasonal vegetables and aromatic rice cooked dum-style with whole spices and fresh herbs.',
    image_url: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400',
    is_veg: 1,
    is_special: 0,
    spice_level: 1
  },
  {
    name: 'Zaffrani Prawn Biryani',
    category: 'Biryanis',
    price: 795,
    description: 'Saffron-infused basmati rice layered with succulent prawns and caramelized onions.',
    image_url: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?w=400',
    is_veg: 0,
    is_special: 1,
    spice_level: 2
  },

  // Desserts
  {
    name: 'Gulab Jamun',
    category: 'Desserts',
    price: 295,
    description: 'Soft milk dumplings soaked in rose-scented sugar syrup, served warm with vanilla ice cream.',
    image_url: 'https://images.unsplash.com/photo-1666190851498-ece49907805f?w=400',
    is_veg: 1,
    is_special: 0,
    spice_level: 1
  },
  {
    name: 'Kulfi Falooda',
    category: 'Desserts',
    price: 345,
    description: 'Traditional Indian ice cream with rose syrup, vermicelli, and basil seeds.',
    image_url: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400',
    is_veg: 1,
    is_special: 0,
    spice_level: 1
  },
  {
    name: 'Saffron Crème Brûlée',
    category: 'Desserts',
    price: 425,
    description: 'A French classic reimagined with Kashmiri saffron, cardamom, and a caramelized sugar crust.',
    image_url: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400',
    is_veg: 1,
    is_special: 1,
    spice_level: 1
  },
  {
    name: 'Rasmalai',
    category: 'Desserts',
    price: 325,
    description: 'Delicate milk cakes floating in thickened saffron milk, topped with crushed pistachios.',
    image_url: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400',
    is_veg: 1,
    is_special: 0,
    spice_level: 1
  },

  // Drinks
  {
    name: 'Mango Lassi',
    category: 'Drinks',
    price: 225,
    description: 'Creamy yoghurt smoothie blended with Alphonso mango pulp and a hint of cardamom.',
    image_url: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400',
    is_veg: 1,
    is_special: 0,
    spice_level: 1
  },
  {
    name: 'Rose Sharbat',
    category: 'Drinks',
    price: 195,
    description: 'Chilled rose water drink with basil seeds, a refreshing palate cleanser.',
    image_url: 'https://images.unsplash.com/photo-1544252890-c3e95e867738?w=400',
    is_veg: 1,
    is_special: 0,
    spice_level: 1
  },
  {
    name: 'Masala Chai',
    category: 'Drinks',
    price: 175,
    description: 'Our house blend of Assam tea simmered with ginger, cardamom, and cinnamon.',
    image_url: 'https://images.unsplash.com/photo-1561336526-2914f13ceb36?w=400',
    is_veg: 1,
    is_special: 0,
    spice_level: 1
  },
  {
    name: 'Sparkling Water',
    category: 'Drinks',
    price: 150,
    description: 'Premium sparkling mineral water served chilled with a slice of lime.',
    image_url: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=400',
    is_veg: 1,
    is_special: 0,
    spice_level: 1
  },
  {
    name: 'Mocktail of the Day',
    category: 'Drinks',
    price: 295,
    description: "Chef's seasonal creation — ask your server for today's special blend of fresh fruits and herbs.",
    image_url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400',
    is_veg: 1,
    is_special: 1,
    spice_level: 1
  }
];
  // Insert menu items
  for (const item of menuItems) {
    await sql`
      INSERT INTO menu_items (name, category, price, description, image_url, is_veg, is_special, spice_level)
      VALUES (${item.name}, ${item.category}, ${item.price}, ${item.description}, ${item.image_url},
        ${item.is_veg}, ${item.is_special}, ${item.spice_level})
    `;
  }

  console.log(`Seeded ${menuItems.length} menu items successfully.`);
  await sql.end();
}

seed().catch(err => { console.error(err); process.exit(1); });