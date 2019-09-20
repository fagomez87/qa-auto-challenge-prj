from flask import Flask
from flask_restful import Api, Resource, reqparse

from src.api.endpoints import endpoints
from src.db.db import DataBase
from src.db.default_inventory import default_inventory


app = Flask(__name__)
api = Api(app)
db = DataBase()

def is_logged_in(username):
    user = db.search(table=db.users, query=(db.query.username == username))
    print(user)
    if user:
        is_logged_in = user[0].get('is_logged_in')
    else:
        is_logged_in = False

    return is_logged_in

class UserCreation(Resource):
    def post(self):
        # create new user
        parser = reqparse.RequestParser()
        parser.add_argument('username')
        parser.add_argument('password')
        args = parser.parse_args()
        needed_username = args['username']

        existing_users = db.search(db.users, query=(db.query.username == 'username'))
        if existing_users:
            return 'Username "{}" already exists, please choose another'.format(needed_username), 409

        new_user = {'username': needed_username, 'password': args['password'], 'is_logged_in': False}

        db.insert(db.users, new_user)

        return 'User created successfully', 200


class UserLogin(Resource):
    def post(self):
        # login as user
        parser = reqparse.RequestParser()
        parser.add_argument('username')
        parser.add_argument('password')
        args = parser.parse_args()
        username = args['username']
        for user in db.users.all():
            if user.get('username') == username:
                if user.get('password') == args['password']:
                    db.update(table=db.users, update={'is_logged_in': True},
                              query=(db.query.username == username))
                    return 'Login succeeded.', 200

        return 'Invalid username/password combo.', 401


class ProductInfo(Resource):
    def get(self, username, product_name=''):
        # get info about product quantity and price
        if not is_logged_in(username):
            return 'User must be logged-in to perform this action', 401

        if not product_name:
            return db.products.all(), 200
        else:
            product = db.search(db.products, query=(db.query.product_name == product_name))
            if product:
                return product[0], 200

            return 'Product "{}" does not exist.', 400


class AddProductToCart(Resource):
    def post(self, username, product_name):
        # add product to cart if requested amount is available
        if not is_logged_in(username):
            return 'User must be logged-in to perform this action', 401

        parser = reqparse.RequestParser()
        parser.add_argument('quantity')
        args = parser.parse_args()
        needed_qty = int(args['quantity'])

        results_from_inventory = db.search(db.products, query=(db.query.product_name == product_name))
        if results_from_inventory:
            product = results_from_inventory[0]  # making assumption we aren't making dupe products, just for now
            if product.get('product_qty') >= needed_qty:
                # we will deduct the qty from the db at checkout time
                item_for_cart = {'product_name': str(product_name), 'product_qty': int(needed_qty)}

                db.insert(table=db.cart, data_dict=item_for_cart)
                return 'QTY "{}" of product "{}" added to cart successfully'.format(needed_qty, product_name), 200
            else:
                return 'Unable to request QTY "{}" for product "{}": insufficient inventory'.format(needed_qty, product_name), 400

        return 'Product "{}" does not exist.', 400


class CheckoutCart(Resource):
    def get(self, username):
        if not is_logged_in(username):
            return 'User must be logged-in to perform this action', 401

        return db.cart, 200

    def post(self, username):
        if not is_logged_in(username):
            return 'User must be logged-in to perform this action', 401

        cart = db.cart
        inventory = db.products
        for cart_product in cart:
            cart_product_name = cart_product.get('product_name')
            cart_product_qty = cart_product.get('product_qty')
            inventory_product = db.search(db.products, query=(db.query.product_name == cart_product_name))[0]
            if inventory_product.get('product_qty') <= cart_product_qty:
                new_qty = inventory_product.get('product_qty') - cart_product_qty
                db.update(table=db.products, update={'product_qty': new_qty},
                          query=(db.query.product_name == cart_product_name))
            else:
                return 'Unable to request QTY "{}" for product "{}": insufficient inventory'.format(cart_product_qty, cart_product_name), 400 

        db.purge_table(db.cart)
        return 'Checkout successful! Thank you for shopping with us.', 200


api.add_resource(UserCreation, endpoints['REGISTER_USER'])
api.add_resource(UserLogin, endpoints['LOGIN_USER'])
api.add_resource(ProductInfo, endpoints['GET_PRODUCT'])
api.add_resource(AddProductToCart, endpoints['ADD_TO_CART'])
api.add_resource(CheckoutCart, endpoints['CHECKOUT_CART'])


if __name__ == '__main__':
    db.purge_table(db.users)
    db.purge_table(db.cart)
    db.purge_table(db.products)

    for product in default_inventory:
        db.insert(db.products, product)

    app.run(debug=True)
