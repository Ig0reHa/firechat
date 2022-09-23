import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '../supabase/init';
import { useFireChatStore } from './FireChatStore';
import { useMainChatStore } from './MainChatStore';

import type { I_Chat } from '@/types/Chat';

export const useChatsListStore = defineStore('chatsListStore', () => {
  const MainChatStore = useMainChatStore();

  const chatIsReady = ref<boolean>(true);

  const chatsList = ref<I_Chat[]>([]);
  const activeChat = ref<I_Chat | null>(null);

  const getChatsList = computed(() => chatsList.value);
  const getActiveChat = computed(() => activeChat.value);

  const setActiveChat = async (chat: I_Chat) => {
    chatIsReady.value = false;

    activeChat.value = <I_Chat>chatsList.value.find((c) => c.id === chat.id);

    await MainChatStore.loadChatUsers();
    await MainChatStore.loadChatMessages();

    chatIsReady.value = true;
  };

  const loadChatsList = async () => {
    const store = useFireChatStore();

    if (store.getUser) {
      try {
        const { data, error } = await supabase
          .from('Chats')
          .select('*')
          .in('id', store.getUser?.chats);

        if (error) throw error;

        chatsList.value = data;
        activeChat.value = data[0];
      } catch (error) {
        console.warn(error);
      }
    }
  };

  return {
    loadChatsList,
    getChatsList,
    getActiveChat,
    setActiveChat,
    chatIsReady,
  };
});
