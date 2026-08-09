import express from 'express';
import * as notificationCtrl from '../controllers/notification.controller';
import isAuthenticated from '../middlewares/authenticate';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: notification
 *     description: Notification operations (scoped to the logged-in user)
 */

router.route('/')
    .get(isAuthenticated, (req, res) => {
        notificationCtrl.findAllByUser(req, res);
    });

router.route('/:id/read')
    .put(isAuthenticated, (req, res) => {
        notificationCtrl.markAsRead(req, res);
    });

export default router;
