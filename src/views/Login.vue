<script setup>
import {auth, provider, storeUser} from '@/firebase/auth';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {useRouter} from 'vue-router';
import {ref} from 'vue';

const errorMessage = ref();

const router = useRouter();
function signInWithGoogle() {
  signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user)

        router.push('/')

        storeUser(user);

      }).catch((error) => {
        errorMessage.value = error.code + ': ' + error.message;
      });
}

</script>

<template>
  <v-alert
      v-if="errorMessage"
      type="error"
      @click="errorMessage = null"
  >
    {{ errorMessage }}
  </v-alert>
  <v-container class="d-flex justify-center align-center">
    <v-card elevation="2" class="pa-5">
      <v-card-title class="justify-center">Sign In</v-card-title>
      <v-card-text>
        <v-btn color="primary" @click="signInWithGoogle">
          <v-icon left>mdi-google</v-icon> Continue with Google
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>

</style>