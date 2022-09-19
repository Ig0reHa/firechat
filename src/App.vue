<template>
  <v-app id="inspire" v-if="appReady">
    <router-view />
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFireChatStore } from './stores/FireChatStore';
import { useMainChatStore } from './stores/MainChatStore';
import { useChatsListStore } from './stores/ChatListsStore';
import { supabase } from './supabase/init';

const Store = useFireChatStore();
const MainChatStore = useMainChatStore();
const ChatsListStore = useChatsListStore();
const appReady = ref<boolean>(false);

// Check to see if user is already logged in
const user = supabase.auth.user();

// If user does not exist, need to make app ready
if (!user) {
  appReady.value = true;
}

// Runs when there is a auth state change
// if user is logged in, this will fire
supabase.auth.onAuthStateChange(async (authEvent, session) => {
  Store.setDbUser(session);

  if (supabase.auth.user()) {
    await Store.loadUser();
    await MainChatStore.loadChatMessages();
    await ChatsListStore.loadChatsList();
  }

  appReady.value = true;
});
</script>
