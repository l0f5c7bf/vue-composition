
function isEnable(config) {
	const WHITE_LIST = ['ceboss.cn', '300.cn']
	const BLACK_LIST = []
	const url = (config.baseURL || '') + config.url
	return BLACK_LIST.every(v => !url.includes(v)) && WHITE_LIST.some(v => url.includes(v))
}

export default {
	response: [
		function (response) {			
			if (isEnable(response.config)) {
				if (+response.data.status === 999) {
					const _location = decodeURIComponent(response.data.location)
					const len = _location.split('?').length
					const connectSymbol = len > 2 ? '&backurl=' : '?backurl='

					try {
						const context = response.config.__nuxt_context
						if (context && process.server === true) {
							context.redirect(context.req.headers.referer)
						} else {
							window.location.href =
								response.data.location +
								encodeURIComponent(
									connectSymbol + encodeURIComponent(window.location.href)
								)
						}
					} catch (error) {
						return Promise.reject(new Error(response))
					}
				}
			}
			return response
		}
	],
	request: [
		function (config) {
			if (isEnable(config)) {
				config.headers.common['X-Requested-With'] = 'XMLHttpRequest'
				config.withCredentials = true
			}
			return config
		}
	]
}
