import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '../supabase/init';
import { useFireChatStore } from './FireChatStore';

import type { I_Chat } from '@/types/Chat';

export const useChatsListStore = defineStore('chatsListStore', () => {
  const chatsList = ref<I_Chat[]>([]);

  const getChatsList = computed(() => chatsList.value);

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
      } catch (error) {
        console.warn(error);
      }
    }
  };

  return { loadChatsList, getChatsList };
});
