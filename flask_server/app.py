import requests
from flask import Flask, request
from flask_cors import CORS
from flask import jsonify
import json

app = Flask(__name__)

CORS(app)

SECRET_KEY = 'test_secret_key_b6b009c3ce3d4cd79c501de3bca3610f'
URL = "https://khalti.com/api/v2/payment/verify/"

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/charge', methods=['POST'])
def verify():
    data = json.loads(request.data.decode())
    payload = {
      "token": data.get('token'),
      "amount": data.get('amount')
    }
    headers = {
      "Authorization": "Key {}".format(SECRET_KEY)
    }
    res = {}
    try:
        response = requests.post(URL, payload, headers = headers)
        if (response.status_code == 200):
            res['data'] = response.json()
            res['status'] = 'success'
            return jsonify(res), 200
        else:
            print(response.status_code, 'error while calling khalti server')
            res['data'] = response.json()
            res['status'] = 'error'
            return jsonify(res), 500

    except requests.exceptions.HTTPError as e:
        print('http error')
        res['data'] = 'error has occured'
        res['status'] = 'error'
        return jsonify(res), 500



if __name__ == '__main__':
    app.run(port='3000')
