from flask import Flask
from flask_restful import Api

from src.api.helpers import load_swagger_blueprint
from src.db.db import DataBase

db = DataBase()
app = Flask(__name__)
api = Api(app)

blueprint_data = load_swagger_blueprint() 

app.register_blueprint(blueprint_data['blueprint'], url_prefix=blueprint_data['swagger_url'])
