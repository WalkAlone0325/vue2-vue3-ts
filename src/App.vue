<template>
  <HelloWorld />
  <div id="app">
    <div class="search-input">
      <i class="iconfont icon-search"></i>
      <input
        type="text"
        placeholder="搜索歌曲"
        v-model="searchWord"
        @input="handleToSuggest"
        @keyup.enter="handleToList(searchWord)"
      />
      <i class="iconfont icon-guanbi" v-if="searchType != 1" @click="handleToClose"></i>
    </div>
    <template v-if="searchType == 1">
      <div class="search-history">
        <div class="search-history-head">
          <span>历史记录</span>
          <i class="iconfont icon-lajitong" @click="handleToClear"></i>
        </div>
        <div class="search-history-list">
          <div v-for="item in searchHistorys" :key="item" @click="handleToList(item)">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="search-hot">
        <div class="search-hot-head">热搜榜</div>
        <div class="search-hot-item" v-for="(item, index) in searchHot" :key="index">
          <div class="search-hot-top">{{ index + 1 }}</div>
          <div class="search-hot-word">
            <div>
              {{ item.searchWord }}
              <img v-show="item.iconUrl" :src="item.iconUrl" alt="" />
            </div>
            <div>{{ item.content }}</div>
          </div>
          <span class="search-hot-count">{{ item.score }}</span>
        </div>
      </div>
    </template>
    <template v-else-if="searchType == 2">
      <div class="search-result">
        <div class="search-result-item" v-for="(item, index) in searchList" :key="index">
          <div class="search-result-word">
            <div>{{ item.name }}</div>
            <div>{{ item.artists[0].name }} - {{ item.album.name }}</div>
          </div>
          <i class="iconfont icon-bofang1"></i>
        </div>
      </div>
    </template>
    <template v-else-if="searchType == 3">
      <div class="search-suggest">
        <div class="search-suggest-head">搜索 “{{ searchWord }}”</div>
        <div
          class="search-suggest-item"
          v-for="(item, index) in searchSuggest"
          :key="index"
          @click="handleToList(item.keyword)"
        >
          <i class="iconfont icon-search"></i>
          {{ item.keyword }}
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, onMounted, reactive, ref, toRefs, Ref } from 'vue'
import { provideStore } from './useSearchWord'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: { HelloWorld },
  setup() {
    const searchType = ref(1)
    const searchWord = ref('')

    // 注入
    provideStore(searchWord)

    const { searchHot } = useSearchHot()
    const { searchSuggest, handleToSuggest } = useSearchSuggest(searchType, searchWord)
    const { searchList, handleToList, handleToClose } = useSearchList(
      searchType,
      searchWord,
      function(word: string) {
        setToHistory(word)
      },
    )
    const { searchHistorys, handleToClear, setToHistory } = useSearchHistory()

    return {
      searchType,
      searchWord,
      searchHot,
      searchSuggest,
      handleToSuggest,
      searchList,
      handleToList,
      handleToClose,
      searchHistorys,
      handleToClear,
    }
  },
})

function useSearchHot() {
  const state = reactive({
    searchHot: [],
  })

  onMounted(() => {
    axios.get('/search/hot/detail').then(res => {
      state.searchHot = res.data.data
    })
  })

  return toRefs(state)
}

function useSearchSuggest(searchType: Ref<number>, searchWord: Ref<string>) {
  const state = reactive({
    searchSuggest: [],
  })
  const { searchSuggest } = toRefs(state)
  const handleToSuggest = () => {
    if (!searchWord.value) {
      searchType.value = 1
      return
    }
    axios.get(`/search/suggest?keywords=${searchWord.value}&type=mobile`).then(res => {
      state.searchSuggest = res.data.result.allMatch
      searchType.value = 3
    })
  }

  return { searchSuggest, handleToSuggest }
}
function useSearchList(
  searchType: Ref<number>,
  searchWord: Ref<string>,
  callback: (w: string) => void,
) {
  const state = reactive({
    searchList: [],
  })

  const { searchList } = toRefs(state)

  const handleToClose = () => {
    searchWord.value = ''
    searchType.value = 1
  }

  const handleToList = (word: string) => {
    searchWord.value = word
    callback(word)
    getSearchList()
  }
  const getSearchList = () => {
    axios.get(`/search?keywords=${searchWord.value}`).then(res => {
      state.searchList = res.data.result.songs
      searchType.value = 2
    })
  }

  return { searchList, handleToList, handleToClose }
}

