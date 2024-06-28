<script setup lang=ts>
  import { testAPI } from '@/service/test'
  import { onMounted } from 'vue'

  const httpTest = async () => {
    const res = await testAPI()
    console.log(res)
  }
  const httpTest1 = async () => {
    const res = await testAPI()
    console.log(res)
  }
  const httpTest2 = async () => {
    const res = await testAPI()
    console.log(res)
  }
  onMounted(async () => {
    await httpTest()
    httpTest1()
    httpTest2()
  })
</script>

<template>
  <view class="tabbar-data">
    Data Page
  </view>
</template>

<style lang="scss">
  .tabbar-data {
    color: #333;
  }
</style>