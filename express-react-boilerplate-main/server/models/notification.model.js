import bookshelf from '../config/bookshelf';
import User from './user.model';

const TABLE_NAME = 'notifications';

/**
 * Notification model.
 */
class Notification extends bookshelf.Model {

    /**
     * Get table name.
     */
    get tableName() {
        return TABLE_NAME;
    }

    /**
     * Table has timestamps.
     */
    get hasTimestamps() {
        return true;
    }

    /**
     * A notification belongs to a user.
     */
    user() {
        return this.belongsTo(User, 'user_id');
    }
}

export default Notification;
