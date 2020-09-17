<template>
  <div class="container">
    <!-- <van-button round size="small" @click="$store.commit('clearToken')"
      >清除token</van-button
    > -->
    <van-tabs v-model="activeChannelIndex">
      <van-tab v-for="item in channelList" :key="item.id" :title="item.name">
        <com-article :channelID="item.id"></com-article>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { apiChannelList } from "@/api/channel.js";
import ComArticle from "./components/com-article";
export default {
  name: "home-index",
  components: { ComArticle },
  mixins: [],
  props: {},
  data() {
    return {
      channelList: [],
      activeChannelIndex: 0
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getChannelList();
  },
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    async getChannelList() {
      const result = await apiChannelList();
      console.log(result);
      this.channelList = result.channels;
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
  }
  /deep/ .van-tabs__line {
    background-color: #1989fa;
  }
}
</style>
