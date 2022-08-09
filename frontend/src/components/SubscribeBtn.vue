<template>
      <button>
            <font-awesome-icon :icon="icon" :color="color" :size="size" @click="onSubscribe"/>
      </button>
</template>

<script>
      export default {
            name: 'SubscribeBtn',
            props: {
                  icon: {
                        type: Boolean,
                        required: true,
                  },
                  color: {
                        type: String,
                        required: true,
                   },
                   size: {
                        type: String,
                        required: true,
                  },
            },
            methods: {
                  onSubscribe() {
                        this.$emit('trigger-on-subscribe')
                  }
            }
                   
      }
</script>

<style lang="scss" scoped>
      button {
            border: none;
            background: none;
            cursor: pointer;
      }

</style>