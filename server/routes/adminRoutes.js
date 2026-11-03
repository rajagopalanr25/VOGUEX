import express from 'express';
import {
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
  getAllCustomers
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, admin);

router.get('/dashboard', getDashboardStats);
router.get('/orders', getAllOrders);
router.put('/orders/:orderId/status', updateOrderStatus);
router.get('/customers', getAllCustomers);

export default router;

