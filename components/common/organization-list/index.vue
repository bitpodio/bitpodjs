<template>
  <client-only>
    <OrganizationList />
  </client-only>
</template>

<script>
export default {
  components: {
    OrganizationList: () =>
      process.client ? import('./organization-list') : false,
  },
}
</script>
