import { onMounted, onUnmounted, ref } from 'vue';
import { throttle } from 'underscore';

export default function useScroll(elRef) {
  let el = window

  const inReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  const scrollListenerHandler = throttle(() => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
    }
    if (clientHeight.value + scrollTop.value >= scrollHeight.value - 1) {
      inReachBottom.value = true
    }
  }, 500)

  onMounted(() => {
    if (elRef) el = elRef.value
    el.addEventListener('scroll', scrollListenerHandler)
    })
  onUnmounted(() => {
    el.removeEventListener('scroll', scrollListenerHandler)
  })

  return { inReachBottom, clientHeight, scrollTop, scrollHeight }
}