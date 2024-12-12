<script lang="ts">
export let title;
</script>

<div class="rounded-md bg-dark-900 px-2 py-1">
  <h2 class="mb-1 font-bold">{title}</h2>
  <slot />
</div>
