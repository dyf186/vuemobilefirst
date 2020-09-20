<template>
  <div class="container">
    <van-nav-bar
      fixed
      title="搜索结果"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
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
import { apiSearchList } from "@/api/search";
export default {
  name: "search-result",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      searchList: []
    };
  },
  computed: {
    q() {
      return this.$router.params.q;
    }
  },
  watch: {},
  created() {
    this.getSearchList();
  },
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
          this.finished = true;
        }
      }, 1000);
    },
    async getSearchList() {
      const result = await apiSearchList({ q: this.q });
      this.searchList = result.results;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-sizing: border-box;
  .van-list {
    flex: 1;
    margin-top: 92px;
  }
}
</style>
