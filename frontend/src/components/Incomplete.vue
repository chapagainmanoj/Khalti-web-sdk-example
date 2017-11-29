<template>
	<div class='container content'>
		<br>
		<h3 style='color: red;'>Order not Completed!</h3>

		<p>Sorry! Your order cannot be completed.. Contact <a href=''>manojc@janakitech.com</a> if you need other details. Thanks so much!</p>

	</div>

</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
	data(){
		return {
			orderDetails: false
		};
	}
}

</script>
<style>
	dt { font-weight: bold; }
</style>
