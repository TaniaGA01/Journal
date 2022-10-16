<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ dayMonthYear.day }}</span>
        <span class="mx-1 fs-3">{{ dayMonthYear.month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ dayMonthYear.yearDay }}</span>
      </div>
      <div>
        <input
          type="file"
          @change="onSelectedImage"
          ref="imageSelector"
          v-show="false"
          accept="image/png, image/jpeg"
        />
        <button
          v-if="entry.id"
          class="btn btn-danger mx-2"
          @click="onDeleteEntry"
        >
          Supprimer
          <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary mx-2" @click="onSelectImg">
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
      v-if="entry.picture && !localImage"
      :src="entry.picture"
      alt="image entry"
      class="img-thumbnail"
    />
    <img
      v-if="localImage"
      :src="localImage"
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
import uploadImage from "../helpers/uploadImage";

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
      localImage: null,
      file: null,
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

      const picture = await uploadImage(this.file);

      this.entry.picture = picture;

      //Actualiser l'post
      if (this.entry.id) {
        await this.updateEntry(this.entry); // appel updateEntry pour actualiser
      } else {
        // Ajouter nouvel post
        const id = await this.createEntry(this.entry);
        //redirection
        this.$router.push({ name: "entry", params: { id } });
      }

      this.file = null;

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

    onSelectedImage(event) {
      const file = event.target.files[0];
      if (!file) {
        this.localImage = null;
        this.file = null;
        return;
      }
      this.file = file;
      const fileRead = new FileReader();
      fileRead.onload = () => (this.localImage = fileRead.result);
      fileRead.readAsDataURL(file);
    },

    onSelectImg() {
      this.$refs.imageSelector.click(); // $refs appelle la ref de l'input
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