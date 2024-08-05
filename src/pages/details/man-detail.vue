<script lang="ts">
	export default {
		options: {
			styleIsolation: 'shared'
		}
	}
</script>
<script setup lang="ts">
	import { getResidentDetailAPI } from '@/service/home'
	import type { ResidentItem } from '@/types/home'
	import { onBackPress, onLoad, onShow } from '@dcloudio/uni-app'
	import { ref } from 'vue'
	import { unifabContent, unifabPattern } from './material/unifab-content'
	import type { VisitForm, VisitItem } from '@/types/details'
	import { updateVisitNoteAPI } from '@/service/detail'
	import { formRules } from './material/formRules'
	import TnRadio from '@tuniao/tnui-vue3-uniapp/components/radio/src/radio.vue'
	import TnRadioGroup from '@tuniao/tnui-vue3-uniapp/components/radio/src/radio-group.vue'
	import type { TnFormInstance } from '@tuniao/tnui-vue3-uniapp'

	// 页面安全距离
	const { safeAreaInsets } = uni.getSystemInfoSync()

	// 接收路径参数
	const query = defineProps<{
		id?: number
		addr?: string
		room?: string
		params?: string
		comm_num?: string | number
	}>()
	// 组装请求参数
	const params = { ...JSON.parse(query.params!), room_num: query.room }
	const tags = ref<string[]>([])
	// 入户信息
	const visitInfo = ref<VisitItem[]>()
	// 请求家庭成员信息
	const familyMemList = ref<ResidentItem[]>([])
	const getResidentDetail = async () => {
		const res = await getResidentDetailAPI(params)
		familyMemList.value = res.result
		visitInfo.value = res.result.find(x => x.householder === '户主')?.visit
		if (tags.value.length > 0) tags.value = []
		familyMemList.value.forEach(x => {
			if (x.tag?.length) {
				x.tag.forEach(v => tags.value.push(v))
			}
			if (x.id_card) {
				x.gender = Number(x.id_card.at(-2)) * 1 % 2 === 0 ? '女' : '男'
				x.age = new Date().getFullYear() - Number(x.id_card.slice(6, 10))
			}
		})
	}

	onShow(() => {
		getResidentDetail()  // 不出意外，刚进来就发了同一个请求2此
	})

	// 悬浮按钮
	const fabContent = ref(unifabContent)
	const fabRef = ref<any>()
	const popupRef = ref<UniHelper.UniPopupInstance>()
	onBackPress(() => {
		if (fabRef.value!.isShow) {
			fabRef.value?.close()
			return true
		}
		return false
	})
	const onFabTrigger: UniHelper.UniFabOnTrigger = (e) => {
		// 0-新增，1-修改，2-入户
		if (e.index === 0) {
			// uni.navigateTo({ url: `/modules/handle-info/index` })
			// 报错了！没解决。{"errMsg":"navigateTo:fail timeout"} ，不影响运行，且主包不会报错，使用标签也不会报错。2024-7-30
			uni.navigateTo({ url: `/modules/handle-data/data-form/index?params=${query.params}&room=${query.room}&comm_num=${query.comm_num}` })
		} else if (e.index === 1) {
			// console.log('modify')
			uni.navigateTo({ url: `/modules/handle-data/data-form/index?type=m1&data=${JSON.stringify(familyMemList.value.find(x => x.id == query.id))}&comm_num=${query.comm_num}` })
		} else if (e.index === 2) {
			// (popupRef.value as UniHelper.UniPopupInstance).open()
			// popupRef.value?.open()
			popupRef.value?.open!('bottom')
		}
		// fabContent.value.forEach(x => x.active = false)
		// fabRef.value.close()
	}
	// 表单数据
	const formRef = ref<TnFormInstance>()
	const formData = ref<VisitForm>({
		mainName: '',
		type: '走访',
		isSingle: false,
		subName: '',
		note: ''
	})

	// 入户弹出层：重置
	const resetForm = () => {
		formRef.value.resetFields()
	}
	// 入户弹出层：提交
	const submitForm = () => {
		// 验证表单数据
		formRef.value?.validate(async (valid: any) => {
			if (!valid) return uni.showToast({ title: '表单校验失败', icon: 'none', })
			// 提交数据
			const id = familyMemList.value[0].id
			const comm_num = params.comm_num
			await updateVisitNoteAPI({ ...formData.value, id, comm_num })
			resetForm()
			getResidentDetail()
			popupRef.value!.close!()
		})
	}
	const onPopupClose = () => {
		formRef.value.resetFields()
	}
