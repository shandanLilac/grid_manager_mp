<script setup lang=ts>
  import CommunityList from "./components/CommunityList.vue"
  import NavBar from "./components/NavBar.vue"
  import GridList from "./components/GridList.vue"
  import ResidentialArea from "./components/ResidentialArea.vue"

  // const onScroll: UniHelper.ScrollViewOnScroll = (e) => {
  //   console.log(e)
  // }
</script>

<template>
  <view class="viewport">
    <NavBar />
    <scroll-view class="scroll-view" scroll-y enable-flex>
      <GridSwiper />
      <CommunityList />
      <GridList />
      <ResidentialArea />
      <view class="page-bottom">
        ---- 到底了 ----
      </view>
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

  .page-bottom {
    height: 84rpx;
    line-height: 84rpx;
    text-align: center;
    color: #999;
    font-size: 28rpx;
  }
</style>