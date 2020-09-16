<template>
  <div class="page-user-profile">
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      title="编辑资料"
      right-text="保存"
      @click-right="save()"
    ></van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "user-profile",
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
  methods: {
    save() {
      // 提示信息
      this.$toast.success("保存成功");
    },
  },
};
</script>

<style lang="less" scoped></style>
