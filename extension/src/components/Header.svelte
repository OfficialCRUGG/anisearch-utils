<script lang="ts">
import { createEventDispatcher } from "svelte";
import { Tab } from "../lib/types";
import HeaderTab from "./HeaderTab.svelte";
import IconAsu from "./icons/IconAsu.svelte";
import { currentTab } from "../state/tab";
import { t } from "../lib/chromeI18n";

const tabs: Tab[] = [
  {
    id: "info",
    name: t("menu.tab.info"),
  },
  {
    id: "settings",
    name: t("menu.tab.settings"),
  },
];

function updateTab(tab: string) {
  currentTab.set(tab);
}
</script>

<div class="flex items-center justify-between bg-primary text-white">
  <div class="px-2 text-3xl">
    <IconAsu />
  </div>
  <div class="flex px-1">
    {#each tabs as tab}
      <HeaderTab tab={tab} active={$currentTab === tab.id} on:click={() => updateTab(tab.id)} />
    {/each}
  </div>
</div>
