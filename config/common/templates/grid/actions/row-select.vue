<template>
  <div>
    <EditItem :content="content" :item="item" />
    <DeleteItem :content="content" :item="item" />
  </div>
</template>
<script>
export default {
  props: ['content', 'item'],
}
</script>
