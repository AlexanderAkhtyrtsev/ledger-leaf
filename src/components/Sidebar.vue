<script setup>
import  "@/firebase/auth";
import {computed, ref, watch} from 'vue';
import {useStore} from 'vuex';

const store = useStore();

const items = computed( () => [
  { title: "Home", icon: "mdi-home", to: "/" },
  { title: "Login", icon: "mdi-login", to: "/login", show: () => !store.state.user },
  { title: "Logout", icon: "mdi-logout", to: "/logout", show: () => store.state.user },
  { title: "About", icon: "mdi-information-variant", to: "/about" },
].filter( item => item.show === undefined || item.show() ));

const model = defineModel();

const user = computed(() => store.state.user?.providerData?.[0])

</script>

<template>

  <!-- Sidebar -->
  <v-navigation-drawer
      v-model="model"
  >
    <v-list>
      <v-list-item v-if="user"
                   :prepend-avatar="user.photoURL"
                   :subtitle="user.email"
                   :title="user.displayName"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item class="router-link"
                   v-for="item in items"
                   :key="items.to"
                   :prepend-icon="item.icon"
                   :title="item.title"
                   :value="item.title"
                   @click="$router.push(item.to)"
      ></v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>

<style scoped>

</style>