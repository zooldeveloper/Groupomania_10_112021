<template>
        <span @click="onCancel">
            <font-awesome-icon icon='times' color='#F08E8A' size="lg"/>
        </span>
</template>

<script>
export default {
    name: 'CancelBtn',
    methods: {
        onCancel() {
            this.$emit('trigger-on-cancel')
        }
    }
}
</script>