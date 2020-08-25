<template>
  <div>
    <nuxt-link> {{ value }}</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context'],
}
</script>
