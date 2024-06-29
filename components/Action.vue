<script setup lang="ts">
import SectionRepository from "~/repo/SectionRepository";
import type Action from "~/types/Action";

const props = defineProps<{
    action: Action
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

const sectionRepo = new SectionRepository();
</script>

<template>
    <div class="flex gap-2.5">
        <div class="font-semibold">ID: {{ action.id }}</div>

        <div class="flex flex-col gap-2.5 grow">
            <UInput icon="i-heroicons-cursor-arrow-rays-16-solid"
                    placeholder="Name"
                    class="sm:col-span-2"
                    v-model="action.name"/>

            <div class="grid grid-cols-2 gap-2.5">
                <USelectMenu icon="i-heroicons-sparkles"
                             placeholder="Select type"
                             :options="actionTypes"
                             value-attribute="id"
                             v-model="action.type"/>

                <USelectMenu v-if="action.type === 'move-to'"
                             placeholder="Select section"
                             :options="sectionRepo.list()"
                             option-attribute="title"
                             value-attribute="id"
                             v-model="action.move_to"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>