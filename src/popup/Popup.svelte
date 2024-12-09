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

    background-color: #1d1d1d;
    color: #e0e0e0;
    font-size: 150%;
  }

  :global(body) {
    width: 400px;
    height: 600px;
  }

  :global(body, h1, h2, h3, h4, h5, h6, p) {
    margin: 0;
  }
</style>
