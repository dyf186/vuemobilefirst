<template>
  <div class="container">
    <van-nav-bar
      title="搜索结果"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
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
    async getSearchList() {
      const result = await apiSearchList({ q: this.q });
      this.searchList = result.results;
    }
  }
};
</script>

<style lang="less" scoped></style>
