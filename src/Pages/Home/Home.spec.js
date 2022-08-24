import Home from "./index.vue";
import { routes } from "../../router/index";

import { createRouter, createWebHistory } from "vue-router";
import { mount } from "@vue/test-utils";

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

describe("<Home />", () => {
  it("Should render home correctly", async () => {
    router.push("/");
    await router.isReady();
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
