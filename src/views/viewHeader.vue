<template>
  <header>
    <vHeader />
  </header>
</template>

<script>
import vHeader from "@/components/view/Header";

export default {
  components: {
    vHeader,
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 360px;
}

@media (max-width: 600px) {
  header {
    height: 220px;
  }
}
</style>
