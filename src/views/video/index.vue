<template>
  <div class="container">
    <van-skeleton title avatar :row="3"></van-skeleton>
    <van-skeleton title avatar :row="3"></van-skeleton>
    <van-skeleton title avatar :row="3"></van-skeleton>
  </div>
</template>

<script>
export default {
  name: "video-index",
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
  methods: {},
};
</script>

<style lang="less" scoped>
.van-skeleton {
  margin-top: 10px;
}
</style>
