<template>
  <ContentLoader
    class="flex flex-col items-center rounded"
    width="100%"
    height="200px"
  >
    <ContentLoader
      class="mt-3 rounded"
      width="90%"
      height="35px"
      animationDuration="1.75s"
    />

    <ContentLoader
      class="mt-3 rounded"
      width="90%"
      height="35px"
      animationDuration="2s"
    />

    <ContentLoader
      class="mt-3 rounded"
      width="90%"
      height="35px"
      animationDuration="2.25s"
    />

    <ContentLoader
      class="mt-3 rounded"
      width="90%"
      height="35px"
      animationDuration="2.5s"
    />
  </ContentLoader>
</template>

<script>
import ContentLoader from "../../components/ContentLoader/index.vue";
export default {
  components: { ContentLoader },
};
</script>
