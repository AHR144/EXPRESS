import React, { Component } from 'react';

import Products from '../../components/products/Products';
import { fetchEntity, storeEntity } from '../../services/httpService';

class ProductsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      title: '',
      description: '',
      price: '',
      saving: false,
    };
  }

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = () => {
    fetchEntity('products')
      .then((response) => {
        this.setState({ products: response.data.data });
      })
      .catch(() => {
        // Keep the list empty if the request fails; the page still renders.
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, price } = this.state;

    this.setState({ saving: true });

    storeEntity('products', { title, description, price })
      .then(() => {
        this.setState({ title: '', description: '', price: '', saving: false });
        this.loadProducts();
      })
      .catch(() => {
        this.setState({ saving: false });
      });
  };

  render() {
    const { products, title, description, price, saving } = this.state;

    return (
      <Products
        products={products}
        title={title}
        description={description}
        price={price}
        saving={saving}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default ProductsContainer;
