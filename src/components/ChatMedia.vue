<style scoped lang="sass"></style>

<template>
  <div class="infomain">
    <v-list>
      <v-list-item v-for="(chatUser, i) in chatUsers" :key="i" link>
        <v-list-item-title
          >{{ chatUser.name }} @{{ chatUser.userName }}</v-list-item-title
        >
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMainChatStore } from '@/stores/MainChatStore';

const MainChatStore = useMainChatStore();
const chatUsers = computed(() => MainChatStore.getChatUsers);
</script>
