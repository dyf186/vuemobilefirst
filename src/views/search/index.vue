<template>
  <div class="container">
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()">
    </van-nav-bar>
    <van-search
      v-model.trim="searchText"
      placeholder="请输入搜索关键词"
    ></van-search>
    <van-cell-group>
      <van-cell title="单元格" icon="search"></van-cell>
      <van-cell title="单元格" icon="search"></van-cell>
      <van-cell title="单元格" icon="search"></van-cell>
      <van-cell title="单元格" icon="search"></van-cell>
      <van-cell title="单元格" icon="search"></van-cell>
      <van-cell title="单元格" icon="search"></van-cell>
      <van-cell title="单元格" icon="search"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "search-index",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      searchText: ""
    };
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

<style lang="less" scoped></style>
