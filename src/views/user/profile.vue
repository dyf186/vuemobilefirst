<template>
  <div class="page-user-profile">
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      title="编辑资料"
      right-text="保存"
      @click-right="save()"
    ></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像" center>
        <van-image
          round
          slot="default"
          width="56"
          height="56"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        ></van-image>
      </van-cell>
      <van-cell is-link title="名称" value="用户名称"></van-cell>
      <van-cell is-link title="性别" value="男"></van-cell>
      <van-cell is-link title="生日" value="2020-1-1"></van-cell>
    </van-cell-group>
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
