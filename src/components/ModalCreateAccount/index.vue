<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">Crie sua conta</h1>

    <button class="text-4xl focus:outline-none text-gray-600" @click="close">
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-xl font-medium text-gray-800">Nome</span>
        <input
          type="name"
          name="name"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="Seu nome completo"
          v-model="state.name.value"
          :class="{ 'border-brand-danger': !!state.name.errorMessage }"
        />
        <span
          class="block font-medium text-brand-danger text-xs"
          v-if="!!state.name.errorMessage"
          >{{ state.name.errorMessage }}</span
        >
      </label>

      <label class="block mt-5">
        <span class="text-xl font-medium text-gray-800">Email</span>
        <input
          type="email"
          name="email"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="Seu melhor email"
          v-model="state.email.value"
          :class="{ 'border-brand-danger': !!state.email.errorMessage }"
        />
        <span
          class="block font-medium text-brand-danger text-xs"
          v-if="!!state.email.errorMessage"
          >{{ state.email.errorMessage }}</span
        >
      </label>

      <label class="block mt-5">
        <span class="text-xl font-medium text-gray-800">Senha</span>
        <input
          type="password"
          name="password"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="Sua senha segura"
          v-model="state.password.value"
          :class="{ 'border-brand-danger': !!state.password.errorMessage }"
        />
        <span
          class="block font-medium text-brand-danger text-xs"
          v-if="!!state.password.errorMessage"
          >{{ state.password.errorMessage }}</span
        >
      </label>

      <button
        :class="{ 'opacity-50': state.isLoading }"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all hover:scale-105"
        :disabled="state.isLoading"
        type="submit"
      >
        <Icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else>Criar conta</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import services from "../../services/index";
import useModal from "../../hooks/useModal";
import { useField } from "vee-validate";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import Icon from "../Icon/index.vue";
import {
  validateEmptyAndLength3,
  validateEmptyAndEmail,
} from "../../utils/validators";

export default {
  name: "ModalLogin",
  components: { Icon },
  setup() {
    const modal = useModal();
    const router = useRouter();
    const toast = useToast();

    const { value: emailValue, errorMessage: emailErrorMessage } = useField(
      "email",
      validateEmptyAndEmail
    );

    const { value: nameValue, errorMessage: nameErrorMessage } = useField(
      "name",
      validateEmptyAndLength3
    );

    const { value: passwordValue, errorMessage: passwordErrorMessage } =
      useField("password", validateEmptyAndLength3);

    const state = reactive({
      hasErrors: null,
      isLoading: false,
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage,
      },

      email: {
        value: emailValue,
        errorMessage: emailErrorMessage,
      },

      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage,
      },
    });

    async function login({ email, password }) {
      const { data, errors } = await services.auth.login({ email, password });

      if (!errors) {
        window.localStorage.setItem("token", data.token);
        state.isLoading = false;
        router.push({ name: "Feedbacks" });
        modal.close();
        toast.success("Conta criada e login efetuado com sucesso");
        return;
      }

      if (errors.status == 404) {
        toast.error("E-mail não encontrado");
      }
      if (errors.status == 401) {
        toast.error("E-mail ou senha inválidos");
      }
      if (errors.status == 400) {
        toast.error("Ocorreu um erro ao fazer o login");
      }
    }

    async function handleSubmit() {
      try {
        toast.clear();
        state.isLoading = true;
        const { errors } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value,
        });

        if (!errors) {
          await login({
            email: state.email.value,
            password: state.password.value,
          });
          return;
        }

        if (errors.status == 400) {
          toast.error("Ocorreu um erro ao registrar sua conta");
        }

        state.isLoading = false;
      } catch (error) {
        state.isLoading = false;
        state.hasErrors = !!error;
        toast.error("Ocorreu um erro ao registrar sua conta");
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit,
    };
  },
};
</script>
