<template>
  <div class="card" ref="card">
    <div class="box">
      <div v-if="!loaded" class="load-icon">
        <svg class="load" viewBox="25 25 50 50">
          <circle cx="50" cy="50" r="20" />
        </svg>
      </div>

      <div v-else-if="loaded && Monitor != ''">
        <main class="ubox">
          <div class="utitle">
            Uptime
            <span>(Last 7 days)</span>
          </div>
          <div class="table-fluid">
            <table class="table-hoverable">
              <thead>
                <tr>
                  <th style="border-top:none">Date</th>
                  <th style="border-top:none">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="upTime in UpTimeList">
                  <td>{{ upTime.time }}</td>
                  <td>{{ upTime.status }}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>

        <main class="cbox">
          <div class="ctitle">Response Time</div>
          <ChartLine :chartData="chartData" :chartOptions="chartOptions" />
        </main>

        <main class="ebox">
          <div class="etitle">Latest events</div>
          <div class="table-fluid">
            <table class="table-hoverable">
              <thead>
                <tr>
                  <th style="border-top:none">Event</th>
                  <th style="border-top:none">Date Time</th>
                  <th style="border-top:none">Reason</th>
                  <th style="border-top:none">Duration</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="logs in Monitor.monitors[0].logs">
                  <td
                    :class="getEventTypeClass(getEventType(logs.type))"
                  >{{ getEventType(logs.type) }}</td>

                  <td>{{ getEventTime(logs.datetime) }}</td>

                  <td :class="getReasonClass(logs.reason.detail)">{{ logs.reason.detail }}</td>

                  <td>
                    {{
                    parseInt(logs.duration / 3600) +
                    " hrs, " +
                    parseInt((logs.duration / 60) % 60) +
                    " mins"
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import viewHeader from "@/views/viewHeader";
import ChartLine from "../chart/line.vue";
import { getEventType, getCustomUptimeUnixTime } from "@/plugins/MonitorLibs";

export default {
  components: {
    ChartLine
  },
  data() {
    return {
      loaded: false,
      Monitor: "",
      chartOptions: null,
      chartData: null,
      UpTimeList: null
    };
  },
  mounted() {
    this.$store.commit({
      type: "changeVHeadTitle",
      value: process.env.VUE_APP_headerTitle
    });

    this.$store.commit({
      type: "changeBackBtn",
      value: true
    });
    this.getMonitor(this);
  },

  methods: {
    getEventType,

    getEventTime: time => {
      let date = new Date(time * 1000);
      return (
        date.getFullYear() +
        "-" +
        parseInt(date.getMonth() + 1)
          .toString()
          .padStart(2, "0") +
        "-" +
        date
          .getDate()
          .toString()
          .padStart(2, "0") +
        " " +
        date
          .getHours()
          .toString()
          .padStart(2, "0") +
        ":" +
        date
          .getMinutes()
          .toString()
          .padStart(2, "0") +
        ":" +
        date
          .getSeconds()
          .toString()
          .padStart(2, "0")
      );
    },

    getEventTypeClass: status => {
      return "status status-" + status;
    },

    getReasonClass: reason => {
      return "reason reason-" + reason.replace(/\s+/g, "_");
    },

    getUpTimeList: list => {
      var listArr = [];

      let unixDate = getCustomUptimeUnixTime(7)
        .replace(/_\d+/g, "")
        .split("-");
      let upList = list.split("-");

      for (let i = 0; i < 7; ++i) {
        let listDate = new Date(unixDate[i] * 1000);

        listArr.push({
          time:
            listDate
              .getDate()
              .toString()
              .padStart(2, "0") +
            " " +
            listDate.toDateString().split(" ")[1],
          status: upList[i]
        });
      }

      return listArr;
    },
    getMonitor: (that) => {
      axios({
        method: "POST",
        url: process.env.VUE_APP_UpTimeBot_API_URL + "/v2/getMonitors",
        data: {
          api_key: process.env.VUE_APP_UpTimeBot_API_KEY,
          format: "json",
          logs: "1",
          logs_limit: "7",
          monitors: that.$route.params.id,
          response_times: "1",
          custom_uptime_ranges: getCustomUptimeUnixTime(7)
        }
      })
        .then(data => {
          let response = JSON.parse(data.request.response);
          if (response.stat != "ok") {
            throw `Uptimerobot API错误，5s后重试。错误信息: '${response.error.message}'`;
          }
          that.loaded = true;
          that.Monitor = response;
          that.$store.commit({
            type: "changeVHeadTitle",
            value: that.Monitor.monitors[0].friendly_name
          });
          that.chartData = that.Monitor.monitors[0].response_times;

          that.UpTimeList = that.getUpTimeList(
            that.Monitor.monitors[0].custom_uptime_ranges
          );
        })
        .catch(error => {
          that.$noty.error(error.toString());
          setTimeout(that.getMonitor, 5 * 1000, that);
        });
    }
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

.table-fluid table tbody .reason {
  font-weight: bold;
}

.table-fluid table tbody .status.status-Down ~ .reason {
  color: #ff5252;
}

.table-fluid table tbody .status.status-UP ~ .reason {
  font-weight: unset;
  color: #43a047;
}

.table-fluid table tbody .reason.reason-Monitor_started {
  color: #1e88e5;
}
</style>
