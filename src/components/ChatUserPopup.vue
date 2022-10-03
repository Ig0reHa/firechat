<style scoped lang="sass"></style>

<template>
  <v-overlay
    v-model="popupIsActive"
    activator="parent"
    scroll-strategy="block"
    class="align-center justify-center"
  >
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Data</th>
          <th class="text-left">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Id</td>
          <td>{{ user?.id }}</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>{{ user?.name }}</td>
        </tr>
        <tr>
          <td>Username</td>
          <td>@{{ user?.userName }}</td>
        </tr>
      </tbody>
    </v-table>
    <div class="d-flex justify-space-between bg-white">
      <v-btn
        @click="popupIsActive = !popupIsActive"
        color="blue"
        size="small"
        class="ma-4 text-white"
        >Close</v-btn
      >
      <v-btn color="primary" size="small" class="ma-4 text-white"
        >Send message</v-btn
      >
    </div>
  </v-overlay>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { I_User } from '@/types/User';

defineProps<{
  user: I_User | null;
}>();

const popupIsActive = ref(false);
</script>
