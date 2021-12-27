<template>
    <div class="imagepreview">
        <CancelBtn @trigger-on-cancel="removeImagePreview"/>
        <img :src="imagePreview" alt="image preview">
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
        }
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
</style>