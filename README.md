


## potato ##
*Khalti-web-sdk* integration example with Vue.js and Node.js

## client

> Front end component for an eCommerce application. Built with Vue.js and powered by Khalti for payment processing.


### Build Setup

``` bash
cd client

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## nodejs backend

### Run server

``` bash
cd node_server

npm install

node server.js
```

## flask (python) backend

### Run server

``` bash
cd flask_server

source venv.sh

pip install -r requirement.pip

python server.js
```


## Summery ##
These are steps summerizing whole integration:

1. Signup as merchant
https://khalti.com/merchant/

2. Obtain developers keys from merchant dashboard

3. Test integration with test keys

	 * Client side integration

	 https://github.com/chapagainmanoj/Khalti-sdk-example-vue/blob/master/frontend/src/components/Order.vue#L118)

	 * Server side integration

   nodejs https://github.com/chapagainmanoj/Khalti-sdk-example-vue/blob/master/node-server/server.js

   flask https://github.com/chapagainmanoj/Khalti-sdk-example-vue/blob/master/flask-server/app.py

4. Deploy integration replace with live keys
