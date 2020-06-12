<template>
  <footer>
    <vFooter />
  </footer>
</template>

<script>
import vFooter from "@/components/view/Footer";

export default {
  components: {
    vFooter,
  },
};
</script>

<style scoped>
footer {
  flex: 0;
  -ms-flex: 0;
  -webkit-box-flex: 0;
  width: 100%;
  clear: both;
}
</style>
