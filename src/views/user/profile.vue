<template>
  <div class="page-user-profile">
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      title="编辑资料"
      right-text="保存"
      @click-right="save()"
    ></van-nav-bar>
    <van-cell-group>
      <van-cell @click="showPhoto = true" is-link title="头像" center>
        <van-image
          round
          slot="default"
          width="56"
          height="56"
          fit="cover"
          :src="userProfile.photo"
        ></van-image>
      </van-cell>
      <van-cell
        @click="showName = true"
        is-link
        title="名称"
        :value="userProfile.name"
      ></van-cell>
      <van-cell
        @click="showGender = true"
        is-link
        title="性别"
        :value="userProfile.gender === 0 ? '男' : '女'"
      ></van-cell>
      <van-cell
        @click="showBirthday = true"
        is-link
        title="生日"
        :value="userProfile.birthday"
      ></van-cell>
    </van-cell-group>
    <!-- 图片 -->
    <van-popup v-model="showPhoto" position="bottom">
      <van-cell
        @click="$refs.mypic.click()"
        si-link
        title="本地相册选择图片"
      ></van-cell>
      <van-cell is-link title="拍照"></van-cell>
    </van-popup>
    <!-- 昵称 -->
    <van-popup v-model="showName" position="bottom">
      <van-field
        v-model.trim="userProfile.name"
        type="textarea"
        rows="3"
      ></van-field>
    </van-popup>
    <!-- 性别 -->
    <van-popup v-model="showGender" position="bottom">
      <van-action-sheet
        v-model="showGender"
        @select="onSelect"
        :actions="actions"
        cancel-text="取消"
      ></van-action-sheet>
    </van-popup>
    <!-- 生日 -->
    <van-popup v-model="showBirthday" position="bottom">
      <van-datetime-picker
        v-model="nowDate"
        type="date"
        :min-date="minDate"
        @cancel="showBirthday = false"
        @confirm="confirmDate"
      ></van-datetime-picker>
    </van-popup>
    <input
      ref="mypic"
      @change="startUpload()"
      type="file"
      style="display: none;"
    />
  </div>
</template>

<script>
import dayjs from "dayjs";
import { apiUserProfile, apiUserPhoto, apiSaveProfile } from "@/api/user.js";
export default {
  name: "user-profile",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      nowDate: new Date(),
      minDate: new Date("1900-01-01"),
      showBirthday: false,
      showPhoto: false,
      showName: false,
      showGender: false,
      actions: [{ name: "男" }, { name: "女" }],
      userProfile: {
        photo: "",
        name: "",
        gender: 0,
        birthday: ""
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUserProfile();
  },
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    async startUpload() {
      const fd = new FormData();
      fd.append("photo", this.$refs.mypic.files[0]);
      const result = await apiUserPhoto(fd);
      this.userProfile.photo = result.photo;
      this.showPhoto = false;
    },
    confirmDate(val) {
      this.userProfile.birthday = dayjs(val).format("YYYY-MM-DD");
      this.showBirthday = false;
    },
    onSelect(val) {
      this.userProfile.gender = val.name === "男" ? 0 : 1;
      this.showGender = false;
    },
    async getUserProfile() {
      this.userProfile = await apiUserProfile();
      this.nowDate = new Date(this.userProfile.birthday);
    },
    async save() {
      await apiSaveProfile(this.userProfile);
      // 提示信息
      this.$toast.success("保存成功");
    }
  }
};
</script>

<style lang="less" scoped></style>
