<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="Set Account"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'payAccount',
            {
              initialValue: step.payAccount,
              rules: [
                {
                  required: true,
                  message: 'you must input the account!'
                }
              ]
            }
          ]"
        ></a-input>
      </a-form-item>
      <a-form-item
        label="Receiver Account"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <SelectedAccount
          v-decorator="[
            'receiverAccount',
            {
              initialValue: step.receiverAccount,
              rules: [
                {
                  required: true,
                  message: 'you must input the receiver account!',
                  validator: function(rule, value, callback) {
                    if (value && value.number) {
                      callback();
                    } else {
                      callback(false);
                    }
                  }
                }
              ]
            }
          ]"
        ></SelectedAccount>
      </a-form-item>
      <a-form-item :wrapper-col="formItemLayout.labelCol">
        <a-button type="primary" @click="handleSubmit">
          Next Step
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SelectedAccount from "@/components/SelectedAccount.vue";

@Component({
  components: {
    SelectedAccount
  },
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
      let _this = this as any;
      _this.form.validateFields((err: any, value: any) => {
        if (!err) {
          this.$store.commit("form/saveStepFromForm", { ...value });
          this.$router.push("/form/setup-from/confirm");
        }
      });
    }
  }
})
export default class Info extends Vue {}
</script>

<style scoped lang="less"></style>
