<template>
    <div class="container">
        <Header/>
        <main>
            <section id="makepost">
                <form>
                    <div> 
                        <img src="../assets/images/banner1.jpeg" alt="user image">
                        <textarea name="" id="" placeholder="What would you like to share?"></textarea>
                    </div>
                    <div class="makepost__fileinput">
                          <label for="myImage">Uplaod a file
                                <font-awesome-icon icon='image' color='#76c8d3' size="lg"/>
                                <input type="file" id="myImage">
                          </label>
                          <button type="submit">Post it  <font-awesome-icon icon='paper-plane' color='#76c8d3' size="lg"/></button>
                    </div>
                </form>
            </section>
        </main>
  </div>
    
</template>

<script>
import Header from '../components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header,
  },
  // mounted() {
  //   const token = document.cookie;
  //   if (!token) {
  //     this.$router.push({ name: 'Entry' })
  //   }
  // }
}
</script>


<style lang="scss" scoped>
    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/mixins.scss';

  main {
    max-width: 600px;
    margin: 0 auto;
    #makepost {
      margin-top: 30px;
      form {
        @include flexbox(space-between);
        flex-direction: column;
        padding: 20px 0;
        border-radius: 7px;
        box-shadow: 0px 5px 15px $border-color;
        font-size: 1.2rem;
        div {
          width: 90%;
          @include flexbox(space-between);
        }
        .makepost__fileinput {
           margin-top: 30px; 
           padding-top: 20px;
           border-top: 1px solid $border-color;
           @include flexbox(space-around);
        }
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
        textarea {
          resize: vertical;
          width: 85%;
          min-height: 60px;
          margin-left: 15px;
          border-color: $border-color;
          padding: 7px;
          outline: none;
        }
        label {
          cursor: pointer;
        }
        input {
          display: none;
          visibility: hidden;
        }
        button {
          border: none;
          cursor: pointer;
          background-color: transparent;
          font-size: 1.2rem;
          font-weight: 200;
          font-family: sans-serif;
        }
      }
    }
  }
  
</style>