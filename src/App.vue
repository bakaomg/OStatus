<template>
  <div id="OStatus">
    <viewHeader />
    <router-view />
    <viewFooter />
  </div>
</template>

<script>
import viewHeader from "@/views/viewHeader";
import viewFooter from "@/views/viewFooter";

export default {
  name: "App",
  components: {
    viewHeader,
    viewFooter,
  },
};
</script>

<style>
* {
  -webkit-tap-highlight-color: transparent;
}

body {
  margin: 0;
  padding: 0;
  font-family: Roboto, Ubuntu;
}

body {
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  display: -ms-flexbox;
  display: -webkit-box;
  flex-direction: column;
  -ms-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
}

#OStatus {
  width: 100%;
  min-height: 100vh;
}

.card {
  min-height: 320px;
  width: 1400px;
  margin: auto;
  margin-top: -160px;
  border-radius: 5px;
  position: relative;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 5px 0 rgba(66, 66, 66, 0.3);
}

@media (max-width: 1450px) {
  .card {
    width: 90%;
  }
}

@media (max-width: 930px) {
  .card {
    width: 95%;
  }
}

@media (max-width: 760px) {
  .card {
    width: 98%;
  }
}

@media (max-width: 600px) {
  .card {
    width: 100%;
    margin-top: 0;
    box-shadow: none;
    border-radius: 0;
  }
}

.load-icon {
  left: 0;
  right: 0;
  top: calc(50% - 28px);
  position: absolute;
  margin: auto;
}

.load-icon .load {
  width: 4em;
  margin: auto;
  display: block;
  transform-origin: center;
  animation: rotate 2s linear infinite;
}

.load-icon .load circle {
  fill: none;
  stroke: #fc2f70;
  stroke-width: 3;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dashoffset: -125px;
  }
}

html::-webkit-scrollbar-track-piece {
  background: rgba(0, 0, 0, 0);
}

html::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

html::-webkit-scrollbar-thumb {
  height: 40px;
  background-color: rgba(165, 165, 165, 1);
}

html::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}
</style>
