<script lang="ts">
  import { getSetting, Setting } from "../lib/settings";
  import BaseSetting from "./BaseSetting.svelte";

  export let setting: Setting;
  export let baseSettings: Record<string, any>;

  let value = baseSettings[setting.id] ?? getSetting(setting.id)?.default ?? false;

  function toggleValue() {
    value = !value;
    baseSettings[setting.id] = value;
    chrome.storage.sync.set({ [setting.id]: value });
  }
</script>

<BaseSetting {setting}>
  <button class="checkbox" data-active={value} on:click={toggleValue}>
    <div class="checkbox--inner"></div>
  </button>
</BaseSetting>

<style>
  .checkbox {
    appearance: none;
    border: none;
    cursor: pointer;
    padding: 0;
    padding-block: 0;
    padding-inline: 0;
    --checkbox-outer-width: 1.5rem;
    --checkbox-outer-height: 0.8rem;
    --checkbox-inner-size: 0.6rem;
    width: var(--checkbox-outer-width);
    height: var(--checkbox-outer-height);

    border-radius: 999px;
    position: relative;
    transition: background-color 0.2s;
  }
  .checkbox[data-active="false"] {
    background-color: #ff5050;
  }
  .checkbox[data-active="true"] {
    background-color: #86d368;
  }
  .checkbox--inner {
    width: var(--checkbox-inner-size);
    height: var(--checkbox-inner-size);
    top: calc(calc(var(--checkbox-outer-height) - var(--checkbox-inner-size)) / 2);
    background-color: rgb(255, 255, 255);
    border-radius: 999px;
    transition: left 0.2s;
    position: absolute;
  }
  .checkbox[data-active="false"] .checkbox--inner {
    left: calc(calc(var(--checkbox-outer-height) - var(--checkbox-inner-size)) / 2);
  }
  .checkbox[data-active="true"] .checkbox--inner {
    left: calc(
      var(--checkbox-outer-width) - var(--checkbox-inner-size) -
        calc(var(--checkbox-outer-height) - var(--checkbox-inner-size)) / 2
    );
  }
</style>
