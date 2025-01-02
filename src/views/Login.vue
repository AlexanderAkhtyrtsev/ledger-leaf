<script setup>
import {auth, provider} from '@/firebase/auth';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

function signInWithGoogle() {
  signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

</script>

<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
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