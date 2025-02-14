<script setup>
import '@/firebase/auth';
import {computed} from 'vue';
import {useStore} from 'vuex';
import {logout} from '@/firebase/auth';
import {useRouter} from 'vue-router';
import { useI18n } from 'vue-i18n';

const {t} = useI18n()

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.getters.isAuthenticated);


const items = computed(() => [
  { title: t('Home'), icon: 'mdi-home', to: '/', requiresAuth: false},
  { title: t('Transactions'), icon: 'mdi-cash', to: '/transactions', requiresAuth: true},
  { title: t('Reports'), icon: 'mdi-chart-bar', to: '/reports', requiresAuth: true},
  { title: t('Settings'), icon: 'mdi-cog', to: '/settings', requiresAuth: true},
  { title: t('Login'), icon: 'mdi-login', to: '/login', requiresAuth: false, show: !isAuthenticated.value},
  { title: t('About'), icon: 'mdi-information-variant', to: '/about'},
  {
    title: t('Logout'),
    icon: 'mdi-logout',
    to: 'logout',
    requiresAuth: true,
    click: () => logout().then(() => router.push('/login')),
  },
].filter(item => (!item.requiresAuth || isAuthenticated.value) && item.show !== false));

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
                   :key="item.to"
                   :prepend-icon="item.icon"
                   :title="item.title"
                   :value="item.title"
                   @click="item.click ? item.click() : $router.push(item.to)"
      ></v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>

<style scoped>

</style>