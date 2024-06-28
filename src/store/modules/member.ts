import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMemStore = defineStore('member', () => {
  const profile = ref()
  const setProfile = (val: any) => {
    profile.value = val
  }
  const clearProfile = () => {
    profile.value = undefined
  }
  return { profile, setProfile, clearProfile }
},
  {
    persist: {
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        }
      }
    }
  })