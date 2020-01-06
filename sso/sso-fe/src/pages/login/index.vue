<template>
	<el-container class="container">
		<el-main>
			<el-row style="height: 100%;" type="flex" align="middle" justify="center">
				<el-col :span="6">
					<div class="form-container">
						<el-form ref="form" :model="query" label-width="80px">
							<el-form-item label="账户">
								<el-input v-model="query.account" placeholder="请输入账户"></el-input>
							</el-form-item>
							<el-form-item label="密码">
								<el-input v-model="query.pwd" show-password placeholder="请输入密码"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" size="small" @click="submit">登入</el-button>
								<el-button size="small">立即注册</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			query: {
				account: '',
				pwd: '',
				loginUrl: '',
			},
		}
	},
	methods: {
		getRedirectUrl() {
			return window.location.href
				.split('?')[1]
				.split('#')[0]
				.split('=')[1]
		},
		submit() {
			this.query.loginUrl = this.getRedirectUrl()
			this.$store.dispatch('_login/login', this.query).then(res => {
				// 登录成功，后台重定向
				if (res.status === 0) {
					window.location.href = this.getRedirectUrl()
				}
			})
		},
	},
}
</script>

<style>
.container {
	width: 100%;
	height: 100%;
}
.form-container {
	width: 100%;
	height: 100%;
}
</style>
