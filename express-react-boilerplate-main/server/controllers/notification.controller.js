import HttpStatus from 'http-status-codes';
import Notification from '../models/notification.model';

/**
 * Find all notifications belonging to the logged-in user, newest first.
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAllByUser(req, res) {
    Notification.where({ user_id: req.currentUser.get('id') })
        .orderBy('id', 'DESC')
        .fetchAll()
        .then(notifications => res.json({
                error: false,
                data: notifications.toJSON()
            })
        )
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        );
}

/**
 * Mark a single notification as read.
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function markAsRead(req, res) {
    Notification.forge({ id: req.params.id, user_id: req.currentUser.get('id') })
        .fetch({ require: true })
        .then(notification => notification.save({ is_read: true })
                .then(() => res.json({
                        error: false,
                        data: notification.toJSON()
                    })
                )
        )
        .catch(err => res.status(HttpStatus.NOT_FOUND).json({
                error: err
            })
        );
}
