-- STYLA E-Commerce Seed Data
-- Run this AFTER schema.sql

-- USE styla;

-- Clear existing data (in reverse FK order)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE CART_ITEMS;
TRUNCATE TABLE CART;
TRUNCATE TABLE ORDER_DETAILS;
TRUNCATE TABLE PAYMENTS;
TRUNCATE TABLE SHIPMENTS;
TRUNCATE TABLE ORDERS;
TRUNCATE TABLE FAVORITE;
TRUNCATE TABLE PRODUCT_SALE;
TRUNCATE TABLE SALE;
TRUNCATE TABLE REVIEWS;
TRUNCATE TABLE PRODUCTS_IMAGES;
TRUNCATE TABLE VARIANT;
TRUNCATE TABLE PRODUCTS;
TRUNCATE TABLE CATEGORIES;
TRUNCATE TABLE USER_ADDRESS;
TRUNCATE TABLE USERS;
SET FOREIGN_KEY_CHECKS = 1;

-- =============================================
-- CATEGORIES
-- =============================================
INSERT INTO CATEGORIES (category_id, name) VALUES
(1, 'Outerwear'),
(2, 'Tops'),
(3, 'Bottoms'),
(4, 'Dresses'),
(5, 'Bags'),
(6, 'Sweatshirts'),
(7, 'Accessories');

-- =============================================
-- SAMPLE USERS (for reviews)
-- =============================================
INSERT INTO USERS (user_id, name, email, password, phone) VALUES
(1, 'Anya Putri', 'anya@email.com', '$2b$10$xJHF3Qw8kZ1qR2Dm5vU5OuGpIvN7FqK1cV9xY0zA1bC2dE3fG4hI', '081234567890'),
(2, 'Budi Santoso', 'budi@email.com', '$2b$10$xJHF3Qw8kZ1qR2Dm5vU5OuGpIvN7FqK1cV9xY0zA1bC2dE3fG4hI', '081234567891'),
(3, 'Citra Dewi', 'citra@email.com', '$2b$10$xJHF3Qw8kZ1qR2Dm5vU5OuGpIvN7FqK1cV9xY0zA1bC2dE3fG4hI', '081234567892'),
(4, 'Dimas Prasetyo', 'dimas@email.com', '$2b$10$xJHF3Qw8kZ1qR2Dm5vU5OuGpIvN7FqK1cV9xY0zA1bC2dE3fG4hI', '081234567893'),
(5, 'Eka Rahmawati', 'eka@email.com', '$2b$10$xJHF3Qw8kZ1qR2Dm5vU5OuGpIvN7FqK1cV9xY0zA1bC2dE3fG4hI', '081234567894');

-- =============================================
-- PRODUCTS — WOMEN (12 products)
-- =============================================

-- W1: Oversized Blazer (Outerwear)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(1, 1, 'Oversized Blazer', 'Loose-fitting blazer with a lapel collar and long sleeves with shoulder pads. Featuring front flap pockets and a matching belt.', 'Single-breasted design with padded shoulders for a structured yet relaxed silhouette. Fully lined interior with inner pocket. Back vent for ease of movement.', 599000, '72% Polyester, 25% Viscose, 3% Elastane', 'women', 'active');

-- W2: Silk Wrap Dress (Dresses)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(2, 4, 'Silk Wrap Dress', 'Elegant wrap dress made from flowing silk fabric with a V-neckline and adjustable waist tie. Perfect for evening occasions.', 'Features a flattering wrap silhouette that cinches at the waist. Midi length with a subtle side slit. Dry clean only.', 899000, '100% Mulberry Silk', 'women', 'active');

-- W3: High-Waist Trousers (Bottoms)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(3, 3, 'High-Waist Trousers', 'Tailored high-waist trousers with a straight leg and pressed crease. Side zip closure with hook and bar.', 'Designed with a high-rise waistband that elongates the silhouette. Features front pleats and side pockets. Ankle-length cut.', 1259000, '68% Polyester, 29% Viscose, 3% Elastane', 'women', 'active');

-- W4: Ribbed Knit Top (Tops)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(4, 2, 'Ribbed Knit Top', 'Slim-fit ribbed knit top with a round neck and short sleeves. Stretchy fabric that contours the body comfortably.', 'Fine gauge ribbed construction for a sleek look. Reinforced neckline that holds its shape. Machine washable at 30°C.', 259000, '95% Cotton, 5% Elastane', 'women', 'active');

-- W5: Leather Tote Bag (Bags)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(5, 5, 'Leather Tote Bag', 'Spacious tote bag crafted from genuine leather with double handles and a detachable shoulder strap. Interior zip pocket.', 'Features a magnetic snap closure with an organized interior including two slip pockets and one zippered compartment. Gold-tone hardware accents.', 1299000, '100% Genuine Leather', 'women', 'active');

-- W6: Cropped Sweatshirt (Sweatshirts)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(6, 6, 'Cropped Sweatshirt', 'Relaxed-fit cropped sweatshirt with a round neck and dropped shoulders. Soft brushed fleece interior for warmth.', 'Cropped length that pairs perfectly with high-waist bottoms. Ribbed cuffs and hem. Oversized fit for a casual, effortless look.', 789000, '80% Cotton, 20% Polyester', 'women', 'active');

-- W7: Wool Blend Coat (Outerwear)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(7, 1, 'Wool Blend Coat', 'Classic double-breasted wool blend coat with notch lapels and a below-knee length. Fully lined with interior pockets.', 'Timeless silhouette with tortoiseshell buttons. Features side pockets and a back walking vent. Dry clean recommended.', 2599000, '60% Wool, 30% Polyester, 10% Nylon', 'women', 'active');

-- W8: Satin Midi Skirt (Bottoms)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(8, 3, 'Satin Midi Skirt', 'Flowing satin midi skirt with an elastic waistband and subtle sheen. Bias-cut for a flattering drape.', 'The bias cut allows the fabric to move naturally with the body. Hidden side zipper for a clean front look. Midi length falls below the knee.', 399000, '100% Polyester Satin', 'women', 'active');

-- W9: Linen Blouse (Tops)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(9, 2, 'Linen Blouse', 'Breathable linen blouse with a relaxed fit, button-down front, and roll-up sleeves. Perfect for warm-weather styling.', 'Pre-washed linen for a soft, lived-in feel from day one. Features a point collar and chest pocket. Slightly longer hem at the back. Care instructions: Machine wash at max. 30ºC/86ºF with short spin cycle. Do not tumble dry.', 2229000, '100% European Linen', 'women', 'active');

-- W10: Cashmere Scarf (Accessories)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(10, 7, 'Cashmere Scarf', 'Ultra-soft cashmere scarf with a generous size that can be worn multiple ways. Delicate fringed edges add a refined touch.', 'Lightweight yet incredibly warm. Each scarf is crafted from premium Grade-A Mongolian cashmere. Comes in a branded gift box.Can be worn in many different ways to compliment our beautiful cashmere jumpers and cashmere cardigans and due to its generous proportions, as a wrap, around the shoulders to give a wonderful layered look.', 1399000, '100% Cashmere', 'women', 'active');

-- W11: Floral Maxi Dress (Dresses)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(11, 4, 'Floral Maxi Dress', 'Romantic floral print maxi dress with puff sleeves and a sweetheart neckline. Tiered skirt with a flowing silhouette.', 'Features an invisible back zipper and built-in bust support. The tiered construction adds volume and movement. Fully lined bodice.', 1049000, '100% Viscose', 'women', 'active');

-- W12: Mini Crossbody Bag (Bags)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(12, 5, 'Mini Crossbody Bag', 'Compact crossbody bag with an adjustable chain strap and quilted front panel. Snap closure with interior card slots.', 'Perfect for essentials — fits phone, cards, keys and lipstick. Features a quilted diamond pattern with gold-tone chain strap that can be worn crossbody or on the shoulder.', 3249000, 'PU Leather with Metal Hardware', 'women', 'active');

-- =============================================
-- PRODUCTS — MEN (13 products)
-- =============================================

-- M1: Tailored Suit Jacket (Outerwear)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(13, 1, 'Tailored Suit Jacket', 'Make a sophisticated impression in the Atkinson single breasted suit designed with a silhouette defining tailored fit. Atkinson is crafted from co-ord cloth, featuring a complementary lining, patch pockets, classic black buttons and twin side vents. Complete the look with Atkinson trousers and waistcoat.', 'Crafted with half-canvas construction for a natural drape. Features working sleeve buttonholes and a pick-stitch detail on lapels. Paired with matching trousers sold separately.', 3299000, '98% Wool, 2% Elastane', 'men', 'active');

-- M2: Oxford Button-Down Shirt (Tops)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(14, 2, 'Oxford Button-Down Shirt', 'Classic Oxford cloth button-down shirt with a regular fit. Features a button-down collar and a chest pocket.', 'Woven from premium long-staple cotton for durability and softness. Single-needle stitching on the collar and cuffs. Pre-shrunk fabric.', 349000, '100% Premium Cotton', 'men', 'active');

-- M3: Slim Chino Pants (Bottoms)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(15, 3, 'Slim Chino Pants', 'Modern slim-fit chino pants with a mid-rise waist and tapered leg. Features a zip fly with button closure.', 'Garment-dyed for rich color depth. Features slant front pockets and welt back pockets with button closure. Stretch fabric for all-day comfort.', 449000, '97% Cotton, 3% Elastane', 'men', 'active');

