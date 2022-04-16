<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Hola mundo</h1>
    <button @click="goToDayBook" class="btn btn-sm btn-primary">Primary</button>
    <button @click="goToDayBook" class="btn btn-sm btn-secondary">
      Secondary
    </button>
    <button @click="goToDayBook" class="btn btn-sm btn-success">Success</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToDayBook() {
      this.$router.push({ name: "no-entry" }); // el name viene del router /modules/daybook/router/index.js
    },
  },
};
</script>
