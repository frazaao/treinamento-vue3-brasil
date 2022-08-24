import HeaderLogged from "./index.vue";
import { mount } from "@vue/test-utils";
import { routes } from "@/router";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

const mockStore = {
  currentUser: {},
};

jest.mock("../../hooks/useStore", () => {
  return () => {
    return mockStore;
  };
});

describe("<HeaderLogged />", () => {
  it("Should render header logged correctly", async () => {
    router.push("/");

    await router.isReady();

    const wrapper = mount(HeaderLogged, {
      global: { plugins: [router] },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should render 3 dots when there is no user logged in", async () => {
    router.push("/");

    await router.isReady();

    const wrapper = mount(HeaderLogged, {
      global: { plugins: [router] },
    });

    const buttonLogout = wrapper.find("#logout-button");

    expect(buttonLogout.text()).toBe("...");
  });

  it("Should render username when there is no user logged in", async () => {
    router.push("/");

    mockStore.currentUser.name = "Matheus";

    await router.isReady();

    const wrapper = mount(HeaderLogged, {
      global: { plugins: [router] },
    });

    const buttonLogout = wrapper.find("#logout-button");

    expect(buttonLogout.text()).toBe("Matheus (sair)");
  });
});
