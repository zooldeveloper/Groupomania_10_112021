<template>
  <div class="about">
      <Header/>
      <main>
          <h1>User's profile</h1>
          <div class="wrapper">
              <section id="userinfo">
                  <div class="userinfo__user userinfo__user-border">
                      <h2>User name</h2>
                      <img src="../assets/images/banner1.jpeg" alt="user image"/>
                      <p>E-email: mack@gmail.com</p>
                  </div>
                  <div class="userinfo__user">
                      <h2>Bio :</h2>
                      <p>Lorem ipsum dolor sit amet. Id enim rerum et consectetur eaque non iusto officia qui quia ut praesentium harum qui nulla minima !</p>
                      <form class="userinfo__bioform">
                          <textarea class="userinfo__biotextarea" name="" id="" placeholder="Your bio!"></textarea>
                          <button class="userinfo__btn" type="submit"><font-awesome-icon icon='paper-plane' color='#76c8d3' size="lg"/></button>
                      </form>
                  </div>
              </section>
              <section></section>
          </div>
      </main>
  </div>
</template>


<script>
import Header from '../components/Header.vue'
export default {
  name: 'Home',
  components: {
    Header
  },
}
</script>

<style lang="scss" scoped>
  @import '@/assets/sass/variables.scss';
  @import '@/assets/sass/mixins.scss';

  .about {
    margin-top: 130px;
    
    .wrapper {
      padding: 30px 45px;
      box-shadow: 0px 5px 15px $border-color;
      // user info section
      #userinfo {
          @include flexbox(center, start);
          border-top: 1px solid $border-color;
          border-bottom: 1px solid $border-color;
          text-align: left;
        .userinfo {   
          &__user {
            @include flexbox(space-between);
            flex-direction: column;
            width: 45%;
            img {
              width: 180px;
              height: 200px;
              object-fit: cover;
              text-align: left
            }
          }
          &__bioform {
            position: relative;
            margin-top: 10px;
            width: 100%;
          }
          &__biotextarea {
            width: 100%;
            height: 50px;
            padding: 10px 20px 0 10px;
            border-radius: 25px;
            resize: none;
            box-sizing: border-box;
          }
          &__btn {
            @include btn;
            right: 15px;
            top: 12px;
          }
          @media  screen and (max-width:768px) {
            &__user { width: 75%; }
            &__user-border { border-bottom: 1px solid $border-color; }
            &__bioform { margin-bottom: 20px; }
          }
        }
      }
      @media  screen and (max-width:768px) {
        #userinfo { flex-direction: column; align-items: center; }
      }  
    }
  }
      
</style>