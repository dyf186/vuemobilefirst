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
        <van-image round slot="default" width="56" height="56" fit="cover" :src="userProfile.photo"></van-image>
      </van-cell>
      <van-cell is-link title="名称" :value="userProfile.name"></van-cell>
      <van-cell is-link title="性别" :value="userProfile.gender === 0?'男':'女'"></van-cell>
      <van-cell is-link title="生日" :value="userProfile.birthday"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { apiUserProfile } from "@/api/user.js";
export default {
  name: "user-profile",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      userProfile: {
        photo: "",
        name: "",
        gender: 0,
        birthday: "",
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUserProfile();
  },
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    async getUserProfile() {
      this.userProfile = await apiUserProfile();
    },
    save() {
      // 提示信息
      this.$toast.success("保存成功");
    },
  },
};
</script>

<style lang="less" scoped></style>
