<script lang="ts">
  import { onMount } from "svelte";
  import io from "socket.io-client";

  const socket = io("http://localhost:3000");

  // Data structure: rows of scores from judges
  let rows: { j1: { red: number[], blue: number[] }, j2: { red: number[], blue: number[] }, j3: { red: number[], blue: number[] } }[] = [];

  // Initialize with empty table
  let table: {
    j1: { red: number[]; blue: number[] };
    j2: { red: number[]; blue: number[] };
    j3: { red: number[]; blue: number[] };
  }[] = [
    { j1: { red: [], blue: [] }, j2: { red: [], blue: [] }, j3: { red: [], blue: [] } }
  ];

 onMount(() => {
  socket.on("judge-score", (data: { judge: string; color: "red" | "blue"; score: number }) => {
    console.log(data);

    // normalize judge name (J1 -> j1, J2 -> j2, etc.)
    const judgeKey = data.judge.toLowerCase() as "j1" | "j2" | "j3";

    if (table[0][judgeKey]) {
      table[0][judgeKey][data.color].push(1); // add tick mark
      table = [...table]; // trigger re-render
    }
  });
});


  function resetTable() {
    table = [
      { j1: { red: [], blue: [] }, j2: { red: [], blue: [] }, j3: { red: [], blue: [] } }
    ];
  }
</script>

<div class="w-full h-screen bg-gray-900 text-white p-6">
  <h1 class="text-3xl font-bold mb-6">Judges Summary Screen</h1>

  <!-- Table -->
  <div class="overflow-x-auto">
    <table class="table-auto border-collapse border border-gray-500 w-full text-center">
      <thead>
        <tr class="bg-gray-700">
          <th class="border border-gray-500 px-4 py-2">J1 RED</th>
          <th class="border border-gray-500 px-4 py-2">J1 BLUE</th>
          <th class="border border-gray-500 px-4 py-2">J2 RED</th>
          <th class="border border-gray-500 px-4 py-2">J2 BLUE</th>
          <th class="border border-gray-500 px-4 py-2">J3 RED</th>
          <th class="border border-gray-500 px-4 py-2">J3 BLUE</th>
        </tr>
      </thead>
      <tbody>
        {#each Array(Math.max(
          table[0].j1.red.length,
          table[0].j1.blue.length,
          table[0].j2.red.length,
          table[0].j2.blue.length,
          table[0].j3.red.length,
          table[0].j3.blue.length
        )).fill(0) as _, rowIndex}
          <tr>
            <td class="border border-gray-500 py-2">{table[0].j1.red[rowIndex] || ""}</td>
            <td class="border border-gray-500 py-2">{table[0].j1.blue[rowIndex] || ""}</td>
            <td class="border border-gray-500 py-2">{table[0].j2.red[rowIndex] || ""}</td>
            <td class="border border-gray-500 py-2">{table[0].j2.blue[rowIndex] || ""}</td>
            <td class="border border-gray-500 py-2">{table[0].j3.red[rowIndex] || ""}</td>
            <td class="border border-gray-500 py-2">{table[0].j3.blue[rowIndex] || ""}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- Reset Button -->
  <div class="mt-6">
    <button class="btn btn-error px-6 py-2 text-xl" on:click={resetTable}>Reset</button>
  </div>
</div>
