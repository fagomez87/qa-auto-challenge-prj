from flask_restful import Resource, reqparse

from helpers import is_logged_in
from db.db import DataBase

db = DataBase()


class ProductInfo(Resource):
    def get(self, username, product_name):
        # get info about product quantity and price
        if not is_logged_in(db, username):
            return 'User must be logged-in to perform this action', 401

        if not product_name:
            return db.products.all(), 200
        else:
            product = db.search(db.products, query=(db.query.product_name == product_name))
            if product:
                return product[0], 200

            return 'Product "{}" does not exist.', 400


class ProductsInfo(Resource):
    def get(self, username):
        if not is_logged_in(db, username):
            return 'User must be logged-in to perform this action', 401
        return db.products.all(), 200


class AddProductToCart(Resource):
    def post(self, username, product_name):
        # add product to cart if requested amount is available
        if not is_logged_in(db, username):
            return 'User must be logged-in to perform this action', 401

        parser = reqparse.RequestParser()
        parser.add_argument('quantity')
        args = parser.parse_args()
        needed_qty = int(args['quantity'])

        results_from_inventory = db.search(db.products, query=(db.query.product_name == product_name))
        if results_from_inventory:
            product = results_from_inventory[0]  # making assumption we aren't making dupe products, just for now
            results_from_cart = db.search(db.cart, query=((db.query.cart_owner == username) & (db.query.product_name == product_name)))
            if results_from_cart:
                existing_qty = results_from_cart[0].get('product_qty')
                needed_qty = existing_qty + needed_qty

            if product.get('product_qty') >= needed_qty:
                # we will deduct the qty from the db at checkout time
                if results_from_cart:
                    db.update(table=db.cart, update={'product_qty': needed_qty}, query=((db.query.cart_owner == username) & (db.query.product_name == product_name)))
                else:
                    item_for_cart = {'product_name': str(product_name), 'product_qty': int(needed_qty), 'cart_owner': str(username)}
                    db.insert(table=db.cart, data_dict=item_for_cart)
                return 'QTY "{}" of product "{}" added to cart successfully'.format(needed_qty, product_name), 200
            else:
                return 'Unable to request QTY "{}" for product "{}": insufficient inventory'.format(needed_qty, product_name), 400

        return 'Product "{}" does not exist.'.format(product_name), 400


class CartInfo(Resource):
    def get(self, username):
        if not is_logged_in(db, username):
            return 'User must be logged-in to perform this action', 401

        cart = db.search(db.cart, query=(db.query.cart_owner == username))
        if cart:
            return cart, 200


class RemoveProductFromCart(Resource):
    def post(self, username, product_name):
        if not is_logged_in(db, username):
            return 'User must be logged-in to perform this action', 401

        results_from_cart = db.search(db.cart, query=((db.query.cart_owner == username) & (db.query.product_name == product_name)))
        if not results_from_cart:
            return 'Product "{}" does not exist in cart.'.format(product_name), 400
        else:
            db.remove(db.cart, ((db.query.cart_owner == username) & (db.query.product_name == product_name)))
            return 'Product "{}" successfully removed from cart.'.format(product_name), 200


class CheckoutCart(Resource):
    def get(self, username):
        if not is_logged_in(db, username):
            return 'User must be logged-in to perform this action', 401

        return db.cart, 200

    def post(self, username):
        if not is_logged_in(db, username):
            return 'User must be logged-in to perform this action', 401

        cart = db.search(db.cart, query=(db.query.cart_owner == username))
        inventory_product = db.products
        for cart_product in cart:
            cart_product_name = cart_product.get('product_name')
            cart_product_qty = cart_product.get('product_qty')
            inventory_product = db.search(db.products, query=(db.query.product_name == cart_product_name))[0]
            if inventory_product.get('product_qty') >= cart_product_qty:
                new_qty = inventory_product.get('product_qty') - cart_product_qty
                db.update(table=db.products, update={'product_qty': new_qty},
                          query=(db.query.product_name == cart_product_name))
            else:
                return 'Unable to request QTY "{}" for product "{}": insufficient inventory'.format(cart_product_qty, cart_product_name), 400 

        db.remove(db.cart, (db.query.cart_owner == username))
        return 'Checkout successful! Thank you for shopping with us.', 200
