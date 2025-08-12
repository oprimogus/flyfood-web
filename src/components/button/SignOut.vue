<script setup lang="ts">
import zitadelAuth from '@/services/zitadelAuth'

const signOut = () => zitadelAuth.oidcAuth.signOut()
</script>

<template>
  <button type="submit" @click="signOut" class="btn btn-primary w-full">Sair</button>
</template>
