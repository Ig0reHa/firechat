<style scoped lang="sass"></style>

<template>
  <div class="chats_search">
    <v-sheet
      color="grey-lighten-5"
      width="100%"
      height="100%"
      class="d-flex justify-center align-center"
    >
      Hello, {{ user?.name }}
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFireChatStore } from '../stores/FireChatStore';

const user = computed(() => Store.getUser);

const Store = useFireChatStore();
</script>
