<script lang="ts">
import "../app.css";
import { onMount } from "svelte";
import { getKeys, getSetting } from "../lib/settings";
import Loader from "./Loader.svelte";
import Header from "./Header.svelte";
import SettingsPage from "./pages/SettingsPage.svelte";
import InfoPage from "./pages/InfoPage.svelte";
import { currentTab } from "../state/tab";
import SettingInfoPage from "./pages/SettingInfoPage.svelte";

let loaded: boolean = false;
let baseSettings: Record<string, any> = {};

const browser = import.meta.env.VITE_BROWSER;

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

<div class="bg-dark-950 min-h-screen text-white browser-{browser}">
  {#if loaded}
    <Header />
    {#if $currentTab === "settings"}
      <div class="p-2">
        <SettingsPage baseSettings={baseSettings} />
      </div>
    {:else if $currentTab === "info"}
      <div class="p-2">
        <InfoPage />
      </div>
    {:else if $currentTab === "settingInfo"}
      <SettingInfoPage />
    {/if}
  {:else}
    <div class="justify-content flex h-screen items-center">
      <Loader />
    </div>
  {/if}
</div>

<style>
:global(:root:has(.browser-chrome)) {
  font-size: 150%;
}
:global(:root:has(.browser-firefox)) {
  font-size: 125%;
}
</style>