-- M4: Crew Neck Sweatshirt (Sweatshirts)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(16, 6, 'Crew Neck Sweatshirt', 'Essential crew neck sweatshirt with a relaxed fit and brushed interior. Ribbed collar, cuffs, and hem.', 'Made from heavyweight French terry for a substantial feel. Features a ribbed crew neckline that maintains its shape. Loopback construction for breathability.', 499000, '85% Cotton, 15% Polyester', 'men', 'active');

-- M5: Leather Messenger Bag (Bags)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(17, 5, 'Leather Messenger Bag', 'Professional messenger bag crafted from full-grain leather with an adjustable shoulder strap. Multiple compartments for organization.', 'Features a padded laptop compartment fitting up to 14 inches. Front flap with magnetic buckle closure. Includes an organizer panel with pen holders and card slots.', 1499000, '100% Full-Grain Leather', 'men', 'active');

-- M6: Bomber Jacket (Outerwear)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(18, 1, 'Bomber Jacket', 'Classic bomber jacket with a zip-up front, ribbed collar, cuffs, and hem. Features side zip pockets and an interior pocket.', 'Lightweight padded construction suitable for transitional weather. Water-resistant outer shell with a satin lining. Iconic silhouette updated with modern proportions.', 799000, '100% Nylon, Padding: 100% Polyester', 'men', 'active');

-- M7: Relaxed Linen Trousers (Bottoms)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(19, 3, 'Relaxed Linen Trousers', 'Easy-going linen trousers with a drawstring waist and relaxed straight leg. Ideal for warm-weather dressing.', 'Pre-washed European linen for a soft hand feel. Features an elasticated waistband with a drawstring for adjustable comfort. Side and back pockets.', 399000, '100% European Linen', 'men', 'active');

-- M8: Polo Shirt (Tops)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(20, 2, 'Polo Shirt', 'Classic piqué polo shirt with a regular fit, two-button placket, and ribbed collar. Side vents at the hem.', 'Made from premium piqué cotton knit with a distinctive textured weave. Reinforced shoulder seams for durability. Embroidered logo on the chest.', 299000, '100% Cotton Piqué', 'men', 'active');

-- M9: Canvas Backpack (Bags)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(21, 5, 'Canvas Backpack', 'Durable canvas backpack with leather trim and padded shoulder straps. Multiple pockets including a padded laptop sleeve.', 'Water-resistant waxed canvas exterior with genuine leather accents. Features a drawstring top with a buckle flap closure. Internal organizer with zippered pocket.', 699000, 'Waxed Canvas, Genuine Leather Trim', 'men', 'active');

-- M10: Merino Wool Sweater (Sweatshirts)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(22, 6, 'Merino Wool Sweater', 'Fine-gauge merino wool sweater with a V-neck and slim fit. Lightweight and breathable for layering.', 'Crafted from extra-fine 17.5 micron merino wool that is naturally temperature regulating. Features reinforced seams and a rib-knit collar, cuffs, and hem.', 3599000, '100% Extra-Fine Merino Wool', 'men', 'active');

-- M11: Leather Belt (Accessories)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(23, 7, 'Leather Belt', 'Classic leather belt with a brushed silver buckle. 35mm width suitable for both casual and formal wear.', 'Full-grain Italian leather that develops a beautiful patina over time. Features a single prong buckle with a matte silver finish. Five adjustment holes with branded keeper loop.', 2999000, '100% Italian Full-Grain Leather', 'men', 'active');

-- M12: Puffer Vest (Outerwear)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(24, 1, 'Puffer Vest', 'Lightweight puffer vest with a stand collar and zip-up front. Filled with premium recycled down for warmth without bulk.', 'Features a water-resistant outer shell and elastic binding at the armholes. Two zippered hand pockets and one interior pocket. Packs into its own pocket for travel.', 2149000, 'Shell: 100% Recycled Nylon, Fill: 90% Recycled Down', 'men', 'active');

-- M13: Aviator Sunglasses (Accessories)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(25, 7, 'Aviator Sunglasses', 'Classic aviator sunglasses with polarized lenses and a lightweight metal frame. UV400 protection.', 'Features scratch-resistant CR-39 polarized lenses that reduce glare. Adjustable nose pads for a customized fit. Comes with a protective leather case and microfiber cleaning cloth.', 459000, 'Metal Frame, Polarized CR-39 Lenses', 'men', 'active');

-- =============================================
-- PRODUCTS_IMAGES
-- =============================================

