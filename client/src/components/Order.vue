<template>
    <div class='container'>
        <div class='columns'>
            <div class='column is-4'>
                <img src="https://darylcygler.com/wp-content/uploads/2015/02/potato-e1429290207790.jpg" alt="A bundle of sticks">
            </div>
            <div class='column is-4'>
                <div class='field'>
                    <label>Name</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="First and Last" v-model='name'>
                        <span class="icon is-small is-left">
                          <i class="fa fa-user"></i>
                        </span>
                    </div>
                </div>
                <div class="field">
                    <label>Email</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="Email address" v-model='email'>
                        <span class="icon is-small is-left">
                            <i class="fa fa-envelope"></i>
                        </span>
                    </div>
                </div>

                <hr id='left-line'>
            </div>

            <div class='column is-4'>
                <label>Special Note</label>
                <textarea class="textarea" placeholder="What would you like the note to say?" v-model='engravingText'></textarea>
                <hr>
            </div>
        </div>
        <div class="columns">
            <div class='column is-6'>
                <button type="submit" class="button is-primary is-large is-pulled-right" @click.prevent="onButtonCick" :disabled="processing">
                    <span v-if="processing">
                        <i class="fa fa-btn fa-spinner fa-spin"></i>
                        Ordering...
                    </span>
                    <span v-else>
                        Pay with khalti
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import khalti from 'khalti-web';
const SERVER_HOST = 'http://localhost:3000'
export default {
    data(){
        return {
            checkout: null,
            client_conf:{
              key: "test_public_key_927b651e0ca540b6aa96db8b38b2abc9"
            },
            product:{
              id: "123134234",
              name: "aalu",
              url: "http://potato.com/#/order",
              price: 15*100, // paisa
              category: "Vegi"
            },
            // fields
            name: 'Eric Cartman',
            email: 'eric@cartman.com',
            engravingText: 'This is the text to put on the potato',
            address: {
                street: '123 Something Lane',
                city: 'Southpark',
                state: 'Colorado',
                zip: '94607'
            },
            processing: false,
            failed: false
        }
    },
    methods: {
        khaltiError(error){
            console.log('error');
            console.error(error);
        },
        khaltiClose(){
        let request = {
          token: "QUao9cqFzxPgvWJNi9aKac",
          amount: 1000
        };
        axios.post(`${SERVER_HOST}/charge`, request)
            .then((res) => {
              console.log('payment successfull')
              console.log(res.data)
              this.processing = false;
              this.$router.push({ path: `order-complete` });
            })
            .catch((error) => {
              this.failed = true;
              this.processing = false;
              console.error(error);
              this.$router.push({ path: `order-broken` })
            });
          console.log('widget is closing');
        },
        validate() {
          // your validating code here
          let valid = true
          console.log("validating");
          return valid
        },
        onButtonCick(){
          let isValid = this.validate()?true:false;
          if (isValid){
            this.checkout = new khalti({
              publicKey: this.client_conf.key,
              productIdentity: this.product.id,
              productName: this.product.name,
              productUrl: this.product.url,
              eventHandler:{
                onSuccess: this.khaltiSuccessHandler,
                onError: this.khaltiError,
                onClose: this.khaltiClose
              }
            });
            this.checkout.show({amount:this.product.price});

          }else {
            console.log("Cannot validated. Check your details.");
          }
        },
        khaltiSuccessHandler(payload) {
          this.failed = false;
          this.processing = true;
          console.log("Txn succesfully initiated");
          console.log(payload);

          let request = {
            token: payload.token,
            amount: payload.amount
          };
          axios.post(`${SERVER_HOST}/charge`, request)
              .then((res) => {
                console.log('payment successfull')
                console.log(res.data)
                this.processing = false;
                this.$router.push({ path: `order-complete` });
              })
              .catch((error) => {
                this.failed = true;
                this.processing = false;
                console.error(error);
                this.$router.push({ path: `order-broken` })
              });
          }
    }
}
</script>

<style>
h2 { text-decoration: underline; }
.textarea:not([rows]) { max-height: 110px; min-height: 110px; }
.container { margin-bottom: 30px; }
.column > img { margin-top: 60px; }
.button-field { display: flex; justify-content: center; }
#left-line { margin-top:27px; }
</style>
