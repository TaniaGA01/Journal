<template>
  <Navbar />
  <template v-if="isLoading">
    <div class="row justify-content-md-center">
      <div class="col-3 alert-info text-center mt-5">
        <p>Merci de patienter...</p>
        <h3 class="mt-2">
          <i class="fa fa-spin fa-sync"></i>
        </h3>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="d-flex">
      <div class="col-4">
        <EntryList />
      </div>
      <div class="col">
        <router-view />
      </div>
    </div>
  </template>
</template>
<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    Navbar: defineAsyncComponent(() =>
      import("../components/Navbar-primary.vue")
    ),
    EntryList: defineAsyncComponent(() =>
      import("../components/EntryList.vue")
    ),
  },
  methods: {
    ...mapActions("journalModule", ["loadEntries"]), // destructuration des actions toujours dans methods
  },
  computed: {
    ...mapState("journalModule", ["isLoading"]), // mapState toujour dans computer
  },
  created() {
    this.loadEntries();
  },
};
</script>