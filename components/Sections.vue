<script setup lang="ts">
const sections = ref<any[]>([]);

const createModalShow = ref<boolean>(false);

const createSectionForm = ref();

const nextSectionId = ref<number>(1);
const nextActionId  = ref<number>(1);

const createSectionState = ref({
    id         : nextSectionId.value++,
    title      : '',
    description: '',
    actions    : [{
        id  : nextActionId.value++,
        name: '',
        type: ''
    }]
});

watch(() => {
    const last = createSectionState.value.actions.findLast(x => x)

    if (!last)
        return false;

    return last.name || last.type ? last : false;
}, (item) => {
    if (!item)
        return;

    createSectionState.value.actions.push({
        id  : nextActionId.value++,
        name: '',
        type: ''
    });
});

function save() {
    createSectionForm.value.clear();

    sections.value.push({
        ...createSectionState.value,
        actions: createSectionState.value.actions.filter((action: any) => action.name && action.type)
    });

    createSectionState.value = {
        id         : nextSectionId.value++,
        title      : '',
        description: '',
        actions    : [{
            id  : nextActionId.value++,
            name: '',
            type: ''
        }]
    };
    createModalShow.value    = false;
}

function dropAction(action: any) {
    createSectionState.value.actions =
        createSectionState.value.actions.filter((_action: any) => action.id !== _action.id);
}

function dropSection(section: any) {
    sections.value = sections.value.filter((_section: any) => section.id !== _section.id);
}

const sectionColumns = [{
    key  : 'id',
    label: '#'
}, {
    key  : 'title',
    label: 'Title'
}, {
    key  : 'description',
    label: 'Description'
}, {
    key  : 'actions',
    label: 'Actions'
}, {
    key: '_actions'
}];
</script>

<template>
    <UCard :ui="{body: {padding: ''}}">
        <template #header>
            <h5 class="text-lg font-semibold">Sections</h5>

            <div class="mt-2.5 flex gap-2.5">
                <UInput icon="i-heroicons-magnifying-glass-16-solid" placeholder="Search..." class="flex-grow"/>

                <UButton icon="i-heroicons-plus" @click="createModalShow = true">Create</UButton>
            </div>
        </template>

        <UTable :columns="sectionColumns" :rows="sections" :ui="{th: {padding: 'md:px-7'}, td: {padding: 'md:px-7'}}">
            <template #actions-data="{row}">
                <div class="flex flex-col gap-2.5">
                    <div v-for="action in row.actions" class="flex items-center gap-1.5">
                        <UIcon name="i-heroicons-sparkles" class="text-lg"/>
                        <span class="font-semibold">{{ action.name }}</span>
                    </div>
                </div>
            </template>

            <template #_actions-data="{row}">
                <div class="flex justify-end gap-2.5">
                    <UButton color="gray" square icon="i-heroicons-pencil"/>
                    <UButton color="gray" square icon="i-heroicons-trash" @click="dropSection(row)"/>
                </div>
            </template>
        </UTable>

        <UModal v-model="createModalShow">
            <UForm ref="createSectionForm" :state="createSectionState">
                <UCard>
                    <template #header>
                        <div class="flex justify-between">
                            <h5 class="font-semibold">Create section</h5>

                            <UButton icon="i-heroicons-x-mark"
                                     variant="link"
                                     color="gray"
                                     :padded="false"
                                     @click="createModalShow = false"/>
                        </div>
                    </template>

                    <div class="flex flex-col gap-2.5">
                        <UFormGroup label="Title">
                            <UInput icon="i-heroicons-pencil"
                                    placeholder="Brilliant fox adventure"
                                    v-model="createSectionState.title"/>
                        </UFormGroup>

                        <UFormGroup label="Description">
                            <UTextarea placeholder="A long time ago..."
                                       autoresize :maxrows="10"
                                       v-model="createSectionState.description"/>
                        </UFormGroup>

                        <UFormGroup label="Actions">
                            <div class="flex flex-col gap-2.5">
                                <div v-for="action in createSectionState.actions" :key="action.id">
                                    <Action :action="action" @clear="dropAction(action)"/>
                                </div>
                            </div>
                        </UFormGroup>
                    </div>

                    <template #footer>
                        <div class="flex justify-end gap-2.5">
                            <UButton icon="i-heroicons-check" @click="save">Save</UButton>
                            <UButton icon="i-heroicons-x-mark" color="gray" @click="createModalShow = false">
                                Cancel
                            </UButton>
                        </div>
                    </template>
                </UCard>
            </UForm>
        </UModal>
    </UCard>
</template>

<style scoped>

</style>