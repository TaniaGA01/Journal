<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input
        type="text"
        class="form-control"
        placeholder="Rechercher un article"
        v-model="term"
      />
    </div>
    <div class="entry-scrollarea">
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