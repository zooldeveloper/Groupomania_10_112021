<template>
    <Header/>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header,
  },
  mounted() {
    const token = document.cookie;
    if (!token) {
      this.$router.push({ name: 'Entry' })
    }
  }
}
</script>


<style lang="scss" scoped>
  
</style>