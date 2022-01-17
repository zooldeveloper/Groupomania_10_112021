<template>
    <div class="imagepreview" :class="customClasses">
        <CancelBtn @trigger-on-cancel="removeImagePreview"/>
        <img :src="imagePreview" alt="aperçu de l'image">
    </div>
</template>


<script>
import CancelBtn from './CancelBtn.vue'

export default {
    name: 'ImagePreview',
    components: {
        CancelBtn,
    },
    props: {
        imagePreview: {
            type: String,
            required: true
        },
        customClasses: {
           type: String
        },
    },
    methods: {
        removeImagePreview() {
            this.$emit('trigger-on-cancel')
        }
    }
}
</script>


<style lang="scss" scoped>
    @import '@/assets/sass/mixins.scss';

     .imagepreview {
        @include flexbox;
        width: 50%;
        height: 200px;
        margin-top: 20px;
        position: relative;
        img {
            width: 100%;
            height: 100%;
            border-radius: 0px;
            object-fit: cover;
        }
        span {
            position: absolute;
            top: -10px;
            right: -10px;
            cursor: pointer;
        }
    }
    .imagepreview-user-profile {
        margin-top: 0 !important;
        width: 180px;
    }
</style>