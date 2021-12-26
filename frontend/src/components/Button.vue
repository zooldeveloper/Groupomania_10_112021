<template>
    <button :class="classes" @click="triggerFunction">{{ name }}</button>
</template>


<script>
export default {
    name: 'Button',
    props: {
        name: {
            type: String,
            required: true,
        },
        classes: {
            type: String,
            required: true,
        },
    },
    methods: {
        triggerFunction() {
            this.$emit('trigger-function')
        },
    },
}
</script>


<style lang="scss" scoped>
    @import '@/assets/sass/variables.scss';

    .btn {
        width: 80px;
        height: 30px;
        border-radius: 10px;
        border: none;
        background-color: $primary-color;
        color: $quaternary-color;
        font-weight: bold;
        cursor: pointer;
    }
    .custom-btn {
        background-color: $secondary-color;
    }
     @media screen and (max-width:768px) {
        .btn { width: 100px; }
     }
</style>