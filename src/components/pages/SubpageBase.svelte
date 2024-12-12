<script lang="ts">
import { get } from "svelte/store";

import { t } from "../../lib/chromeI18n";
import { currentTab, currentTabContext } from "../../state/tab";
import IconBack from "../icons/IconBack.svelte";
</script>

<div>
  <div class="flex items-center justify-between bg-dark-900 px-2 py-1">
    <button
      class="flex items-center space-x-1.5"
      on:mousedown={() => {
        currentTab.set("settings");
        currentTabContext.set(null);
      }}
    >
      <IconBack />
      <span>{t("general.back")}</span>
    </button>
    <div class="flex items-center space-x-1.5">
      <p>{t(`settings.${get(currentTabContext)}.name`)}</p>
      <span>&gt;</span>
      <p class="font-bold">{t(`menu.tab.${get(currentTab)}`)}</p>
    </div>
  </div>
  <div class="flex flex-col space-y-2 p-2">
    <slot />
  </div>
</div>
