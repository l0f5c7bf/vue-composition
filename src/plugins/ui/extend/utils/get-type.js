const getType = v => {
	return Object.prototype.toString.call(v).match(/\[object ([A-Za-z]+)\]/)[1]
}

export const isArray = v => {
	return 'Array' === getType(v)
}
export const isObject = v => {
	return 'Object' === getType(v)
}
export const isFunction = v => {
	return 'Function' === getType(v)
}
export const isPromise = v => {
	return 'Promise' === getType(v)
}
export const isString = v => {
	return 'String' === getType(v)
}
export const isNumber = v => {
	return 'Number' === getType(v)
}

export default getType
