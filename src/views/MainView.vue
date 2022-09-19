<style scoped lang="sass">
.main_grid
  width: 100vw
  height: 100vh
  display: grid
  grid-template-columns: 55px 300px auto 255px
  grid-template-rows: 72px auto 72px
  grid-template-areas: "menu chats_search chathead infohead" "menu chats chatmain infomain" "menu chats chatinput infomain"

.menu
  grid-area: menu

.chats
  grid-area: chats

.chats_search
  grid-area: chats_search

.chathead
  grid-area: chathead

.chatmain
  grid-area: chatmain
  width: calc(100vw - 610px)
  height: calc(100vh - 144px)
  position: relative

.chatinput
  grid-area: chatinput
  display: flex
  justify-content: center
  align-items: center
  padding: 0 20px

.infohead
  grid-area: infohead

.infomain
  grid-area: infomain

@media screen and (max-width: 768px)
  .main_grid
    grid-template-areas: "chathead" "chatmain" "chatinput"
    grid-template-columns: 1fr
  .menu, .chats, .chats_search, .infohead, .infomain
    display: none

  .chatmain
    width: 100vw
</style>

<template>
  <div class="main_grid">
    <LeftMenu />

    <ChatsSearch />
    <ChatsList />

    <ChatHeader />
    <MainChat />
    <MainChatInput />

    <ChatInfo />
    <ChatMedia />
  </div>
</template>

<script setup lang="ts">
import MainChat from '@/components/MainChat.vue';
import MainChatInput from '@/components/MainChatInput.vue';
import ChatMedia from '@/components/ChatMedia.vue';
import LeftMenu from '@/components/LeftMenu.vue';
import ChatsSearch from '@/components/ChatsSearch.vue';
import ChatsList from '@/components/ChatsList.vue';
import ChatHeader from '@/components/ChatHeader.vue';
import ChatInfo from '@/components/ChatInfo.vue';
</script>
