<template>
    <header>
        <nav>
            <div class="logo">
              <a href=""><img src="../assets/images/icon-left-font-monochrome-gray.svg" alt="company logo"></a>
            </div>
            <div id="sidemenu">
                <button class="sidemenu__btn" v-on:click="navOpen=!navOpen" v-bind:class="{active:!navOpen}" aria-label="barre latérale">
                    <span class="top"></span>
                    <span class="mid"></span>
                    <span class="bottom"></span>
                </button>
                <transition name="translateX">
                    <div class="navbar" v-show="!navOpen">
                        <div class="sidemenu__wrapper">
                            <ul class="sidemenu__list">
                                <li class="sidemenu__item"><router-link to="/" title="page d'accueil"> <font-awesome-icon icon='home' color='#71838F' size="lg"/> </router-link></li>
                                <li class="sidemenu__item"><router-link to="/notif" title="notifications"> <font-awesome-icon icon='bell' color='#71838F' size="lg"/> </router-link></li>
                                <li class="sidemenu__item"><router-link to="/account" title="compte d'utilisateur"> <font-awesome-icon icon='user-alt' color='#71838F' size="lg"/> </router-link></li>
                                <li class="sidemenu__item"><button @click="logOut" title="button de déconnexion"><font-awesome-icon icon='power-off'/></button></li>
                            </ul> 
                        </div>
                    </div>
                </transition>
            </div>
        </nav>
    </header>
</template>


<script>
import { VueCookieNext } from 'vue-cookie-next'

export default {
    name: 'Header',
    data() {
        return {
            navOpen: true,
            width: ''
        }
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    unmounted() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.width = window.innerWidth;
            this.width > 768 ? this.navOpen = false : this.navOpen = true
        },
        logOut() {
            localStorage.clear()
            VueCookieNext.removeCookie('token')
            this.$router.push({ name: 'Entry' })
        }
    }
}
</script>


<style lang="scss" scoped>
  @import '@/assets/sass/variables.scss';
  @import '@/assets/sass/mixins.scss';

    header {
        margin-top: 0;
        position:  relative;
        z-index: 1;
        nav {
            width: 100%;
            height: 80px;
            padding-left: 20px;
            position: fixed;
            top: 0;
            background: linear-gradient(to bottom left, lighten($primary_color, 40%), lighten($secondary_color, $percentage1));
            @include flexbox(space-around);
            .logo {
                img {
                    width: 200px;
                }   
            }
            #sidemenu {
                width: 35%;
                
                .navbar {
                    width: 100%;
                }
               .sidemenu {
                    &__btn {
                        display: block;
                        width: 40px;
                        height: 40px;
                        background: $tertiary-color;
                        border: none;
                        position: absolute;
                        right: 25px;
                        top: 20px;
                        z-index: 100;
                        appearance: none;
                        cursor: pointer;
                        outline: none;
                        display: none;

                        span {
                            display: block;
                            width: 20px;
                            height: 2px;
                            margin: auto;
                            background: white;
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            transition: all .4s ease;

                            &.top {
                                transform: translateY(-8px);
                            }

                            &.bottom {
                                transform: translateY(8px);
                            }
                        }
                        &.active{
                            .top {
                                transform: rotate(-45deg);
                            }
                            .mid{
                                transform: translateX(-20px) rotate(360deg);
                                opacity: 0;
                            }
                            .bottom {
                                transform: rotate(45deg);
                            }
                        }
                    }
                    &__wrapper {
                        width: inherit;
                    }
                    &__list {
                        padding-top: 50px;
                        list-style:none;
                        padding: 0;
                        margin: 0;
                        @include flexbox(space-between);
                    }
                    &__item {
                        cursor: pointer;
                        transition: .4s ease;  
                        button {
                            cursor: pointer;
                        }       
                    }
                    @media screen and (max-width: 768px) {
                        &__btn {
                            display: inline;
                        }
                        &__list {
                            position: absolute;
                            height: 140px;
                            top: 90px;
                            right: 20px;
                            @include flexbox(space-between);
                            flex-direction: column;
                            background: linear-gradient(to bottom left, lighten($primary_color, $percentage1), lighten($secondary_color, $percentage1));
                            padding: 15px 10px;
                        }
                    }
                }
            }
            .translateX-enter {
                transform:translateX(110px);
                opacity: 0;
            }
            .translateX-enter-active,.translateX-leave-active {
                transform-origin: top right 0;
                transition:.3s ease;
            }
            .translateX-leave-to {
                transform: translateX(110px);
                opacity: 0;
            }
        }
    }
</style>


