<template>
  <div class="container">
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    ></van-nav-bar>
    <div class="detail">
      <h3 class="title">{{ article.title }}</h3>
      <div class="author">
        <van-image
          round
          width="1rem"
          height="1rem"
          fit="fill"
          :src="article.aut_photo"
        ></van-image>
        <div class="text">
          <p class="name">{{ article.aut_name }}</p>
          <p class="time">{{ article.pubdate | formatTime }}</p>
        </div>
        <van-button
          round
          size="small"
          @click="followMe()"
          :loading="followLoading"
          :type="article.is_followed ? 'default' : 'info'"
          >{{ article.is_followed ? "取消关注" : "+ 关注" }}</van-button
        >
      </div>
      <div class="content">
        <p v-html="article.content"></p>
      </div>
      <div class="zan">
        <van-button
          round
          size="small"
          :class="{ active: article.attitude === 1 }"
          plain
          icon="like-o"
          style="margin-right:8px;"
          >点赞</van-button
        >
        <van-button
          :class="{ active: article.attitude === 0 }"
          round
          size="small"
          plain
          icon="delete"
          >不喜欢</van-button
        >
        <com-comment></com-comment>
      </div>
    </div>
  </div>
</template>

<script>
import ComComment from "./components/com-comment";
import { apiUserFollow, apiUserUnFollow } from "@/api/user.js";
import { apiArticleDetail } from "@/api/article.js";
export default {
  name: "article-detail",
  components: {
    ComComment
  },
  mixins: [],
  props: {},
  data() {
    return {
      followLoading: false,
      article: {}
    };
  },
  computed: {
    aid: function() {
      return this.$route.params.aid;
    }
  },
  watch: {},
  created() {
    this.getArticleDetail();
  },
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    async followMe() {
      this.followLoading = true; // 开启加载状态

      await this.$sleep(800); // 暂停0.8s

      // 判断当前的关注状态，并做不同的处理活动
      if (this.article.is_followed) {
        // 取消关注
        await apiUserUnFollow(this.article.aut_id);
        console.log("取消关注");
        // 页面上要更新关注状态--> + 关注 提示
        this.article.is_followed = false;
      } else {
        // 关注(成功或失败)
        try {
          await apiUserFollow(this.article.aut_id);
          console.log("关注");
          // 页面上要更新关注状态-->取消关注 提示
          this.article.is_followed = true;
        } catch (err) {
          this.$toast.fail("不能自己关注自己！");
        }
      }
      this.followLoading = false; // 恢复按钮状态
    },
    // async followMe() {
    //   this.followLoading = true;
    //   await this.$sleep(800);
    //   // 取消关注
    //   if (this.article.is_followed) {
    //     console.log(this.article.aut_id, "取消关注");
    //     await apiUserUnFollow(this.article.aut_id);
    //     console.log("取消关注");
    //     this.article.is_followed = false;
    //   } else {
    //     // 关注
    //     try {
    //       console.log(this.article.aut_id, "关注");
    //       await apiUserFollow(this.article.aut_id);
    //       this.article.is_followed = true;
    //     } catch (err) {
    //       this.$toast.fail("不能自己关注自己");
    //     }
    //   }
    //   this.followLoading = false;
    // },
    async getArticleDetail() {
      const result = await apiArticleDetail(this.aid);
      this.article = result;
      console.log(result);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.detail {
  padding: 0 20px 88px;
  margin-top: 92px;
  .title {
    font-size: 36px;
    line-height: 2;
  }
  .zan {
    text-align: center;
    padding: 20px 0;
    .active {
      border-color: red;
      color: red;
    }
  }
  .author {
    padding: 20px 0;
    display: flex;
    position: sticky;
    background-color: #fff;
    top: 92px;
    z-index: 2;
    .text {
      flex: 1;
      padding-left: 20px;
      line-height: 1.5;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    padding: 40px 0;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    p {
      font-size: 28px;
    }
    /deep/ code {
      white-space: pre-wrap;
    }
  }
}
</style>
