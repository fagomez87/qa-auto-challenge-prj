from flask import Flask
from flask_restful import Api, Resource, reqparse

from src.db.db import DataBase
from src.api.endpoints import endpoints


app = Flask(__name__)
api = Api(app)
db = DataBase()
is_logged_in = False


class UserCreation(Resource):
    def post(self):
        # create new user
        parser = reqparse.RequestParser()
        parser.add_argument('username')
        parser.add_argument('password')
        args = parser.parse_args()
        needed_username = args['username']

        for user in db.users.all():
            if user.get('username') == needed_username:
                return 'Username "{}" already exists, please choose another'.format(needed_username), 409

        new_user = {'username': needed_username, 'password': args['password']}

        db.insert(db.users, new_user)

        return 'User created successfully', 200


class UserLogin(Resource):
    def post(self):
        # login as user
        global is_logged_in
        parser = reqparse.RequestParser()
        parser.add_argument('username')
        parser.add_argument('password')
        args = parser.parse_args()
        for user in db.users.all():
            if user.get('username') == args['username']:
                if user.get('password') == args['password']:
                    is_logged_in = True
                    return 'Login succeeded.', 200

        return 'Invalid username/password combo.', 401


class ProductInfo(Resource):
    def get(self, product_name=''):
        # get info about product quantity and price
        global is_logged_in
        if not is_logged_in:
            return 'User must be logged-in to perform this action', 401

        if not product_name:
            return db.products.all(), 200
        else:
            for product in db.products.all():
                if product.get('product_name') == product_name:
                    return product, 200

            return 'Product "{}" does not exist.', 404

class AddProductToCart(Resource):
    def post(self, product_name):
        # add product to cart if requested amount is available
        global is_logged_in
        if not is_logged_in:
            return 'User must be logged-in to perform this action', 401

        parser = reqparse.RequestParser()
        parser.add_argument('quantity')
        args = parser.parse_args()
        needed_qty = int(args['quantity'])

        for product in db.products.all():
            if product.get('product_name') == product_name:
                if product.get('product_qty') >= needed_qty:
                    # we will deduct the qty from the db at checkout time
                    return 'QTY "{}" of product "{}" added to cart successfully'.format(needed_qty, product_name), 200
                else:
                    return 'Unable to request QTY "{}" for product "{}": insufficient inventory'.format(needed_qty, product_name), 400

        return 'Product "{}" does not exist.', 404


class CheckoutCart(Resource):
    def post(self)


api.add_resource(UserCreation, endpoints['REGISTER_USER'])
api.add_resource(UserLogin, endpoints['LOGIN_USER'])
api.add_resource(ProductInfo, endpoints['GET_PRODUCT'])
api.add_resource(AddProductToCart, endpoints['ADD_TO_CART'])


if __name__ == '__main__':
    app.run(debug=True)
