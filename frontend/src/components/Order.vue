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
                <button type="submit" class="button is-primary is-large is-pulled-right" @click.prevent="onButtonCick" :disabled="checkSending">
                    <span v-if="checkSending">
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

export default {
    data(){
        return {
            checkout: null,
            client_conf:{
              key: "test_public_key_dc74e0fd57cb46cd93832aee0a507256"
            },
            product:{
              id: "123134234",
              name: "aalu",
              url: "http://potato.com/#/order",
              price: 15*100, // paisa
              category: "Vegi"
            },
            transaction: {
              uuid: null,
              status: 'pending'
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

            // cardcheckSending: true,
            checkSending: false,
            checkError: false
        }
    },
    methods: {
        khaltiError(error){
            console.log('error');
            this.$router.push({ path: `order-broken` })
            console.error(error);
        },
        khaltiClose(){
          this.$router.push({ path: `order-complete/${chargeid}` })
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
            // let chargeid = 56;
            // this.createTransaction();
            // this.charge("QvvS32H7dFHHqngDoNUFkE",1500);
            this.checkout.show({amount:this.product.price});

          }else {
            console.log("Cannot validated. Check your details.");
          }
        },
        createTransaction(token,amount) {
          let request = {
              product:{
                id:this.product.id,
                name: this.product.name,
                amount: this.product.price,
                category: this.product.category
              },
              billing_details:{
                name: this.name,
                email: this.email,
                address: this.address
              },
              date: Date.now(),
          };
          axios.post(`${window.endpoint}/transactions`, request)
            .then((res,err)=> {
              if(err){
                console.error(err);
              }else {
                console.log("Transactions uuid obtained");
                this.transaction.uuid = res.data.uuid
                this.transaction.status = res.data.status
                this.charge(token,amount);
              }
            });
        },
        charge(khalti_token,amount){
          let request = {
            transaction_uuid: this.transaction.uuid,
            token: khalti_token,
            amount: amount
          };
          axios.post(`${window.endpoint}/charge`, request)
              .then((res) => {
                  var error = res.data.error;
                  var uuid = res.data.charge;
                  if (error){
                      console.error(error);
                  } else {
                      console.log("Charged");
                      this.$router.push({ path: `order-complete/${uuid}` });
                  }
              });
        },
        khaltiSuccessHandler(payload) {
          this.checkError = false;
          this.checkSending = true;
          console.log("success");
          console.log(payload);
          this.createTransaction(payload.token,payload.amount);
          // this.charge(payload.token,payload.amount);
        },
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
