<template>
    <div class="userpost__ellipsis">
        <span><font-awesome-icon icon='ellipsis-h' color='#71838F' size="lg"/></span>
        <div class="userpost__edit-delete">
            <div class="userpost__edit">
                <small>Edit</small>
                <span><font-awesome-icon icon='edit' color='#76c8d3' size="lx"/></span>
            </div>
            <div class="userpost__delete">
                <small>Delete</small>
                <span><font-awesome-icon icon='trash-alt' color='#F08E8A' size="lx"/></span>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'EditDelete',
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
                cursor: pointer;
                position: relative;
                height: 50%;
                &:hover {
                    small {
                        display: block;
                        font-size: 0.7rem;
                        font-weight: bold;
                        position: absolute;
                        top: 3px;
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