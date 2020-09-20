<template>
  <div class="container">
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()">
    </van-nav-bar>
    <van-search
      v-model.trim="searchText"
      placeholder="请输入搜索关键词"
    ></van-search>
    <van-cell-group>
      <van-cell v-for="(item, k) in suggestionList" :key="k" icon="search">
        <div slot="title" v-html="highlightCell(item, searchText)"></div>
      </van-cell>
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
  methods: {
    highlightCell(item, keywords) {
      const reg = new RegExp(`${keywords}`, "i");
      const rst = item.match(reg);
      return item.replace(reg, `<span style="color:red">${rst[0]}</span>`);
    }
  }
};
</script>

<style lang="less" scoped></style>
