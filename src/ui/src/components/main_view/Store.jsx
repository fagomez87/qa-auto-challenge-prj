import React, { Component } from 'react';
import ProductCard from './ProductCard';
import productList from '../resources/sampleProductList'
import config from '../../config/config';
import Cookies from 'js-cookie';

class Store extends Component {
    state = { 
        apiUrl: config['api'],
        products: {}
    }

    componentDidMount() {
        // fetch API for /products
        fetch(`${this.state.apiUrl}/${Cookies.get('DLacy')}/products/ASAPP Pens`)
        .then(response => response.json())
        .then(response => {
            this.setState({
                products: response
            })
        })
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
