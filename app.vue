<script setup lang="ts">
const tabs = [{
    slot: 'sections',
    label: 'Sections'
}, {
    slot: 'graph',
    label: 'Graph'
}];
</script>

<template>
    <div class="p-10">
        <UTabs :items="tabs" :ui="{wrapper: 'relative space-y-5'}" :default-index="1">
            <template #sections>
                <Sections/>
            </template>

            <template #graph>
                <Graph/>
            </template>
        </UTabs>
    </div>
</template>