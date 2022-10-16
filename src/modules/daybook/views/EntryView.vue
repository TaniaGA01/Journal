<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ dayMonthYear.day }}</span>
        <span class="mx-1 fs-3">{{ dayMonthYear.month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ dayMonthYear.yearDay }}</span>
      </div>
      <div>
        <button
          v-if="entry.id"
          class="btn btn-danger mx-2"
          @click="onDeleteEntry"
        >
          Supprimer
          <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary mx-2">
          Upload image
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea
        v-model="entry.text"
        placeholder="Ce qui s'est passé aujourd'hui"
      ></textarea>
    </div>
    <img
      src="https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive-960x540.jpg"
      alt="image entry"
      class="img-thumbnail"
    />
  </template>
  <FabComp
    icon="fa-save"
    @on:click="saveEntry"
  /><!-- icon vient du props du composant FabCom-->
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import getDayMonthYear from "../helpers/getDayMonthYear";
import Swal from "sweetalert2";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  components: {
    FabComp: defineAsyncComponent(() => import("../components/FabComp.vue")),
  },

  data() {
    return {
      entry: null,
    };
  },

  computed: {
    ...mapGetters("journalModule", ["getEntriesById"]),

    dayMonthYear() {
      const { day, month, yearDay } = getDayMonthYear(this.entry.date);
      return { day, month, yearDay };
    },
  },

  methods: {
    ...mapActions("journalModule", [
      "updateEntry",
      "createEntry",
      "deleteEntry",
    ]), //appel à l'action updateEntry du actions.js'

    loadEntry() {
      let entry;

      if (this.id === "new") {
        // 'new' vient de la fonction goCreateNewEntry de NoEntrySelected.vue
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntriesById(this.id);
        if (!entry) return this.$router.push({ name: "no-entry" });
      }

      this.entry = entry;
    },

    async saveEntry() {
      //popup
      new Swal({
        title: "Merci de patienter",
        allowOutsideClick: false,
      });
      Swal.showLoading(); //afficher le message

      //Actualiser l'post
      if (this.entry.id) {
        await this.updateEntry(this.entry); // appel updateEntry pour actualiser
      } else {
        // Ajouter nouvel post
        const id = await this.createEntry(this.entry);
        //redirection
        this.$router.push({ name: "entry", params: { id } });
      }

      Swal.fire(
        "Post sauvegardé",
        "Votre post a éte bien sauvagardé",
        "success"
      );
    },

    async onDeleteEntry() {
      //popup confirmation
      const { isConfirmed } = await Swal.fire({
        title: "Êtes-vous sûr de vouloir supprimer cet post ? ",
        text: "Vous ne pourrez pas récupérer le post",
        showDenyButton: true,
        confirmButtonText: "Confirmer",
      });

      if (isConfirmed) {
        new Swal({
          title: "Merci de patienter",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        await this.deleteEntry(this.entry.id);
        this.$router.push({ name: "no-entry" });

        Swal.fire("Post supprimé", "", "success");
      }
    },
  },

  created() {
    this.loadEntry();
  },

  watch: {
    id() {
      // l'id vient des props donc il affiche l'ancien value et le nouveau
      this.loadEntry();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}
img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0 5px 10px rgb($color: #000000, $alpha: 0.2);
}
</style>