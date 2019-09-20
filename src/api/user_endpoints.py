from flask_restful import Resource, reqparse

from src.api import db


class UserCreation(Resource):
    def post(self):
        # create new user
        parser = reqparse.RequestParser()
        parser.add_argument('username')
        parser.add_argument('password')
        args = parser.parse_args()
        needed_username = args['username']

        existing_users = db.search(db.users, query=(db.query.username == needed_username))
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
