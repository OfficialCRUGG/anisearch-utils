<script lang="ts">
  import { onMount } from "svelte";

  export let id;

  let title = "";

  onMount(() => {
    title = chrome.i18n.getMessage(`groups_${id}_title`);
  });
</script>

<div class="settingGroup">
  <div class="settingGroup--header">
    <h2 class="settingGroup--header--title">{title}</h2>
  </div>
  <div class="settingGroup--content">
    <slot />
  </div>
</div>

<style>
  .settingGroup--header {
    background-color: #1d1d1d;
    width: 100%;
    padding: 0.25rem 0.5rem;
  }
  .settingGroup--header--title {
    font-size: 1rem;
  }
</style>
