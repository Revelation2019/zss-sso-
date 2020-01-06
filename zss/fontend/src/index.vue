<template>
	<el-container style="height: 100%;">
		<el-header class="header">
			<el-row style="height: 100%;" type="flex" align="middle">
				<el-col :span="6">log</el-col>
				<el-col :span="12">menu</el-col>
				<el-col :span="6">
					<el-button type="success" size="small" @click="logout">注销</el-button>
				</el-col>
			</el-row>
		</el-header>
		<el-container>
			<el-aside width="200px" class="aside">Aside</el-aside>
			<el-container>
				<el-main>
					<router-view></router-view>
				</el-main>
				<el-footer class="footer">Footer</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<script>
import perms from '@/utils/perms'
export default {
	name: 'Index',
	data() {
		return {}
	},
	methods: {
		logout() {
			perms.logout()
		},
	},
}
</script>

<style>
.header {
	background-color: #409eff;
}
.aside {
	background-color: #c0c4cc;
}
.footer {
	background-color: #c0c4cc;
}
</style>
