<style scoped lang="sass"></style>

<template>
  <div class="chatinput">
    <v-text-field
      class="chat_main_input"
      v-model="currentMessage"
      color="blue"
      label="Message"
      variant="outlined"
      hide-details="auto"
      append-inner-icon="mdi-send"
      @click:append-inner="addMessage"
      @keypress="addMessageOnEnter"
    ></v-text-field>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMainChatStore } from '@/stores/MainChatStore';

const ChatStore = useMainChatStore();

const currentMessage = ref('');

const addMessage = () => {
  if (currentMessage.value === '') return;
  ChatStore.sendMessage(currentMessage.value);
  currentMessage.value = '';

  // await nextTick();

  // scrollDown();
};

const addMessageOnEnter = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    addMessage();
  }
};
</script>