function useSearchHistory() {
  type Data = {
    searchHistorys: string[]
  }
  const state: Data = reactive({
    searchHistorys: [],
  })
  const { searchHistorys } = toRefs(state)

  const handleToClear = () => {
    removeStorage({
      key: 'searchHistory',
      success: () => {
        state.searchHistorys = []
      },
    })
  }

  const setToHistory = (word: string) => {
    state.searchHistorys.unshift(word)
    // 过滤掉重复的子项
    searchHistorys.value = [...new Set(state.searchHistorys)]
    // 历史记录长度的限制
    if (state.searchHistorys.length > 10) {
      state.searchHistorys.length = 10
    }

    setStorage({
      key: 'searchHistory',
      data: state.searchHistorys,
    })
  }

  onMounted(() => {
    getStorage({
      key: 'searchHistory',
      success: data => {
        state.searchHistorys = data
      },
    })
  })

  return { searchHistorys, handleToClear, setToHistory }
}

// Storage
function setStorage({ key, data }: { key: string; data: string[] }) {
  window.localStorage.setItem(key, JSON.stringify(data))
}
function getStorage({ key, success }: { key: string; success: (arg: []) => void }) {
  const data = window.localStorage.getItem(key)
  if (typeof data === 'string') {
    success(JSON.parse(data))
  } else {
    success([])
  }
}
function removeStorage({ key, success }: { key: string; success: () => void }) {
  window.localStorage.removeItem(key)
  success()
}
</script>

<style>
@import '//at.alicdn.com/t/font_2213959_judk74e1kz9.css';
.search-input {
  display: flex;
  align-items: center;
  height: 35px;
  margin: 36px 15px 25px 15px;
  background: #f7f7f7;
  border-radius: 25px;
}
.search-input i {
  margin: 0 13px;
}
.search-input input {
  flex: 1;
  font-size: 14px;
  border: none;
  background: #f7f7f7;
  outline: none;
}
.search-history {
  margin: 0 15px 25px 15px;
  font-size: 14px;
}
.search-history-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
}
.search-history-list {
  display: flex;
  flex-wrap: wrap;
}
.search-history-list div {
  padding: 8px 14px;
  border-radius: 20px;
  margin-right: 15px;
  margin-bottom: 15px;
  background: #f7f7f7;
}
.search-hot {
  margin: 0 15px;
  font-size: 14px;
}
.search-hot-head {
  margin-bottom: 18px;
}
.search-hot-item {
  display: flex;
  align-items: center;
  margin-bottom: 29px;
}
.search-hot-top {
  color: #fb2222;
  width: 30px;
  margin-left: 4px;
}
.search-hot-word {
  flex: 1;
}
.search-hot-word div:nth-child(1) {
  font-size: 16px;
  color: black;
}
.search-hot-word div:nth-child(2) {
  font-size: 12px;
  color: #878787;
}
.search-hot-word img {
  height: 12px;
}
.search-hot-count {
  color: #878787;
}

/*结果 */
.search-result {
  border-top: 1px #e4e4e4 solid;
  padding: 15px;
}
.search-result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px #e4e4e4 solid;
}
.search-result-word div:nth-child(1) {
  font-size: 16px;
  color: #235790;
  margin-bottom: 6px;
}
.search-result-word div:nth-child(2) {
  font-size: 14px;
  color: #898989;
}
.search-result-item i {
  font-size: 30px;
  color: #878787;
}

/* 搜索 */
.search-suggest {
  border-top: 1px solid #e4e4e4;
  padding: 15px;
  font-size: 14px;
}
.search-suggest-head {
  color: #4574a5;
  margin-bottom: 37px;
}
.search-suggest-item {
  color: #5d5d5d;
  margin-bottom: 37px;
}
.search-suggest-item i {
  color: #bdbdbd;
  margin-right: 14px;
  position: relative;
  top: 1px;
}
</style>
