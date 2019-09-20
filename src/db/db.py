from tinydb import TinyDB, database

class DataBase:
    def __init__(self):
        self.db = TinyDB('db.json')
        self.users = self.db.table('users')

    def insert(self, table, data_dict):
        if type(table) == database.Table:
            table.insert(data_dict)
        else:
            self.db.table(table_name).insert(data_dict)

    def create_table(self, table_name):
        self.db.table(table_name)

    def search(self, query):
        self.db.search(query)
