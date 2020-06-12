<template>
  <div class="chart-box">
    <canvas ref="myChart" height="194"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  data() {
      return {
          labels: [],
          datasets: []
      }
  },
  props: [
      'chartData',
      'chartOptions'
  ],
  methods: {
      getTime: (time) => {
        var date = new Date(time*1000);
        return date.getHours().toString().padStart(2, "0")+":"+date.getMinutes().toString().padStart(2, "0")
      }
  },
  mounted() {
    this.$props['chartData'].forEach(data => {
     this.labels.push(this.getTime(data.datetime))
     this.datasets.push(data.value)
    })

    new Chart(this.$refs['myChart'], {
      type: "line",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "MilliSeconds",
            data: this.datasets,
            borderColor: "rgba(236,64,122,1)",
            backgroundColor: "rgba(236,64,122,0.15)",
            borderWidth: 3,
            lineTension: 0,
            pointRadius: 0,
            pointHitRadius: 10
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 6
              },
              gridLines: {
                display: false,
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "rgb(214, 216, 219)",
                fontStyle: "bold",
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: false
        }
      }
    });
  },
};
</script>

<style scoped>
.chart-box {
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-top: 15px;
}
</style>
