import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  trackOrderByQuery,
  cancelOrder
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Allow authenticated or guest checkout
router.post('/', (req, res, next) => {
  if (req.headers.authorization) {
    protect(req, res, next);
  } else {
    next();
  }
}, createOrder);

router.get('/myorders', protect, getMyOrders);
router.get('/track/:id', trackOrderByQuery);
router.get('/:id', getOrderById);
router.put('/:id/cancel', protect, cancelOrder);

export default router;

