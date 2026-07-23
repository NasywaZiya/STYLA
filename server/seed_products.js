const mysql = require('mysql2/promise');

const products = [
  {
    product_name: "Classic Leather Biker Jacket",
    category_id: 1, // Outerwear
    description: "A premium leather biker jacket featuring classic asymmetric zip fastening, notched lapels, and durable hardware. Perfect for a bold, edgy look.",
    detail: "100% Genuine Leather. Viscose lining. Wipe clean only.",
    price: 1299000,
    material: "Leather",
    gender: "men",
    variants: [
      { color_code: "Black", size: "M", stock: 15 },
      { color_code: "Black", size: "L", stock: 20 },
      { color_code: "Black", size: "XL", stock: 10 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=600&auto=format&fit=crop"
  },
  {
    product_name: "Elegant Silk Blouse",
    category_id: 2, // Tops
    description: "An effortlessly elegant silk blouse with a relaxed fit and a subtle sheen. Features a classic collar and concealed button placket.",
    detail: "100% Silk. Hand wash cold or dry clean.",
    price: 459000,
    material: "Silk",
    gender: "women",
    variants: [
      { color_code: "White", size: "S", stock: 25 },
      { color_code: "White", size: "M", stock: 30 },
      { color_code: "White", size: "L", stock: 15 },
      { color_code: "Champagne", size: "S", stock: 10 },
      { color_code: "Champagne", size: "M", stock: 12 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1596521864205-d16e877e8a93?q=80&w=600&auto=format&fit=crop"
  },
  {
    product_name: "Slim Fit Chino Trousers",
    category_id: 3, // Bottoms
    description: "Versatile and comfortable slim-fit chino trousers tailored for a clean, modern silhouette. A wardrobe essential for smart-casual dressing.",
    detail: "98% Cotton, 2% Elastane. Machine wash at 30°C.",
    price: 399000,
    material: "Cotton Blend",
    gender: "men",
    variants: [
      { color_code: "Navy", size: "30", stock: 20 },
      { color_code: "Navy", size: "32", stock: 35 },
      { color_code: "Navy", size: "34", stock: 15 },
      { color_code: "Khaki", size: "30", stock: 20 },
      { color_code: "Khaki", size: "32", stock: 25 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop"
  },
  {
    product_name: "Floral Summer Wrap Dress",
    category_id: 4, // Dresses
    description: "A breezy, feminine wrap dress featuring a vibrant floral print, V-neckline, and a flowy asymmetrical hem. Ideal for warm weather outings.",
    detail: "100% Viscose. Lightweight and breathable. Hand wash recommended.",
    price: 599000,
    material: "Viscose",
    gender: "women",
    variants: [
      { color_code: "Red Floral", size: "S", stock: 15 },
      { color_code: "Red Floral", size: "M", stock: 20 },
      { color_code: "Blue Floral", size: "M", stock: 18 },
      { color_code: "Blue Floral", size: "L", stock: 10 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop"
  },
  {
    product_name: "Urban Canvas Backpack",
    category_id: 5, // Bags
    description: "A durable canvas backpack designed for daily urban commutes. Features a padded laptop sleeve, multiple organizer pockets, and comfortable straps.",
    detail: "100% Cotton Canvas with Vegan Leather accents. Spot clean.",
    price: 499000,
    material: "Canvas",
    gender: "men",
    variants: [
      { color_code: "Olive Green", size: "One Size", stock: 25 },
      { color_code: "Black", size: "One Size", stock: 40 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop"
  },
  {
    product_name: "Oversized Knit Sweater",
    category_id: 6, // Sweatshirts
    description: "Stay cozy with this ultra-soft oversized knit sweater. Featuring a chunky ribbed collar, dropped shoulders, and a relaxed fit.",
    detail: "60% Cotton, 40% Acrylic. Machine wash cold on gentle cycle.",
    price: 359000,
    material: "Cotton Knit",
    gender: "women",
    variants: [
      { color_code: "Beige", size: "S", stock: 30 },
      { color_code: "Beige", size: "M", stock: 30 },
      { color_code: "Grey", size: "M", stock: 25 },
      { color_code: "Grey", size: "L", stock: 20 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop"
  },
  {
    product_name: "Minimalist Silver Watch",
    category_id: 7, // Accessories
    description: "A sleek, minimalist wristwatch with a stainless steel mesh strap and a clean dial. A timeless accessory to elevate any outfit.",
    detail: "Stainless steel case and strap. Water resistant to 30m. Quartz movement.",
    price: 899000,
    material: "Stainless Steel",
    gender: "men",
    variants: [
      { color_code: "Silver/Black", size: "One Size", stock: 15 },
      { color_code: "Silver/White", size: "One Size", stock: 10 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop"
  },
  {
    product_name: "Premium Leather Tote Bag",
    category_id: 5, // Bags
    description: "A spacious and sophisticated leather tote bag. Roomy enough for a laptop and daily essentials, with a secure zip-top closure.",
    detail: "100% Genuine Leather. Soft twill lining. Includes interior zip pocket.",
    price: 799000,
    material: "Leather",
    gender: "women",
    variants: [
      { color_code: "Caramel", size: "One Size", stock: 12 },
      { color_code: "Black", size: "One Size", stock: 20 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop"
  },
  {
    product_name: "Vintage Wash Denim Jacket",
    category_id: 1, // Outerwear
    description: "A classic denim jacket with a vintage wash for a lived-in feel. Features button-flap chest pockets and adjustable side tabs.",
    detail: "100% Cotton Denim. Machine wash cold inside out.",
    price: 699000,
    material: "Denim",
    gender: "men",
    variants: [
      { color_code: "Light Blue", size: "M", stock: 18 },
      { color_code: "Light Blue", size: "L", stock: 25 },
      { color_code: "Indigo", size: "L", stock: 15 },
      { color_code: "Indigo", size: "XL", stock: 10 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600&auto=format&fit=crop"
  },
  {
    product_name: "High-Waisted Wide Leg Jeans",
    category_id: 3, // Bottoms
    description: "On-trend high-waisted jeans with a flattering wide-leg cut. Made from rigid denim that molds to your shape over time.",
    detail: "100% Cotton. Non-stretch denim. Machine wash cold.",
    price: 459000,
    material: "Denim",
    gender: "women",
    variants: [
      { color_code: "Light Wash", size: "26", stock: 15 },
      { color_code: "Light Wash", size: "28", stock: 20 },
      { color_code: "Light Wash", size: "30", stock: 10 },
      { color_code: "Black", size: "28", stock: 15 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=600&auto=format&fit=crop"
  }
];

async function seedProducts() {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'styla'
  });

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    let addedCount = 0;

    for (const product of products) {
      // 1. Insert Product
      const [productResult] = await connection.query(
        `INSERT INTO PRODUCTS (category_id, product_name, description, detail, price, material, gender, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'active')`,
        [product.category_id, product.product_name, product.description, product.detail, product.price, product.material, product.gender]
      );
      const productId = productResult.insertId;

      // 2. Insert Image
      await connection.query(
        `INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES (?, ?, 1)`,
        [productId, product.imageUrl]
      );

      // 3. Insert Variants
      for (const variant of product.variants) {
        const sku = `STYLA-${productId}-${variant.color_code.substring(0, 3).toUpperCase()}-${variant.size}-${Math.floor(Math.random() * 10000)}`;
        await connection.query(
          `INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES (?, ?, ?, ?, ?)`,
          [productId, variant.color_code, variant.size, variant.stock, sku]
        );
      }
      
      addedCount++;
    }

    await connection.commit();
    console.log(`Successfully added ${addedCount} products along with their images and variants.`);

  } catch (error) {
    await connection.rollback();
    console.error('Error seeding products:', error);
  } finally {
    connection.release();
    pool.end();
  }
}

seedProducts();