-- W1: Oversized Blazer
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(1, 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800', 1),
(1, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800', 0),
(1, 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800', 0);

-- W2: Silk Wrap Dress
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(2, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', 1),
(2, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800', 0),
(2, 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800', 0);

-- W3: High-Waist Trousers
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(3, 'https://cdn.endource.com/image/b64fb96086fc789f9ce9574bc2815610/detail/karen-millen-compact-stretch-high-waist-tailored-trousers.jpg?class=500&optimizer=image', 1),
(3, 'https://cdn.endource.com/image/bb4023c70a48e42b248401b43779e5e8/detail/karen-millen-compact-stretch-high-waist-tailored-trousers.jpg?class=500&optimizer=image', 0),
(3, 'https://cdn.endource.com/image/9b5ca4dab0cc45e0f6d0244c93d7e19b/detail/karen-millen-compact-stretch-high-waist-tailored-trousers.jpg?class=500&optimizer=image', 0);

-- W4: Ribbed Knit Top
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(4, 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800', 1),
(4, 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800', 0),
(4, 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800', 0);

-- W5: Leather Tote Bag
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(5, 'https://executive.co.id/cdn/shop/files/51BGPASC126B011_BROWN_1_800x800_fb26212e-d677-43de-93c5-5c30e7487b9c_720x.jpg?v=1775554220', 1),
(5, 'https://executive.co.id/cdn/shop/files/51BGPASC126B011_BROWN_3_720x.jpg?v=1775546226', 0),
(5, 'https://executive.co.id/cdn/shop/files/51BGPASC126B011_BROWN_5_720x.jpg?v=1775546226', 0),
(5, 'https://executive.co.id/cdn/shop/files/51BGPASC126B011_BROWN_2_720x.jpg?v=1775546226', 0);

-- W6: Cropped Sweatshirt
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(6, 'https://images.express.com/is/image/expressfashion/0086_09612871_0005_f001?cache=on&wid=480&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', 1),
(6, 'https://images.express.com/is/image/expressfashion/0086_09612871_0005_f002?cache=on&wid=480&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', 0),
(6, 'https://images.express.com/is/image/expressfashion/0086_09612871_0005_a001?cache=on&wid=480&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', 0),
(6, 'https://images.express.com/is/image/expressfashion/0086_09612871_0005_f003?cache=on&wid=480&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', 0);

-- W7: Wool Blend Coat
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(7, 'https://scotch-soda.eu/cdn/shop/files/Hires_PNG-U9G00902T_U294_3M.png?v=1773761503&width=1800', 1),
(7, 'https://scotch-soda.eu/cdn/shop/files/Hires_PNG-U9G00902T_U294_1M-P.png?v=1773761526&width=1800', 0),
(7, 'https://scotch-soda.eu/cdn/shop/files/Hires_PNG-U9G00902T_U294_FNT.png?v=1756735633&width=1800', 0);

-- W8: Satin Midi Skirt
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(8, 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800', 1),
(8, 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=800', 0),
(8, 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=800', 0);

-- W9: Linen Blouse
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(9, 'https://www.lu-ciee.com/cdn/shop/products/Luciee-163.jpg1.jpg1.jpg?v=1650627467&width=823', 1),
(9, 'https://www.lu-ciee.com/cdn/shop/products/Luciee-165.jpg?v=1685163642&width=823', 0),
(9, 'https://www.lu-ciee.com/cdn/shop/products/Luciee-156.jpg?v=1685163642&width=823', 0),
(9, 'https://www.lu-ciee.com/cdn/shop/products/Luciee-141.jpg?v=1685163642&width=823', 0);

-- W10: Cashmere Scarf
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(10, 'https://cashmereandcotton.co.uk/cdn/shop/files/chinchilla-classic-cashmere-scarf-in-studio-2_1000x.jpg?v=1756250589', 1),
(10, 'https://cashmereandcotton.co.uk/cdn/shop/products/chinchilla-classic-cashmere-scarf-on-beach_5a7c6419-ceb2-4286-a87e-b956422f9d73_600x.jpg?v=1756250589', 0),
(10, 'https://cashmereandcotton.co.uk/cdn/shop/files/chinchilla-classic-cashmere-scarf-worn-on-the-beach_1000x.jpg?v=1756250589', 0),
(10, 'https://cashmereandcotton.co.uk/cdn/shop/files/chinchilla-classic-cashmere-scarf-in-studio-3_600x.jpg?v=1756250589', 0);

-- W11: Floral Maxi Dress
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(11, 'https://www.laceandbeads.co.uk/cdn/shop/files/RokaMaxi_4.jpg?v=1691140993&width=832', 1),
(11, 'https://www.laceandbeads.co.uk/cdn/shop/files/RokaMaxi.jpg?v=1691140959&width=832', 0),
(11, 'https://www.laceandbeads.co.uk/cdn/shop/files/RokaMaxi_1.jpg?v=1691140959&width=832', 0),
(11, 'https://www.laceandbeads.co.uk/cdn/shop/files/RokaMaxi_3.jpg?v=1691140959&width=832', 0);

-- W12: Mini Crossbody Bag
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(12, 'https://static.banananina.id/inventory/assets/img/product/01164891/01164891_D.jpg', 1),
(12, 'https://static.banananina.id/inventory/assets/img/product/01164891/01164891_M.jpg', 0),
(12, 'https://static.banananina.id/inventory/assets/img/product/01164891/01164891_I.jpg', 0);

-- M1: Tailored Suit Jacket
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(13, 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AY8247s.jpg?im=Resize,width=750', 1),
(13, 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AY8247s2.jpg?im=Resize,width=750', 0),
(13, 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AY8247s4.jpg?im=Resize,width=480', 0),
(13, 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AY8247s5.jpg?im=Resize,width=480', 0);

-- M2: Oxford Button-Down Shirt
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(14, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800', 1),
(14, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800', 0),
(14, 'https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=800', 0);

-- M3: Slim Chino Pants
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(15, 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800', 1),
(15, 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800', 0),
(15, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800', 0);

-- M4: Crew Neck Sweatshirt
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(16, 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F74438s.jpg?im=Resize,width=750', 1),
(16, 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F74438s2.jpg?im=Resize,width=750', 0),
(16, 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F74438s3.jpg?im=Resize,width=480', 0);

-- M5: Leather Messenger Bag
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(17, 'https://buffalojackson.com/cdn/shop/files/denver-leather-messenger-bag-autumn-brown-3_0da43aa7-c22b-404c-85e3-2d61119bbeb2c2_2000x.jpg?v=1689194086', 1),
(17, 'https://buffalojackson.com/cdn/shop/files/roosevelt-leather-messenger-bag-autumn-brown-pinhoti-peak-2_2000x.jpg?v=1693228444', 0),
(17, 'https://buffalojackson.com/cdn/shop/files/messenger-post-mail-bag-leather_2000x.jpg?v=1693228478', 0);

-- M6: Bomber Jacket
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(18, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800', 1),
(18, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800', 0),
(18, 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800', 0);

-- M7: Relaxed Linen Trousers
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(19, 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800', 1),
(19, 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800', 0),
(19, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800', 0);

-- M8: Polo Shirt
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(20, 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/330996s.jpg?im=Resize,width=750', 1),
(20, 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/330996s2.jpg?im=Resize,width=750', 0),
(20, 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/330996s4.jpg?im=Resize,width=480', 0),
(20, 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/330996s7.jpg?im=Resize,width=480', 0);

-- M9: Canvas Backpack
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(21, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', 1),
(21, 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800', 0),
(21, 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800', 0);

-- M10: Merino Wool Sweater
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(22, 'https://www.bombayshirts.com/cdn/shop/files/fs_file_1762842201932_800x.jpg?v=1770634803', 1),
(22, 'https://www.bombayshirts.com/cdn/shop/files/fs_file_1762842201930_800x.jpg?v=1770634805', 0),
(22, 'https://www.bombayshirts.com/cdn/shop/files/fs_file_1762842201893_800x.jpg?v=1770634806', 0);

-- M11: Leather Belt
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(23, 'https://www.tumi.co.id/dw/image/v2/AAWQ_PRD/on/demandware.static/-/Sites-Tumi/default/dwb5e05dc4/images/hs-rev-saf-belt/hi-res/157629-1051_hi-res_main_1.jpg?sw=750&sh=911', 1),
(23, 'https://www.tumi.co.id/dw/image/v2/AAWQ_PRD/on/demandware.static/-/Sites-Tumi/default/dw333b406f/images/hs-rev-saf-belt/hi-res/157629-1051_hi-res_alt1_2.jpg?sw=750&sh=911', 0),
(23, 'https://www.tumi.co.id/dw/image/v2/AAWQ_PRD/on/demandware.static/-/Sites-Tumi/default/dwcc4fdad9/images/hs-rev-saf-belt/hi-res/157629-1051_hi-res_alt5_6.jpg?sw=750&sh=911', 0),
(23, 'https://www.tumi.co.id/dw/image/v2/AAWQ_PRD/on/demandware.static/-/Sites-Tumi/default/dwc4028393/images/hs-rev-saf-belt/hi-res/157629-1051_hi-res_alt6_7.jpg?sw=750&sh=911', 0);

-- M12: Puffer Vest
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(24, 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/1cd2c24f0d41eb4240f755e33f85bed827864479_xxl-1.jpg', 1),
(24, 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/3465d98d3549fdb3a4108236716809791135d4f3_xxl-1.jpg', 0),
(24, 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/cc6b6a2b5f3e012e6c48689dec48605ff857dd60_xxl-1.jpg', 0),
(24, 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/336a2f4cfe39e17eb274a216db63751057007e23_xxl-1.jpg', 0);

-- M13: Aviator Sunglasses
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(25, 'https://dynamic.zacdn.com/YUtYJJlrnydR3_lk1iI4Tcq5kWc=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/urban-state-7843-3529815-1.jpg', 1),
(25, 'https://dynamic.zacdn.com/ntBy0KCyoIHI2_g-3vZL_navI0k=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/urban-state-7844-3529815-5.jpg', 0),
(25, 'https://dynamic.zacdn.com/O_ioIwG1ZdGIgaxwmP6RGEKXyBY=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/urban-state-7843-3529815-3.jpg', 0);

-- =============================================
-- VARIANTS (color_code + size combos)
-- =============================================

-- W1: Oversized Blazer — Black, Beige, Gray
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(1, '#000000', 'S', 10, 'W-BLZ-BLK-S'), (1, '#000000', 'M', 15, 'W-BLZ-BLK-M'), (1, '#000000', 'L', 12, 'W-BLZ-BLK-L'),
(1, '#ddcaa5', 'S', 8, 'W-BLZ-BEI-S'), (1, '#ddcaa5', 'M', 10, 'W-BLZ-BEI-M'), (1, '#ddcaa5', 'L', 7, 'W-BLZ-BEI-L'),
(1, '#6f6f6f', 'S', 5, 'W-BLZ-GRY-S'), (1, '#6f6f6f', 'M', 8, 'W-BLZ-GRY-M'), (1, '#6f6f6f', 'L', 6, 'W-BLZ-GRY-L');

-- W2: Silk Wrap Dress — Black, Red, Blush
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(2, '#000000', 'XS', 5, 'W-DRS-BLK-XS'), (2, '#000000', 'S', 8, 'W-DRS-BLK-S'), (2, '#000000', 'M', 10, 'W-DRS-BLK-M'), (2, '#000000', 'L', 6, 'W-DRS-BLK-L'),
(2, '#f26a6a', 'S', 7, 'W-DRS-RED-S'), (2, '#f26a6a', 'M', 9, 'W-DRS-RED-M'), (2, '#f26a6a', 'L', 5, 'W-DRS-RED-L'),
(2, '#f39d79', 'S', 6, 'W-DRS-BLU-S'), (2, '#f39d79', 'M', 8, 'W-DRS-BLU-M');

-- W3: High-Waist Trousers — Black, Beige
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(3, '#000000', 'XS', 6, 'W-TRS-BLK-XS'), (3, '#000000', 'S', 10, 'W-TRS-BLK-S'), (3, '#000000', 'M', 12, 'W-TRS-BLK-M'), (3, '#000000', 'L', 8, 'W-TRS-BLK-L'),
(3, '#ddcaa5', 'S', 8, 'W-TRS-BEI-S'), (3, '#ddcaa5', 'M', 10, 'W-TRS-BEI-M'), (3, '#ddcaa5', 'L', 6, 'W-TRS-BEI-L');

-- W4: Ribbed Knit Top — Black, Beige, Pink
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(4, '#000000', 'XS', 12, 'W-RKT-BLK-XS'), (4, '#000000', 'S', 15, 'W-RKT-BLK-S'), (4, '#000000', 'M', 18, 'W-RKT-BLK-M'), (4, '#000000', 'L', 10, 'W-RKT-BLK-L'),
(4, '#ddcaa5', 'S', 10, 'W-RKT-BEI-S'), (4, '#ddcaa5', 'M', 12, 'W-RKT-BEI-M'),
(4, '#d978c7', 'S', 8, 'W-RKT-PNK-S'), (4, '#d978c7', 'M', 10, 'W-RKT-PNK-M');

-- W5: Leather Tote Bag — Black, Beige (one size)
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(5, '#000000', 'One Size', 15, 'W-TOT-BLK-OS'),
(5, '#ddcaa5', 'One Size', 10, 'W-TOT-BEI-OS');

-- W6: Cropped Sweatshirt — Black, Gray, Green
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(6, '#000000', 'S', 10, 'W-CSW-BLK-S'), (6, '#000000', 'M', 12, 'W-CSW-BLK-M'), (6, '#000000', 'L', 8, 'W-CSW-BLK-L'),
(6, '#6f6f6f', 'S', 8, 'W-CSW-GRY-S'), (6, '#6f6f6f', 'M', 10, 'W-CSW-GRY-M'),
(6, '#67ad61', 'S', 6, 'W-CSW-GRN-S'), (6, '#67ad61', 'M', 8, 'W-CSW-GRN-M');

-- W7: Wool Blend Coat — Black, Beige
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(7, '#000000', 'S', 5, 'W-WBC-BLK-S'), (7, '#000000', 'M', 8, 'W-WBC-BLK-M'), (7, '#000000', 'L', 6, 'W-WBC-BLK-L'),
(7, '#ddcaa5', 'S', 4, 'W-WBC-BEI-S'), (7, '#ddcaa5', 'M', 6, 'W-WBC-BEI-M'), (7, '#ddcaa5', 'L', 4, 'W-WBC-BEI-L');

-- W8: Satin Midi Skirt — Black, Blush, Blue
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(8, '#000000', 'XS', 8, 'W-SMS-BLK-XS'), (8, '#000000', 'S', 10, 'W-SMS-BLK-S'), (8, '#000000', 'M', 12, 'W-SMS-BLK-M'),
(8, '#f39d79', 'S', 7, 'W-SMS-BLU-S'), (8, '#f39d79', 'M', 9, 'W-SMS-BLU-M'),
(8, '#7b93ea', 'S', 6, 'W-SMS-BLE-S'), (8, '#7b93ea', 'M', 8, 'W-SMS-BLE-M');

-- W9: Linen Blouse — Beige, White
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(9, '#ddcaa5', 'S', 10, 'W-LBL-BEI-S'), (9, '#ddcaa5', 'M', 12, 'W-LBL-BEI-M'), (9, '#ddcaa5', 'L', 8, 'W-LBL-BEI-L'),
(9, '#f39d79', 'S', 8, 'W-LBL-WHT-S'), (9, '#f39d79', 'M', 10, 'W-LBL-WHT-M');

-- W10: Cashmere Scarf — Black, Beige, Gray (one size)
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(10, '#000000', 'One Size', 20, 'W-CSC-BLK-OS'),
(10, '#ddcaa5', 'One Size', 15, 'W-CSC-BEI-OS'),
(10, '#6f6f6f', 'One Size', 12, 'W-CSC-GRY-OS');

-- W11: Floral Maxi Dress — Red, Pink
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(11, '#f26a6a', 'XS', 5, 'W-FMD-RED-XS'), (11, '#f26a6a', 'S', 8, 'W-FMD-RED-S'), (11, '#f26a6a', 'M', 10, 'W-FMD-RED-M'), (11, '#f26a6a', 'L', 6, 'W-FMD-RED-L'),
(11, '#d978c7', 'S', 7, 'W-FMD-PNK-S'), (11, '#d978c7', 'M', 9, 'W-FMD-PNK-M');

-- W12: Mini Crossbody Bag — Black, Beige (one size)
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(12, '#000000', 'One Size', 18, 'W-MCB-BLK-OS'),
(12, '#ddcaa5', 'One Size', 12, 'W-MCB-BEI-OS');

-- M1: Tailored Suit Jacket — Black, Gray
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(13, '#000000', 'S', 6, 'M-TSJ-BLK-S'), (13, '#000000', 'M', 10, 'M-TSJ-BLK-M'), (13, '#000000', 'L', 8, 'M-TSJ-BLK-L'), (13, '#000000', 'XL', 5, 'M-TSJ-BLK-XL'),
(13, '#6f6f6f', 'S', 4, 'M-TSJ-GRY-S'), (13, '#6f6f6f', 'M', 8, 'M-TSJ-GRY-M'), (13, '#6f6f6f', 'L', 6, 'M-TSJ-GRY-L');

-- M2: Oxford Button-Down Shirt — White, Blue, Pink
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(14, '#ddcaa5', 'S', 12, 'M-OXF-WHT-S'), (14, '#ddcaa5', 'M', 15, 'M-OXF-WHT-M'), (14, '#ddcaa5', 'L', 10, 'M-OXF-WHT-L'), (14, '#ddcaa5', 'XL', 8, 'M-OXF-WHT-XL'),
(14, '#7b93ea', 'S', 8, 'M-OXF-BLU-S'), (14, '#7b93ea', 'M', 12, 'M-OXF-BLU-M'), (14, '#7b93ea', 'L', 8, 'M-OXF-BLU-L'),
(14, '#d978c7', 'S', 6, 'M-OXF-PNK-S'), (14, '#d978c7', 'M', 8, 'M-OXF-PNK-M');

-- M3: Slim Chino Pants — Black, Beige, Green
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(15, '#000000', 'S', 10, 'M-CHP-BLK-S'), (15, '#000000', 'M', 14, 'M-CHP-BLK-M'), (15, '#000000', 'L', 10, 'M-CHP-BLK-L'), (15, '#000000', 'XL', 6, 'M-CHP-BLK-XL'),
(15, '#ddcaa5', 'S', 8, 'M-CHP-BEI-S'), (15, '#ddcaa5', 'M', 12, 'M-CHP-BEI-M'), (15, '#ddcaa5', 'L', 8, 'M-CHP-BEI-L'),
(15, '#67ad61', 'M', 6, 'M-CHP-GRN-M'), (15, '#67ad61', 'L', 5, 'M-CHP-GRN-L');

-- M4: Crew Neck Sweatshirt — Black, Gray, Yellow
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(16, '#000000', 'S', 10, 'M-CNS-BLK-S'), (16, '#000000', 'M', 15, 'M-CNS-BLK-M'), (16, '#000000', 'L', 12, 'M-CNS-BLK-L'), (16, '#000000', 'XL', 8, 'M-CNS-BLK-XL'),
(16, '#6f6f6f', 'M', 10, 'M-CNS-GRY-M'), (16, '#6f6f6f', 'L', 8, 'M-CNS-GRY-L'),
(16, '#eadd64', 'M', 6, 'M-CNS-YLW-M'), (16, '#eadd64', 'L', 5, 'M-CNS-YLW-L');

-- M5: Leather Messenger Bag — Black, Brown (one size)
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(17, '#000000', 'One Size', 10, 'M-LMB-BLK-OS'),
(17, '#ddcaa5', 'One Size', 8, 'M-LMB-BRN-OS');

-- M6: Bomber Jacket — Black, Green, Gray
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(18, '#000000', 'S', 8, 'M-BMB-BLK-S'), (18, '#000000', 'M', 12, 'M-BMB-BLK-M'), (18, '#000000', 'L', 10, 'M-BMB-BLK-L'), (18, '#000000', 'XL', 6, 'M-BMB-BLK-XL'),
(18, '#67ad61', 'M', 6, 'M-BMB-GRN-M'), (18, '#67ad61', 'L', 5, 'M-BMB-GRN-L'),
(18, '#6f6f6f', 'M', 8, 'M-BMB-GRY-M'), (18, '#6f6f6f', 'L', 6, 'M-BMB-GRY-L');

-- M7: Relaxed Linen Trousers — Beige, Black
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(19, '#ddcaa5', 'S', 8, 'M-RLT-BEI-S'), (19, '#ddcaa5', 'M', 12, 'M-RLT-BEI-M'), (19, '#ddcaa5', 'L', 10, 'M-RLT-BEI-L'), (19, '#ddcaa5', 'XL', 6, 'M-RLT-BEI-XL'),
(19, '#000000', 'S', 6, 'M-RLT-BLK-S'), (19, '#000000', 'M', 10, 'M-RLT-BLK-M'), (19, '#000000', 'L', 8, 'M-RLT-BLK-L');

-- M8: Polo Shirt — Black, Beige, Blue
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(20, '#000000', 'S', 12, 'M-POL-BLK-S'), (20, '#000000', 'M', 15, 'M-POL-BLK-M'), (20, '#000000', 'L', 10, 'M-POL-BLK-L'), (20, '#000000', 'XL', 8, 'M-POL-BLK-XL'),
(20, '#6f6f6f', 'M', 10, 'M-POL-BEI-M'), (20, '#6f6f6f', 'L', 8, 'M-POL-BEI-L'),
(20, '#7b93ea', 'M', 8, 'M-POL-BLU-M'), (20, '#7b93ea', 'L', 6, 'M-POL-BLU-L');

-- M9: Canvas Backpack — Black, Green (one size)
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(21, '#000000', 'One Size', 12, 'M-CBP-BLK-OS'),
(21, '#67ad61', 'One Size', 8, 'M-CBP-GRN-OS');

-- M10: Merino Wool Sweater — Black, Gray, Beige
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(22, '#000000', 'S', 8, 'M-MWS-BLK-S'), (22, '#000000', 'M', 12, 'M-MWS-BLK-M'), (22, '#000000', 'L', 10, 'M-MWS-BLK-L'),
(22, '#6f6f6f', 'M', 8, 'M-MWS-GRY-M'), (22, '#6f6f6f', 'L', 6, 'M-MWS-GRY-L'),
(22, '#ddcaa5', 'M', 6, 'M-MWS-BEI-M'), (22, '#ddcaa5', 'L', 5, 'M-MWS-BEI-L');

-- M11: Leather Belt — Black, Brown (sizes by waist)
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(23, '#000000', 'S', 15, 'M-LBT-BLK-S'), (23, '#000000', 'M', 20, 'M-LBT-BLK-M'), (23, '#000000', 'L', 15, 'M-LBT-BLK-L'), (23, '#000000', 'XL', 10, 'M-LBT-BLK-XL'),
(23, '#ddcaa5', 'S', 10, 'M-LBT-BRN-S'), (23, '#ddcaa5', 'M', 15, 'M-LBT-BRN-M'), (23, '#ddcaa5', 'L', 10, 'M-LBT-BRN-L');

-- M12: Puffer Vest — Black, Gray
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(24, '#000000', 'S', 6, 'M-PFV-BLK-S'), (24, '#000000', 'M', 10, 'M-PFV-BLK-M'), (24, '#000000', 'L', 8, 'M-PFV-BLK-L'), (24, '#000000', 'XL', 5, 'M-PFV-BLK-XL'),
(24, '#6f6f6f', 'M', 6, 'M-PFV-GRY-M'), (24, '#6f6f6f', 'L', 5, 'M-PFV-GRY-L');

-- M13: Aviator Sunglasses — Black, Gold (one size)
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(25, '#000000', 'One Size', 20, 'M-AVS-BLK-OS'),
(25, '#eadd64', 'One Size', 15, 'M-AVS-GLD-OS');

-- =============================================
-- REVIEWS
-- =============================================
INSERT INTO REVIEWS (user_id, product_id, rating, comment) VALUES
(1, 1, 5, 'Beautiful blazer, fits perfectly! The quality is amazing.'),
(2, 1, 4, 'Great blazer, slightly big but still looks great.'),
(3, 1, 5, 'Love the oversized fit. Very stylish.'),
(4, 2, 5, 'Stunning dress, the silk feels luxurious.'),
(5, 2, 4, 'Beautiful dress, perfect for special occasions.'),
(1, 3, 4, 'Great trousers, comfortable and elegant.'),
(2, 3, 5, 'Perfect fit, love the high waist design.'),
(3, 4, 5, 'Super soft and comfortable. Will buy more colors.'),
(4, 4, 4, 'Nice basic top, great quality for the price.'),
(5, 5, 5, 'Beautiful tote bag, very spacious and well-made.'),
(1, 5, 4, 'Love this bag! Leather quality is excellent.'),
(2, 6, 4, 'Cute sweatshirt, perfect with high-waist jeans.'),
(3, 7, 5, 'Incredible coat, keeps me warm and looks amazing.'),
(4, 7, 5, 'Best coat I have ever purchased. Worth every penny.'),
(5, 8, 4, 'Pretty skirt with a lovely sheen. Flows beautifully.'),
(1, 9, 5, 'Perfect summer blouse, love the linen fabric.'),
(2, 10, 5, 'Softest scarf ever! Great gift option.'),
(3, 11, 4, 'Beautiful print, love the puff sleeves.'),
(4, 11, 5, 'Perfect summer dress, gets compliments everywhere.'),
(5, 12, 4, 'Cute bag, fits all my essentials.'),
(1, 13, 5, 'Sharp and well-tailored. Great for the office.'),
(2, 13, 4, 'Good fit, excellent construction quality.'),
(3, 13, 5, 'Best suit jacket in this price range.'),
(4, 14, 5, 'Classic shirt, great cotton quality.'),
(5, 14, 4, 'Nice Oxford shirt, fits well out of the box.'),
(1, 15, 5, 'Perfect chinos, comfortable stretch fabric.'),
(2, 15, 4, 'Great color, nice slim fit without being tight.'),
(3, 16, 4, 'Comfortable sweatshirt, good weight.'),
(4, 16, 5, 'Love the quality. Thick and warm.'),
(5, 17, 5, 'Excellent messenger bag, fits my laptop perfectly.'),
(1, 17, 4, 'Beautiful leather, smells amazing.'),
(2, 18, 5, 'Great bomber jacket, love the fit.'),
(3, 18, 4, 'Perfect for spring weather. Lightweight but warm.'),
(4, 19, 4, 'Comfortable linen pants, great for summer.'),
(5, 19, 5, 'Love these trousers, the linen is high quality.'),
(1, 20, 5, 'Classic polo, great quality cotton.'),
(2, 20, 4, 'Nice polo shirt, fits true to size.'),
(3, 21, 4, 'Solid backpack, love the waxed canvas.'),
(4, 22, 5, 'Amazingly soft merino, keeps its shape well.'),
(5, 22, 4, 'Great sweater for layering.'),
(1, 23, 5, 'Beautiful leather belt, classic design.'),
(2, 24, 4, 'Lightweight puffer, packs down small.'),
(3, 24, 5, 'Great vest for layering under a jacket.'),
(4, 25, 5, 'Sharp sunglasses, great polarization.'),
(5, 25, 4, 'Classic aviators, comfortable fit.');

-- =============================================
-- SALE
-- =============================================
INSERT INTO SALE (sale_name, discount, start_date, end_date) VALUES
('Mid-Year Mega Sale', 20.00, '2026-06-15 00:00:00', '2026-08-15 23:59:59'),
('Summer Flash Sale', 50.00, '2026-06-28 00:00:00', '2026-08-30 23:59:59'),
('Special Weekend Promo', 30.00, '2026-06-26 00:00:00', '2026-09-02 23:59:59');

-- =============================================
-- PRODUCT_SALE
-- =============================================
INSERT INTO PRODUCT_SALE (product_id, sale_id, sale_price) VALUES
(1, 1, 479200.00),
(3, 1, 1007200.00),
(5, 1, 1039200.00),
(15, 1, 359200.00),
(4, 2, 129500.00),
(8, 2, 199500.00),
(20, 2, 149500.00),
(7, 3, 1819300.00),
(10, 3, 979300.00),
(18, 3, 559300.00),
(24, 3, 1504300.00);

-- =============================================
-- NEW PRODUCTS — WOMEN (8 products, IDs 26-33)
-- =============================================

-- W13: Denim Jacket (Outerwear)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(26, 1, 'Denim Jacket', 'Classic denim jacket with a relaxed fit, button-front closure, and chest flap pockets. Timeless layering piece for every season.', 'Crafted from medium-weight denim with a slight stretch for comfort. Features adjustable button tabs at the waist, side pockets, and a point collar. Pre-washed for a soft, vintage feel.', 749000, '98% Cotton, 2% Elastane Denim', 'women', 'active');

-- W14: Silk Blouse (Tops)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(27, 2, 'Elegant Silk Blouse', 'Elegant wrap blouse with a V-neckline, self-tie waist, and puff sleeves. Versatile enough for both office and evening wear.', 'Features a true wrap construction with an inner snap for secure fit. Balloon sleeves gathered at the cuff. Made from lightweight crepe fabric with a subtle matte finish.', 2859000, 'Silk', 'women', 'active');

-- W15: Pleated Midi Skirt (Bottoms)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(28, 3, 'High-Waisted Wide Leg Jeans', 'On-trend high-waisted jeans with a flattering wide-leg cut. Made from rigid denim that molds to your shape over time.', '100% Cotton. Non-stretch denim. Machine wash cold.', 459000, 'Denim', 'women', 'active');

-- W16: Floral Summer Wrap Dress (Dresses)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(29, 4, 'Floral Summer Wrap Dress', 'A breezy, feminine wrap dress featuring a vibrant floral print, V-neckline, and a flowy asymmetrical hem. Ideal for warm weather outings.', 'Crafted from lightweight and breathable rayon fabric with a delicate floral pattern. Features adjustable tie closure at the waist, flutter short sleeves, and a midi-length silhouette. Unlined for maximum comfort on hot days.', 599000, 'Viscose', 'women', 'active');

-- W17: Premium Leather Tote Bag (Bags)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(30, 5, 'Premium Leather Tote Bag', 'A timeless, structured leather tote designed for the modern woman. Spacious enough to carry all your daily essentials while maintaining a polished, sophisticated profile.', 'Crafted from genuine cowhide leather with a smooth, supple finish. Features a secure magnetic snap closure, reinforced handles for comfortable carrying, and an interior zip pocket for valuables. The minimalist design is complemented by subtle gold-tone hardware.', 1699000, 'Premium Leather', 'women', 'active');

-- W18: Zip-Up Hoodie (Sweatshirts)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(31, 6, 'Zip-Up Hoodie', 'Relaxed-fit zip-up hoodie with a drawstring hood, kangaroo pockets, and ribbed trim. Soft fleece lining for cozy warmth.', 'Full-length metal zipper with a branded pull. Split kangaroo pocket doubles as a hand warmer. Dropped shoulders for a laid-back streetwear aesthetic.', 575000, '80% Cotton, 20% Polyester Fleece', 'women', 'active');

-- W19: Pearl Drop Earrings (Accessories)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(32, 7, 'Pearl Drop Earrings', 'Elegant freshwater pearl drop earrings with a delicate gold-plated hook. Timeless design that elevates any outfit.', 'Each pair features hand-selected freshwater pearls measuring 8-9mm. Hypoallergenic posts suitable for sensitive ears. Comes in a velvet pouch.', 1349000, '18K Gold-Plated Brass, Freshwater Pearl', 'women', 'active');

-- W20: Oversized Knit Sweater (Sweatshirts)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(33, 6, 'Oversized Knit Sweater', 'Stay cozy with this ultra-soft oversized knit sweater. Featuring a chunky ribbed collar, dropped shoulders, and a relaxed fit.', 'Ribbed crew neck and hem. Slightly textured knit for added depth. Easy to layer over basics or wear alone.', 359000, 'Cotton Knit', 'women', 'active');

-- =============================================
-- NEW PRODUCTS — MEN (7 products, IDs 34-40)
-- =============================================

-- M14: Corduroy Overshirt (Outerwear)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(34, 1, 'Corduroy Overshirt', 'Thick corduroy overshirt with a button-front closure, two chest pockets, and a relaxed fit. Perfect as a layering piece.', 'Wide-wale corduroy with a soft brushed finish. Lined interior for added warmth. Features horn-look buttons and a curved hem. Can be worn as a shirt or light jacket.', 759000, '100% Cotton Corduroy', 'men', 'active');

-- M15: Henley Long Sleeve (Tops)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(35, 2, 'Henley Long Sleeve', 'Classic henley top with a three-button placket, long sleeves, and a slim fit. Waffle-knit texture adds visual interest.', 'Thermal waffle-knit construction provides breathability and warmth. Reinforced shoulder seams and flatlock stitching for comfort. Pre-shrunk fabric.', 279000, '100% Cotton Waffle Knit', 'men', 'active');

-- M16: Chino Trousers (Bottoms)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(36, 3, 'Slim Fit Chino Trousers', 'Versatile and comfortable slim-fit chino trousers tailored for a clean, modern silhouette. A wardrobe essential for smart-casual dressing.', '98% Cotton, 2% Elastane. Machine wash at 30°C.', 499000, 'Cotton Blend', 'men', 'active');

-- M17: Quarter-Zip Sweatshirt (Sweatshirts)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(37, 6, 'Quarter-Zip Sweatshirt', 'Versatile quarter-zip pullover with a stand collar, raglan sleeves, and a regular fit. Brushed interior for softness.', 'Durable mid-weight French terry with a smooth face and soft-brushed reverse side for optimal comfort.', 479000, '80% Cotton, 20% Recycled polyester', 'men', 'active');

-- M18: Urban Canvas Backpack (Bags)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(38, 5, 'Urban Canvas Backpack', 'A durable canvas backpack designed for daily urban commutes. Features a padded laptop sleeve, multiple organizer pockets, and comfortable straps.', '100% Cotton Canvas with Vegan Leather accents. Spot clean.', 859000, 'Canvas, Vegan Leather', 'men', 'active');

-- M19: Minimalist Silver Watch (Accessories)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(39, 7, 'Minimalist Silver Watch', 'A sleek, minimalist wristwatch with a stainless steel mesh strap and a clean dial. A timeless accessory to elevate any outfit.', 'Stainless steel case and strap. Water resistant to 30m. Quartz movement.', 1199000, 'Stainless Steel', 'men', 'active');

-- M20: Graphic Crew T-Shirt (Tops)
INSERT INTO PRODUCTS (product_id, category_id, product_name, description, detail, price, material, gender, status) VALUES
(40, 2, 'Graphic Crew T-Shirt', 'Relaxed-fit crew neck t-shirt with a bold abstract graphic print on the chest. Soft-washed fabric for a lived-in comfort feel.', 'Screen-printed design using eco-friendly water-based inks. Reinforced collar tape to prevent stretching. Slightly longer back hem for modern proportions.', 199000, '100% Combed Ring-Spun Cotton', 'men', 'active');

-- =============================================
-- PRODUCTS_IMAGES — NEW PRODUCTS (3 images each)
-- =============================================

-- W13: Denim Jacket
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(26, 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/2ddcd1595b5d06771ccdcdcaab5ade1db3d714b0_xxl-1.jpg', 1),
(26, 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/zoom/59c189be8400491effaf386b88ba312e87fa38e9_xxl-1.jpg', 0),
(26, 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/cfc05cf450d0dd63cb2714dcb399ec5a1db2ae40_xxl-1.jpg', 0),
(26, 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/fe94ed0034fa83f125ee4f50ecfd3f9aeaffe58d_xxl-1.jpg', 0);

-- W14: Wrap Blouse
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(27, 'https://uk.daisysilk.com/cdn/shop/files/Elegant_Silk_Bow_Tie_Blouse_Ivory_1_1.webp?v=1775011297', 1),
(27, 'https://uk.daisysilk.com/cdn/shop/files/Elegant_Silk_Bow_Tie_Blouse_Ivory_2_1.webp?v=1775011297', 0),
(27, 'https://uk.daisysilk.com/cdn/shop/files/Elegant_Silk_Bow_Tie_Blouse_Ivory_4_1.webp?v=1775011297', 0),
(27, 'https://uk.daisysilk.com/cdn/shop/files/Elegant_Silk_Bow_Tie_Blouse_Ivory_3_1.webp?v=1775011297', 0);

-- W15: Pleated Midi Skirt
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(28, 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/659170b7c7d501044be1077d1be2e8656524cd4f_xxl-1.jpg', 1),
(28, 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/zoom/0a94a4b22355211db92a5f6c680816e7d694ca98_xxl-1.jpg', 0),
(28, 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/zoom/abdecd89bb3747f1df5a8043c036c78130adef2a_xxl-1.jpg', 0);

-- W16: Cocktail Slip Dress
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(29, 'https://mediahub.oasisfashion.com/baa13203_pink_xl?qlt=70&w=549&ssz=true&dpr=2', 1),
(29, 'https://mediahub.oasisfashion.com/baa13203_pink_xl_2?qlt=70&w=549&ssz=true&dpr=2', 0),
(29, 'https://mediahub.oasisfashion.com/baa13203_pink_xl_3?qlt=70&w=549&ssz=true&dpr=2', 0);

-- W17: Premium Leather Tote Bag
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(30, 'https://veloisse.com/cdn/shop/files/IMG_3567.jpg?v=1755441995&width=1100', 1),
(30, 'https://veloisse.com/cdn/shop/files/IMG_3585.jpg?v=1759154193&width=1100', 0),
(30, 'https://veloisse.com/cdn/shop/files/IMG_3560.jpg?v=1755495997&width=1100', 0);

-- W18: Zip-Up Hoodie
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(31, 'https://cdn.shopify.com/s/files/1/0156/6146/files/CoveredLonglineZipUpHoodieGSBlackB3B7B-BB2J-1901_A_1056faa2-b65c-4f4d-aa5d-49b6d9469288_1920x.jpg?v=1742894721', 1),
(31, 'https://cdn.shopify.com/s/files/1/0156/6146/files/CoveredLonglineZipUpHoodieGSBlackB3B7B-BB2J-0084_8d543a4e-d5d0-4c38-affe-2bcc2544a0a6_1920x.jpg?v=1742894721', 0),
(31, 'https://cdn.shopify.com/s/files/1/0156/6146/files/CoveredLonglineZipUpHoodieGSBlackB3B7B-BB2J-0102_e8a6a922-3b54-4fee-95d9-bc7018838089_1920x.jpg?v=1742894721', 0),
(31, 'https://cdn.shopify.com/s/files/1/0156/6146/files/CoveredLonglineZipUpHoodieGSBlackB3B7B-BB2J-0110_886cc2f7-c14a-4066-8a42-e94cdb3552b8_1920x.jpg?v=1742894721', 0);

-- W19: Pearl Drop Earrings
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(32, 'https://untamedpetals.com/cdn/shop/files/Lilly-Gold_13278_recrop.jpg?v=1758725017&width=900', 1),
(32, 'https://untamedpetals.com/cdn/shop/files/CG4A3479_1.jpg?v=1758725017&width=900', 0),
(32, 'https://untamedpetals.com/cdn/shop/files/Lilly-cropped_1.jpg?v=1758725017&width=900', 0);

-- W20: Oversized Knit Sweater
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(33, 'https://www.na-kd.com/cdn-cgi/image/quality=80,sharpen=0.3,width=846/globalassets/oversized_cable_knit_sweater_1757-000136-0003_2_campaign.jpg', 1),
(33, 'https://www.na-kd.com/cdn-cgi/image/quality=80,sharpen=0.3,width=846/globalassets/oversized_cable_knit_sweater_1757-000136-0003_3_campaign.jpg', 0),
(33, 'https://www.na-kd.com/cdn-cgi/image/quality=80,sharpen=0.3,width=846/globalassets/oversized_cable_knit_sweater_1757-000136-0003_1_campaign.jpg', 0);

-- M14: Corduroy Overshirt
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(34, 'https://media.mango.com/is/image/punto/27071198-91-001?wid=2048', 1),
(34, 'https://media.mango.com/is/image/punto/27071198-91-004?wid=2048', 0),
(34, 'https://media.mango.com/is/image/punto/27071198-91-007?wid=2048', 0),
(34, 'https://media.mango.com/is/image/punto/27071198-91-003?wid=2048', 0);

-- M15: Henley Long Sleeve
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(35, 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800', 1),
(35, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', 0),
(35, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800', 0);

-- M16: Cargo Jogger Pants
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(36, 'https://executive.co.id/cdn/shop/products/1-LPICRT223K387_BLACK_4_T_720x.jpg?v=1740550935', 1),
(36, 'https://executive.co.id/cdn/shop/products/1-LPICRT223K387_BLACK_3_720x.jpg?v=1740550935', 0),
(36, 'https://executive.co.id/cdn/shop/products/1-LPICRT223K387_BLACK_2_720x.jpg?v=1740550935', 0);

-- M17: Quarter-Zip Pullover
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(37, 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F70057s.jpg?im=Resize,width=750', 1),
(37, 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F70057s2.jpg?im=Resize,width=750', 0),
(37, 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F70057s3.jpg?im=Resize,width=480', 0),
(37, 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F70057s4.jpg?im=Resize,width=480', 0);

-- M18: Urban Canvas Backpack
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(38, 'https://www.trooplondon.com/cdn/shop/products/trp0385_front.jpg?v=1778434089&width=600', 1),
(38, 'https://www.trooplondon.com/cdn/shop/products/TRP0385_2.jpg?v=1689932005&width=600', 0),
(38, 'https://www.trooplondon.com/cdn/shop/products/TRP0385_3.jpg?v=1689932008&width=600', 0),
(38, 'https://www.trooplondon.com/cdn/shop/products/trp0385_back.jpg?v=1689932010&width=600', 0);

-- M19: Minimalist Silver Watch
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(39, 'https://www.kanewatches.com/cdn/shop/products/1000x1500-03-silver-steel-silver-mesh-kane-watches-pocket_1800x1800.jpg?v=1619274039', 1),
(39, 'https://www.kanewatches.com/cdn/shop/products/1000x1500-04-silver-steel-silver-mesh-kane-watches-straight_1800x1800.jpg?v=1619274039', 0),
(39, 'https://www.kanewatches.com/cdn/shop/products/1000x1500-01-silver-steel-silver-mesh-frontal_1800x1800.jpg?v=1619274015', 0),
(39, 'https://www.kanewatches.com/cdn/shop/products/1000x1500-02-silver-steel-silver-mesh-kane-watches-hero_1800x1800.jpg?v=1619274037', 0);

-- M20: Graphic Crew T-Shirt
INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES
(40, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', 1),
(40, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800', 0),
(40, 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800', 0);

-- =============================================
-- VARIANTS — NEW PRODUCTS (3 colors × 3 sizes each)
-- =============================================

-- W13: Denim Jacket — Classic Blue, Black, Light Wash
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(26, '#4a6fa5', 'S', 10, 'W-DNJ-BLU-S'), (26, '#4a6fa5', 'M', 14, 'W-DNJ-BLU-M'), (26, '#4a6fa5', 'L', 10, 'W-DNJ-BLU-L'),
(26, '#000000', 'S', 8, 'W-DNJ-BLK-S'), (26, '#000000', 'M', 12, 'W-DNJ-BLK-M'), (26, '#000000', 'L', 8, 'W-DNJ-BLK-L'),
(26, '#a8c4e0', 'S', 6, 'W-DNJ-LTW-S'), (26, '#a8c4e0', 'M', 9, 'W-DNJ-LTW-M'), (26, '#a8c4e0', 'L', 7, 'W-DNJ-LTW-L');

-- W14: Wrap Blouse — White, Black, Dusty Rose
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(27, '#f5f0eb', 'S', 12, 'W-WRB-WHT-S'), (27, '#f5f0eb', 'M', 15, 'W-WRB-WHT-M'), (27, '#f5f0eb', 'L', 10, 'W-WRB-WHT-L'),
(27, '#000000', 'S', 8, 'W-WRB-BLK-S'), (27, '#000000', 'M', 12, 'W-WRB-BLK-M'), (27, '#000000', 'L', 8, 'W-WRB-BLK-L'),
(27, '#c9848a', 'S', 6, 'W-WRB-ROS-S'), (27, '#c9848a', 'M', 10, 'W-WRB-ROS-M'), (27, '#c9848a', 'L', 7, 'W-WRB-ROS-L');

-- W15: Pleated Midi Skirt — Black, Navy, Sage Green
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(28, '#000000', 'S', 10, 'W-PMS-BLK-S'), (28, '#000000', 'M', 14, 'W-PMS-BLK-M'), (28, '#000000', 'L', 10, 'W-PMS-BLK-L'),
(28, '#2c3e6b', 'S', 7, 'W-PMS-NVY-S'), (28, '#2c3e6b', 'M', 11, 'W-PMS-NVY-M'), (28, '#2c3e6b', 'L', 8, 'W-PMS-NVY-L'),
(28, '#8fbc8f', 'S', 5, 'W-PMS-SGE-S'), (28, '#8fbc8f', 'M', 9, 'W-PMS-SGE-M'), (28, '#8fbc8f', 'L', 6, 'W-PMS-SGE-L');

-- W16: Cocktail Slip Dress — Black, Champagne, Burgundy
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(29, '#000000', 'S', 8, 'W-CSD-BLK-S'), (29, '#000000', 'M', 12, 'W-CSD-BLK-M'), (29, '#000000', 'L', 8, 'W-CSD-BLK-L'),
(29, '#f0deb4', 'S', 6, 'W-CSD-CHP-S'), (29, '#f0deb4', 'M', 10, 'W-CSD-CHP-M'), (29, '#f0deb4', 'L', 7, 'W-CSD-CHP-L'),
(29, '#722f37', 'S', 5, 'W-CSD-BRG-S'), (29, '#722f37', 'M', 8, 'W-CSD-BRG-M'), (29, '#722f37', 'L', 6, 'W-CSD-BRG-L');

-- W17: Structured Shoulder Bag — Black, Tan, Ivory
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(30, '#000000', 'One Size', 12, 'W-SSB-BLK-OS'),
(30, '#c19a6b', 'One Size', 10, 'W-SSB-TAN-OS'),
(30, '#fffff0', 'One Size', 8, 'W-SSB-IVR-OS');

-- W18: Zip-Up Hoodie — Black, Gray, Lavender
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(31, '#000000', 'S', 10, 'W-ZUH-BLK-S'), (31, '#000000', 'M', 14, 'W-ZUH-BLK-M'), (31, '#000000', 'L', 10, 'W-ZUH-BLK-L'),
(31, '#6f6f6f', 'S', 8, 'W-ZUH-GRY-S'), (31, '#6f6f6f', 'M', 12, 'W-ZUH-GRY-M'), (31, '#6f6f6f', 'L', 8, 'W-ZUH-GRY-L'),
(31, '#b4a7d6', 'S', 5, 'W-ZUH-LAV-S'), (31, '#b4a7d6', 'M', 9, 'W-ZUH-LAV-M'), (31, '#b4a7d6', 'L', 6, 'W-ZUH-LAV-L');

-- W19: Pearl Drop Earrings — Gold, Silver, Rose Gold
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(32, '#d4af37', 'One Size', 20, 'W-PDE-GLD-OS'),
(32, '#c0c0c0', 'One Size', 18, 'W-PDE-SLV-OS'),
(32, '#b76e79', 'One Size', 15, 'W-PDE-RSG-OS');

-- W20: Off-Shoulder Knit Sweater — Cream, Black, Dusty Pink
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(33, '#f5f0eb', 'S', 8, 'W-OKS-CRM-S'), (33, '#f5f0eb', 'M', 12, 'W-OKS-CRM-M'), (33, '#f5f0eb', 'L', 8, 'W-OKS-CRM-L'),
(33, '#000000', 'S', 6, 'W-OKS-BLK-S'), (33, '#000000', 'M', 10, 'W-OKS-BLK-M'), (33, '#000000', 'L', 7, 'W-OKS-BLK-L'),
(33, '#d4a5a5', 'S', 5, 'W-OKS-DPK-S'), (33, '#d4a5a5', 'M', 8, 'W-OKS-DPK-M'), (33, '#d4a5a5', 'L', 6, 'W-OKS-DPK-L');

-- M14: Corduroy Overshirt — Brown, Forest Green, Black
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(34, '#8b5e3c', 'S', 8, 'M-COS-BRN-S'), (34, '#8b5e3c', 'M', 12, 'M-COS-BRN-M'), (34, '#8b5e3c', 'L', 10, 'M-COS-BRN-L'),
(34, '#355e3b', 'S', 6, 'M-COS-FGR-S'), (34, '#355e3b', 'M', 10, 'M-COS-FGR-M'), (34, '#355e3b', 'L', 8, 'M-COS-FGR-L'),
(34, '#000000', 'S', 5, 'M-COS-BLK-S'), (34, '#000000', 'M', 9, 'M-COS-BLK-M'), (34, '#000000', 'L', 7, 'M-COS-BLK-L');

-- M15: Henley Long Sleeve — White, Charcoal, Olive
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(35, '#f5f0eb', 'S', 12, 'M-HLS-WHT-S'), (35, '#f5f0eb', 'M', 15, 'M-HLS-WHT-M'), (35, '#f5f0eb', 'L', 10, 'M-HLS-WHT-L'),
(35, '#36454f', 'S', 8, 'M-HLS-CHR-S'), (35, '#36454f', 'M', 12, 'M-HLS-CHR-M'), (35, '#36454f', 'L', 8, 'M-HLS-CHR-L'),
(35, '#556b2f', 'S', 6, 'M-HLS-OLV-S'), (35, '#556b2f', 'M', 10, 'M-HLS-OLV-M'), (35, '#556b2f', 'L', 7, 'M-HLS-OLV-L');

-- M16: Cargo Jogger Pants — Black, Khaki, Olive
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(36, '#000000', 'S', 10, 'M-CGJ-BLK-S'), (36, '#000000', 'M', 14, 'M-CGJ-BLK-M'), (36, '#000000', 'L', 10, 'M-CGJ-BLK-L'),
(36, '#c3b091', 'S', 8, 'M-CGJ-KHK-S'), (36, '#c3b091', 'M', 12, 'M-CGJ-KHK-M'), (36, '#c3b091', 'L', 8, 'M-CGJ-KHK-L'),
(36, '#556b2f', 'S', 6, 'M-CGJ-OLV-S'), (36, '#556b2f', 'M', 10, 'M-CGJ-OLV-M'), (36, '#556b2f', 'L', 7, 'M-CGJ-OLV-L');

-- M17: Quarter-Zip Pullover — Navy, Heather Gray, Black
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(37, '#2c3e6b', 'S', 8, 'M-QZP-NVY-S'), (37, '#2c3e6b', 'M', 12, 'M-QZP-NVY-M'), (37, '#2c3e6b', 'L', 10, 'M-QZP-NVY-L'),
(37, '#9e9e9e', 'S', 6, 'M-QZP-HGR-S'), (37, '#9e9e9e', 'M', 10, 'M-QZP-HGR-M'), (37, '#9e9e9e', 'L', 8, 'M-QZP-HGR-L'),
(37, '#000000', 'S', 5, 'M-QZP-BLK-S'), (37, '#000000', 'M', 9, 'M-QZP-BLK-M'), (37, '#000000', 'L', 7, 'M-QZP-BLK-L');

-- M18: Weekender Duffle Bag — Brown, Olive, Black
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(38, '#8b5e3c', 'One Size', 10, 'M-WDB-BRN-OS'),
(38, '#556b2f', 'One Size', 8, 'M-WDB-OLV-OS'),
(38, '#000000', 'One Size', 12, 'M-WDB-BLK-OS');

-- M19: Wool Fedora Hat — Black, Camel, Gray
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(39, '#000000', 'S', 10, 'M-WFH-BLK-S'), (39, '#000000', 'M', 14, 'M-WFH-BLK-M'), (39, '#000000', 'L', 10, 'M-WFH-BLK-L'),
(39, '#c19a6b', 'S', 6, 'M-WFH-CML-S'), (39, '#c19a6b', 'M', 10, 'M-WFH-CML-M'), (39, '#c19a6b', 'L', 8, 'M-WFH-CML-L'),
(39, '#6f6f6f', 'S', 5, 'M-WFH-GRY-S'), (39, '#6f6f6f', 'M', 9, 'M-WFH-GRY-M'), (39, '#6f6f6f', 'L', 7, 'M-WFH-GRY-L');

-- M20: Graphic Crew T-Shirt — Black, White, Navy
INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES
(40, '#000000', 'S', 15, 'M-GCT-BLK-S'), (40, '#000000', 'M', 20, 'M-GCT-BLK-M'), (40, '#000000', 'L', 15, 'M-GCT-BLK-L'),
(40, '#f5f0eb', 'S', 10, 'M-GCT-WHT-S'), (40, '#f5f0eb', 'M', 15, 'M-GCT-WHT-M'), (40, '#f5f0eb', 'L', 10, 'M-GCT-WHT-L'),
(40, '#2c3e6b', 'S', 8, 'M-GCT-NVY-S'), (40, '#2c3e6b', 'M', 12, 'M-GCT-NVY-M'), (40, '#2c3e6b', 'L', 8, 'M-GCT-NVY-L');

-- =============================================
-- REVIEWS — NEW PRODUCTS (3+ reviews each)
-- =============================================
INSERT INTO REVIEWS (user_id, product_id, rating, comment) VALUES
-- W13: Denim Jacket
(1, 26, 5, 'Perfect denim jacket! The wash is gorgeous and the fit is just right.'),
(2, 26, 4, 'Great quality denim, slightly oversized but I love it.'),
(3, 26, 5, 'My new go-to layering piece. Goes with everything!'),
-- W14: Wrap Blouse
(4, 27, 5, 'Beautiful blouse, the wrap design is very flattering.'),
(5, 27, 4, 'Lovely fabric and great for the office. Runs slightly small.'),
(1, 27, 5, 'Elegant and versatile. Wore it to a dinner and got so many compliments.'),
-- W15: Pleated Midi Skirt
(2, 28, 4, 'Beautiful pleats that hold up well after washing.'),
(3, 28, 5, 'Flows beautifully when walking. Love the midi length!'),
(4, 28, 5, 'Perfect work-to-dinner skirt. The elastic waist is so comfortable.'),
-- W16: Cocktail Slip Dress
(5, 29, 5, 'Stunning dress! The satin feels luxurious against the skin.'),
(1, 29, 4, 'Gorgeous cowl neckline. Perfect for a night out.'),
(2, 29, 5, 'The burgundy color is absolutely breathtaking. A showstopper!'),
-- W17: Structured Shoulder Bag
(3, 30, 5, 'Beautifully crafted bag. Fits everything I need for work.'),
(4, 30, 4, 'Love the structured shape. Hardware feels premium.'),
(5, 30, 5, 'Best bag purchase this year. The tan color is gorgeous!'),
-- W18: Zip-Up Hoodie
(1, 31, 4, 'Super cozy! The lavender color is unique and pretty.'),
(2, 31, 5, 'Perfect hoodie for layering. Fleece lining is so soft.'),
(3, 31, 4, 'Love the relaxed fit. Zipper quality is excellent.'),
-- W19: Pearl Drop Earrings
(4, 32, 5, 'Delicate and elegant. The pearls have a beautiful luster.'),
(5, 32, 5, 'Perfect everyday earrings. Lightweight and hypoallergenic!'),
(1, 32, 4, 'Lovely gift for my mom. She adores them. Packaging was beautiful.'),
-- W20: Off-Shoulder Knit Sweater
(2, 33, 5, 'So cozy and stylish! The cable knit pattern is beautiful.'),
(3, 33, 4, 'Love wearing it off the shoulder. Very romantic look.'),
(4, 33, 5, 'The cream color goes with everything. Super soft yarn!'),
-- M14: Corduroy Overshirt
(5, 34, 5, 'Amazing overshirt, the corduroy texture is premium.'),
(1, 34, 4, 'Great layering piece for autumn. Love the brown color.'),
(2, 34, 5, 'Perfect weight, not too heavy. Works as a shirt or light jacket.'),
-- M15: Henley Long Sleeve
(3, 35, 4, 'Comfortable henley, waffle knit texture looks great.'),
(4, 35, 5, 'Perfect fit and great for layering under a jacket.'),
(5, 35, 4, 'Nice quality cotton. Holds up well after multiple washes.'),
-- M16: Cargo Jogger Pants
(1, 36, 5, 'Love the utility pockets! Comfortable and stylish.'),
(2, 36, 4, 'Great joggers, the tapered fit looks clean.'),
(3, 36, 5, 'Best cargo pants I have owned. The ribbed cuffs are a nice touch.'),
-- M17: Quarter-Zip Pullover
(4, 37, 5, 'Versatile pullover, perfect for golf or casual outings.'),
(5, 37, 4, 'Nice brushed interior, very soft. Good for layering.'),
(1, 37, 5, 'The navy color is sharp. Great quality for the price.'),
-- M18: Weekender Duffle Bag
(2, 38, 5, 'Perfect size for a weekend trip. The leather handles feel sturdy.'),
(3, 38, 4, 'Great bag! Love the shoe compartment at the bottom.'),
(4, 38, 5, 'Bought in brown, looks even better in person. Well-constructed.'),
-- M19: Wool Fedora Hat
(5, 39, 5, 'Handsome fedora, the wool quality is excellent.'),
(1, 39, 4, 'Classic style that elevates any outfit. Fits true to size.'),
(2, 39, 5, 'Love the satin lining. Very comfortable for all-day wear.'),
-- M20: Graphic Crew T-Shirt
(3, 40, 4, 'Cool graphic design, soft cotton feels great.'),
(4, 40, 5, 'Love the eco-friendly ink approach. Print has held up well.'),
(5, 40, 4, 'Nice relaxed fit. The slightly longer back hem is a good detail.');

-- =============================================
-- PRODUCT_SALE — NEW PRODUCTS (8 of 15 on sale)
-- =============================================
INSERT INTO PRODUCT_SALE (product_id, sale_id, sale_price) VALUES
-- Mid-Year Mega Sale (20% off)
(26, 1, 599200.00),   -- Denim Jacket: 749000 * 0.8
(28, 1, 423200.00),   -- Pleated Midi Skirt: 529000 * 0.8
(35, 1, 223200.00),   -- Henley Long Sleeve: 279000 * 0.8
-- Summer Flash Sale (50% off)
(29, 2, 339500.00),   -- Cocktail Slip Dress: 679000 * 0.5
(40, 2, 99500.00),    -- Graphic Crew T-Shirt: 199000 * 0.5
-- Special Weekend Promo (30% off)
(31, 3, 384300.00),   -- Zip-Up Hoodie: 549000 * 0.7
(37, 3, 335300.00),   -- Quarter-Zip Pullover: 479000 * 0.7
(36, 3, 300300.00);   -- Cargo Jogger Pants: 429000 * 0.7
