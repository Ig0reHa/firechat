import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '../supabase/init';
import { useFireChatStore } from './FireChatStore';
import { useChatsListStore } from './ChatListsStore';

import type { I_ChatMessage, I_ChatUsers } from '@/types/Message';

export const useMainChatStore = defineStore('mainChatStore', () => {
  const store = useFireChatStore();
  const chatsListStore = useChatsListStore();

  const chatMessages = ref<I_ChatMessage[]>([]);
  const chatUsers = ref<I_ChatUsers>({});

  const getChatMessages = computed(() => chatMessages.value);
  const getChatUsers = computed(() => chatUsers.value);

  // Add a message to the chat
  const addMessage = (message: I_ChatMessage) => {
    chatMessages.value.push(message);
  };

  const loadChatMessages = async () => {
    try {
      const { data, error } = await supabase
        .from<I_ChatMessage>('Messages')
        .select('*')
        .eq('chat_id', <string>chatsListStore.getActiveChat?.id)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      chatMessages.value = data;
    } catch (error) {
      console.warn(error);
    }
  };

  const loadChatUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('Users')
        .select('*')
        .contains('chats', [chatsListStore.getActiveChat?.id]);

      if (error) throw error;

      const { data: avatars } = await supabase.storage.getBucket('avatars');
      console.log(avatars);

      chatUsers.value = Object.assign(
        {},
        ...data.map(({ id, name, userName, user_id, chats, created_at }) => ({
          [id]: { id, name, userName, user_id, chats, created_at },
        }))
      );
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
          chat_id: chatsListStore.getActiveChat?.id,
        },
      ]);

      if (error) throw error;
    } catch (error) {
      console.warn(error);
    }
  };

  return {
    loadChatMessages,
    loadChatUsers,
    getChatMessages,
    getChatUsers,
    sendMessage,
    addMessage,
  };
});
