import express from 'express';
import * as productCtrl from '../controllers/product.controller';
import isAuthenticated from '../middlewares/authenticate';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: product
 *     description: Product operations (scoped to the logged-in user)
 */

router.route('/')
    .get(isAuthenticated, (req, res) => {
        productCtrl.findAllByUser(req, res);
    })
    .post(isAuthenticated, (req, res) => {
        productCtrl.store(req, res);
    });

router.route('/:id')
    .get(isAuthenticated, (req, res) => {
        productCtrl.findById(req, res);
    })
    .put(isAuthenticated, (req, res) => {
        productCtrl.update(req, res);
    })
    .delete(isAuthenticated, (req, res) => {
        productCtrl.destroy(req, res);
    });

export default router;
