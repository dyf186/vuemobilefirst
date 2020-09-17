<template>
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
</template>

<script>
export default {
  name: "com-article",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
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
.scroll-wrapper {
  height: 100%;
  overflow-y: auto;
}
</style>
