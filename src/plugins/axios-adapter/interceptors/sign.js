import md5 from 'crypto-js/md5'

const SESSION_KEY = process.env.SESSION_KEY
const QUERY_KEY = process.env.QUERY_KEY
const WHITE_LIST = ['/commonentwx/getCurrentUserId']

function getParams(params = {}) {
	const t = new Date().getTime()
	const { token, id } = JSON.parse(window.sessionStorage.getItem(`${SESSION_KEY}_userInfo`))
	const requestParams = params.requestParams ? JSON.stringify(params.requestParams) : JSON.stringify({})
	return {
		...params,
		...{
			[`${QUERY_KEY}_sing`]: md5(`${requestParams}${token}${t}`).toString(),
			[`${QUERY_KEY}_timestamp`]: t,
			empId: id
		}
	}
}

export default {
	response: [
		function (response) {
			return response
		}
	],
	request: [
		function (config) {
			if (!WHITE_LIST.includes(config.url)) {
				config.params = getParams(config.params)
			}
			return config
		}
	]
}
