<template>
    <header>
        <div class="spinner"></div>
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
                                <li class="sidemenu__item"><router-link to="/" title="Home"> <font-awesome-icon icon='home' :color='secondaryColor' size="lg"/> </router-link></li>
                                <li class="sidemenu__item"><router-link to="/users" title="Users list"> <font-awesome-icon icon='users' :color='secondaryColor' size="lg"/> </router-link></li>
                                <li class="sidemenu__item">
                                    <router-link to="/notification" title="Notifications"> <font-awesome-icon @click="hideNotifNum" icon='bell' :color='secondaryColor' size="lg"/> 
                                        <small class="notif-number" v-if="this.$store.state.notifNum !== 0">{{ this.$store.state.notifNum }}</small>
                                    </router-link></li>
                                <li class="sidemenu__item"><router-link to="/account" title="User Account"> <img :src="this.imageUrl" alt="Image of the actual user"> </router-link></li>
                                <li class="sidemenu__item"><button @click="logOut" title="Sign out button"><font-awesome-icon icon='power-off'/></button></li>
                            </ul>
                        </div>
                    </div>
                </transition>
            </div>
        </nav>
    </header>
</template>


<script>
import { VueCookieNext } from 'vue-cookie-next';
import { mapState } from 'vuex';

export default {
    name: 'Header',
    propos: {
        profileImage: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            navOpen: true,
            width: '',
            notifNum: 0,
        }
    },
    created() {
        this.$store.dispatch('getOneUser');
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    mounted() {
        setTimeout(() => {
            this.$store.getters.setUserImgae;
            this.$store.getters.showUserNotifNum;
        }, 200);
    },
    unmounted() {
        window.removeEventListener('resize', this.handleResize);
    },
    computed: {
        ...mapState(['imageUrl', 'user', 'notifications', 'subscriptionNotifications', 'secondaryColor']),
    },
    methods: {
        handleResize() {
            this.width = window.innerWidth;
            this.width > 768 ? this.navOpen = false : this.navOpen = true
        },
        hideNotifNum() {
            localStorage.setItem('isUserCheckedNotifications', JSON.stringify(true));
        },
        logOut() {
            document.querySelector('.spinner').classList.add('show-spinner');
            let keysToRemove = ['user', 'onLoadPage', 'isUserCheckedNotifications'];
            keysToRemove.forEach(key => {
                localStorage.removeItem(key)
            });
            VueCookieNext.removeCookie('token')
            setTimeout(()=>{
                document.querySelector('.spinner').classList.remove('show-spinner')
                this.$router.push({ name: 'Entry' })
            }, 2000)
        }
    }
}
</script>


<style lang="scss" scoped>
  @import '@/assets/sass/variables.scss';
  @import '@/assets/sass/mixins.scss';

    .show-spinner {
            width: 100vw;
            height: 60vh;
            position: absolute;
            @include spinner(80vh !important, fixed !important);
        }

    header {
        margin-top: 0;
        position:  relative;
        z-index: 20;

        nav {
            width: 100%;
            height: 80px;
            padding-left: 20px;
            position: fixed;
            top: 0;
            background:lighten($primary_color, 0%);
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
                        background: $secondary-color;
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

                        img {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            border: 2px solid $secondary_color;
                        }
                    }
                    &__item {
                        cursor: pointer;
                        transition: .4s ease;  
                        position: relative;
                        .notif-number {
                            width: 17px;
                            height: 17px;
                            font-size: .8rem;
                            font-weight: bold;
                            color: white;
                            background-color:  darken($secondary-color, 30%);
                            border-radius: 50%;
                            position: absolute;
                            left: 11px;
                            top: -7px;

                        }
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
                            height: 170px;
                            top: 90px;
                            right: 20px;
                            @include flexbox(space-between);
                            flex-direction: column;
                            background: $primary_color;
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


