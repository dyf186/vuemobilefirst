<template>
  <div class="comment">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in commentList" :key="item.com_id.toString()">
        <div slot="icon">
          <img class="avatar" :src="item.aut_photo" alt="" />
        </div>
        <div slot="title">
          <span>{{ item.aut_name }}</span>
        </div>
        <div slot="default">
          <van-button
            icon="like-o"
            size="mini"
            plain
            type="item.is_liking?'danger':'default'"
            >&nbsp;{{ item.like_count }}</van-button
          >
        </div>
        <div slot="label">
          <p>{{ item.content }}</p>
          <p>
            <span>{{ item.pubdate | formatTime }}</span>
            <span @click="showReply = true"
              >{{ item.reply_count }}&nbsp;回复</span
            >
          </p>
        </div>
      </van-cell>
    </van-list>
    <van-popup
      v-model="showReply"
      position="bottom"
      :style="{ height: '80%' }"
      round
    >
      <van-list
        v-model="reply.loading"
        :finished="reply.finished"
        finished-text="没有更多了"
        @load="onLoadReply"
      >
        <van-cell v-for="item in reply.list" :key="item" :title="item">
          <div slot="icon">
            <img
              class="avatar"
              src="http://toutiao.meiduo.site/Fn6-mrb5zLTZIRG3yH3jG8HrURdU"
              alt=""
            />
          </div>
          <div slot="title">
            <span>度娘</span>
          </div>
          <div slot="label">
            <p>好厉害呀</p>
            <p>
              <span>2020-1-1</span>
            </p>
          </div>
        </van-cell>
      </van-list>
    </van-popup>
  </div>
</template>

<script>
import { apiCommentList } from "@/api/comment.js";
export default {
  name: "com-comment",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      showReply: false,
      reply: {
        list: [],
        loading: false,
        finished: false
      },
      commentList: [],
      commentID: null,
      list: [],
      loading: false,
      finished: false
    };
  },
  computed: {
    aid() {
      return this.$route.params.aid;
    }
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    onLoadReply() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.reply.list.push(this.reply.list.length + 1);
        }
        this.reply.loading = false;
        if (this.reply.list.length >= 40) {
          this.reply.finished = true;
        }
      }, 1000);
    },
    async onLoad() {
      await this.$sleep(800);
      const result = await apiCommentList({
        articleID: this.aid,
        commentID: this.commentID
      });
      console.log(this.commentList);
      this.loading = false;
      if (result.results.length === 0) {
        this.finished = true;
        return false;
      }
      this.commentList.push(...result.results);
      this.commentID = result.last_id;
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  margin-top: 15px;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 10px;
  }
  /deep/ .van-cell__title {
    .van-cell__label {
      width: 400px;
    }
  }
}
</style>
