<script lang="ts">
import { onMount } from "svelte";
import { currentTabContext } from "../../state/tab";
import { t } from "../../lib/chromeI18n";
import { get } from "svelte/store";
import SubpageBase from "./SubpageBase.svelte";
import Card from "../Card.svelte";

let description: string | null = null;
let note: string | null = null;

onMount(() => {
  const setting = get(currentTabContext);
  description = t(`settings.${setting}.description`);
  note = t(`settings.${setting}.note`);
});
</script>

<SubpageBase>
  {#if description}
    <Card title={t("general.description")}>
      {description}
    </Card>
  {/if}
  {#if note}
    <Card title={t("general.note")}>
      {note}
    </Card>
  {/if}
</SubpageBase>
