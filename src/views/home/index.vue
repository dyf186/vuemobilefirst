<template>
  <div class="container">
    <!-- <van-button round size="small" @click="$store.commit('clearToken')"
      >清除token</van-button
    > -->
    <van-tabs v-model="activeChannelIndex">
      <van-tab title="推荐">
        <com-article></com-article>
      </van-tab>
      <van-tab title="数据库">
        <com-article></com-article>
      </van-tab>
      <van-tab title="后端">
        <com-article></com-article>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ComArticle from "./components/com-article";
export default {
  name: "home-index",
  components: { ComArticle },
  mixins: [],
  props: {},
  data() {
    return {
      activeChannelIndex: 0
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {}
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
  }
  /deep/ .van-tabs__line {
    background-color: #1989fa;
  }
}
</style>
