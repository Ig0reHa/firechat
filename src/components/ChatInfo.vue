<style scoped lang="sass"></style>

<template>
  <div
    class="infohead bg-grey-lighten-5 d-md-flex d-none justify-center align-center"
  >
    Chat Users: {{ Object.keys(chatUsers).length }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMainChatStore } from '@/stores/MainChatStore';
const MainChatStore = useMainChatStore();

const chatUsers = computed(() => MainChatStore.getChatUsers);
</script>
