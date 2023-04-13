<template>
  <div class="city top-page">
    <div class="top">
      <van-search 
      v-model="searchValue" 
      placeholder="城市/区域/位置" 
      shape="round"
      show-action
      @cancel="cancelClick"
      />
      <van-tabs v-model:active="tabActive" animated color="#ff9854">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <!-- <city-group :all-cities="allCities" :tab-active="tabActive"/> -->
      <template v-for="(value, key, index) in allCities">
        <city-group v-show="tabActive === key" :tab-cities="value"/>
      </template>
    </div>
  </div>
</template>

<script setup>

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';

import CityGroup from './cpns/city-group.vue';

// 控制取消按钮
const router = useRouter()
const cancelClick = () => {
  router.back()
}

// 网络请求，请求城市数据(现封装到pinia状态管理库去了)
// const allCity = ref({})
// getCityAll().then(res => {
//   allCity.value = res.data
// })
// 从pinia的store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllcitiesData()
const { allCities } = storeToRefs(cityStore)

const tabActive = ref()
// const currentGroup = computed(() => allCities.title[tabActive.value])


const searchValue = ref('')



</script>

<style lang="less" scoped>
.city {
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}

</style>