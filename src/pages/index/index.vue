<script setup lang=ts>
  import CommunityList from "./components/CommunityList.vue"
  import NavBar from "./components/NavBar.vue"
  import GridList from "./components/GridList.vue"
  import ResidentialArea from "./components/ResidentialArea.vue"
  import { ref } from "vue"

  // 滑动到底事件
  const residentsRef = ref()
  const onScrollToLower = () => {
    residentsRef.value.getMore()
  }
</script>

<template>
  <view class="viewport">
    <NavBar />
    <scroll-view class="scroll-view" scroll-y enable-flex @scrolltolower="onScrollToLower">
      <GridSwiper />
      <CommunityList />
      <GridList />
      <ResidentialArea ref="residentsRef" />
    </scroll-view>
  </view>
</template>

<style lang="scss">
  page {
    background-color: #f7f7f7;
    height: 100%;
    overflow: hidden;
  }

  .viewport {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .scroll-view {
    flex: 1;
    overflow: hidden;
  }
</style>