<template>
  <HeaderLogged />
  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">Feedbacks</h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Detalhes de todos os feedbacks recebidos.
    </p>
  </div>

  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2">
      <div>
        <h1 class="font-3xl font-black text-brand-graydark">Listagem</h1>
        <suspense>
          <template #default>
            <Filters
              @select="changeFeedbacksType"
              class="mt-8 animate__animated animate__flipInX animate__faster"
            />
          </template>
          <template #fallback>
            <FiltersLoading />
          </template>
        </suspense>
      </div>
      <div class="col-span-3 px-10 pt-20" id="feedbacks">
        <p
          v-if="state.hasError"
          class="textlg text-center text-gray-800 font-regular"
        >
          Aconteceu algum erro ao carregar os Feedbacks😕
        </p>

        <p
          v-if="!state.feedbacks.length && !state.isLoading"
          class="textlg text-center text-gray-800 font-regular"
        >
          Ainda não recebemos nenhum Feedback🙃
        </p>

        <FeedbackCardLoading
          v-if="state.isLoading || state.isLoadingFeedbacks"
        />

        <FeedbackCard
          v-else
          v-for="(feedback, index) in state.feedbacks"
          :key="feedback.id"
          :isOpen="index === 0"
          :feedback="feedback"
          class="mb-8"
        />

        <FeedbackCardLoading v-if="state.isLoadingMoreFeedbacks" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, reactive } from "vue";

import HeaderLogged from "../../components/HeaderLogged";
import Filters from "./Filters.vue";
import FiltersLoading from "./FiltersLoading.vue";
import FeedbackCard from "../../components/FeedbackCard/index.vue";
import FeedbackCardLoading from "../../components/FeedbackCard/FeedbackCardLoading.vue";

import services from "@/services";

export default {
  components: {
    HeaderLogged,
    Filters,
    FiltersLoading,
    FeedbackCard,
    FeedbackCardLoading,
  },
  name: "Feedback-index",
  setup() {
    const state = reactive({
      feedbacks: [],
      isLoading: false,
      isLoadingFeedbacks: false,
      isLoadingMoreFeedbacks: false,
      hasError: false,
      currentFeedbackType: "",
      pagination: {
        limit: 5,
        offset: 0,
      },
    });

    async function changeFeedbacksType(type) {
      try {
        state.isLoadingFeedbacks = true;
        state.pagination.limit = 5;
        state.pagination.offset = 0;
        state.currentFeedbackType = type;

        const { data } = await services.feedbacks.getAll({
          type,
          ...state.pagination,
        });

        state.feedbacks = data.results;
        state.pagination = data.pagination;
        state.isLoadingFeedbacks = false;
      } catch (error) {
        state.isLoadingFeedbacks = false;

        handleError(error);
      }
    }

    async function fetchFeedbacks() {
      try {
        state.isLoading = true;
        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType,
        });

        state.feedbacks = data.results;
        state.pagination = data.pagination;
        state.isLoading = false;
      } catch (error) {
        handleError(error);
      }
    }

    function handleError(err) {
      state.hasError = !!err;
      state.isLoading = false;
    }

    onMounted(() => {
      fetchFeedbacks();
      window.addEventListener("scroll", handleScroll, false);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll, false);
    });

    async function handleScroll() {
      const isBottomOfWindow =
        Math.ceil(document.documentElement.scrollTop + window.innerHeight) >=
        document.documentElement.scrollHeight;

      if (state.isLoading || state.isLoadingMoreFeedbacks) {
        return;
      }
      if (!isBottomOfWindow) {
        return;
      }
      if (state.feedbacks.length >= state.pagination.total) {
        return;
      }

      try {
        state.isLoadingMoreFeedbacks = true;
        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType,
          offset: state.pagination.offset + 5,
        });

        if (data.results.length) {
          state.feedbacks.push(...data.results);
        }

        state.isLoadingMoreFeedbacks = false;
        state.pagination = data.pagination;
      } catch (error) {
        state.isLoadingMoreFeedbacks = false;
        handleError(error);
      }
    }

    return {
      state,
      fetchFeedbacks,
      changeFeedbacksType,
    };
  },
};
</script>
