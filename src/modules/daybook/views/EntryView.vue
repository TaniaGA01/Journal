<template>
  <div class="entry-title d-flex justify-content-between p-2">
    <div>
      <span class="text-success fs-3 fw-bold">16</span>
      <span class="mx-1 fs-3">Avril</span>
      <span class="mx-2 fs-4 fw-light">2022, Samedi</span>
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
      name=""
      id=""
      cols="30"
      rows="10"
      placeholder="Ce qui s'est passé aujourd'hui"
    ></textarea>
  </div>
  <FabComp icon="fa-save" /><!-- icon vient du props du composant FabCom-->
  <img
    src="https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive-960x540.jpg"
    alt="image entry"
    class="img-thumbnail"
  />
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