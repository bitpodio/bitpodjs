<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm12 md12>
       <Grid :content="content[$route.params.contentName]" :viewName="$route.params.viewName" />
    </v-flex>
  </v-layout>
</template>

<script>
import Grid from '~/components/common/grid';
import content from '~/config/apps/event/content';
export default {
    data(){
        return {
           content:content
        }
    },
    components: {
        Grid
    },
    created(){
         
    }
}
</script>
