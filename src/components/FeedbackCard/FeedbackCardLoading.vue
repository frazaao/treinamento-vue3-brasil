<template>
  <ContentLoader
    class="flex flex-col items-center rounded"
    width="100%"
    height="300px"
  >
    <ContentLoader
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animationDuration="1.75s"
    />

    <ContentLoader
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animationDuration="2s"
    />

    <ContentLoader
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animationDuration="2.25s"
    />
  </ContentLoader>
</template>

<script>
import ContentLoader from "../ContentLoader/index.vue";
export default { components: { ContentLoader } };
</script>
