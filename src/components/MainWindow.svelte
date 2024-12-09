<script lang="ts">
  import { onMount } from "svelte";
  import { getGroups, getKeys, getSetting, settings } from "../lib/settings";
  import BooleanSetting from "./BooleanSetting.svelte";
  import Loader from "./Loader.svelte";
  import SettingGroup from "./SettingGroup.svelte";

  let loaded: boolean = false;
  let baseSettings: Record<string, any> = {};

  function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 Bytes";

    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = bytes / Math.pow(1024, i);

    return `${i === 0 ? value.toFixed(0) : value.toFixed(2)} ${sizes[i]}`;
  }

  let syncBytes = "...";
  let localBytes = "...";

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
      chrome.storage.sync.getBytesInUse((bytes) => {
        syncBytes = formatBytes(bytes);
      });
      chrome.storage.local.getBytesInUse((bytes) => {
        localBytes = formatBytes(bytes);
      });
      setTimeout(() => {
        loaded = true;
      }, 100);
    });
  });
</script>

<div>
  {#if loaded}
    <div class="header">
      <h1>{chrome.i18n.getMessage("meta_name")}</h1>
    </div>
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
    <div class="general">
      <p>{chrome.i18n.getMessage("meta_name")}</p>
      <p>{chrome.i18n.getMessage("general_disclaimer")}</p>
      <p>© 2024 CRUGG<br />{chrome.i18n.getMessage("general_copyright")}</p>
      <p>{chrome.i18n.getMessage("general_storage_sync")}: {syncBytes}</p>
      <p>{chrome.i18n.getMessage("general_storage_local")}: {localBytes}</p>
    </div>
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

  .general {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    gap: 0.5rem;
    text-align: center;
    font-size: 0.5rem;
    background-color: #1d1d1d;
  }
  .header {
    padding: 10px 3px;
    text-align: center;
    border-bottom: 1px solid #999999;
  }
</style>
