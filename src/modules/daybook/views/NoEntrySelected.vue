<template>
  <div class="d-flex justify-content-center align-items-center">
    <h1 class="">Selectionner un article</h1>
  </div>
  <FabComp @on:click="goCreateNewEntry">
    <i class="fa fa-2x fa-plus"></i>
  </FabComp>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    FabComp: defineAsyncComponent(() => import("../components/FabComp.vue")),
  },
  methods:{
    goCreateNewEntry(){// cette fonction active la fonction loadEntry de EntryView.vue
      this.$router.push({name: 'entry', params:{ id: 'new' }})// route pour créer une nouvelle entree
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  height: 100%;
}
</style>