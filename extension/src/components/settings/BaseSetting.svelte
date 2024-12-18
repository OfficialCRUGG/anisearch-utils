<script lang="ts">
import { onMount } from "svelte";
import { Setting } from "../lib/settings";
import IconQuestion from "../icons/IconQuestion.svelte";
import { currentTab, currentTabContext } from "../../state/tab";

export let setting: Setting;

let showDescription = false;

let name = "";
let description = "";

onMount(() => {
  name = chrome.i18n.getMessage(`settings_${setting.id}_name`);
  description = chrome.i18n.getMessage(`settings_${setting.id}_description`);
});
</script>

<div class="flex items-center justify-between">
  <p>{name}</p>
  <div class="flex items-center space-x-1 text-white/50">
    <button
      class="p-1"
      on:mousedown={() => {
      currentTab.set("settingInfo");
      currentTabContext.set(setting.id);
    }}
    >
      <IconQuestion />
    </button>
    <div>
      <slot />
    </div>
  </div>
</div>
