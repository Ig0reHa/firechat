<style scoped lang="sass"></style>

<template>
  <div class="menu bg-grey-lighten-4">
    <v-avatar
      class="d-block text-center mx-auto mt-4"
      color="grey-darken-1"
      size="36"
    ></v-avatar>

    <v-divider class="mx-3 my-5"></v-divider>

    <v-btn
      @click="userSettingsOverlay = true"
      color="grey-darken-1"
      icon="mdi-cog"
      size="small"
      class="d-block text-center mx-auto mb-9"
    ></v-btn>

    <v-overlay
      v-model="userSettingsOverlay"
      scroll-strategy="block"
      class="align-center justify-center"
    >
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Data</th>
            <th class="text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Id</td>
            <td>{{ user?.id }}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{{ user?.name }}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td>@{{ user?.userName }}</td>
          </tr>
        </tbody>
        <v-btn
          @click="userSettingsOverlay = false"
          color="blue"
          size="small"
          class="ma-4 text-white"
          >Close</v-btn
        >
      </v-table>
    </v-overlay>

    <v-avatar
      v-for="n in 6"
      :key="n"
      class="d-block text-center mx-auto mb-9"
      color="grey-lighten-1"
      size="28"
    ></v-avatar>

    <v-btn
      @click="Store.logout"
      color="blue"
      icon="mdi-exit-to-app"
      size="small"
      class="d-block text-center mx-auto text-white"
    ></v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFireChatStore } from '../stores/FireChatStore';

const Store = useFireChatStore();

const user = computed(() => Store.getUser);
const userSettingsOverlay = ref(false);
</script>
