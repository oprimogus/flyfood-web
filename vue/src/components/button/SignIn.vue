<script setup lang="ts">
import zitadelAuth from '@/services/zitadelAuth';

const signIn = zitadelAuth.oidcAuth.signIn
</script>

<template>
    <button @click="signIn" class="btn btn-primary">Entre ou Cadastre-se</button>
</template>