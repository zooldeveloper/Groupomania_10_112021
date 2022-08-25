<template>
    <div class="delete" v-if="showConfirmDelete">
        <p>Delete the {{ titles }}</p>
        <div class="delete__cancel-confirm">
             <Button @trigger-function="cancelDelete" name="Cancel" classes="btn"/>
             <Button @trigger-function="confirmDelete" name="Confirm" classes="btn custom-btn"/>
        </div>
    </div>
</template>


<script>
import Button from './Button.vue'

export default {
    name: 'DeleteConfirm',
    components: {
        Button,
    },
    props: {
        showConfirmDelete:{
            type: Boolean,
        },
        titles: {
            type: String,
            required: true
        } 
    },
    methods: {
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

    .delete {
        position: absolute;
        width: 230px;
        height: 100px !important;
        z-index: 2;
        top: -10px;
        left: -190px;
        background-color: $quaternary-color;
        box-shadow: 0px 5px 15px $border-color;
        text-align: center;
        p {
            font-size: 1.2rem !important;
            margin-bottom: 10px;
        }
        &__cancel-confirm {
            @include flexbox(space-around);
            color: #000;
        }
    }
        
</style>