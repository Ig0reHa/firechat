<style scoped lang="sass"></style>

<template>
  <div
    div
    class="chathead bg-grey-lighten-4 d-flex justify-center align-center"
  >
    {{ activeChat?.title }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useChatsListStore } from '@/stores/ChatListsStore';

const ChatsListStore = useChatsListStore();

const activeChat = computed(() => ChatsListStore.getActiveChat);
</script>
