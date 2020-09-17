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
      <ValidationObserver ref="loginFormRef">
        <ValidationProvider
          name="手机号"
          rules="required|phone"
          v-slot="{ errors }"
        >
          <van-field
            v-model="loginform.mobile"
            type="text"
            placeholder="请输入手机号码"
            label="手机号"
            required
            clearable
            :error-message="errors[0]"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="验证码" rules="required" v-slot="{ errors }">
          <van-field
            v-model="loginform.code"
            type="password"
            placeholder="请输入验证码"
            label="验证码"
            required
            clearable
            :error-message="errors[0]"
          >
            <van-button slot="button" size="small" type="primary"
              >发送验证码</van-button
            >
          </van-field>
        </ValidationProvider>
      </ValidationObserver>
    </van-cell-group>
    <div class="login-btn">
      <van-button
        :loading="isLogin"
        loading-text="登录中..."
        type="info"
        size="small"
        round
        block
        @click="login()"
        >登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { apiUserLogin } from "@/api/user.js";
export default {
  name: "user-login",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mixins: [],
  props: {},
  data() {
    return {
      isLogin: false,
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
      const valid = await this.$refs.loginFormRef.validate();
      if (!valid) {
        return false;
      }
      this.isLogin = true;
      try {
        const result = await apiUserLogin(this.loginform);
        this.$store.commit("updateUser", result);
        this.$toast.success("登录成功");
        this.$router.push("/");
      } catch (err) {
        console.log("666");
        this.$toast.fail("手机号或验证码错误" + err);
      }
      this.isLogin = false;
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
