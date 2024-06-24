<script setup lang="ts">
const modalShow = ref<boolean>(false);
</script>

<template>
  <div class="container mx-auto max-w-4xl py-10">
      <UCard>
          <template #header>
              <h3 class="text-xl">Test interface</h3>
          </template>

          <UFormGroup label="Place your congratulations">
              <UInput placeholder="Wow, it's work!"/>
          </UFormGroup>

          <UButton class="mt-5" @click="modalShow = true">Yay!</UButton>
      </UCard>

      <UModal v-model="modalShow">
          <UCard>
              Wooow! Hooray!

              <template #footer>
                  <UButton @click="modalShow = false">OK</UButton>
              </template>
          </UCard>
      </UModal>
  </div>
</template>