<script setup lang="ts">
import type Section from "~/types/Section";

const props = defineProps<{
    section: Section
}>();

const emit = defineEmits<{
    (e: 'save', section: Section): void
}>();

const state = ref<Section>(useCloneDeep(props.section));
const shown = defineModel<boolean>({required: true});

const nextActionId = useCookie<number>('action_id');

function dropAction(action: any) {
    state.value.actions = state.value.actions.filter((_action: any) => action.id !== _action.id);
}

function save() {
    emit('save', {
        ...state.value,
        actions: state.value.actions.filter(action => action.name && action.type)
    });

    shown.value = false;
}

watch(shown, value => {
    if (!value)
        return;

    state.value = useCloneDeep(props.section);
});

watch(() => {
    const last = state.value.actions.findLast(x => x);

    if (!last)
        return false;

    return last.name || last.type ? last : false;
}, (item) => {
    if (!item)
        return;

    state.value.actions.push({
        id  : nextActionId.value++,
        name: '',
        type: ''
    });
});

watch(state, () => {
    if (state.value.actions.findLast(x => !x.name && !x.type) !== undefined)
        return;

    state.value.actions.push({
        id  : nextActionId.value++,
        name: '',
        type: ''
    });
}, {immediate: true});
</script>

<template>
    <UModal v-model="shown">
        <UForm v-if="state" :state="state">
            <UCard>
                <template #header>
                    <div class="flex justify-between">
                        <h5 class="font-semibold">
                            <span v-if="state.id > 0">Edit section</span>
                            <span v-else>Create section</span>
                        </h5>

                        <UButton icon="i-heroicons-x-mark"
                                 variant="link"
                                 color="gray"
                                 :padded="false"
                                 @click="shown = false"/>
                    </div>
                </template>

                <div class="flex flex-col gap-2.5">
                    <UFormGroup label="Title">
                        <UInput icon="i-heroicons-pencil"
                                placeholder="Brilliant fox adventure"
                                v-model="state.title"/>
                    </UFormGroup>

                    <UFormGroup label="Description">
                        <UTextarea placeholder="A long time ago..."
                                   autoresize :maxrows="10"
                                   v-model="state.description"/>
                    </UFormGroup>

                    <UFormGroup label="Actions">
                        <div class="flex flex-col gap-2.5">
                            <div v-for="action in state.actions" :key="action.id">
                                <Action :action="action" @clear="dropAction(action)"/>
                            </div>
                        </div>
                    </UFormGroup>
                </div>

                <template #footer>
                    <div class="flex justify-end gap-2.5">
                        <UButton icon="i-heroicons-check" @click="save">Save</UButton>
                        <UButton icon="i-heroicons-x-mark" color="gray" @click="shown = false">
                            Cancel
                        </UButton>
                    </div>
                </template>
            </UCard>
        </UForm>
    </UModal>
</template>

<style scoped>

</style>