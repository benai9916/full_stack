from pymongo import MongoClient
import os

class MongoAPI:
    def __init__(self, data):
        self.client = MongoClient(os.environ.get('MONGODB_URL'))

        database_name = 'sample_weatherdata'
        collection = data['collection']
        cursor = self.client[database_name]
        self.collection = cursor[collection]

    def read_all(self):
        documents = self.collection.find()
        return documents