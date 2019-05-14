<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="Set Account"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        {{ step.payAccount }}
      </a-form-item>
      <a-form-item
        label="Input Password"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          type="password"
          v-decorator="[
            'password',
            {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: 'you must input your password!'
                }
              ]
            }
          ]"
        ></a-input>
      </a-form-item>
      <a-form-item :wrapper-col="formItemLayout.labelCol">
        <a-button @click="$router.push('/form/setup-from/info')">
          Last Step
        </a-button>
        <a-button
          type="primary"
          style="margin-left: 10px"
          @click="handleSubmit"
        >
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  data: function() {
    let _this = this as any;
    _this.form = _this.$form.createForm(this, {});
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    }
  },
  methods: {
    handleSubmit() {
      let { form, $store, step } = this as any;
      form.validateFields((err: any, value: any) => {
        if (!err) {
          $store.dispatch("form/commitForm", {
            ...step,
            ...value
          });
        }
      });
    }
  }
})
export default class Confirm extends Vue {}
</script>

<style scoped lang="less"></style>
