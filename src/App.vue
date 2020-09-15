<template>
  <div id="app">
    <div>App1根组件</div>
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
