<script setup lang="ts">
	import { getCommListAPI, type CommItem } from '@/service/home'
	import { uchartCommunity3 } from '@/static/config/ucharts-opts'
	import { useGridStore } from '@/store/modules/grid'
	import { onLoad } from '@dcloudio/uni-app'
	import { computed, ref } from 'vue'

	const gridStore = useGridStore()

	// 社区列表
	const commList = ref<CommItem[]>([])
	const getCommList = async () => {
		const res = await getCommListAPI()
		commList.value = res.result
	}
	onLoad(() => {
		Promise.all([getCommList(), gridStore.getCommInfo()])
	})
	// 点击社区名称高亮
	const tabCurrItem = (index : number) => {
		gridStore.commNum = index
	}
	// 当前社区名称
	const curName = computed(() => {
		return commList.value[gridStore.commNum]?.name + '社区'
	})

	const chartData = ref()
	const opts = ref(uchartCommunity3)

	const onGetIndex = async (e : any) => {
		const { cancel } = await uni.showModal({ title: '提示消息', content: '前往查看花名册？' })
		if (cancel) return
		console.log(e)
		// TODO:跳转页面，渲染相应的数据
	}
</script>

<template>
	<view class="community-container">
		<view class="cc-head">
			<view class="title">社区</view>
		</view>
		<view class="cc-body">
			<!-- 社区列表 -->
			<uni-card margin="10rpx" padding="10rpx">
				<template #title>
					<view class="title-slot">
						<text class="iconfont icon-zhongguojie"></text>
						<text class="title">社区列表</text>
					</view>
				</template>
				<view class="communities">
					<view class="community-item" v-for="(item, index) in commList" :key="item.id"
						:class="{ active: index === gridStore.commNum }" @tap="tabCurrItem(index)">
						<text class="name">{{ item.name }}</text>
					</view>
				</view>
			</uni-card>

			<!-- 社区概况 -->
			<uni-card title="社区概况" :sub-title="curName" extra="" margin="10rpx" padding="10rpx">
				<view class="community-info">
					<view class="info-plain">
						<view class="population">
							<view class="label">人口：{{ gridStore.popu.total }} </view>
							<view class="num-town ratio">
								<view class="ratio-face"
									:style="{ background: `linear-gradient(to left,transparent ${gridStore.popu.ruralRatio},rgba(39,186,155,0.5) ${gridStore.popu.townRatio})` }">
									<text>城镇:{{ gridStore.popu.town }}</text>
									<text>{{ gridStore.popu.townRatio }}</text>
								</view>
							</view>
							<view class="num-rural ratio">
								<view class="ratio-face"
									:style="{ background: `linear-gradient(to right,rgba(39,186,155,.5) ${gridStore.popu.ruralRatio},transparent ${gridStore.popu.townRatio})` }">
									<text>农村:{{ gridStore.popu.rural }}</text>
									<text class="ratio-item">{{ gridStore.popu.ruralRatio }}</text>
								</view>
							</view>
						</view>
						<view class="area">
							<view class="label">范围：</view>
							<view class="detail buildings">
								<uni-tag class="area-item" v-for="item in gridStore.commInfo?.buildingsArea" :key="item.name"
									:text="item.name" size="normal" inverted type="warning" />
							</view>
						</view>
					</view>
					<view class="label">重点人群：</view>
					<view class="info-chart">
						<qiun-data-charts type="mount" :opts="opts" :chartData="gridStore.chartData" :optsWatch="false"
							canvasId="community_info_01" :inScrollView="true" @getIndex="onGetIndex" />
					</view>
				</view>
			</uni-card>
		</view>
	</view>
</template>

<style lang="scss">
	.community-container {
		margin-top: 20rpx;

		.cc-head {
			@include commonHead();
		}

		.title-slot {
			padding: 20rpx;
			border-bottom: 1px solid #e7e7e7;

			.iconfont {
				margin-right: 20rpx;
				font-size: 48rpx;
				font-weight: 700;
				color: red;
			}
		}

		.communities {
			min-height: 280rpx;
			padding: 10rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;

			.community-item {
				width: 140rpx;
				height: 68rpx;
				padding: 0 4rpx;
				border: 1rpx solid #ddd;
				border-radius: 8rpx;
				background: url('@/static/imgs/community-item-bg0.png') no-repeat center/cover;
				box-sizing: border-box;
				font-size: 26rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.active {
				justify-content: center;
				border: 1rpx solid $GridColor;
				transition: all 0.2s;
				background: url('@/static/imgs/community-item-bg2.png') no-repeat center/cover;

				.name {
					color: $GridColor;
					font-weight: 500;
					font-size: 32rpx;
					text-align: center;
				}

			}
		}

		.community-info {
			@include indexInfoDetail();

			.info-plain {
				.population {
					.ratio {
						margin-bottom: 8rpx;
						padding: 4rpx;
						border: 1px solid #ccc;
						border-radius: 8rpx;
						box-sizing: border-box;
						font-size: 24rpx;

						.ratio-face {
							display: flex;
							justify-content: space-between;
							border: 1px solid #f7f7f7;
							border-radius: 8rpx;
						}
					}
				}

				.area {
					.area-item {
						margin: 10rpx 4rpx 0 0;
					}
				}
			}

			.info-chart {
				width: 100%;
				height: 150px;
			}
		}
	}
</style>