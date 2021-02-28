<template>
  <MainLayout><Home></Home></MainLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Home from '@/views/Home.vue';
import MainLayout from '@/layout/MainLayout.vue';

export default defineComponent({
  name: 'HomeLayout',
  components: { Home, MainLayout },
});
</script>
