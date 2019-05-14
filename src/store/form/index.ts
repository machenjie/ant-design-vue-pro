import request from "@/utils/request";
import router from "@/router";

const state = {
  step: {
    payAccount: "123455",
    receiverAccount: {
      type: "alipay",
      number: ""
    }
  }
};

const mutations = {
  saveStepFromForm(state: any, payload: any) {
    state.step = {
      ...state.step,
      ...payload
    };
  }
};

const actions = {
  async commitForm({ commit }: any, payload: any) {
    await request({
      url: "/api/form/commit",
      method: "POST",
      data: payload
    });
    commit("saveStepFromForm", { ...payload });
    router.push("/form/setup-from/result");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
