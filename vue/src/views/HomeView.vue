<script setup lang="ts">
import zitadelAuth from '@/services/zitadelAuth'
const user = zitadelAuth.oidcAuth.userProfile
const claims = () => {
      if (user) {
        return Object.keys(user).map(key => ({
          key,
          value: user[key]
        }))
      }
      return []
    }
</script>

<template>
  <p>HELLO</p>
  <div class="userinfo">
      <div>
        <h1>
          This is a login-protected page
        </h1>
        <h2>
          The following profile data is extended by information from ZITADELs userinfo endpoint.
        </h2>
        <ul class="claims">
          <li
            v-for="c in claims()"
            :key="c.key"
          >
            <strong>{{ c.key }}</strong>: {{ c.value }}
          </li>
        </ul>
      </div>
    </div>
</template>
