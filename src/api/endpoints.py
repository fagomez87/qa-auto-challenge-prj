endpoints = {
    'REGISTER_USER': '/users/register',
    'LOGIN_USER': '/users/login',
    'GET_PRODUCT': '/<string:username>/products/<string:product_name>',
    'ADD_TO_CART': '/<string:username>/products/<string:product_name>/add',
    'CHECKOUT_CART': '/<string:username>/products/cart/checkout'
}
