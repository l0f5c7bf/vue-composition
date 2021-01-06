
const props = {
	inject: {
		default: null
	},
}

export default {
	render(h) {
		const props = { ...this.$attrs }
		const on = { ...this.$listeners }
		return this.inject ? this.parse(h) : h('el-form-item', {
			props,
			on
		}, this.$slots.default)
	},
	inject: {
		FORM_PROVIDE: {
			default: null
		}
	},
	props,
	methods: {
		parse(h) {
			if (!Object.prototype.hasOwnProperty.call(this.FORM_PROVIDE.$attrs.model, this.inject.prop)) {
				this.$set(this.FORM_PROVIDE.$attrs.model, this.inject.prop, this.FORM_PROVIDE.params.get(this.inject.prop) || this.inject.default || '')
			}

			return (
				<el-form-item props={{ ...this.inject, ...this.$attrs }} >
					{this.inject.render.call(this.FORM_PROVIDE, h, this.FORM_PROVIDE.$attrs.model)}
				</el-form-item>
			)
		}
	}
}