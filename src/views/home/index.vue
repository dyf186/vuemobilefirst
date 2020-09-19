<template>
  <div class="container">
    <!-- <van-button round size="small" @click="$store.commit('clearToken')"
      >清除token</van-button
    > -->
    <van-tabs v-model="activeChannelIndex">
      <div slot="nav-right" class="channel-more" @click="showChannel = true">
        <van-icon name="wap-nav"></van-icon>
      </div>
      <com-channel
        v-model="showChannel"
        :channelList="channelList"
        :activeChannelIndex="activeChannelIndex"
      ></com-channel>
      <van-tab v-for="item in channelList" :key="item.id" :title="item.name">
        <com-article :channelID="item.id"></com-article>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ComChannel from "./components/com-channel";
import { apiChannelList } from "@/api/channel.js";
import ComArticle from "./components/com-article";
export default {
  name: "home-index",
  components: { ComArticle, ComChannel },
  mixins: [],
  props: {},
  data() {
    return {
      showChannel: false,
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
  /deep/ .van-tabs__wrap {
    width: 90%;
  }
}
.channel-more {
  position: fixed;
  right: 0;
  background-color: #fff;
  line-height: 88px;
  height: 88px;
  width: 90px;
  text-align: center;
  font-size: 40px;
}
</style>
