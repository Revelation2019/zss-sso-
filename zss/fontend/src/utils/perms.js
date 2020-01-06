const logout = () => {
	window.location.href = 'http://sso.zuel.com:8082/login?serive=http://zsstest.zuel.com:8081/index'
	document.cookie = "token='';Path=/;domain=.zuel.com;expires=-1"
}

export default {
	logout,
}
