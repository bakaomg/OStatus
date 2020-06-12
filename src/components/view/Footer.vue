<template>
  <main>&copy; {{ copyYear }} {{ copyTitle }} | Powered by <a href="https://github.com/ohmyga233/OStatus/" target="_blank">OStatus</a> & <a href="https://uptimerobot.com/" target="_blank">UptimeRobot</a></main>
</template>

<script>
export default {
  data() {
    return {
      copyYear: new Date().getFullYear(),
      copyTitle: process.env.VUE_APP_siteTitle,
    };
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

@media (max-width: 600px) {
  main {
    padding: 20px 0px;
    border-top: solid 1px rgba(66, 66, 66, 0.3);
  }
}
</style>
