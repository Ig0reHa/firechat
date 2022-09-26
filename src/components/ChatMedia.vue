<style scoped lang="sass"></style>

<template>
  <div class="infomain">
    <v-fade-transition>
      <v-list v-if="chatIsReady">
        <v-list-item v-for="(chatUser, i) in chatUsers" :key="i" link>
          <v-list-item-title
            >{{ chatUser.name }} @{{ chatUser.userName }}</v-list-item-title
          >
          <ChatUserPopup />
        </v-list-item>
      </v-list>
    </v-fade-transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMainChatStore } from '@/stores/MainChatStore';
import { useChatsListStore } from '@/stores/ChatListsStore';

import ChatUserPopup from './ChatUserPopup.vue';

const MainChatStore = useMainChatStore();
const ChatsListStore = useChatsListStore();

const chatUsers = computed(() => MainChatStore.getChatUsers);
const chatIsReady = computed(() => ChatsListStore.chatIsReady);

const chatUserPopupActive = ref(false);
</script>
