<script lang="ts">
import { onMount } from "svelte";
import Card from "../Card.svelte";
import { t } from "../../lib/chromeI18n";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);

  return `${i === 0 ? value.toFixed(0) : value.toFixed(2)} ${sizes[i]}`;
}

let syncBytes = "...";
let localFirefox = false;
let localBytes = "...";

onMount(() => {
  chrome.storage.sync.getBytesInUse((bytes) => {
    syncBytes = formatBytes(bytes);
  });

  if (chrome.storage.local.getBytesInUse) {
    chrome.storage.local.getBytesInUse((bytes) => {
      localBytes = formatBytes(bytes);
    });
  } else {
    localFirefox = true;
  }
});
</script>

<div class="flex flex-col space-y-2">
  <Card title={t("info.storage")}>
    <div class="flex flex-col space-y-1">
      <div class="flex items-center justify-between">
        <p>{t("info.storage.sync")}</p>
        <p>{syncBytes}</p>
      </div>

      <div class="flex items-center justify-between">
        <p>{t("info.storage.local")}</p>
        <p>{localBytes}</p>
      </div>
    </div>
  </Card>

  <Card title={t("info.notes")}>
    <div class="flex flex-col space-y-1 text-xs text-white/50">
      <div>
        <p>{t("meta.name")} v1.0.1</p>
        <p>© 2024 CRUGG<br />{t("info.copyright")}</p>
      </div>
      <p>{t("info.disclaimer")}</p>
    </div>
  </Card>
</div>
