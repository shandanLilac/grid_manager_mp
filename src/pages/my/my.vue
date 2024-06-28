<script setup lang=ts>
  import { useMemStore } from '@/store';

  const memStore = useMemStore()

  const userInfo = {
    username: 'zex_126',
    password: 'a123456',
    identity: 3
  }
  memStore.setProfile(userInfo)
</script>

<template>
  <view class="tabbar-my">
    My Page
  </view>
</template>

<style lang="scss">
  .tabbar-my {}
</style>