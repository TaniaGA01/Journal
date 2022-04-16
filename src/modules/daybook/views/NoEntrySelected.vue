<template>
  <div class="d-flex justify-content-center align-items-center">
    <h1 class="">Selectionner un article</h1>
  </div>
  <FabComp>
    <i class="fa fa-2x fa-plus"></i>
  </FabComp>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    FabComp: defineAsyncComponent(() => import("../components/FabComp.vue")),
  },
};
</script>

<style lang="scss" scoped>
div {
  height: 100%;
}
</style>