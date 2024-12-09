<script lang="ts">
  import { onMount } from "svelte";

  type Vector2 = [number, number];

  let activePixels: number[] = [];
  let currentIndex = 0;

  const pixelPositions: Vector2[] = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [2, 3],
    [1, 3],
    [0, 3],
    [0, 2],
    [0, 1],
  ];

  // Update the active pixels every second
  onMount(() => {
    const updatePixels = () => {
      activePixels = [];
      for (let i = 0; i < 5; i++) {
        activePixels.push((currentIndex + i) % pixelPositions.length);
      }
      currentIndex = (currentIndex + 1) % pixelPositions.length;
    };

    updatePixels();
    const interval = setInterval(updatePixels, 50);
    return () => clearInterval(interval);
  });
</script>

<svg viewBox="0 0 4 4" width="2rem" height="2rem">
  {#each pixelPositions as [x, y], i}
    <rect {x} {y} width="1" height="1" fill={activePixels.includes(i) ? "currentColor" : "transparent"} />
  {/each}
</svg>
