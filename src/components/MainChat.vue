<style scoped lang="sass">
.message_box
  width: max-content
  max-width: 60%
  &_meta
    font-size: 14px
    float: right
    margin-left: 12px
    position: relative
    top: 10px

.chat_container
  overflow: auto
  height: 100%
  width: 100%
  padding: 20px
  &::-webkit-scrollbar
    display: none

.scroll_down_btn
  position: absolute
  right: 28px
  bottom: 16px
</style>

<template>
  <div class="chatmain">
    <v-scroll-x-transition>
      <div
        v-if="chatIsReady"
        @scroll="scrollDownCheck"
        ref="chatContainer"
        class="chat_container"
      >
        <v-card
          v-for="(message, index) in chatMessages"
          :key="index"
          color="blue"
          :class="
            message.author_id !== user?.id
              ? 'my-4 pa-3 text-white message_box'
              : 'ml-auto my-4 pa-3 text-white message_box'
          "
        >
          <div
            v-if="message.author_id !== user?.id"
            class="message_box_author mb-1"
          >
            {{ chatUsers[message.author_id].name }}
          </div>
          <div class="message_box_text">
            {{ message.text }}
            <span class="message_box_meta text-blue-lighten-4">
              {{ formatTime(message.created_at) }}
            </span>
          </div>
        </v-card>
      </div>
    </v-scroll-x-transition>

    <v-slide-y-reverse-transition>
      <v-btn
        v-if="scrollDownBtn"
        icon="mdi-chevron-down"
        color="blue-darken-3"
        class="scroll_down_btn"
        @click="scrollDown"
      ></v-btn>
    </v-slide-y-reverse-transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { useFireChatStore } from '@/stores/FireChatStore';
import { useMainChatStore } from '@/stores/MainChatStore';
import { useChatsListStore } from '@/stores/ChatListsStore';
import { supabase } from '@/supabase/init';

const Store = useFireChatStore();
const ChatStore = useMainChatStore();
const ChatsListStore = useChatsListStore();

const user = computed(() => Store.getUser);
const chatUsers = computed(() => ChatStore.getChatUsers);
const chatMessages = computed(() => ChatStore.getChatMessages);
const chatIsReady = computed(() => ChatsListStore.chatIsReady);
const activeChat = computed(() => ChatsListStore.getActiveChat);

const chatContainer = ref<HTMLDivElement | null>(null);

const scrollDownBtn = ref(false);

function updateOnNewMessageFunc() {
  return supabase
    .from(`Messages:chat_id=eq.${activeChat.value?.id}`)
    .on('INSERT', async (payload) => {
      if (payload.errors == null) {
        ChatStore.addMessage(payload.new);

        await nextTick();

        scrollDownNewMsg();
      }
    })
    .subscribe();
}

let updateOnNewMessage = updateOnNewMessageFunc();

const scrollDownCheck = () => {
  if (!chatContainer.value) return;
  if (
    chatContainer.value.scrollHeight - chatContainer.value.scrollTop <
    chatContainer.value.clientHeight * 2
  ) {
    scrollDownBtn.value = false;
  } else {
    scrollDownBtn.value = true;
  }
};

const scrollDownNewMsg = () => {
  if (!chatContainer.value) return;
  if (
    chatContainer.value.scrollHeight - chatContainer.value.scrollTop <
    chatContainer.value.clientHeight * 2
  ) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

// Scroll to bottom
const scrollDown = () => {
  if (!chatContainer.value) return;
  chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
};

const formatTime = (date: string) => {
  return new Date(date).toLocaleString('en-GB', {
    timeZone: 'UTC',
    timeStyle: 'short',
  });
};

watch(chatIsReady, async () => {
  if (chatIsReady.value !== true) return;
  await nextTick();

  await supabase.removeSubscription(updateOnNewMessage);
  updateOnNewMessage = updateOnNewMessageFunc();

  scrollDown();
  if (chatContainer.value) chatContainer.value.style.scrollBehavior = 'smooth';
});

watch(activeChat, () => {
  scrollDownBtn.value = false;
});

onMounted(() => {
  scrollDown();
  if (chatContainer.value) chatContainer.value.style.scrollBehavior = 'smooth';
});
</script>
