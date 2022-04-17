<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ dayMonthYear.day }}</span>
        <span class="mx-1 fs-3">{{ dayMonthYear.month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ dayMonthYear.yearDay }}</span>
      </div>
      <div>
        <button class="btn btn-danger mx-2">
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
  <FabComp icon="fa-save" /><!-- icon vient du props du composant FabCom-->
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";
import getDayMonthYear from "../helpers/getDayMonthYear";

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
    loadEntry() {
      const entryById = this.getEntriesById(this.id);
      console.log(`entryById`, entryById);

      if (!entryById) return this.$router.push({ name: "no-entry" });
      this.entry = entryById;
    },
  },
  created() {
    //console.log(`router`, this.$route); //ici on affiche l'id de la route dans la console
    console.log(`id`, this.id); // fonctionne  uniquement à partir de la conf du props dans le router
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