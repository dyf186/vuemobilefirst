<template>
  <div class="page-user-chat">
    <!-- 导航栏 -->
    <van-nav-bar
      left-arrow
      @click-lert="$router.back()"
      title="登录"
    ></van-nav-bar>
    <!-- 表单部分 -->
    <van-cell-group>
      <van-field
        v-model="loginform.mobile"
        type="text"
        placeholder="请输入手机号码"
        label="手机号"
        required
        clearable
      ></van-field>
      <van-field
        v-model="loginform.code"
        type="password"
        placeholder="请输入验证码"
        label="验证码"
        required
        clearable
      >
        <van-button slot="button" size="small" type="primary"
          >发送验证码</van-button
        >
      </van-field>
    </van-cell-group>
    <div class="login-btn">
      <van-button type="info" size="small" round block @click="login()"
        >登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { apiUserLogin } from "@/api/user.js";
export default {
  name: "user-login",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      loginform: {
        mobile: "13911111111",
        code: "246810"
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    async login() {
      try {
        const result = await apiUserLogin(this.loginform);
        this.$store.commit("updateUser", result);
        this.$toast.success("登录成功");
        this.$router.push("/");
      } catch (err) {
        console.log("666");
        this.$toast.fail("手机号或验证码错误" + err);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login-btn {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
