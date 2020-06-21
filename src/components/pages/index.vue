<template>
  <div class="card">
    <div class="box">
      <div v-if="!loaded" class="load-icon">
        <svg class="load" viewBox="25 25 50 50">
          <circle cx="50" cy="50" r="20"></circle>
        </svg>
      </div>

      <div v-else-if="loaded && MonitorsList != ''">
        <div class="table-fluid">
          <table class="table-hoverable">
            <thead>
              <tr>
                <th style="border-top:none">Status</th>
                <th style="border-top:none">Name</th>
                <th style="border-top:none">Type</th>
                <th style="border-top:none">Last 7 days</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="monitors in MonitorsList.monitors">
                <td>OK</td>

                <td class="name">
                  <router-link
                    :to="'/Monitor/' + monitors.id.toString()"
                    v-html="monitors.friendly_name"
                    >{{ monitors.friendly_name }}</router-link
                  >
                </td>

                <td>{{ getMonitorType(monitors.type) }}</td>

                <td>{{ getAverage(monitors.custom_uptime_ranges) }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getMonitorType, getAverage, getCustomUptimeUnixTime } from "@/plugins/MonitorLibs";

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
        custom_uptime_ranges: getCustomUptimeUnixTime(7)
      },
    }).then((data) => {
      this.loaded = true;
      this.MonitorsList = JSON.parse(data.request.response);
      this.$store.commit({
        type: "changeVHeadTitle",
        value: process.env.VUE_APP_headerTitle,
      });
    });
  },

  methods: {
    getMonitorType,
    getCustomUptimeUnixTime,
    getAverage
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

.table-fluid table tbody .name a {
  color: rgba(0, 0, 0, 0.65);
  font-weight: bold;
  font-size: 18px;
  text-decoration: none;
  transition: all 0.25s;
  position: relative;
}

.table-fluid table tbody .name a:hover {
  color: rgba(236, 64, 122, 0.65);
}

.table-fluid table tbody .name a:before {
  left: 0;
  right: 0;
  bottom: 0;
  content: '';
  height: 2px;
  position: absolute;
  transform: scaleX(0);
  background-color: rgba(236, 64, 122, 0.55);
  transform-origin: bottom right;
  transition: transform 0.5s ease;
}

.table-fluid table tbody .name a:hover::before {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>

<style>
.table-fluid {
  width: 100%;
  overflow-x: auto;
  border-top: none;
  border-bottom: none;
  -webkit-overflow-scrolling: touch;
}

.table-fluid table {
  margin: 0;
  width: 100%;
  border: none;
  box-shadow: none;
  border-spacing: 0;
  position: relative;
  transition: all 0.3s;
  background-color: #fff;
  -webkit-box-shadow: none;
  border-collapse: separate;
}

.table-fluid table td,
.table-fluid table th {
  text-align: left;
  position: relative;
  padding: 12px 28px;
  box-sizing: border-box;
  vertical-align: middle;
  -webkit-box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.table-fluid table td:last-child,
.table-fluid table th:last-child {
  padding-right: 24px;
}

.table-fluid table td:first-child,
.table-fluid table th:first-child {
  padding-right: 0;
  padding-left: 24px;
}

.table-fluid table td:nth-child(2),
.table-fluid table th:nth-child(2) {
  padding-left: 24px;
}

.table-fluid table th {
  font-size: 13px;
  overflow: hidden;
  font-weight: 700;
  line-height: 32px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgba(0, 0, 0, 0.54);
}

.table-fluid table td {
  font-size: 14px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.87);
}

.table-hoverable tbody tr {
  position: relative;
  transition: background-color 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-transition: background-color 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.table-hoverable tbody tr:hover {
  background-color: rgba(66, 66, 66, 0.05);
}
</style>
