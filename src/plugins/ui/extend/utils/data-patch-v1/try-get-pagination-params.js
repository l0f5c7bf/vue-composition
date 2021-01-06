import {
	isObject
} from '../get-type'

import {
	addMatchedPath,
	getDataByImportance
} from './try-get-only-array'

const find = (data, keys, result, basePath = '') => {
	for (let i in data) {
		keys.forEach(key => {
			if (i.toLowerCase().includes(key.toLowerCase())) {
				addMatchedPath(result, i, basePath)
			}
		})

		if (isObject(data[i])) {
			find(data[i], keys, result, basePath ? basePath + '.' + i : i)
		}
	}
}
export default data => {
	const result = {
		total: undefined,
		matched: {},
		path: '',
		error: false
	}

	const keys = ['total', 'count']

	find(data, keys, result)

	getDataByImportance(data, result, 'total')

	// console.log('pageParams', result)

	return result
}
