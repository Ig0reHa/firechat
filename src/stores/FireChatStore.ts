import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '../supabase/init';
import { useRouter } from 'vue-router';

import type { I_dbUser, I_dbUserObj, I_User } from '../types/User';

export const useFireChatStore = defineStore('fireChatStore', () => {
  const router = useRouter();

  const dbUser = ref<I_dbUser | null>(null);
  const user = ref<I_User | null>(null);

  const getDbUser = computed(() => dbUser.value);
  const getUser = computed(() => user.value);

  function setDbUser(payload: I_dbUserObj | null) {
    if (payload) {
      dbUser.value = payload.user;
    } else {
      dbUser.value = null;
    }
  }

  async function loadUser() {
    try {
      const { data: User, error } = await supabase
        .from('Users')
        .select('*')
        .eq('user_id', dbUser.value?.id);

      if (error) throw error;

      user.value = User[0] as I_User;
    } catch (error) {
      console.warn(error);
    }
  }

  async function logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      router.push({ name: 'login' });
    } catch (error) {
      console.warn(error);
    }
  }

  return { getDbUser, getUser, setDbUser, loadUser, logout };
});
