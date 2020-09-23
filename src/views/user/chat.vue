<template>
  <div class="container">
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="小智同学"
    ></van-nav-bar>
    <div class="chat-list" ref="talkArea">
      <div
        class="chat-item"
        :class="[item.name === 'xz' ? 'left' : 'right']"
        v-for="(item, k) in talks"
        :key="k"
      >
        <van-image
          fit="cover"
          round
          v-if="item.name === 'xz'"
          :src="XZImg"
        ></van-image>
        <div class="chat-pao">{{ item.msg }}</div>
        <van-image
          fit="cover"
          round
          v-if="item.name === 'vip'"
          :src="userInfo.photo"
        />
      </div>
    </div>
    <div class="reply-container van-hairline--top">
      <van-field v-model="content" placeholder="说点什么" @keyup.enter="send()">
        <van-loading
          v-if="loading"
          slot="button"
          type="spinner"
          size="16px"
        ></van-loading>
        <span
          v-else
          @click="send()"
          slot="button"
          style="font-size:12px;color:#999"
          >提交</span
        >
      </van-field>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import { apiUserInfo } from "@/api/user";
import XZImg from "@/assets/xz.png";
export default {
  name: "user-chat",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      talks: [],
      socket: null,
      userInfo: null,
      XZImg,
      content: "",
      loading: false
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUserInfo();
    this.setSocket();
  },
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    scrollBottom() {
      this.$nextTick(() => {
        this.$refs.talkArea.scrollTop = this.$refs.talkArea.scrollHeight;
      });
    },
    // setSocket() {
    //   this.socket = io("http://ttapi.research.itcast.cn", {
    //     query: {
    //       token: this.$store.state.user.token
    //     }
    //   });
    //   this.socket.on("connect", () => {
    //     this.talks.push({
    //       msg: "干啥呢outman，咋这长时间不联系了？",
    //       timestamp: Date.now(),
    //       name: "xz"
    //     });
    //   });
    //   this.socket.on("message", data => {
    //     this.talks.push({ ...data, name: "xz" });
    //   });
    // },
    // 建立与 服务器端的socket连接
    setSocket() {
      // query代表以请求字符串形式传递token参数
      // 请求地址为：http://ttapi.research.itcast.cn/socket.io/?token=xxx&a=xx&a=xx
      // 其中的socket.io是内部自动添加的，不用理会
      // 请求字符串：把参数信息通过?与请求地址做连接发送到服务器端，形式 ?name=value&name=value……
      this.socket = io("http://ttapi.research.itcast.cn", {
        // query:会使得参数以“请求字符串”形式挂接到请求地址的后边
        query: {
          token: this.$store.state.user.token
        }
      });
      // io调用时会与服务器端连接，成功后会自动调用如下的connect事件
      // 具体是服务器端通过emit()调用如下事件的
      this.socket.on("connect", () => {
        // 客户端与服务器连接成功后会自动调用该事件
        // console.log('连接成功')
        // 小智先发言，暖下场
        this.talks.push({
          msg: "干啥呢outman，咋这长时间不联系了？",
          timestamp: Date.now(),
          name: "xz"
        }); // name:xz 表示这句话是小智同学说的
      });
      // 服务器端----->客户端 发送消息时候会自动调用该事件
      // 进而接收回传回来的数据
      this.socket.on("message", data => {
        // data: {msg:xx,timestamp:xx}
        this.talks.push({ ...data, name: "xz" });
        // ... 三点是做展开运算的，形成如下效果
        // this.talks.push({ msg:xx,timestamp:xx, name: 'xz' })
        // 数据追加完毕，设置滚动条跑到最底部，以便显示最新数据
        this.scrollBottom();
      });
      // 服务器端----->客户端  告知连接已经关闭(非必须的)
      this.socket.on("disconnect", () => {
        // console.log('连接已经关闭')
      });
    },
    async getUserInfo() {
      this.userInfo = await apiUserInfo();
      console.log(this.userInfo.photo);
    },
    async send() {
      if (!this.content) return false;
      this.loading = true;
      const obj = {
        name: "vip",
        msg: this.content,
        timestamp: Date.now()
      };
      this.talks.push(obj);
      this.scrollBottom();
      this.content = "";
      await this.$sleep(500);
      this.socket.emit("message", obj);
      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 92px 0 100px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 20px;
      .van-image {
        vertical-align: top;
        width: 80px;
        height: 80px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 80px;
        max-width: 70%;
        min-height: 80px;
        max-height: 140px;
        line-height: 76px;
        border: 1px solid #c2d9ea;
        border-radius: 8px;
        position: relative;
        padding: 0 20px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 28px;
        color: #333;
        &::before {
          content: "";
          width: 20px;
          height: 20px;
          position: absolute;
          top: 24px;
          border-top: 1px solid #ced9ea;
          border-right: 1px solid #ced9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 30px;
    &::before {
      right: -12px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 30px;
    margin-right: 0;
    &::before {
      left: -10px;
      transform: rotate(-135deg);
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
}
</style>
