import React, { Component } from 'react';
import ProductCard from './ProductCard';
import productList from '../resources/sampleProductList'

class Store extends Component {
    state = { 
    }

    componentDidMount() {
        // fetch API for /products
    }

    render() { 
        const productCards = productList['products'].map((product) => (
            <ProductCard
                productName={product['name']}
                productDescription={product['description']}
                productStock={product['stock']}
            />
        ))
        return ( 
            <div>{productCards}</div>
        );
    }
}
 
export default Store;
