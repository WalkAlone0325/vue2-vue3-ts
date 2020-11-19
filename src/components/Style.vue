<template>
  <div id="app">
    <div class="search-input">
      <i class="iconfont icon-search"></i>
      <input type="text" placeholder="搜索歌曲" />
      <i class="iconfont icon-guanbi"></i>
    </div>
    <div class="search-history">
      <div class="search-history-head">
        <span>历史记录</span>
        <i class="iconfont icon-lajitong"></i>
      </div>
      <div class="search-history-list">
        <div>少年</div>
        <div>如果遇见她</div>
      </div>
    </div>
    <div class="search-hot">
      <div class="search-hot-head">热搜榜</div>
      <div class="search-hot-item">
        <div class="search-hot-top">1</div>
        <div class="search-hot-word">
          <div>
            少年
            <i class="iconfont icon-dujia"></i>
          </div>
          <div>"少年"这份词实在是太美了</div>
        </div>
        <span class="search-hot-count">2968466</span>
      </div>
      <div class="search-hot-item">
        <div class="search-hot-top">2</div>
        <div class="search-hot-word">
          <div>
            少年
            <i class="iconfont icon-dujia"></i>
          </div>
          <div>"少年"这份词实在是太美了</div>
        </div>
        <span class="search-hot-count">2968466</span>
      </div>
    </div>
    <div class="search-result">
      <div class="search-result-item">
        <div class="search-result-word">
          <div>少年</div>
          <div>许巍 - 爱如少年</div>
        </div>
        <i class="iconfont icon-bofang1"></i>
      </div>
      <div class="search-result-item">
        <div class="search-result-word">
          <div>少年</div>
          <div>许巍 - 爱如少年</div>
        </div>
        <i class="iconfont icon-bofang1"></i>
      </div>
    </div>
    <div class="search-suggest">
      <div class="search-suggest-head">搜索 “少年”</div>
      <div class="search-suggest-item">
        <i class="iconfont icon-search"></i>
        少年抖音
      </div>
      <div class="search-suggest-item">
        <i class="iconfont icon-search"></i>
        少年抖音
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
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
