import { store } from '../utils/dataStore.js';

export const getProducts = async (req, res) => {
  try {
    const { category, gender, subcategory, search, sort, minPrice, maxPrice, page = 1, limit = 12 } = req.query;
    const result = store.getProducts({
      category,
      gender,
      subcategory,
      search,
      sort,
      minPrice,
      maxPrice,
      page,
      limit
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = store.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found in luxury archives' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHomeCollections = async (req, res) => {
  try {
    const all = store.products;
    const newArrivals = all.filter(p => p.isNewArrival).slice(0, 8);
    const bestSellers = all.filter(p => p.isBestSeller).slice(0, 8);
    const trending = all.filter(p => p.isTrending).slice(0, 8);
    const limitedEdition = all.filter(p => p.isLimitedEdition).slice(0, 4);

    res.json({
      newArrivals,
      bestSellers,
      trending,
      limitedEdition
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchAutocomplete = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length === 0) {
      return res.json([]);
    }
    const query = q.toLowerCase();
    const suggestions = store.products
      .filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.subcategory?.toLowerCase().includes(query)
      )
      .slice(0, 6)
      .map(p => ({
        _id: p._id,
        name: p.name,
        brand: p.brand,
        price: p.price,
        image: p.images[0],
        category: p.category
      }));

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProd = store.addProduct(req.body);
    res.status(201).json(newProd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = store.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = store.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product successfully removed from catalogue' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

