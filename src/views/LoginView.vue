<style scoped lang="sass">
.v-input
  margin-bottom: 10px
.v-form
  max-width: 400px
  width: 100%
</style>

<template>
  <div class="d-flex align-center justify-center h-screen mx-5">
    <v-form @submit.prevent="login" ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model.trim="email"
        :rules="emailRules"
        type="email"
        label="E-mail"
        prepend-icon="mdi-email"
        required
        clearable
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model.trim="password"
        :type="showPsw ? 'text' : 'password'"
        :append-icon="showPsw ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPsw = !showPsw"
        :rules="pswRules"
        variant="outlined"
        label="Password"
        prepend-icon="mdi-lock"
        counter
        required
        clearable
      ></v-text-field>

      <v-btn
        type="submit"
        :disabled="!valid || loadingBtn"
        :loading="loadingBtn"
        color="success"
        class="w-100 mb-5"
        size="large"
        >Login</v-btn
      >

      <router-link
        :to="{ name: 'register' }"
        custom
        v-slot="{ href, navigate }"
      >
        <div class="d-flex justify-center">
          <v-btn
            :href="href"
            @click="navigate"
            color="blue"
            variant="text"
            size="small"
            >Don't have an account ?</v-btn
          >
          <v-btn
            :href="href"
            @click="navigate"
            color="blue"
            variant="outlined"
            size="small"
            >Register</v-btn
          ><slot />
        </div>
      </router-link>

      <v-snackbar v-model="errorDialog" color="error">
        {{ errorMsg }}

        <template #actions>
          <v-btn variant="text" @click="errorDialog = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '../supabase/init';
import { useRouter } from 'vue-router';

const Router = useRouter();
const errorMsg = ref<string | null>(null);
const loadingBtn = ref(false);
const errorDialog = ref(false);

const login = async () => {
  errorMsg.value = null;
  loadingBtn.value = true;
  errorDialog.value = false;

  try {
    const { error } = await supabase.auth.signIn({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;

    Router.push({ name: 'home' });
  } catch (error: any) {
    errorMsg.value = error.message;
    errorDialog.value = true;
  }

  loadingBtn.value = false;
};

const valid = ref(true);

const email = ref('');
const emailRules = [
  (v: string) => !!v || 'E-mail is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
];

const showPsw = ref(false);
const password = ref('');
const pswRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 8 || 'Min 8 characters',
];
</script>
