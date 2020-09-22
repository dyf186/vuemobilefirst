<template>
  <div class="comment">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in commentList" :key="item.com_id.toString()">
        <!-- 作者头像 -->
        <div slot="icon">
          <img class="avatar" :src="item.aut_photo" alt />
        </div>
        <!-- 作者名称 -->
        <div slot="title">
          <span>{{item.aut_name}}</span>
        </div>
        <!-- 点赞 -->
        <div slot="default">
          <van-button
            icon="like-o"
            size="mini"
            plain
            type="item.is_liking?'danger':'default'"
          >&nbsp;{{ item.like_count }}</van-button>
        </div>
        <!-- 评论内容和时间 -->
        <div slot="label">
          <p>{{ item.content }}</p>
          <p>
            <span>{{ item.pubdate | formatTime }}</span>
            <span @click="openReply(item.com_id.toString())">{{ item.reply_count }}&nbsp;回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>
    <!-- 回复列表展示 -->
    <van-popup v-model="showReply" position="bottom" :style="{ height: '80%' }" round>
      <van-list
        v-model="reply.loading"
        :finished="reply.finished"
        finished-text="没有更多了"
        @load="onLoadReply"
      >
        <van-cell v-for="item in replyList" :key="item.com_id.toString()">
          <!-- 作者头像 -->
          <div slot="icon">
            <img class="avatar" :src="item.aut_photo" alt />
          </div>
          <!-- 作者名称 -->
          <div slot="title">
            <span>{{item.aut_name}}</span>
          </div>
          <!-- 回复内容和时间 -->
          <div slot="label">
            <p v-html="item.content"></p>
            <p>
              <span>{{ item.pubdate | formatTime }}</span>
            </p>
          </div>
        </van-cell>
      </van-list>
    </van-popup>
    <div class="reply-container" van-hairline--top>
      <van-field v-model.trim="contentCorR" placeholder="写评论或者回复...">
        <van-loading v-if="submitting" slot="button" type="spinner" size="16px"></van-loading>
        <span class="submit" v-else slot="button" @click="add">提交</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import { apiReplyList, apiAddCorR } from "@/api/reply.js";
import { apiCommentList } from "@/api/comment.js";
export default {
  name: "com-comment",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      contentCorR: "",
      submitting: false,
      nowComID: "",
      lastID: null,
      replyList: [],
      showReply: false,
      reply: {
        list: [],
        loading: false,
        finished: false,
      },
      commentList: [],
      commentID: null,
      list: [],
      loading: false,
      finished: false,
    };
  },
  computed: {
    aid() {
      return this.$route.params.aid;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    async add() {
      if (!this.contentCorR) {
        return false;
      }
      this.submitting = true;
      await this.$sleep(800);
      if (this.showReply) {
        // 回复
        console.log(this.nowComID, this.contentCorR, this.aid);
        // const result = await apiAddCorR({
        //   target: this.nowComID,
        //   content: this.contentCorR,
        //   art_id: this.aid,
        // });
        // const result = await apiAddCorR({
        //   target: this.nowComID,
        //   content: this.contentCorR,
        //   art_id: this.aid,
        // });
        this.replyList.unshift(result.new_obj);
        const comment = this.commentList.find(
          (item) => item.com_id.toString() === this.nowComID
        );
        comment.reply_count++;
      } else {
        // 添加评论
        console.log(this.aid, this.contentCorR);
        // const result = await apiAddCorR({
        //   target: this.aid,
        //   content: this.contentCorR,
        // });
        // const result = await apiAddCorR({
        //   target: this.aid,
        //   content: this.contentCorR,
        // });
        this.commentList.unshift(result.new_obj);
      }
      this.contentCorR = "";
      this.submitting = false;
    },
    openReply(commentID) {
      this.nowComID = commentID;
      this.showReply = true;
      this.replyList = [];
      this.reply.finished = false;
      this.lastID = null;
    },
    async onLoadReply() {
      this.$sleep(800);
      const result = await apiReplyList({
        commentID: this.nowComID,
        lastID: this.lastID,
      });
      this.reply.loading = false;
      if (result.results.length === 0) {
        this.reply.finished = true;
        return false;
      }
      this.replyList.push(...result.results);
      this.lastID = result.last_id;
    },
    async onLoad() {
      await this.$sleep(800);
      const result = await apiCommentList({
        articleID: this.aid,
        commentID: this.commentID,
      });
      console.log(this.commentList);
      this.loading = false;
      if (result.results.length === 0) {
        this.finished = true;
        return false;
      }
      this.commentList.push(...result.results);
      this.commentID = result.last_id;
    },
  },
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
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 88px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
  .submit {
    font-size: 24px;
    color: #3296fa;
  }
}
</style>
