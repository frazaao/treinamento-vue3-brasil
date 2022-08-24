<template>
  <div
    class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray"
    @click="handleToggle"
  >
    <div class="flex items-center justify-between w-full mb-8">
      <Badge :type="feedback.type" />

      <span class="font-regular text-brand-graydark">
        {{ dateFormatted }}
      </span>
    </div>

    <div class="text-lg font-medium text-gray-800">
      <p>{{ feedback.text }}</p>
    </div>

    <div
      v-if="state.isOpen"
      class="flex mt-8 animate__animated animate__flipInX animate__faster"
      :class="{ animate__flipOutX: state.isClosing }"
    >
      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">
            Página
          </span>
          <span class="font-bold text-gray-800 select-none">
            {{ feedback.page }}
          </span>
        </div>

        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">
            Dispositivo
          </span>
          <span class="font-bold text-gray-800 select-none">
            {{ feedback.device }}
          </span>
        </div>
      </div>

      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">
            Usuário
          </span>
          <span class="font-bold text-gray-800 select-none">
            {{ feedback.fingerprint }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-8" v-if="!state.isOpen">
      <Icon
        name="chevron-down"
        size="24"
        height="24"
        :color="brandColors.graydark"
      />
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import Badge from "./Badge.vue";
import Icon from "../Icon/index.vue";
import palette from "../../../palette";
import { wait } from "../../utils/timeout";

export default {
  name: "FeedbackCard",
  components: {
    Badge,
    Icon,
  },
  props: {
    feedback: { type: Object, required: true },
    isOpen: { type: Boolean, default: false },
  },

  setup(props) {
    const brandColors = palette.brand;

    const state = reactive({
      isOpen: props.isOpen,
      isClosing: false,
    });

    async function handleToggle() {
      state.isClosing = true;

      await wait(250);
      state.isOpen = !state.isOpen;
      state.isClosing = false;
    }

    const dateFormatted = computed(() => {
      const date = new Date(props.feedback.createdAt);

      return date.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    });

    return {
      handleToggle,
      dateFormatted,
      brandColors,
      state,
    };
  },
};
</script>
