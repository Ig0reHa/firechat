<style scoped lang="sass"></style>

<template>
  <v-overlay
    v-model="chatUserPopup"
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
          <td>{{}}</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>{{}}</td>
        </tr>
        <tr>
          <td>Username</td>
          <td>@{{}}</td>
        </tr>
      </tbody>
      <v-btn
        @click="chatUserPopup = false"
        color="blue"
        size="small"
        class="ma-4 text-white"
        >Close</v-btn
      >
    </v-table>
  </v-overlay>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useChatsListStore } from '@/stores/ChatListsStore';

const props = defineProps<{
  foo: string;
  bar?: number;
}>();

const chatsListStore = useChatsListStore();
const chatsList = computed(() => chatsListStore.getChatsList);

const chatUserPopup = ref(false);
</script>
