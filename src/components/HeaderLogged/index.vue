<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <div class="flex items-center justify-between w-4/5 max-w-6xl py-10">
      <picture class="w-28 lg:w-36">
        <img
          class="w-full"
          src="../../assets/images/logo_white.png"
          alt="Logomarca"
        />
      </picture>

      <nav>
        <ul class="flex list-none">
          <li
            @click="() => router.push({ name: 'Credentials' })"
            class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none"
          >
            Credenciais
          </li>

          <li
            @click="() => router.push({ name: 'Feedbacks' })"
            class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none"
          >
            Feedbacks
          </li>

          <li
            class="px-6 py-2 mr-2 font-bold bg-white text-brand-main rounded-full cursor-pointer focus:outline-none"
            @click="handleLogout"
          >
            {{ logoutLabel }}
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { computed } from "vue";
import useStore from "../../hooks/useStore";
import { clearCurrentUser } from "../../store/user";

export default {
  name: "HeaderLogged",
  setup() {
    const router = useRouter();
    const store = useStore("User");

    const logoutLabel = computed(() => {
      if (!store.currentUser.name) {
        return "...";
      } else {
        return store.currentUser.name + " (sair)";
      }
    });

    function handleLogout() {
      window.localStorage.removeItem("token");
      clearCurrentUser();
      router.push({ name: "Home" });
    }

    return {
      router,
      logoutLabel,
      handleLogout,
    };
  },
};
</script>

<style lang="scss" scoped></style>
