<script lang="ts">
import MainWindow from "../components/MainWindow.svelte";
</script>

<template>
  <MainWindow />
</template>

<style>
:global(:root) {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    "Open Sans",
    "Helvetica Neue",
    sans-serif;
}

:global(body, h1, h2, h3, h4, h5, h6, p) {
  margin: 0;
}
</style>
