<template>
  <main>
    <div id="headerBG" :style="mainStyle"></div>
    <div class="siteTitle" v-if="!getHeaderTitle">{{ siteTitle }}</div>
    <div class="siteTitle" v-else>{{ getHeaderTitle }}</div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      mainStyle: {
        backgroundImage: "url(" + require("@/assets/bg.jpg") + ")",
      },
      siteTitle: process.env.VUE_APP_headerTitle,
    };
  },
  method: {
    changeName: (name) => {
      this.siteTitle = name;
    }
  },
  computed: {
    getHeaderTitle: (r) => {
      return r.$store.state.vHeadTitle;
    }
  }
};
</script>

<style scoped>
main {
  width: 100%;
  height: 100%;
  position: relative;
}

main #headerBG {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  z-index: -2;
  position: relative;
  transition: all 0.3s;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.55);
}

main #headerBG::after {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  content: "";
  position: absolute;
  background-color: rgba(66, 66, 66, 0.55);
}

main .siteTitle {
  top: 80px;
  width: 100%;
  color: #fff;
  font-size: 50px;
  text-shadow: 0 0 8px rgba(66, 66, 66, 0.89);
  position: absolute;
  text-align: center;
}
</style>
