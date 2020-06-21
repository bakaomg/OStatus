<template>
  <main>
    &copy; {{ copyYear }} {{ copyTitle }} | Powered by
    <a href="https://github.com/ohmyga233/OStatus/" target="_blank">OStatus</a>
    & <a href="https://uptimerobot.com/" target="_blank">UptimeRobot</a>

    <div id="fixed-btns">
      <router-link to="/"><button class="back" :class="backBtnHide(getBackBtn)"><i class="arrow-left"></i></button></router-link>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      copyYear: new Date().getFullYear(),
      copyTitle: process.env.VUE_APP_siteTitle,
      backBtn: false,
    };
  },
  methods: {
    backBtnHide: (status) => {
      return !status ? "hiden" : "";
    },
  },
  computed: {
    getBackBtn: (r) => {
      return r.$store.state.backBtn;
    },
  },
};
</script>

<style scoped>
main {
  color: #424242;
  font-size: 14px;
  text-align: center;
  padding: 30px 0px 20px;
  font-weight: bold;
}

main a {
  color: #939090;
  text-decoration: none;
  transition: all 0.3s;
}

main a:hover {
  color: #424242;
  text-decoration: solid;
}

main #fixed-btns {
  right: 20px;
  bottom: 20px;
  position: fixed;
}

main #fixed-btns button {
  width: 56px;
  min-width: 56px;
  height: 56px;
  padding: 0 !important;
  margin: auto;
  overflow: hidden;
  font-size: 24px;
  line-height: normal !important;
  border-radius: 50%;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
  border: none;
  outline: 0;
  user-select: none;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: all 0.15s;
}

main #fixed-btns button.back {
  color: #fff;
  background-color: rgba(236, 64, 122, 1);
}

main #fixed-btns button i {
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  margin-top: 16px;
  margin-left: 16px;
  line-height: 24px;
  color: inherit;
}

main #fixed-btns button.hiden {
  transform: scale(0) translateZ(0);
}

@media (max-width: 600px) {
  main {
    padding: 20px 0px;
    border-top: solid 1px rgba(66, 66, 66, 0.3);
  }
}
</style>

<style scoped>
.arrow-left {
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 24px;
  height: 24px;
}

.arrow-left::after,
.arrow-left::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  left: 3px;
}

.arrow-left::after {
  width: 8px;
  height: 8px;
  border-bottom: 2px solid;
  border-left: 2px solid;
  transform: rotate(45deg);
  bottom: 7px;
}

.arrow-left::before {
  width: 16px;
  height: 2px;
  bottom: 10px;
  background: currentColor;
}
</style>
