<template>
  <div class="container">
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    ></van-nav-bar>
    <van-button round size="small" @click="$store.commit('clearToken')"
      >清除token</van-button
    >
  </div>
</template>

<script>
export default {
  name: "article-detail",
  components: {},
  mixins: [],
  props: {},
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

<style lang="less" scoped></style>
