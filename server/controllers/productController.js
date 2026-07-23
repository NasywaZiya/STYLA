const pool = require("../config/db");

// @desc    Fetch Women products
// @route   GET /api/products/women
const getWomenProducts = async (req, res) => {
  try {
    const [products] = await pool.query(`
            SELECT 
                p.product_id,
                p.product_name,
                p.price,
                c.name as category,
                (SELECT pi.image_url FROM PRODUCTS_IMAGES pi WHERE pi.product_id = p.product_id AND pi.is_display = 1 LIMIT 1) as image,
                (SELECT GROUP_CONCAT(DISTINCT v.color_code) FROM VARIANT v WHERE v.product_id = p.product_id) as colors,
                (SELECT GROUP_CONCAT(DISTINCT v.size) FROM VARIANT v WHERE v.product_id = p.product_id) as sizes,
                ps.sale_price,
                s.discount
            FROM PRODUCTS p
            LEFT JOIN CATEGORIES c ON p.category_id = c.category_id
            LEFT JOIN PRODUCT_SALE ps ON p.product_id = ps.product_id
            LEFT JOIN SALE s ON ps.sale_id = s.sale_id AND s.start_date <= NOW() AND s.end_date >= NOW()
            WHERE p.gender = 'women' AND p.status = 'active'
            ORDER BY p.created_at DESC
        `);

    // Parse colors and sizes from string to array
    const formatted = products.map((p) => ({
      ...p,
      colors: p.colors ? p.colors.split(",") : [],
      sizes: p.sizes ? p.sizes.split(",") : [],
      sale_price: p.sale_price ? parseFloat(p.sale_price) : null,
      discount: p.discount ? parseFloat(p.discount) : null,
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Fetch Men products
// @route   GET /api/products/men
const getMenProducts = async (req, res) => {
  try {
    const [products] = await pool.query(`
            SELECT 
                p.product_id,
                p.product_name,
                p.price,
                c.name as category,
                (SELECT pi.image_url FROM PRODUCTS_IMAGES pi WHERE pi.product_id = p.product_id AND pi.is_display = 1 LIMIT 1) as image,
                (SELECT GROUP_CONCAT(DISTINCT v.color_code) FROM VARIANT v WHERE v.product_id = p.product_id) as colors,
                (SELECT GROUP_CONCAT(DISTINCT v.size) FROM VARIANT v WHERE v.product_id = p.product_id) as sizes,
                ps.sale_price,
                s.discount
            FROM PRODUCTS p
            LEFT JOIN CATEGORIES c ON p.category_id = c.category_id
            LEFT JOIN PRODUCT_SALE ps ON p.product_id = ps.product_id
            LEFT JOIN SALE s ON ps.sale_id = s.sale_id AND s.start_date <= NOW() AND s.end_date >= NOW()
            WHERE p.gender = 'men' AND p.status = 'active'
            ORDER BY p.created_at DESC
        `);

    const formatted = products.map((p) => ({
      ...p,
      colors: p.colors ? p.colors.split(",") : [],
      sizes: p.sizes ? p.sizes.split(",") : [],
      sale_price: p.sale_price ? parseFloat(p.sale_price) : null,
      discount: p.discount ? parseFloat(p.discount) : null,
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Fetch recommendation products (mix of both genders)
// @route   GET /api/products/recommendation
const getRecommendationProducts = async (req, res) => {
  try {
    const [products] = await pool.query(`
            SELECT 
                p.product_id,
                p.product_name,
                p.description,
                p.price,
                p.gender,
                c.name as category,
                (SELECT pi.image_url FROM PRODUCTS_IMAGES pi WHERE pi.product_id = p.product_id AND pi.is_display = 1 LIMIT 1) as image,
                (SELECT GROUP_CONCAT(DISTINCT v.color_code) FROM VARIANT v WHERE v.product_id = p.product_id) as colors,
                ps.sale_price,
                s.discount
            FROM PRODUCTS p
            LEFT JOIN CATEGORIES c ON p.category_id = c.category_id
            LEFT JOIN PRODUCT_SALE ps ON p.product_id = ps.product_id
            LEFT JOIN SALE s ON ps.sale_id = s.sale_id AND s.start_date <= NOW() AND s.end_date >= NOW()
            WHERE p.status = 'active'
            ORDER BY RAND()
            LIMIT 10
        `);

    const formatted = products.map((p) => ({
      ...p,
      colors: p.colors ? p.colors.split(",") : [],
      sale_price: p.sale_price ? parseFloat(p.sale_price) : null,
      discount: p.discount ? parseFloat(p.discount) : null,
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Fetch all products (with optional filtering)
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, color, size, sort, gender } =
      req.query;

    let query = `
            SELECT p.*, c.name as category,
            (SELECT image_url FROM PRODUCTS_IMAGES pi WHERE pi.product_id = p.product_id AND pi.is_display = 1 LIMIT 1) as image,
            (SELECT GROUP_CONCAT(DISTINCT v2.size) FROM VARIANT v2 WHERE v2.product_id = p.product_id) as sizes,
            ps.sale_price,
            s.discount,
            (SELECT AVG(r.rating) FROM REVIEWS r WHERE r.product_id = p.product_id) as avg_rating,
            (SELECT COUNT(r.review_id) FROM REVIEWS r WHERE r.product_id = p.product_id) as review_count
            FROM PRODUCTS p
            LEFT JOIN CATEGORIES c ON p.category_id = c.category_id
            LEFT JOIN VARIANT v ON p.product_id = v.product_id
            LEFT JOIN PRODUCT_SALE ps ON p.product_id = ps.product_id
            LEFT JOIN SALE s ON ps.sale_id = s.sale_id AND s.start_date <= NOW() AND s.end_date >= NOW()
            WHERE p.status = 'active'
        `;
    const queryParams = [];

    if (gender) {
      query += ` AND p.gender = ?`;
      queryParams.push(gender);
    }

    if (search) {
      query += ` AND (p.product_name LIKE ? OR p.description LIKE ? OR c.name LIKE ?)`;
      const searchKeyword = `%${search}%`;
      queryParams.push(searchKeyword, searchKeyword, searchKeyword);
    }

    if (category) {
      query += ` AND c.name = ?`;
      queryParams.push(category);
    }

    if (minPrice) {
      query += ` AND p.price >= ?`;
      queryParams.push(minPrice);
    }

    if (maxPrice) {
      query += ` AND p.price <= ?`;
      queryParams.push(maxPrice);
    }

    if (color) {
      query += ` AND v.color_code = ?`;
      queryParams.push(color);
    }

    if (size) {
      query += ` AND v.size = ?`;
      queryParams.push(size);
    }

    query += ` GROUP BY p.product_id`;

    if (sort === "newest") {
      query += ` ORDER BY p.created_at DESC`;
    } else if (sort === "lowest_price") {
      query += ` ORDER BY p.price ASC`;
    } else if (sort === "highest_price") {
      query += ` ORDER BY p.price DESC`;
    } else {
      query += ` ORDER BY p.created_at DESC`;
    }

    const [products] = await pool.query(query, queryParams);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Fetch single product by ID (full detail with images, variants, reviews, sale)
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    // Get product with category
    const [products] = await pool.query(
      `
            SELECT p.*, c.name as category
            FROM PRODUCTS p
            LEFT JOIN CATEGORIES c ON p.category_id = c.category_id
            WHERE p.product_id = ?
        `,
      [req.params.id],
    );

    if (products.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = products[0];

    // Fetch images
    const [images] = await pool.query(
      "SELECT image_url, is_display FROM PRODUCTS_IMAGES WHERE product_id = ? ORDER BY is_display DESC",
      [req.params.id],
    );

    // Fetch variants
    const [variants] = await pool.query(
      "SELECT variant_id, color_code, size, stock FROM VARIANT WHERE product_id = ?",
      [req.params.id],
    );

    // Compute unique colors and sizes
    const colors = [...new Set(variants.map((v) => v.color_code))];
    const sizes = [...new Set(variants.map((v) => v.size))];

    // Fetch rating
    const [ratingResult] = await pool.query(
      `
            SELECT AVG(rating) as rating, COUNT(review_id) as reviewCount
            FROM REVIEWS WHERE product_id = ?
        `,
      [req.params.id],
    );

    const rating = ratingResult[0].rating
      ? parseFloat(ratingResult[0].rating).toFixed(1)
      : 0;
    const reviewCount = ratingResult[0].reviewCount || 0;

    // Fetch active sale info
    const [sales] = await pool.query(
      `
            SELECT ps.sale_price, s.sale_name, s.discount, s.start_date, s.end_date
            FROM PRODUCT_SALE ps
            JOIN SALE s ON ps.sale_id = s.sale_id
            WHERE ps.product_id = ? AND s.start_date <= NOW() AND s.end_date >= NOW()
            LIMIT 1
        `,
      [req.params.id],
    );

    res.json({
      product_id: product.product_id,
      product_name: product.product_name,
      description: product.description,
      detail: product.detail,
      material: product.material,
      category: product.category,
      gender: product.gender,
      price: product.price,
      rating: parseFloat(rating),
      reviewCount,
      images,
      colors,
      sizes,
      variants,
      sale: sales.length > 0 ? sales[0] : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a product
// @route   POST /api/products
const createProduct = async (req, res) => {
  const {
    category_id,
    product_name,
    description,
    detail,
    price,
    material,
    gender,
    status,
  } = req.body;

  if (!category_id || !product_name || !price || !gender) {
    return res
      .status(400)
      .json({
        message: "category_id, product_name, price, and gender are required",
      });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO PRODUCTS (category_id, product_name, description, detail, price, material, gender, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        category_id,
        product_name,
        description || null,
        detail || null,
        price,
        material || null,
        gender,
        status || "active",
      ],
    );

    res.status(201).json({
      product_id: result.insertId,
      category_id,
      product_name,
      description,
      detail,
      price,
      material,
      gender,
      status: status || "active",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
  const {
    category_id,
    product_name,
    description,
    detail,
    price,
    material,
    gender,
    status,
  } = req.body;

  try {
    const [existing] = await pool.query(
      "SELECT * FROM PRODUCTS WHERE product_id = ?",
      [req.params.id],
    );
    if (existing.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = existing[0];
    const updatedProduct = {
      category_id: category_id ?? product.category_id,
      product_name: product_name ?? product.product_name,
      description: description ?? product.description,
      detail: detail ?? product.detail,
      price: price ?? product.price,
      material: material ?? product.material,
      gender: gender ?? product.gender,
      status: status ?? product.status,
    };

    await pool.query(
      "UPDATE PRODUCTS SET category_id = ?, product_name = ?, description = ?, detail = ?, price = ?, material = ?, gender = ?, status = ? WHERE product_id = ?",
      [
        updatedProduct.category_id,
        updatedProduct.product_name,
        updatedProduct.description,
        updatedProduct.detail,
        updatedProduct.price,
        updatedProduct.material,
        updatedProduct.gender,
        updatedProduct.status,
        req.params.id,
      ],
    );

    res.json({ product_id: parseInt(req.params.id), ...updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM PRODUCTS WHERE product_id = ?",
      [req.params.id],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Fetch products that are currently on sale
// @route   GET /api/products/sale
const getSaleProducts = async (req, res) => {
  try {
    const [products] = await pool.query(`
            SELECT 
                p.product_id,
                p.product_name,
                p.price AS original_price,
                p.created_at,
                p.gender,
                c.name AS category,
                s.sale_name,
                s.discount,
                ps.sale_price,
                (SELECT pi.image_url FROM PRODUCTS_IMAGES pi WHERE pi.product_id = p.product_id AND pi.is_display = 1 LIMIT 1) AS image,
                (SELECT GROUP_CONCAT(DISTINCT v.size ORDER BY FIELD(v.size, 'XS','S','M','L','XL','XXL','One Size'))
                 FROM VARIANT v WHERE v.product_id = p.product_id) AS sizes
            FROM PRODUCT_SALE ps
            JOIN PRODUCTS p ON ps.product_id = p.product_id
            JOIN SALE s ON ps.sale_id = s.sale_id
            LEFT JOIN CATEGORIES c ON p.category_id = c.category_id
            WHERE p.status = 'active'
              AND s.start_date <= NOW()
              AND s.end_date >= NOW()
            ORDER BY p.created_at DESC
        `);

    const formatted = products.map((p) => ({
      ...p,
      sizes: p.sizes ? p.sizes.split(",") : [],
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getWomenProducts,
  getMenProducts,
  getRecommendationProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSaleProducts,
};
