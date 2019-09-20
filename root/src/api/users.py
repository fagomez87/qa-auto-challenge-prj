from flask_restful import Resource, reqparse

class Users(Resource):
    def __init__(self, api, db):
        self.api = api
        self.db = db
        self.users = self.db.table('users')
        self.endpoint = '/users/'

    def register(self, username, password):
        new_user = {'username': username, 'password': password}

    def login(self, username, password):
        pass
