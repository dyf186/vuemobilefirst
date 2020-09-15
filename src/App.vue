<template>
  <div id="app">
    <div>App1根组件</div>
    <div class="box">666</div>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">默认按钮</van-button>
    <van-button type="info">默认按钮</van-button>
    <van-button type="warning">默认按钮</van-button>
    <van-button type="danger">默认按钮</van-button>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "app"
};
</script>

<style lang="less">
.box {
  background-color: #aaa;
  width: 375px;
}
</style>
