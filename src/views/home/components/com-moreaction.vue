<template>
  <div>
    <van-dialog
      :value="value"
      @input="$emit('input', $event)"
      :show-confirm-button="false"
      colse-on-click-overlay
      @close="isOneLevel = true"
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
        <van-cell
          v-for="item in reportsList"
          :key="item.value"
          :title="item.title"
          icon="location-o"
          @click="articleReport(item.value)"
        ></van-cell>
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { apiArticleDislike, apiArticleReport } from "@/api/article";
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
      reportsList: [
        { title: "其他问题", value: 0 },
        { title: "标题夸张", value: 1 },
        { title: "低俗色情", value: 2 },
        { title: "错别字多", value: 3 },
        { title: "旧闻重复", value: 4 },
        { title: "广告软文", value: 5 },
        { title: "内容不实", value: 6 },
        { title: "涉嫌违法犯罪", value: 7 },
        { title: "侵权", value: 8 }
      ],
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
    async articleReport(type) {
      console.log(type);
      try {
        const obj = {
          articleID: this.articleID,
          type
        };
        // 接口有问题
        // await apiArticleReport(obj);
      } catch (err) {
        if (err.response.status === 409) {
          return this.$toast.fail("文章已经被举报过了");
        } else {
          return this.$toast.fail("文章举报失败");
        }
      }
      this.$toast.success("举报成功!");
      this.$emit("input", false);
    },
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
