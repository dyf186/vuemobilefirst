<template>
  <div class="container">
    <!-- <van-button round size="small" @click="$store.commit('clearToken')"
      >清除token</van-button
    > -->
    <van-tabs v-model="activeChannelIndex">
      <van-tab title="推荐">
        <div class="scroll-wrapper">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="item in list" :key="item" :title="item"></van-cell>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="数据库">数据库内容展示</van-tab>
      <van-tab title="后端">后端内容展示</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "home-index",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      activeChannelIndex: 0,
      list: [], // 接收数据
      loading: false, // 加载动画
      finished: false // 控制是否继续加载
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;
        if (this.list.length >= 40) {
          this.finished = true; // 停止加载
        }
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.van-tabs {
  display: flex;
  flex-direction: column;
  height: 100%;
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
  /deep/ .van-tabs__line {
    background-color: #1989fa;
  }
}
</style>
