<template>
        <span @click="onCancel" :class="classes">
            <font-awesome-icon icon='times' color='#F08E8A' size="lg"/>
        </span>
</template>

<script>
export default {
    name: 'CancelBtn',
    props: {
        classes: {
            type: String,
        },
    },
    methods: {
        onCancel() {
            this.$emit('trigger-on-cancel')
        }
    }
}
</script>


<style lang="scss" scoped>
     .cancel-btn {
        position: absolute;
        left: 86%;
        top: -8px;
        cursor: pointer;
    }
     @media screen and (max-width: 550px) {
        .cancel-btn { left: 98% !important; }
     }
</style>