<template>
  <div class="city-group">
    <van-index-bar :sticky="false" :index-list="indexList" highlight-color="#ff9854">
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(city, index) in tabCities.hotCities" :key="index">
          <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
        </template>
      </div>
      <template v-for="(group, index) in tabCities.cities" :key="index">
        <van-index-anchor :index="group.group" />
        <template v-for="(city, indey) in group.cities" :key="indey">
          <van-cell :title="city.cityName" @click="cityClick(city)"/>
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import useCityStore from '@/stores/modules/city';

const props = defineProps({
  tabCities: Object,
})

const indexList = computed(() => {
  const list = props.tabCities.cities.map(item => item.group)
  list.unshift('#')
  return list
})

const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) => {
  // 将城市信息保存到store中
  cityStore.currentCity = city
  router.back()
}

</script>

<style lang="less" scoped>
.list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  padding-right: 25px;
  .city{
    width: 70px;
    height: 28px;
    border-radius: 14px;
    font-style: 12px;
    color: #000;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    margin: 6px 0;
  }
}
</style>