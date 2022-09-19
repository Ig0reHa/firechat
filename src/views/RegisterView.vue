<style scoped lang="sass">
.v-input
  margin-bottom: 10px
.v-form
  max-width: 400px
  width: 100%
</style>

<template>
  <div class="d-flex align-center justify-center h-screen mx-5">
    <v-form @submit.prevent="register" v-model="formValid" lazy-validation>
      <v-text-field
        v-model.trim="name"
        :rules="nameRules"
        label="Name"
        prepend-icon="mdi-account"
        required
        clearable
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model.trim="userName"
        :rules="userNameRules"
        label="Username"
        prepend-icon="mdi-account-outline"
        required
        clearable
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model.trim="email"
        :rules="emailRules"
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
        hint="At least 8 characters"
        prepend-icon="mdi-lock"
        counter
        required
        clearable
      ></v-text-field>

      <v-text-field
        v-model="passwordConfirm"
        :rules="pswConfirmRules"
        type="password"
        label="Confirm password"
        prepend-icon="mdi-lock-reset"
        required
        clearable
        variant="outlined"
      ></v-text-field>

      <v-btn
        type="submit"
        :disabled="!formValid || loadingBtn"
        :loading="loadingBtn"
        color="success"
        class="w-100 mb-5"
        size="large"
        >Register</v-btn
      >

      <router-link :to="{ name: 'login' }" custom v-slot="{ href, navigate }">
        <div class="d-flex justify-center">
          <v-btn
            :href="href"
            @click="navigate"
            color="blue"
            variant="text"
            size="small"
            >Already have an account ?</v-btn
          >
          <v-btn
            :href="href"
            @click="navigate"
            color="blue"
            variant="outlined"
            size="small"
            >Login</v-btn
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

const register = async () => {
  errorMsg.value = null;
  loadingBtn.value = true;
  errorDialog.value = false;

  try {
    const { user: signUpUser, error: signUpError } = await supabase.auth.signUp(
      {
        email: email.value,
        password: password.value,
      }
    );

    if (signUpError) throw signUpError;

    const { error: UserInsertError } = await supabase
      .from('Users')
      .insert([
        { user_id: signUpUser?.id, userName: userName.value, name: name.value },
      ]);

    if (UserInsertError) throw UserInsertError;

    Router.push({ name: 'home' });
  } catch (error: any) {
    errorMsg.value = error.message;
    errorDialog.value = true;
  }

  loadingBtn.value = false;
};

const formValid = ref(true);

const name = ref('');
const nameRules = [(v: string) => !!v || 'Name is required'];

const userName = ref('');
const userNameRules = [
  (v: string) => !!v || 'Username is required',
  (v: string) => v.length >= 5 || 'Min 5 characters',
  (v: string) => /^[a-z0-9_-]+$/.test(v) || 'Only lowercase letters, 0-9 and _',
];

const email = ref('');
const emailRules = [
  (v: string) => !!v || 'E-mail is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
];

const showPsw = ref(false);
const password = ref('');
const pswRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => /[A-Z]/.test(v) || 'At least one uppercase letter',
  (v: string) => /[a-z]/.test(v) || 'At least one lowercase letter',
  (v: string) => /[0-9]/.test(v) || 'At least one digit',
  (v: string) =>
    /[#?!@$%^&*-]/.test(v) || 'At least one special symbol #?!@$%^&*-',
  (v: string) => v.length >= 8 || 'Min 8 characters',
];

const passwordConfirm = ref('');
const pswConfirmRules = [
  (v: string) => v === password.value || 'Passwords must match',
  (v: string) => !!v || 'Password confirmation is required',
];
</script>
