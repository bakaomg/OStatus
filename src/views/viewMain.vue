<template>
  <main>
    <indexPage />
  </main>
</template>

<script>
import indexPage from "@/components/pages/index";
export default {
  components: {
    indexPage,
  },
};
</script>

<style scoped>
main {
  flex: 1;
  -ms-flex: 1;
  -webkit-box-flex: 1;
  transition: all 0.3s;
  position: relative;
}
</style>
