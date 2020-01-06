export const getDynamicUrl = url => {
	console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV)
	const envMap = {
		dev: 'test',
		test: 'test01',
		pre: 'pre',
		prod: '',
	}
	if (!process.env.NODE_ENV) {
		return 'http://zss.zuel.com:8887'
	} else {
		return `http://zss${envMap[process.env.NODE_ENV]}.zuel.com:8887`
	}
}
