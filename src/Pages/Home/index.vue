<template>
  <CustomHeader @create-account="handleAccountCreate" @login="handleLogin" />
  <Contact />
  <footer class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">Feedbacker 2021</p>
  </footer>
</template>

<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import useModal from "../../hooks/useModal";
import CustomHeader from "./CustomHeader.vue";
import Contact from "./Contact.vue";

export default {
  name: "Home-index",
  components: {
    CustomHeader,
    Contact,
  },
  setup() {
    const router = useRouter();
    const modal = useModal();

    onMounted(() => {
      const token = window.localStorage.getItem("token");

      if (token) {
        router.push({ name: "Feedbacks" });
      }
    });

    function handleLogin() {
      modal.open({
        component: "ModalLogin",
      });
    }

    function handleAccountCreate() {
      modal.open({
        component: "ModalCreateAccount",
      });
    }

    return {
      handleLogin,
      handleAccountCreate,
    };
  },
};
</script>
