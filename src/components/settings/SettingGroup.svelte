<script lang="ts">
import { onMount } from "svelte";
import Card from "../Card.svelte";

export let id;

let title = "";

onMount(() => {
  title = chrome.i18n.getMessage(`groups_${id}_title`);
});
</script>

<Card title={title}>
  <div class="flex flex-col space-y-1.5">
    <slot />
  </div>
</Card>
