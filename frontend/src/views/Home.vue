<template>
    <header>
        <nav>
            <div class="logo">
              <a href=""><img src="../assets/images/icon-left-font-monochrome-gray.svg" alt="company logo"></a>
            </div>
            <div class="navbar">
                <ul>
                    <li><router-link to="/"> <font-awesome-icon icon='home' color='#71838F' size="lg"/> </router-link></li>
                    <li><router-link to="/notif"> <font-awesome-icon icon='bell' color='#71838F' size="lg"/> </router-link></li>
                    <li><router-link to="/account"> <font-awesome-icon icon='user-alt' color='#71838F' size="lg"/> </router-link></li>
                    <li><button><font-awesome-icon icon='power-off'/> </button></li>
                </ul> 
            </div>
        </nav>
    </header>
  
</template>

<script>

export default {
  name: 'Home',
  mounted() {
    const token = document.cookie;
    if (!token) {
      this.$router.push({ name: 'Entry' })
    }
  }
}
</script>


<style lang="scss" scoped>
   @import '@/assets/sass/variables.scss';
  @import '@/assets/sass/mixins.scss';

  nav {
    width: 100%;
    height: 80px;
    background: linear-gradient(to bottom left, lighten($primary_color, $percentage1), lighten($secondary_color, $percentage1));
    @include flexbox(space-around);
    .navbar {
      width: 30%;
      ul {
         @include flexbox(space-around);
         list-style: none;
      }
    }
  }
  img{
    width: 250px;
  }
</style>