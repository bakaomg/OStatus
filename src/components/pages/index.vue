<template>
  <div class="card">
    <div class="box">
      <div v-if="!loaded" class="load-icon">
        <svg class="load" viewBox="25 25 50 50">
          <circle cx="50" cy="50" r="20"></circle>
        </svg>
      </div>

      <div v-else-if="loaded && MonitorsList != ''">
        <div class="title">Monitors</div>

        <div v-for="monitors in MonitorsList.monitors">
          <router-link
            :to="'/Monitor/'+monitors.id.toString()"
            v-html="monitors.friendly_name"
          >
            {{ monitors.friendly_name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "indexPage",
  data() {
    return {
      loaded: false,
      MonitorsList: "",
    };
  },

  mounted() {
    axios({
      method: "POST",
      url: process.env.VUE_APP_UpTimeBot_API_URL + "/v2/getMonitors",
      data: {
        api_key: process.env.VUE_APP_UpTimeBot_API_KEY,
        format: "json",
        logs: "1",
        logs_limit: "7",
      },
    }).then((data) => {
      this.loaded = true;
      this.MonitorsList = JSON.parse(data.request.response);
      this.$store.commit({
        type: "changeVHeadTitle",
        value: process.env.VUE_APP_headerTitle
      });
    });
  },
};
</script>

<style scoped>
.box {
  padding: 15px;
}

.box .title {
  font-size: 26px;
  font-weight: bold;
}
</style>
