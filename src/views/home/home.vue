<template>
  <div class="home" ref="homeRef">
    <HomeNavBar></HomeNavBar>
    <HomeSearchBox></HomeSearchBox>
    <HomeCategories></HomeCategories>
    <div class="search-bar" v-if="isShowSearchBar">
      <searchBar></searchBar>
    </div>
    <HomeContent></HomeContent>
  </div>
</template>

<script>
  export default { name: 'home' }
</script>

<script setup>
import { watch, ref, computed, onActivated } from 'vue';
import HomeNavBar from './cpns/home-nav-bar.vue';
import HomeSearchBox from './cpns/home-search-box.vue';
import useHomeStore from '@/stores/modules/home';
import HomeCategories from './cpns/home-categories.vue'
import HomeContent from './cpns/home-content.vue';
import useScroll from '@/hooks/useScroll';
import searchBar from '@/components/search-bar/search-bar.vue';

const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouselistData()

// 页面滚动到底部时加载数据
const homeRef = ref()
const { inReachBottom, scrollTop } = useScroll(homeRef)
watch(inReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouselistData().then(() => {
      inReachBottom.value = false
    })
  }
})
// 搜索框显示控制
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//   isShowSearchBar.value = newTop > 100
// })
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 350
})

// 跳回home时，保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  })
})

</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;
}

.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 15px 15px 10px;
  background-color: #fff;
}

</style>