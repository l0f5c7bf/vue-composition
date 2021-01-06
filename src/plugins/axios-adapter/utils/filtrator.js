import api from '../index'
export default function ({ error }) {
	return function () {
		return api.request(...arguments).then(response => {
			if (response && response.data && (response.data.status === 403)) {
				return error(response.data.msg + '请尝试重新打开应用')
			}
			if (response && response.data && response.data.status !== 101) {
				throw new Error(JSON.stringify(response.data))
			}
			return response.data
		}, () => {
		})
	}
}
