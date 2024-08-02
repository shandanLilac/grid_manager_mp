<script setup lang=ts>
	import { getTheResidentInfoAPI } from '@/service/detail'
	import type { ResidentItem } from '@/types/home'
	import { onLoad } from '@dcloudio/uni-app'
	import { ref } from 'vue'
	import EditorForm from './components/editorForm.vue'


	// 接收路径参数
	const query = defineProps<{
		// 新增需要的参数
		params: string
		room: string
		id?: string  // 点击主页中居民列表的编辑按钮，传递id，但无数据
		type?: number
		data?: string
		comm_num?: string
	}>()

	// 代替设置导航栏标题
	uni.setNavigationBarTitle({
		title: query.type ? '修改信息' : '新增家庭成员'
	})
	// 表单
	// 表单-数据
	const memberInfo = ref<ResidentItem>()
	const getResidentInfo = async () => {
		if (query.id) {
			const res = await getTheResidentInfoAPI(query.id, query.comm_num)
			memberInfo.value = res.result
		} else if (query.data) {
			memberInfo.value = JSON.parse(query.data)
		}
	}
	// onLoad钩子函数
	onLoad(() => {
		getResidentInfo()
	})
</script>

<template>
	<view class="form-wrapper">
		<view>index{{ query.comm_num }}</view>
		<EditorForm :params="query.params" :room="query.room" :memberInfo="memberInfo" :comm_num="query.comm_num" />
	</view>
</template>

<style lang="scss">
	.form-wrapper {
		background-color: #fff;
	}
</style>