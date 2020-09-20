<template>
  <div class="container">
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()">
    </van-nav-bar>
    <van-search
      v-model.trim="searchText"
      placeholder="请输入搜索关键词"
    ></van-search>
    <van-cell-group>
      <van-cell
        v-for="(item, k) in suggestionList"
        :key="k"
        :title="item"
        icon="search"
      ></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { apiSuggestionList } from "@/api/search";
export default {
  name: "search-index",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      searchText: "",
      suggestionList: []
    };
  },
  computed: {},
  watch: {
    searchText: async function(newV) {
      if (!newV) {
        this.suggestionList = [];
        return false;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        const result = await apiSuggestionList({ q: newV });
        this.suggestionList = result.options;
      }, 1000);
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {}
};
</script>

<style lang="less" scoped></style>
