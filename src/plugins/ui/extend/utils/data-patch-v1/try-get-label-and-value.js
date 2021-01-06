// 没有规范时的临时替代方案,存在读取错误可能性,添加组合的时候只能往最后添加
const DICT = []

DICT.push({
	label: 'name',
	value: 'id'
})

DICT.push({
	label: 'name',
	value: 'code'
})

DICT.push({
	label: 'lable',
	value: 'value'
})

DICT.push({
	label: 'categoryName',
	value: 'id'
})

export default data => {
	if (!Array.isArray(data) || data.length === 0) return null
	for (let i = 0, len = DICT.length; i < len; i++) {
		const {
			label,
			value
		} = DICT[i]
		if (data.every(v => Object.prototype.hasOwnProperty.call(v, label)
			&& Object.prototype.hasOwnProperty.call(v, value)
		)) {
			return DICT[i]
		}
	}
	return null
}
