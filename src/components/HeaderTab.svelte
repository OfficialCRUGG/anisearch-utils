<script lang="ts">
import { Tab } from "../lib/types";
import { twMerge } from "tailwind-merge";
import { createEventDispatcher } from "svelte";

export let active: boolean = false;
export let tab: Tab;

let clicked = false;

const dispatch = createEventDispatcher();

function mousedown() {
  clicked = true;
  dispatch("click");
}

function mouseup() {
  clicked = false;
}
</script>

<div class={twMerge("transform px-0.5 transition-all", clicked ? "scale-100" : "scale-105")}>
  <button
    on:mousedown={() => mousedown()}
    on:mouseup={() => mouseup()}
    class={twMerge("rounded px-2", active && "bg-black/25")}>{tab.name}</button
  >
</div>
