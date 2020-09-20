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
      <van-cell
        v-for="item in searchList"
        :key="item.art_id.toString()"
        :title="item.title"
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { apiSearchList } from "@/api/search.js";
export default {
  name: "search-result",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      page: 1,
      per_page: 10,
      list: [],
      loading: false,
      finished: false,
      searchList: []
    };
  },
  computed: {
    q() {
      return this.$route.params.q;
    }
  },
  watch: {},
  created() {
    // this.getSearchList();
  },
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    async onLoad() {
      await this.$sleep(1000);
      const result = await apiSearchList({
        q: this.q,
        page: this.page,
        per_page: this.per_page
      });
      this.loading = false;
      if (!result.results.length) {
        this.finished = true;
        return false;
      }
      this.searchList.push(...result.results);
      this.page++;
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
