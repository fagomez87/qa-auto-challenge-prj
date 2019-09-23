from src.api import app, api, db
from src.api.data import endpoints
from src.api.product_endpoints import ProductInfo, ProductsInfo, AddProductToCart, CheckoutCart
from src.api.user_endpoints import UserCreation, UserLogin
from src.db.default_inventory import default_inventory

if __name__ == '__main__':
    api.add_resource(UserCreation, endpoints['REGISTER_USER'])
    api.add_resource(UserLogin, endpoints['LOGIN_USER'])
    api.add_resource(ProductInfo, endpoints['GET_PRODUCT'])
    api.add_resource(ProductsInfo, endpoints['GET_PRODUCTS'])
    api.add_resource(AddProductToCart, endpoints['ADD_TO_CART'])
    api.add_resource(CheckoutCart, endpoints['CHECKOUT_CART'])

    db.purge_table(db.users)
    db.purge_table(db.cart)
    db.purge_table(db.products)

    for product in default_inventory:
        db.insert(db.products, product)

    app.run(debug=True)
