<template>
  <div>
    <van-popup
      :value="value"
      @input="$emit('input')"
      closeable
      round
      position="bottom"
      :style="{ height: '95%' }"
      close-icon-position="top-left"
    >
      <div class="channel">
        <div class="channel-head">
          <div>
            <span class="title">我的频道</span>
            <span class="desc">点击进入频道</span>
          </div>
          <div>
            <van-button
              style="padding:0px 15px;"
              type="danger"
              plain
              size="mini"
              round
              @click="isEdit = !isEdit"
              >{{ isEdit ? "完成" : "编辑" }}</van-button
            >
          </div>
        </div>
        <van-grid class="channel-content" :gutter="10" clickable>
          <van-grid-item v-for="(item, k) in channelList" :key="item.id">
            <span
              class="text"
              :style="{ color: k === activeChannelIndex ? 'red' : '' }"
            >
              {{ item.name }}
            </span>
            <van-icon
              v-show="k > 0 && isEdit"
              class="close-icon"
              name="close"
              @click="userToRest(item.id, k)"
            ></van-icon>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="channel">
        <div class="channel-head">
          <div>
            <span class="title">频道推荐</span>
            <span class="desc">点击添加频道</span>
          </div>
        </div>
        <van-grid class="channel-content" :gutter="10" clickable>
          <van-grid-item
            v-for="item in restChannels"
            :key="item.id"
            @click="restToUser(item)"
          >
            <div class="info">
              <span class="title">{{ item.name }}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { apiChannelAll, apiChannelAdd, apiChannelDel } from "@/api/channel.js";
export default {
  name: "com-channel",
  components: {},
  mixins: [],
  props: {
    value: {
      type: Boolean,
      defalult: false
    },
    channelList: {
      type: Array,
      default: () => []
    },
    activeChannelIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isEdit: false,
      channelAll: []
    };
  },
  computed: {
    restChannels() {
      // 获取我的频道的全部id以数组形式展现出来
      const userChannelIds = this.channelList.map(item => {
        return item.id;
      });
      // 对全部频道进行筛选,包含返回false,不包含返回true
      const rest = this.channelAll.filter(item => {
        return !userChannelIds.includes(item.id);
      });
      return rest;
    }
  },
  watch: {},
  created() {
    this.getChannelAll();
  },
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    userToRest(channelID, index) {
      this.channelList.splice(index, 1);
      apiChannelDel(channelID);
    },
    restToUser(channel) {
      this.channelList.push(channel);
      apiChannelAdd(channel);
    },
    async getChannelAll() {
      let result = await apiChannelAll();
      this.channelAll = result.channels;
    }
  }
};
</script>

<style lang="less" scoped>
.channel {
  margin-top: 70px;
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 16px;
      color: gray;
    }
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
