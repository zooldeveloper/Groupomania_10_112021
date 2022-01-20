<template>
    <div class="userpost__ellipsis">
        <span><font-awesome-icon icon='ellipsis-h' color='#71838F' size="lg"/></span>
        <div class="userpost__edit-delete">
            <div class="userpost__edit" v-if="isAdmin">
                <small>Modifier</small>
                <span @click="editPost"><font-awesome-icon icon='edit' color='#76c8d3' size="lx"/></span>
            </div>
            <div class="userpost__wrapper">
                <small>Supprimer</small>
                <span @click="deletePost"><font-awesome-icon icon='trash-alt' color='#F08E8A' size="lx"/></span>
            </div>
        </div>
        <DeleteConfirm 
            :showConfirmDelete="showConfirmDelete"
            @trigger-cancel-delete="cancelDelete"
            @trigger-confirm-delete="confirmDelete"
            :titles="titles"
        />
    </div>
</template>


<script>
import DeleteConfirm from './DeleteConfirm.vue'

export default {
    name: 'EditDelete',
    components: {
        DeleteConfirm,
    },
    props: {
        showConfirmDelete:{
            type: Boolean,
        },
        isAdmin: {
            type: Boolean,
            required: true
        },
        titles: {
            type: String,
            required: true
        } 
    },
    methods: {
        editPost() {
            this.$emit('trigger-edit-text')
        },
        deletePost() {
            this.$emit('trigger-delete-text')
        },
        cancelDelete() {
             this.$emit('trigger-cancel-delete')
         },
         confirmDelete() {
             this.$emit('trigger-confirm-delete')
         },
    },
}
</script>


<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/mixins.scss';

    .userpost {
        &__ellipsis {
            @include flexbox;
            flex-direction: column;
            position: relative;
            &:hover .userpost__edit-delete {
                display: block !important;
            }
            span {
                cursor: pointer;
            }
        } 
        &__userpost__wrapper {
            position: relative;
        }
        &__edit-delete {
            display: none;
            margin-bottom: 10px;
            position: absolute;
            width: 50px;
            height: 70px;
            top: 20px;
            right: -16px;
            z-index: 1;
            text-align: center;
            box-shadow: 0px 5px 15px $border-color;
            background-color: #fff;
            div {
                position: relative;
                height: 50%;
                padding-top: 5px;
                &:hover {
                    small {
                        display: block;
                        font-size: 0.7rem;
                        font-weight: bold;
                        position: absolute;
                        top: 9px;
                        right: 40px;
                        padding: 1px 6px;
                        color: #fff;
                        background-color: lighten($tertiary-color, $percentage3);
                    }
                }
                small {
                    display: none;
                }
            }
        }
    }
</style>