<script setup lang="ts">
import SectionRepository from "~/repo/SectionRepository";
import type Section from "~/types/Section";
import type Action from "~/types/Action";

const repo = new SectionRepository();

const {data: sections} = await repo.refList();

let actions: Action[] = [];
sections.value.forEach((section: Section) => actions.push(
    ...section.actions
              .filter((action: Action) => action.type === 'move-to')
              .map((action: Action) => ({...action, section: section}))
));

const nodes = ref(sections.value);
const links = ref(actions.map((action: Action|any) => ({
    source: action.section.id,
    target: action.move_to,
    value : 5
})));
</script>

<template>
    <UCard>
        <template #header>
            <h5 class="text-lg font-semibold">Graph</h5>
        </template>

        <div>
            <D3Force :nodes="nodes" :links="links" :radius="20" :distance="200"/>
        </div>
    </UCard>
</template>

<style scoped>

</style>