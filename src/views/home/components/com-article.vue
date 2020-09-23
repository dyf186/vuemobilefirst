<template>
  <div class="scroll-wrapper" @scroll="remember()" ref="myarticle">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="downSuccessText"
      :success-duration="1000"
    >
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
          @click="
            $router.push({
              name: 'article',
              params: { aid: item.art_id.toString() }
            })
          "
        >
          <template slot="label">
            <van-grid
              :border="false"
              v-if="item.cover.type > 0"
              :column-num="item.cover.type"
            >
              <van-grid-item v-for="(item2, k2) in item.cover.images" :key="k2">
                <van-image
                  width="90"
                  height="90"
                  :src="item2"
                  lazy-load
                ></van-image>
              </van-grid-item>
            </van-grid>
            <p>
              <van-icon
                name="close"
                style="float:right;"
                @click.stop="displayDialog(item.art_id.toString())"
              ></van-icon>
              <span>作者:{{ item.aut_name }}</span>
              &nbsp;
              <span>评论:{{ item.comm_count }}</span>
              &nbsp;
              <span>时间:{{ item.pubdate | formatTime }}</span>
              &nbsp;
            </p>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <more-action
      v-model="showDialog"
      :articleID="nowArticleID"
      @dislikeSuccess="handleDislikeSuccess"
    ></more-action>
  </div>
</template>

<script>
import MoreAction from "./com-moreaction";
import { apiArticleList } from "@/api/article.js";
export default {
  name: "com-article",
  components: {
    MoreAction
  },
  mixins: [],
  props: {
    channelID: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      qianTop: 0,
      downSuccessText: "",
      nowArticleID: "",
      showDialog: false,
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
  activated() {
    if (this.qianTop) {
      this.$refs.myarticle, (scrollTop = this.qianTop);
    }
  },
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    remember() {
      this.qianTop = this.$refs.myarticle.scrollTop;
    },
    handleDislikeSuccess() {
      const index = this.articleList.findIndex(
        item => item.art_id.toString() === this.nowArticleID
      );
      this.articleList.splice(index, 1);
    },
    displayDialog(artID) {
      this.showDialog = true;
      this.nowArticleID = artID;
    },
    async getArticleList() {
      const result = await apiArticleList({
        channel_id: this.channelID,
        timestamp: this.ts
      });
      // console.log(result);
      // this.articleList = result.results;
      return result;
    },
    async onRefresh() {
      await this.$sleep(800);
      const articles = await this.getArticleList();
      if (articles.results.length > 0) {
        this.articleList.unshift(...articles.results);
        this.ts = articles.pre_timestamp;
        this.downSuccessText = "文章更新成功";
      } else {
        this.downSuccessText = "文章已经是最新的";
      }
      this.isLoading = false;
      // setTimeout(() => {
      //   this.onLoad();
      //   this.isLoading = false;
      //   this.$toast("刷新成功");
      // }, 1000);
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
