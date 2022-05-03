from flask import Flask, json
from flask_cors import CORS
from dotenv import load_dotenv
from random import sample

# local import
from database.db import MongoAPI

load_dotenv()

app = Flask(__name__)

CORS(app)


@app.route('/api/v1/weather', methods=['GET'])
def get_weather():
    response = []
    mongo = MongoAPI({'collection': 'data'})

    output = mongo.read_all()

    for i in output:
        temp = {}
        temp['airTemperature'] = i['airTemperature']['value']
        temp['ts'] = i['ts'].isoformat()
        response.append(temp)

    return json.dumps(sample(response, 60))


@app.route('/health', methods=['GET'])
def health():
    return 'running'


if __name__ == "__main__":
    app.run(debug=True)