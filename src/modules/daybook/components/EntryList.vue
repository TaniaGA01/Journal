<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input
        type="text"
        class="form-control"
        placeholder="Rechercher un post"
        v-model="term"
      />
    </div>
    <div class="mt-2 d-flex justify-content-end px-2">
      <button
        class="btn btn-primary"
        @click="$router.push({ name: 'entry', params: { id: 'new' } })"
      >
        <i class="fa fa-plus-circle"></i> Nouvel post
      </button>
    </div>
    <div class="entry-scrollarea mt-5">
      <h2>posts récents</h2>
      <Entry
        v-for="entry in entriesByTerm"
        :key="entry.id"
        :entry="entry"
      /><!-- :entry="entry" hace referencia al entry del v-for y se recupera del props del archivo EntrySimple.vue-->
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";

export default {
  components: {
    Entry: defineAsyncComponent(() => import("./EntrySimple.vue")),
  },

  data() {
    return {
      term: "",
    };
  },

  computed: {
    ...mapGetters("journalModule", ["getEntriesByTerm"]), //journalModule vient de l'index.js, getEntriesByTerm vient du getters.js
    entriesByTerm() {
      return this.getEntriesByTerm(this.term);
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  height: 55px;
}
.entry-list-container {
  border-right: 1px solid #2c3e50;
  height: calc(100vh - 56px);
}
.entry-scrollarea {
  height: calc(100vh - 120px);
  overflow: scroll;
}
</style>