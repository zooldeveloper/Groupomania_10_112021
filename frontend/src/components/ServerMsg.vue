<template>
      <div class="server-response">
            {{ successResMsg }}
            <font-awesome-icon
                  icon="check-circle"
                  color="white"
                  size="lg"
                  class="check-icon"
            />
      </div>
</template>

<script>

export default {
      name: 'ServerMsg',
      props: {
            successResMsg: {
                  type: String,
                  required: false,
            }
      },
}
</script>

<style lang="scss" scoped>
      @import '@/assets/sass/variables.scss';
      .server-response {
            margin: 0 auto;
            height: auto;
            width: fit-content;
            margin-top: 3rem;  
            padding: .7rem;        
            position: fixed;
            left: 0;
            right: 0;
            text-align: center;
            color: white;
            font-size: 1.1rem;
            font-weight: 500;
            border-radius: 10px;
            background-color: $success_color;
            z-index: 50;

            .check-icon {
                  margin-left: .4rem;
            }
      }

</style>