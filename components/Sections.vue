<script setup lang="ts">
import type Section from "~/types/Section";
import SectionRepository from "~/repo/SectionRepository";

const repo  = new SectionRepository();
const toast = useToast();

const {data: sections, refresh} = await repo.refList();

const modalShow = ref<boolean>(false);

const selected = ref<Section | null>(null);

function createSection() {
    selected.value = {
        id         : 0,
        title      : '',
        description: '',
        actions    : []
    };

    modalShow.value = true;
}

function editSection(section: Section) {
    selected.value  = section;
    modalShow.value = true;
}

async function saveSection(section: Section) {
    try {
        if (section.id > 0)
            await repo.update(section);
        else
            await repo.store(section);

        await refresh();

        toast.add({
            title      : 'Ура!',
            description: 'Секция успешно сохранена',
            icon       : 'i-heroicons-bolt',
            color      : 'green'
        });
    } catch {
        toast.add({
            title      : 'Упс!',
            description: 'Не удалось сохранить секцию',
            icon       : 'i-heroicons-bolt-slash',
            color      : 'red'
        });
    }
}

async function dropSection(section: any) {
    try {
        await repo.destroy(section);

        await refresh();

        toast.add({
            title      : 'Ура!',
            description: 'Секция успешно удалена',
            icon       : 'i-heroicons-bolt',
            color      : 'green'
        });
    } catch {
        toast.add({
            title      : 'Упс!',
            description: 'Не удалось удалить секцию',
            icon       : 'i-heroicons-bolt-slash',
            color      : 'red'
        });
    }
}

const columns = [{
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

                <UButton icon="i-heroicons-plus" @click="createSection">Create</UButton>
            </div>
        </template>

        <UTable :columns="columns" :rows="sections" :ui="{th: {padding: 'md:px-7'}, td: {padding: 'md:px-7'}}">
            <template #description-data="{row}">
                {{ wrap(row.description) }}
            </template>

            <template #actions-data="{row}">
                <div v-if="row.actions.length > 0" class="flex flex-col gap-2.5">
                    <div v-for="action in row.actions" class="flex items-center gap-2">
                        <div class="flex items-center gap-1.5">
                            <UIcon name="i-heroicons-sparkles" class="text-lg"/>
                            <span class="font-semibold">{{ action.name }}</span>
                        </div>

                        <div v-if="action.type === 'move-to'" class="flex items-center gap-2">
                            <span>(</span>

                            <div class="flex items-center gap-1.5">
                                <UIcon name="i-heroicons-bars-3-bottom-left" class="text-lg"/>
                                <span class="font-semibold">{{ row.title }}</span>
                            </div>

                            <UIcon name="i-heroicons-arrow-right"/>

                            <div class="flex items-center gap-1.5">
                                <UIcon name="i-heroicons-bars-3-bottom-left" class="text-lg"/>
                                <span class="font-semibold">
                                    {{ sections.find(section => section.id === action.move_to).title }}
                                </span>
                            </div>

                            <span>)</span>
                        </div>
                    </div>
                </div>

                <p v-else>Nothing</p>
            </template>

            <template #_actions-data="{row}">
                <div class="flex justify-end gap-2.5">
                    <UButton color="gray" square icon="i-heroicons-pencil" @click="editSection(row)"/>
                    <UButton color="gray" square icon="i-heroicons-trash" @click="dropSection(row)"/>
                </div>
            </template>
        </UTable>

        <ModalEditSection v-if="selected"
                          v-model="modalShow"
                          :section="selected"
                          @save="saveSection"/>
    </UCard>
</template>

<style scoped>

</style>