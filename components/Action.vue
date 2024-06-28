<script setup lang="ts">
const props = defineProps<{
    action: any
}>();

const emit = defineEmits<{
    (e: 'clear'): void
}>();

const actionTypes = [{
    id   : '',
    label: 'Select type'
}, {
    id   : 'move-to',
    label: 'Move to'
}];

watch(() => !props.action.name && !props.action.type, (isEmpty: boolean) => {
    if (isEmpty)
        emit('clear');
});
</script>

<template>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        <UInput icon="i-heroicons-cursor-arrow-rays-16-solid"
                placeholder="Name"
                class="sm:col-span-2"
                v-model="action.name"/>

        <USelectMenu icon="i-heroicons-sparkles"
                     placeholder="Select type"
                     :options="actionTypes"
                     value-attribute="id"
                     v-model="action.type"/>
    </div>
</template>

<style scoped>

</style>