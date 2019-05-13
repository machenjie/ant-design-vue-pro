<template>
  <div>
    <a-form :layout="formLayout" :form="form" @submit="onSubmit">
      <a-form-item
        label="Form Layout"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-radio-group
          default-value="horizontal"
          @change="handleFormLayoutChange"
        >
          <a-radio-button value="horizontal">
            Horizontal
          </a-radio-button>
          <a-radio-button value="vertical">
            Vertical
          </a-radio-button>
          <a-radio-button value="inline">
            Inline
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="Field A"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          placeholder="input placeholder"
          v-decorator="[
            'fieldA',
            {
              initialValue: fieldA,
              rules: [
                {
                  required: true,
                  min: 6,
                  message: 'field must greater than 6!'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="Field B"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          placeholder="input placeholder"
          v-decorator="[
            'fieldB',
            {
              initialValue: fieldB
            }
          ]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary" htmlType="submit">
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
    _this.form = this.$form.createForm(_this, {});
    return {};
  }
})
export default class BasicForm extends Vue {
  formLayout = "horizontal";
  fieldA = "hello";
  fieldB = "";

  get formItemLayout() {
    return this.formLayout === "horizontal"
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 }
        }
      : {};
  }

  get buttonItemLayout() {
    return this.formLayout === "horizontal"
      ? {
          wrapperCol: { span: 14, offset: 4 }
        }
      : {};
  }

  handleFormLayoutChange(e: any) {
    this.formLayout = e.target.value;
  }

  onSubmit(e: any) {
    let _this = this as any;
    _this.form.validateFields((err: any, value: any) => {
      if (err) {
        console.log(err);
        e.preventDefault();
      } else {
        console.log(value);
        Object.assign(this, value);
      }
    });
  }
}
</script>

<style scoped lang="less"></style>
