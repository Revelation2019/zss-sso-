<template>
	<div>welcome, {{ name }}</div>
</template>

<script>
export default {
	name: 'Welcome',
	data() {
		return {
			name: '',
		}
	},
	created() {
		this.$store.dispatch('_user/getUserInfo').then(res => {
			console.log(res)
			this.name = res.re.name
		})
	},
}
</script>

<style></style>
