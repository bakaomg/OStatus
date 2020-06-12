<template>
  <div class="card">
    <div class="box">
     <i class="warning-icon"></i>
     <div class="title">Not Found</div>
    </div>
  </div>
</template>

<style scoped>
.box {
  padding: 70px 0px 0px;
}

.warning-icon {
  top: 50px;
  left: calc(50% - 9px);
  right: 0;
  color: rgb(224,26,79);
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 20px;
  height: 20px;
  border: 2px solid;
  border-radius: 40px;
  transform: scale(5);
}

.warning-icon::after,
.warning-icon::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  border-radius: 3px;
  width: 2px;
  background: currentColor;
  left: 7px;
}

.warning-icon::after {
  top: 2px;
  height: 8px;
}

.warning-icon::before {
  height: 2px;
  bottom: 2px;
}

.title {
    margin-top: 110px;
    font-size: 36px;
    text-align: center;
}
</style>
