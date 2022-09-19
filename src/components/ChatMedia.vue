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
import { ref } from 'vue';
import { supabase } from '@/supabase/init';

import type { I_User } from '../types/User';

const chatUsers = ref<I_User[]>([]);

const getChatUsers = async () => {
  try {
    const { data, error } = await supabase
      .from<I_User>('Users')
      .select('*')
      .contains('chats', ['8416ba9a-4f3e-4eef-93a5-b97ac99663c0']);
    if (error) throw error;

    chatUsers.value = data;
  } catch (error) {
    console.warn(error);
  }
};

getChatUsers();
</script>
