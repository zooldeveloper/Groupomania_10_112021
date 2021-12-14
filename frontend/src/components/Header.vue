<template>
    <header>
        <nav>
            <div class="logo">
              <a href=""><img src="../assets/images/icon-left-font-monochrome-gray.svg" alt="company logo"></a>
            </div>
            <div id="sidemenu">
                <button class="sidemenu__btn" v-on:click="navOpen=!navOpen" v-bind:class="{active:!navOpen}">
                    <span class="top"></span>
                    <span class="mid"></span>
                    <span class="bottom"></span>
                </button>
                <transition name="translateX">
                    <div class="navbar" v-show="!navOpen">
                        <div class="sidemenu__wrapper">
                            <ul class="sidemenu__list">
                                <li class="sidemenu__item"><router-link to="/"> <font-awesome-icon icon='home' color='#71838F' size="lg"/> </router-link></li>
                                <li class="sidemenu__item"><router-link to="/notif"> <font-awesome-icon icon='bell' color='#71838F' size="lg"/> </router-link></li>
                                <li class="sidemenu__item"><router-link to="/account"> <font-awesome-icon icon='user-alt' color='#71838F' size="lg"/> </router-link></li>
                                <li class="sidemenu__item"><button><font-awesome-icon icon='power-off'/></button></li>
                            </ul> 
                        </div>
                    </div>
                </transition>
            </div>
        </nav>
    </header>
</template>


<script>
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
        }
    }
}
</script>


<style lang="scss" scoped>
  @import '@/assets/sass/variables.scss';
  @import '@/assets/sass/mixins.scss';

    header {
        nav {
            width: 100%;
            height: 80px;
            background: linear-gradient(to bottom left, lighten($primary_color, $percentage1), lighten($secondary_color, $percentage1));
            @include flexbox(space-around);
             position: relative;
            .logo {
                img {
                    width: 220px;
                }   
            }
            #sidemenu {
                width: 35%;
                
                .navbar {
                    width: 100%;
                }

                .sidemenu {
                    &__btn {
                        display: none;
                        display: block;
                        width: 40px;
                        height: 40px;
                        background: grey;
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
                        list-style:none;
                            @include flexbox(space-between);
                    }
                    @media screen and (max-width: 768px) {
                        &__btn {
                            display: inline;
                        }
                        &__list {
                            position: absolute;
                            height: 130px;
                            top: 80px;
                            right: 30px;
                            @include flexbox(space-between);
                            flex-direction: column;
                        }
                    }
                }
            }
        }
    }
</style>


