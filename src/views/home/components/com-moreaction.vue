<template>
  <div>
    <van-dialog
      :value="value"
      @input="$emit('input', $event)"
      :show-confirm-button="false"
      colse-on-click-overlay
    >
      <van-cell-group v-if="isOneLevel">
        <van-cell icon="location-o" title="不感兴趣"></van-cell>
        <van-cell
          icon="location-o"
          title="反馈垃圾内容"
          is-link
          @click="isOneLevel = false"
        ></van-cell>
        <van-cell icon="location-o" title="拉黑作者"></van-cell>
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="isOneLevel = true"></van-cell>
        <van-cell title="其他问题" icon="location-o"></van-cell>
        <van-cell title="标题夸张" icon="location-o"></van-cell>
        <van-cell title="低俗色情" icon="location-o"></van-cell>
        <van-cell title="错别字多" icon="location-o"></van-cell>
        <van-cell title="旧闻重复" icon="location-o"></van-cell>
        <van-cell title="广告软文" icon="location-o"></van-cell>
        <van-cell title="内容不实" icon="location-o"></van-cell>
        <van-cell title="侵权" icon="location-o"></van-cell>
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: "com-moreaction",
  components: {},
  mixins: [],
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOneLevel: true
      // show: true
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
