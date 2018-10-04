<template>
	<div class='container content'>
		<br>
		<h3 style='color: white;'>Order complete!</h3>
		<p>Congratulations! Your order for Potato will be shipped out within 1-2 business days.  <a href=''>manojc@janakitech.com</a>. We sent you a confirmation email for your records. Thanks so much!</p>
	</div>

</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
	data(){
		return {
			orderDetails: true
		};
	},
	filters: {
		moment(date) {
			return moment.unix(date).format('MMMM Do, YYYY - h:mm a');
		},
		currency(amount){
			return `$${(amount/100).toFixed( 2 )}`;
		}
	}
}

</script>
<style>
	dt { font-weight: bold; }
</style>
