import HttpStatus from 'http-status-codes';
import Product from '../models/product.model';
import Notification from '../models/notification.model';
import { emitToUser } from '../config/socket';

/**
 * Find all products belonging to the logged-in user.
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAllByUser(req, res) {
    Product.where({ user_id: req.currentUser.get('id') })
        .fetchAll()
        .then(products => res.json({
                error: false,
                data: products.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 * Find a single product by id (must belong to the logged-in user).
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {
    Product.forge({ id: req.params.id, user_id: req.currentUser.get('id') })
        .fetch()
        .then(product => {
            if (!product) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, data: {}
                });
            } else {
                res.json({
                    error: false,
                    data: product.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 * Create a new product for the logged-in user, then fire a
 * notification (stored + pushed in real time over socket.io).
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function store(req, res) {
    const { title, description, price } = req.body;
    const userId = req.currentUser.get('id');

    Product.forge({
        user_id: userId, title, description, price
    }).save()
        .then(product => {
            res.json({
                error: false,
                data: product.toJSON()
            });

            // Create a notification record for this event, and push it to
            // the browser in real time. Any failure here is only logged -
            // the HTTP response for the product itself has already been sent.
            const message = `Your product "${title}" was added successfully.`;
            Notification.forge({ user_id: userId, message })
                .save()
                .then(notification => emitToUser(userId, 'notification', notification.toJSON()))
                .catch(err => console.error('Failed to create notification:', err));
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 * Update a product by id (must belong to the logged-in user).
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {
    Product.forge({ id: req.params.id, user_id: req.currentUser.get('id') })
        .fetch({ require: true })
        .then(product => product.save({
                title: req.body.title || product.get('title'),
                description: req.body.description || product.get('description'),
                price: req.body.price || product.get('price')
            })
                .then(() => res.json({
                        error: false,
                        data: product.toJSON()
                    })
                )
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: true,
                        data: { message: err.message }
                    })
                )
        )
        .catch(err => res.status(HttpStatus.NOT_FOUND).json({
                error: err
            })
        );
}

/**
 * Destroy a product by id (must belong to the logged-in user).
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function destroy(req, res) {
    Product.forge({ id: req.params.id, user_id: req.currentUser.get('id') })
        .fetch({ require: true })
        .then(product => product.destroy()
            .then(() => res.json({
                    error: false,
                    data: { message: 'Product deleted successfully.' }
                })
            )
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: true,
                    data: { message: err.message }
                })
            )
        )
        .catch(err => res.status(HttpStatus.NOT_FOUND).json({
                error: err
            })
        );
}
