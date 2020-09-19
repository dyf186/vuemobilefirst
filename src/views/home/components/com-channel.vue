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
            <van-button type="danger" plain size="mini" round>编辑</van-button>
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
          <van-grid-item v-for="value in 8" :key="value" text="文字">
            <div class="info">
              <span class="title">文字</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
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
    return {};
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
