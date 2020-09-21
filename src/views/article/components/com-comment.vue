<template>
  <div class="comment">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item">
        <div slot="icon">
          <img
            class="avatar"
            src="http://toutiao.meiduo.site/Fn6-mrb5zLTZIRG3yH3jG8HrURdU"
            alt=""
          />
        </div>
        <div slot="title">
          <span>只是为了好玩</span>
        </div>
        <div slot="default">
          <van-button icon="like-o" size="mini" plain>&nbsp;12</van-button>
        </div>
        <div slot="label">
          <p>hello</p>
          <p>
            <span>2020-7-7</span>
            <span>4&nbsp;回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "com-comment",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false
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
        for (let i = 0; i < 5; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;
        if (this.list.length > 10) {
          this.finished = true;
        }
      }, 500);
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  margin-top: 15px;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 10px;
  }
  /deep/ .van-cell__title {
    .van-cell__label {
      width: 400px;
    }
  }
}
</style>
