endpoints = {
    'REGISTER_USER': '/users/register',
    'LOGIN_USER': '/users/login',
    'GET_PRODUCTS': '/<string:username>/products',
    'GET_PRODUCT': '/<string:username>/products/<string:product_name>',
    'ADD_TO_CART': '/<string:username>/products/<string:product_name>/add',
    'CHECKOUT_CART': '/<string:username>/products/cart/checkout'
}

swagger_data = {
    'SWAGGER_URL': '/api/docs',
    'SWAGGER_CONFIG_FILE': 'api_docs.yaml',
}
