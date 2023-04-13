<template>
  <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <!-- 位置信息 -->
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置 </span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="section date-range" @click="show=true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDate }}</span>
        </div>
        <div class="stay">共{{ showNight }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDate }}</span>
        </div>
      </div>
    </div>
    <van-calendar 
        v-model:show="show" 
        type="range" 
        color="#ff9854"
        :round="false"
      @confirm="onConfirm"/>

    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="section hot-suggest">
      <template v-for="(item, index) in hotSuggests" :kye="index">
        <div 
          class="item"
          :style="{ color: item.tagText.color, background: item.tagText.background.color}"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 搜索按钮 -->
    <div class="section search-btn">
      <div class="btn" @click="serachBtnClick">开始搜索</div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import useHomeStore from '@/stores/modules/home';
import { formatMonthDay, nextDate, diffDate } from '@/utils/format_date';
import useMainStore from '@/stores/modules/main';

const router = useRouter()

// const props = defineProps({
//   hotSuggests: Array
// })

// 显示当前城市
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)
function cityClick() {
  router.push('/city')
}
function positionClick() {
  navigator.geolocation.getCurrentPosition((res) => {
    console.log('获取位置成功', res);
  }, err => {
    console.log('获取位置失败', err);
  })
}

// 住宿日期信息显示
const mainStore = useMainStore()
const startDate = ref(formatMonthDay(mainStore.startDate))
const endDate = ref(formatMonthDay(mainStore.endDate))


const show = ref(false)
const showNight = ref(1)
const onConfirm = (value) => {
  startDate.value = formatMonthDay(value[0])
  endDate.value = formatMonthDay(value[1])
  showNight.value = diffDate(value[0], value[1])
  show.value = false
  mainStore.startDate = value[0]
  mainStore.endDate = value[1]
}

const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)

const serachBtnClick = () => {
  router.push({
    path: '/search',
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName,
    }
  })
}

</script>


<style lang="less" scoped>
.banner {
  img {
    width: 100%;
  }
}

.location {
  display: flex;
  margin-top: 20px;
  padding: 0 20px;

  .city {
    flex: 1;
    color: #333;
  }

  .position {
    width: 74px;
    display: flex;
    align-items: center;

    .text {
      font-size: 12px;
      color: #666;
    }

    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
      position: relative;
      top: -2px
    }
  }
}
.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  .start {
    border-right: 1px solid f8f9f9;
  }
}

.hot-suggest {
  margin-top: 10px;
  height: auto;
  .item {
    padding: 4px 8px;
    border-radius: 14px;
    margin: 3px;
    font-size: 12px;
    line-height: 1;
  }
}

.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    margin-top: 20px;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient)
  }
}


</style>