</script>

<template>
	<view class="man-detail" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
		<view class="grid_bg">
			<view class="family-wrapper" v-if="familyMemList.length">
				<!-- 1.家庭-标签 -->
				<view class="family-tag">
					<view class="tag-item">
						<uni-tag :mark="true" size="small" text="门牌" type="primary" />
						<view class="value">{{ query.addr }}{{ query.room }}室</view>
					</view>
					<view class="tag-item">
						<uni-tag :mark="true" size="small" text="人口" type="success" />
						<view class="value">{{ familyMemList.length }}人</view>
					</view>
					<view class="tag-item">
						<uni-tag :mark="true" size="small" text="类型" type="error" />
						<view class="value">{{ tags.join('、') || '正常' }}</view>
					</view>
				</view>
				<!-- 2.家庭-成员 -->
				<view class="family-mems">
					<uni-collapse accordion>
						<template v-for="item in familyMemList" :key="item.id">
							<uni-collapse-item :title="item.householder + '-' + item.name" :open="item.id == query.id"
								:show-animation="false">
								<view class="mem-item name">
									<view class="item-name">
										<text class="mem-key">姓名</text>
										<text class="mem-val" v-if="item.id_card">{{ item.name }}({{ item.gender }},{{ item.age }}岁)</text>
									</view>
									<navigator
										:url="`/modules/handle-data/data-form/index?type=m1&data=${JSON.stringify(item)}&comm_num=${query.comm_num}`"
										hover-class="none">
										<text class="editor">编辑</text>
										<text class="iconfont icon-youjiantou"></text>
									</navigator>
								</view>
								<view class="mem-item">
									<text class="mem-key">民族</text>
									<text class="mem-val">{{ item.nationality }}</text>
								</view>
								<view class="mem-item">
									<text class="mem-key">身份证号</text>
									<text class="mem-val">{{ item.id_card }}</text>
								</view>
								<view class="mem-item">
									<text class="mem-key">政治面貌</text>
									<text class="mem-val">{{ item.political_type }}</text>
								</view>
								<view class="mem-item">
									<text class="mem-key">户籍类型</text>
									<text class="mem-val">{{ item.residence_type }}</text>
								</view>
								<view class="mem-item">
									<text class="mem-key">户籍地址</text>
									<text class="mem-val">{{ item.residence_address }}</text>
								</view>
								<view class="mem-item">
									<text class="mem-key">联系电话</text>
									<text class="mem-val">{{ item.phone }}</text>
								</view>
								<view class="mem-item">
									<text class="mem-key">职业</text>
									<text class="mem-val">{{ item.doing }}</text>
								</view>
								<view class="mem-item">
									<text class="mem-key">婚姻状况</text>
									<text class="mem-val">{{ item.marriage }}</text>
								</view>
								<view class="mem-item">
									<text class="mem-key">学历</text>
									<text class="mem-val">{{ item.education }}</text>
								</view>
								<view class="mem-item">
									<text class="mem-key">健康状况</text>
									<text class="mem-val">{{ item.health }}</text>
								</view>
								<view class="mem-item">
									<text class="mem-key">宗教信仰</text>
									<text class="mem-val">{{ item.religion }}</text>
								</view>
								<view class="mem-item">
									<text class="mem-key">标注</text>
									<text class="mem-val">{{ item.tag?.join('、') }}</text>
								</view>
							</uni-collapse-item>
						</template>
					</uni-collapse>
				</view>
				<!-- 3.家庭-备注 -->
				<view class="family-notes">
					<view class="caption">
						<text class="text">户内情况</text>
					</view>
					<uni-card title="户内详情" thumbnail="/static/imgs/中国结.png" margin="0">
						<view class="empty" v-if="!familyMemList[0].notes">
							<text class="text">暂无内容</text>
						</view>
						<view class="detail" v-else></view>
					</uni-card>
				</view>
				<!-- 4.家庭-入户记录 -->
				<view class="visit-record">
					<!-- 4.1 标题 -->
					<view class="caption">
						<text class="text">入户记录</text>
					</view>
					<!-- 4.2 内容 -->
					<view class="visit-list">
						<uni-card title="入户详情" thumbnail="/static/imgs/中国结.png" margin="0">
							<!-- 空白 -->
							<view class="empty" v-if="!visitInfo">
								<text class="text">暂无入户记录</text>
							</view>
							<!-- 入户记录列表 -->
							<view class="visit-item" v-else>
								<uni-collapse accordion>
									<template v-for="item in visitInfo" :key="item.date">
										<uni-collapse-item :title="item.date">
											<view class="items">
												<view class="item">
													<text class="key">入户人员：</text>
													<text class="val">{{ item.mainName }}</text>
												</view>
												<view class="item">
													<text class="key">陪同人员：</text>
													<text class="val">{{ item.subName }}</text>
												</view>
												<view class="item">
													<text class="key">入户类型：</text>
													<text class="val">{{ item.type }}</text>
												</view>
												<view class="item">
													<text class="key">入户笔记：</text>
													<text class="val">{{ item.note }}</text>
												</view>
											</view>
										</uni-collapse-item>
									</template>
								</uni-collapse>
							</view>
						</uni-card>
					</view>
				</view>
			</view>
			<!-- 悬浮按钮 -->
			<uni-fab ref="fabRef" horizontal="right" vertical="top" direction="horizontal" :content="fabContent"
				:pattern="unifabPattern" @trigger="onFabTrigger" />
			<!-- 底部弹窗-填写入户信息 -->
			<uni-popup ref="popupRef" background-color="#fff" border-radius="10rpx 10rpx 0 0" @maskClick="onPopupClose">
				<view class="popup-wrapper">
					<view class="title">填写入户记录</view>
					<view class="form">
						<!-- 表单 -->
						<tn-form ref="formRef" :model="formData" :rules="formRules" label-width="140" status-icon>
							<tn-form-item label="入户人:" prop="mainName">
								<tn-input type="text" v-model="formData.mainName" placeholder="请输入入户人姓名" underline clearable />
							</tn-form-item>
							<tn-form-item label="入户类型:" prop="type">
								<TnRadioGroup v-model="formData.type">
									<TnRadio active-color="#ff1744" label="走访">走访</TnRadio>
									<TnRadio active-color="#1de9b6" label="电话">电话</TnRadio>
									<TnRadio active-color="#9e9e9e" label="其他">其他</TnRadio>
								</TnRadioGroup>
							</tn-form-item>
							<tn-form-item label="单人入户:" prop="isSingle">
								<tn-switch v-model="formData.isSingle" shape="square" size="sm" active-color="#27ba9b" />
							</tn-form-item>
							<tn-form-item label="陪同人员:" prop="subName" v-if="!formData.isSingle">
								<tn-input v-model.lazy="formData.subName" placeholder="请输入陪同入户人员姓名" underline clearable />
							</tn-form-item>
							<tn-form-item label="记录:" prop="note">
								<tn-input type="textarea" height=200 v-model="formData.note" placeholder="在此处写下入户记录" clearable />
							</tn-form-item>
							<view class="btns-wrapper">
								<button class="btn reset" @click="resetForm">重置</button>
								<button class="btn submit" @click="submitForm">提交</button>
							</view>
						</tn-form>

					</view>
				</view>
			</uni-popup>
			<view class="md-bottom">— 到底了 —</view>
		</view>
	</view>
