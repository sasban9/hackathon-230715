<template>
    <BCard>
    {{productName}}
</BCard>
</template>
<script setup>
defineProps({
    productName: {
    type: String,
    required: true
  },
});
</script>