<script lang="ts" setup>
import { definePageMeta, useAuth } from "#imports";
import { ref } from "vue";

const { signIn, token, data, status, lastRefreshedAt } = useAuth();

const username = ref("clement@gmail.com");
const password = ref("clement");

definePageMeta({
  layout: "login",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});
</script>

<template>
  <div>
    <h1>Login Page</h1>
    <pre>Status: {{ status }}</pre>
    <pre>Data: {{ data || "no session data present, are you logged in?" }}</pre>
    <pre>Last refreshed at: {{ lastRefreshedAt || "no refresh happened" }}</pre>
    <pre>JWT token: {{ token || "no token present, are you logged in?" }}</pre>
    <form
      @submit.prevent="
        signIn({ username, password }, { callbackUrl: '/', external: false })
      "
    >
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">sign in</button>
    </form>
  </div>
</template>
