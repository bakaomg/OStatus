<template>
  <div class="card" ref="card">
    <div class="box">
      <div v-if="!loaded" class="load-icon">
        <svg class="load" viewBox="25 25 50 50">
          <circle cx="50" cy="50" r="20"></circle>
        </svg>
      </div>

      <div v-else-if="loaded && Monitor != ''">
        <main class="ubox">
         <div class="utitle">Uptime <span>(Last 7 days)</span></div>
        </main>

        <main class="cbox">
          <div class="ctitle">Response Time</div>
          <ChartLine :chartData="chartData" :chartOptions="chartOptions" />
        </main>

        <main class="ebox">
          <div class="etitle">Latest events</div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import viewHeader from "@/views/viewHeader";
import ChartLine from "../chart/line.vue";

export default {
  components: {
    ChartLine,
  },
  data() {
    return {
      loaded: false,
      Monitor: "",
      chartOptions: null,
      chartData: null
    };
  },
  mounted() {
    this.$store.commit({
      type: "changeVHeadTitle",
      value: process.env.VUE_APP_headerTitle,
    });
    axios({
      method: "POST",
      url: process.env.VUE_APP_UpTimeBot_API_URL + "/v2/getMonitors",
      data: {
        api_key: process.env.VUE_APP_UpTimeBot_API_KEY,
        format: "json",
        logs: "1",
        logs_limit: "7",
        monitors: this.$route.params.id,
        response_times: "1",
        timezone: "1",
        all_time_uptime_ratio: "1",
        all_time_uptime_durations: "1"
      }
    }).then((data) => {
      this.loaded = true;
      this.Monitor = JSON.parse(data.request.response);
      this.$store.commit({
        type: "changeVHeadTitle",
        value: this.Monitor.monitors[0].friendly_name,
      });
      this.chartData = this.Monitor.monitors[0].response_times;
    });
  }
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

.box .ubox {
  margin-top: 0px;
}

.box .cbox,
.box .ebox {
  margin: 20px 0;
}

.box .cbox .ctitle,
.box .ebox .etitle,
.box .ubox .utitle {
  color: rgba(0, 0, 0, 0.75);
  font-weight: bold;
  font-size: 22px;
}

.box .ubox .utitle span {
  color: rgba(0, 0, 0, 0.55);
  font-size: 16px;
}
</style>
