<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

  onLaunch(() => {
    console.log('App Launch')
  })
  onShow(() => {
    console.log('App Show')
  })
  onHide(() => {
    console.log('App Hide')
  })
</script>

<style lang="scss">
  // 字体图标
  @import '@/static/fonts/iconfont.css';

  view,
  navigator,
  input,
  scroll-view {
    box-sizing: border-box;
  }

  button::after {
    border: none;
  }

  swiper,
  scroll-view {
    flex: 1;
    height: 100%;
    overflow: hidden;
  }

  image {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }

  // 两行省略
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  // 单行文本溢出
  .ellipsis1 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .rich-text-p {
    margin: 15rpx 0;
    line-height: 1.5;
    font-size: 30rpx;
    text-indent: 2em;
  }
</style>
