<template>
  <HeaderLogged />
  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">Credenciais</h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-gray-800">
        Instalação e configuração
      </h1>

      <p class="mt-10 text-lg text-gray-800 font-regular">
        Este aqui é sua chave de Api
      </p>

      <content-Loader
        v-if="store.Global.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="flex justify-between py-3 px-5 w-full lg:w-2/3 mt-2 rounded items-center bg-brand-gray"
      >
        <span v-if="state.hasError">Erro ao carregar a API Key</span>
        <span v-else id="api-key">{{ store.User.currentUser.apiKey }}</span>

        <div class="flex gap-2" v-if="!state.hasError">
          <Icon
            @click="handleCopy"
            name="Copy"
            size="24"
            :color="brandColors.graydark"
            class="cursor-pointer"
          />

          <Icon
            @click="handleGenerateApiKey"
            name="Loading"
            size="24"
            :color="brandColors.graydark"
            class="cursor-pointer"
            id="get-new-apikey"
          />
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a recer feedbacks
      </p>

      <ContentLoader
        v-if="store.Global.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      >
        <ContentLoader />
      </ContentLoader>

      <div
        v-else
        class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-full lg:w-2/3 overflow-x-scroll"
      >
        <span v-if="state.hasError">Erro ao carregar o script</span>
        <pre v-else>
&lt;script src="http://igorhalfeld-feedbacker-widget.netlify.app?apikey={{
            store.User.currentUser.apiKey
          }}"&gt;&lt;/script&gt;</pre
        >
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from "vue";
import { useToast } from "vue-toastification";

import HeaderLogged from "../../components/HeaderLogged/index.vue";
import ContentLoader from "../../components/ContentLoader";
import Icon from "../../components/Icon/index.vue";

import useStore from "../../hooks/useStore";
import palette from "../../../palette";
import services from "../../services";
import { setApiKey } from "@/store/user";

export default {
  name: "Credentials-index",
  components: {
    HeaderLogged,
    ContentLoader,
    Icon,
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const state = reactive({
      isLoading: false,
      hasError: false,
    });

    watch(
      () => store.User.currentUser,
      () => {
        if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
          handleError(true);
        }
      }
    );

    async function handleGenerateApiKey() {
      try {
        state.isLoading = true;
        const { data } = await services.users.generateApiKey();
        setApiKey(data.apiKey);
        state.isLoading = false;
      } catch (error) {
        handleError(error);
      }
    }

    function handleError(error) {
      state.isLoading = false;
      state.hasError = !!error;
    }

    async function handleCopy() {
      try {
        toast.clear();
        await navigator.clipboard.writeText(store.User.currentUser.apiKey);
        toast.success("Copiado");
      } catch (error) {
        handleError(error);
      }
    }

    return {
      state,
      store,
      brandColors: palette.brand,
      handleGenerateApiKey,
      handleCopy,
    };
  },
};
</script>
