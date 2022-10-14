<template>
  <div class="card-content">
    <div class="info"></div>
    <div class="daySkeleton"></div>
    <div class="buttons"></div>
    <div class="submit"></div>
  </div>
</template>
<style scoped>
.card-content {
  height: 419.6px;
  /* animation: pulse-bg 1s infinite; */
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1rem;
  padding: 4rem 0.5rem;
  box-shadow: 1px 1px 2rem rgb(0 0 0 / 30%);
}

.info {
  width: 100%;
  height: 100px;
  animation: pulse-bg 1s infinite;
}

.daySkeleton {
  width: 100%;
  margin-top: 20px;
  height: 20px;
  animation: pulse-bg 1s infinite;
}
.buttons {
  width: 100%;
  margin-top: 20px;
  height: 150px;
  animation: pulse-bg 1s infinite;
}
.submit {
  width: 100%;
  margin-top: 20px;
  height: 100px;
  animation: pulse-bg 1s infinite;
}
@keyframes pulse-bg {
  0% {
    background-color: #eee;
  }
  50% {
    background-color: #eaeaea;
  }
  100% {
    background-color: #eee;
  }
}
</style>
