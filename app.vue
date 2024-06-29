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
        <UNotifications/>

        <UTabs :items="tabs" :ui="{wrapper: 'relative space-y-5'}" :default-index="0">
            <template #sections>
                <Sections/>
            </template>

            <template #graph>
                <Graph/>
            </template>
        </UTabs>
    </div>
</template>

<style>
::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: transparent;
}

::-webkit-scrollbar-thumb {
    background: #818181;
    border-radius: 10rem;
}
</style>