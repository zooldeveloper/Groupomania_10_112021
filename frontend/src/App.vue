<template>
    <div id="app">
      <router-view/>
    </div>
</template>



<script>
export default {
  name: 'App',
  component: {
   
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  main {
    max-width: 800px;
    margin: 0 auto;
  }
</style>
