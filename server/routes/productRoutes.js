import express from 'express';
import {
  getProducts,
  getProductById,
  getHomeCollections,
  searchAutocomplete,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/collections/home', getHomeCollections);
router.get('/search/autocomplete', searchAutocomplete);
router.get('/:id', getProductById);

// Admin product endpoints
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;

