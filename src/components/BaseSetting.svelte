<script lang="ts">
  import { onMount } from "svelte";
  import { Setting } from "../lib/settings";
  import IconQuestion from "./icons/IconQuestion.svelte";

  export let setting: Setting;

  let showDescription = false;

  let name = "";
  let description = "";

  onMount(() => {
    name = chrome.i18n.getMessage(`setting_${setting.id}_name`);
    description = chrome.i18n.getMessage(`setting_${setting.id}_description`);
  });
</script>

<div class="setting">
  <div class="setting--text">
    <div class="setting--title">
      <h3>{name}</h3>
      {#if description && description.length > 0}
        <button class="setting--descriptionButton" on:click={() => (showDescription = !showDescription)}>
          <IconQuestion />
        </button>
      {/if}
    </div>
    {#if showDescription}
      <p>{description}</p>
    {/if}
  </div>
  <div class="setting--value">
    <slot />
  </div>
</div>

<style>
  .setting {
    padding: 0.25rem 0.5rem;
  }
  .setting--title {
    display: flex;
    align-items: center;
  }
  .setting--descriptionButton {
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 0.5rem;
    color: inherit;
    appearance: none;
    padding: 0;
    padding-block: 0;
    padding-inline: 0;
    font-size: inherit;
    padding-top: 0.2em;
  }
  .setting {
    display: flex;
    justify-content: space-between;
  }
  .setting > * {
    max-width: 50%;
  }
</style>