</template>

<style lang="scss">
	@mixin caption() {
		display: flex;
		justify-content: center;
		line-height: 1;
		padding: 36rpx 0 40rpx;
		font-size: 36rpx;
		color: #262626;

		.text {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 28rpx 0 30rpx;

			&::after,
			&::before {
				content: '';
				width: 20rpx;
				height: 20rpx;
				background: url(@/static/imgs/bubble.png) no-repeat center/contain;
				margin: 0 10rpx;
			}
		}
	}

	@mixin empty() {
		min-height: 180rpx;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		background: url('@/static/imgs/empty.png') no-repeat center/100rpx;

		.text {
			color: #999;
			font-size: 24rpx;
		}
	}

	//page {
	//height: 100%;
	//}

	// 整体页面，网格背景
	.man-detail {
		width: 100%;
		height: 100%;
		padding: 20rpx;

		.grid_bg {
			width: 100%;
			height: 100%;
			background-image:
				linear-gradient(90deg, rgba($color: $GridColor, $alpha: 0.1) 1rpx, transparent 1rpx),
				linear-gradient(180deg, rgba($color: $GridColor, $alpha: 0.1) 1rpx, transparent 1rpx);
			background-size: 40rpx 40rpx;
		}

		.family-wrapper {

			// 家庭标签样式
			.tag-item {
				margin-bottom: 14rpx;
				display: flex;
				align-items: center;

				.value {
					margin-left: 10rpx;
					font-size: 28rpx;
					color: #333;
				}
			}

			// 家庭成员样式
			.family-mems {

				// 折叠面板背景透明
				// :deep(.uni-collapse) {
				// 	background-color: unset;
				// }

				// :deep(.uni-collapse-item__wrap) {
				// 	background-color: unset;
				// }

				.mem-item,
				.item-name {
					padding-left: 32rpx;
					display: flex;
					align-items: center;
					background-color: unset;

					.mem-key {
						width: 110rpx;
						margin-right: 16rpx;
						text-align: justify;
						text-align-last: justify;
						font-weight: 500;
						color: $GridColor;
					}
				}

				.name {
					display: flex;
					justify-content: space-between;

					.item-name {
						padding-left: 0;
					}

					.editor,
					.iconfont {
						color: $GridColor;
						font-weight: 500;
					}
				}
			}

			// 家庭备注样式
			.family-notes {
				.caption {
					@include caption();
				}

				.empty {
					@include empty();
				}

				.detail {
					padding: 10rpx;
					text-indent: 2em;
				}
			}

			// 入户记录
			.visit-record {
				.caption {
					@include caption();
				}

				.visit-list {
					.visit-item {
						min-height: 180rpx;

						.items {
							padding: 0 8rpx;

							.item {
								border-bottom: 1rpx dashed $uni-border-color;
								font-size: 24rpx;
								color: #666;

								.key {
									font-weight: 700;
								}
							}
						}
					}

					.empty {
						@include empty();
					}
				}
			}
		}

		// 弹出层
		.popup-wrapper {
			padding: 20rpx;
			border: 1rpx solid $GridColor;

			.title {
				padding: 30rpx 0 32rpx;
				text-align: center;
				font-size: 36rpx;
				font-weight: 500;
				border-bottom: 1px solid #f7f7f7;
			}

			.form {
				margin-top: 20rpx;

				// :deep(.is-input-border) {
				//   border: none;
				//   border-radius: unset;
				// }

				// .line {
				//   border-bottom: 1rpx solid $uni-border-color;
				// }

				.btns-wrapper {
					width: 100%;
					display: flex;
					justify-content: space-evenly;

					.btn {
						width: 45%;
						height: 62rpx;
						line-height: 62rpx;
						font-size: 28rpx;
						color: #fff;
					}

					.reset {
						background-color: $warnColor;
					}

					.submit {
						background-color: $GridColor;
					}
				}
			}
		}

		// 底部文字
		.md-bottom {
			padding: 32rpx 0 48rpx;
			text-align: center;
			font-size: 24rpx;
			color: #999;
		}
	}
</style>