<template>
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in articleList"
          :key="item.art_id.toString()"
          :title="item.title"
        >
          <template slot="label">
            <van-grid
              :border="false"
              v-if="item.cover.type > 0"
              :column-num="item.cover.type"
            >
              <van-grid-item v-for="(item2, k2) in item.cover.images" :key="k2">
                <van-image width="90" height="90" :src="item2"></van-image>
              </van-grid-item>
            </van-grid>
            <p>
              <span>作者:{{ item.aut_name }}</span>
              &nbsp;
              <span>评论:{{ item.comm_count }}</span>
              &nbsp;
              <span>时间:{{ item.pubdate }}</span>
              &nbsp;
            </p>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { apiArticleList } from "@/api/article.js";
export default {
  name: "com-article",
  components: {},
  mixins: [],
  props: {
    channelID: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      articleList: [],
      ts: Date.now(),
      list: [], // 接收数据
      loading: false, // 加载动画
      finished: false, // 控制是否继续加载
      isLoading: false
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getArticleList();
  },
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    async getArticleList() {
      const result = await apiArticleList({
        channel_id: this.channelID,
        timestamp: this.ts
      });
      // console.log(result);
      // this.articleList = result.results;
      return result;
    },
    onRefresh() {
      setTimeout(() => {
        this.onLoad();
        this.isLoading = false;
        this.$toast("刷新成功");
      }, 1000);
    },
    async onLoad() {
      await this.$sleep(800);
      const articles = await this.getArticleList();
      if (articles.results.length > 0) {
        this.articleList.push(...articles.results);
        this.ts = articles.pre_timestamp;
      } else {
        this.finished = true;
      }
      this.loading = false;
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   this.loading = false;
      //   if (this.list.length >= 40) {
      //     this.finished = true; // 停止加载
      //   }
      // }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.scroll-wrapper {
  height: 100%;
  overflow-y: auto;
}
</style>
