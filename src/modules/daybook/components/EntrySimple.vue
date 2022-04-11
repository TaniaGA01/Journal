<template>
  <div class="mb-3 pointer p-2 entry-container">
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">15</span>
      <span class="mx-1fs-5">julio</span>
      <span class="mx-2 fw-light">2022</span>
    </div>
  </div>
  <div class="entry-description">
    Exercitation sit ipsum ullamco voluptate qui ut do sit nulla ex elit laborum
    dolor. Nostrud cupidatat ullamco quis ea consectetur velit ipsum dolore
    excepteur velit excepteur. Reprehenderit sint eu esse do est aute
    reprehenderit proident. Irure proident nulla Lorem cupidatat fugiat sint
    consequat. Officia sint et Lorem sunt officia dolor dolore officia est in
    aliquip laboris est.
  </div>
</template>
<script>
</script>


<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s all ease-in;

  &:hover {
    background: lighten($color: grey, $amount: 45);
    transition: 0.2s all ease-in;
  }

  .entry-description {
    font-size: 12px;
  }
}
</style>