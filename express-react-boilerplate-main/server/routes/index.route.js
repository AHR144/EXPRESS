import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import productRoutes from './product.route';
import notificationRoutes from './notification.route';

const router = express.Router();

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount user routes at /users
router.use('/users', userRoutes);

// mount product routes at /products
router.use('/products', productRoutes);

// mount notification routes at /notifications
router.use('/notifications', notificationRoutes);

export default router;