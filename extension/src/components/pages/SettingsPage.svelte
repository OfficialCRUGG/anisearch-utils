<script lang="ts">
import { getGroups } from "../../lib/settings";
import BooleanSetting from "../settings/BooleanSetting.svelte";
import SettingGroup from "../settings/SettingGroup.svelte";

export let baseSettings: Record<string, any>;
</script>

<div class="flex flex-col space-y-2">
  {#each getGroups() as group}
    <SettingGroup id={group.id}>
      {#each group.settings as setting}
        {#if setting.type === "boolean"}
          <BooleanSetting setting={setting} baseSettings={baseSettings} />
        {:else}
          <p style="color:red;">Invalid setting of type {setting.type}</p>
        {/if}
      {/each}
    </SettingGroup>
  {/each}
</div>
