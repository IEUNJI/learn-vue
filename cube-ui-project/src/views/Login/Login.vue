<template>
  <div class="login">
    <div class="login-form">
      <cube-form :model="model" @submit="submitHandler">
      <cube-form-group>
        <cube-form-item :field="fields[0]"></cube-form-item>
        <cube-form-item :field="fields[1]"></cube-form-item>
      </cube-form-group>
      <cube-form-group>
        <cube-button type="submit">Submit</cube-button>
      </cube-form-group>
    </cube-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import * as types from "@/store/actions-type";
import { Toast } from "cube-ui";

export default {
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
      fields: [
        {
          type: "input",
          modelKey: "username",
          label: "用户名",
          props: {
            placeholder: "请输入用户名",
          },
          rules: {
            required: true,
          },
        },
        {
          type: "input",
          modelKey: "password",
          label: "密码",
          props: {
            type: "password",
            placeholder: "请输入密码",
          },
          rules: {
            required: true,
          },
        },
      ],
    };
  },
  methods: {
    ...mapActions([types.LOGIN]),
    submitHandler(e) {
      e.preventDefault();
      this[types.LOGIN](this.model)
        .then((res) => {
          localStorage.setItem("token", res.token);
          this.$router.push("/");
        })
        .catch((err) => {
          Toast.$create({
            txt: err.data,
            time: 1000,
            type: "error",
          }).show();
        });
    },
  },
};
</script>
