from flask import Flask
from flask_restful import Api, Resource, reqparse

from src.db.db import DataBase
from src.api.endpoints import REGISTER_USER, LOGIN_USER


app = Flask(__name__)
api = Api(app)
db = DataBase()


class UserCreation(Resource):
    def post(self):
        # create new user
        parser = reqparse.RequestParser()
        parser.add_argument('username')
        parser.add_argument('password')
        args = parser.parse_args()
        for user in db.users.all():
            if user.get('username') == args['username']:
                return 'Username "{}" already exists, please choose another'.format(args['username']), 409

        new_user = {'username': args['username'], 'password': args['password']}

        db.insert(db.users, new_user)

        return 'User created successfully', 200


class UserLogin(Resource):
    def post(self):
        # login as user
        parser = reqparse.RequestParser()
        parser.add_argument('username')
        parser.add_argument('password')
        args = parser.parse_args()
        for user in db.users.all():
            if user.get('username') == args['username']:
                if user.get('password') == args['password']:
                    return 'Login succeeded.', 200

        return 'Invalid username/password combo.', 401

api.add_resource(UserCreation, REGISTER_USER)
api.add_resource(UserLogin, LOGIN_USER)


if __name__ == '__main__':
    app.run(debug=True)
