<script lang="ts">
  import { onMount } from "svelte";
  import { getGroups, getKeys, getSetting, settings } from "../lib/settings";
  import BooleanSetting from "./BooleanSetting.svelte";
  import Loader from "./Loader.svelte";
  import SettingGroup from "./SettingGroup.svelte";

  let loaded: boolean = false;
  let baseSettings: Record<string, any> = {};

  onMount(() => {
    const keys = getKeys();
    chrome.storage.sync.get(keys, (result) => {
      console.log(result);
      for (const key of keys) {
        if (result[key] !== undefined) {
          baseSettings[key] = result[key];
        } else {
          baseSettings[key] = getSetting(key)?.default ?? false;
          chrome.storage.sync.set({ [key]: baseSettings[key] });
        }
      }
      setTimeout(() => {
        loaded = true;
      }, 100);
    });
  });
</script>

<div>
  {#if loaded}
    {#each getGroups() as group}
      <SettingGroup id={group.id}>
        {#each group.settings as setting}
          {#if setting.type === "boolean"}
            <BooleanSetting {setting} {baseSettings} />
          {:else}
            <p style="color:red;">Invalid setting of type {setting.type}</p>
          {/if}
        {/each}
      </SettingGroup>
    {/each}
  {:else}
    <div class="loadingIndicator">
      <Loader />
    </div>
  {/if}
</div>

<style>
  .loadingIndicator {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
