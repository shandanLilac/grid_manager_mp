// men-detail：入户表单
export type VisitForm = {
	mainName : string
	value : number | string
	type : {
		value : number
		text : '走访' | '电话' | '其他'
	}[]
	isSingle : boolean
	subName : string
	note : string
}
const formData = ref({
	mainName?: '',
	value?: 0,
	type?: [{ value: 0, text: '走访' }, { value: 1, text: '电话' }, { value: 3, text: '其他' }],
	isSingle?: false,
	subName?: '',
	note?: ''
})

// 入户信息
export type VisitItem = {
	mainName ?: string
	date ?: string
	type ?: string
	subName ?: string
	note ?: string
	value ?: number
	id ?: number | string
	comm_num ?: number | string
}