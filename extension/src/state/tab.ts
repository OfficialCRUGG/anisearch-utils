import { writable } from "svelte/store";

export const currentTab = writable<string>("settings");
export const currentTabContext = writable<string | null>(null);
