<style scoped lang="sass"></style>

<template>
  <div class="chats">
    <v-list class="pl-6" shaped>
      <v-list-item
        @click="chatsListStore.setActiveChat(chat)"
        v-for="(chat, i) in chatsList"
        :key="i"
        link
      >
        <v-list-item-title>{{ chat.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useChatsListStore } from '@/stores/ChatListsStore';

const chatsListStore = useChatsListStore();
const chatsList = computed(() => chatsListStore.getChatsList);
</script>
