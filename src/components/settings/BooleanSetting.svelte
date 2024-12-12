<script lang="ts">
import { getSetting, Setting } from "../../lib/settings";
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

<BaseSetting setting={setting}>
  <button on:mousedown={toggleValue} class="py-1">
    <div class="checkbox relative cursor-pointer rounded-full transition" data-active={value}>
      <div class="checkbox--inner absolute scale-[160%] transform rounded-full bg-white transition-all"></div>
    </div>
  </button>
</BaseSetting>

<style>
.checkbox {
  --checkbox-outer-width: 1.5rem;
  --checkbox-outer-height: 0.8rem;
  --checkbox-inner-size: 0.6rem;
  width: var(--checkbox-outer-width);
  height: var(--checkbox-outer-height);
}
.checkbox[data-active="false"] {
  background-color: #606060;
}
.checkbox[data-active="true"] {
  background-color: #86d368;
}
.checkbox--inner {
  width: var(--checkbox-inner-size);
  height: var(--checkbox-inner-size);
  top: calc(calc(var(--checkbox-outer-height) - var(--checkbox-inner-size)) / 2);
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
