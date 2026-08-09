import bookshelf from '../config/bookshelf';
import User from './user.model';

const TABLE_NAME = 'products';

/**
 * Product model.
 */
class Product extends bookshelf.Model {

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
     * A product belongs to a user.
     */
    user() {
        return this.belongsTo(User, 'user_id');
    }
}

export default Product;
