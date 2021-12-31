<template>
    <!-- Edit form -->
    <form class="userpost_form-editpost">
        <div class="form-group">
            <slot name="cancelBtn"></slot>
            <textarea :value="textareaValue" @input="textToEdit($event)"></textarea>
            <button type="submit" @click.prevent="onEditText">
                <font-awesome-icon icon='paper-plane' color='#76c8d3' size="lg"/>
            </button>
        </div>
    </form>
</template>


<script>

export default {
    name: 'EditForm',
    props: {
        textareaValue: {
            type: String,
            required: true,
        },
    },
    methods: {
        textToEdit(event) {
            this.$emit('trigger-text-to-edit', event.target.value)
        },
        onEditText() {
            this.$emit('trigger-on-edit-text')
        }
    },  
}
</script>


<style lang="scss" scoped>
     @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/mixins.scss';

    .form-group {
        @include flexbox(space-between);
        width: 90%;
        margin: 0 40px;
        overflow:visible;
        position: relative;
        textarea {
            width: 85%;
            height: 70px;
            padding: 7px;
            margin-right: 7px;
            -ms-overflow-style: none;
            scrollbar-width: none;
            border-color: $border-color;
            outline: none;
            font-family: Avenir, Arial, Helvetica, sans-serif;
            resize: vertical;
            border-radius: 15px;
            font-size: 1rem;
            &::-webkit-scrollbar {
            display: none;
            }
        }
        button {
            @include btn(none);
            padding: 10px 12px 10px 10px;
            border: 1px solid $border-color;
            border-radius: 50%;
        }
    }
</style>