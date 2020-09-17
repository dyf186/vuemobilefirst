<template>
  <div>
    <van-dialog
      :value="value"
      @input="$emit('input', $event)"
      :show-confirm-button="false"
      colse-on-click-overlay
    >
      <van-cell-group v-if="isOneLevel">
        <van-cell
          icon="location-o"
          title="不感兴趣"
          @click="articleDislike()"
        ></van-cell>
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
import { apiArticleDislike } from "@/api/article";
export default {
  name: "com-moreaction",
  components: {},
  mixins: [],
  props: {
    articleID: {
      type: String,
      required: true
    },
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
  methods: {
    async articleDislike() {
      // 不感兴趣后端接口尚未完成
      // const result = await apiArticleDislike(this.articleID);
      // console.log(result);
      this.$toast.success("处理成功!");
      // 关闭弹窗
      this.$emit("input", false);
      this.$emit("dislikeSuccess");
    }
  }
};
</script>

<style lang="less" scoped></style>
