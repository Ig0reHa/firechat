import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '../supabase/init';
import { useFireChatStore } from './FireChatStore';
import type { I_ChatMessage } from '@/types/Message';

export const useMainChatStore = defineStore('mainChatStore', () => {
  const store = useFireChatStore();

  const chatMessages = ref<I_ChatMessage[]>([]);

  const getChatMessages = computed(() => chatMessages.value);

  // Add a message to the chat
  const addMessage = (message: I_ChatMessage) => {
    chatMessages.value.push(message);
    console.log(chatMessages.value);
  };

  const loadChatMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('Messages')
        .select('*')
        .eq('chat_id', '8416ba9a-4f3e-4eef-93a5-b97ac99663c0');

      if (error) throw error;

      chatMessages.value = data;
    } catch (error) {
      console.warn(error);
    }
  };

  // Send a message to the chat
  const sendMessage = async (message: string) => {
    try {
      const { error } = await supabase.from('Messages').insert([
        {
          text: message,
          author_id: store.getUser?.id,
          chat_id: '8416ba9a-4f3e-4eef-93a5-b97ac99663c0',
        },
      ]);

      if (error) throw error;
    } catch (error) {
      console.warn(error);
    }
  };

  return { loadChatMessages, getChatMessages, sendMessage, addMessage };
});
