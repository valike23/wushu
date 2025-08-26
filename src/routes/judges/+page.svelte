<script lang="ts">
  import { io } from "socket.io-client";

  export let judgeName = "J1";

  let redScore = 0;
  let blueScore = 0;

  // connect to backend socket
  const socket = io("http://localhost:3000"); // adjust port if needed

  function sendScoreUpdate(color: "red" | "blue", score: number) {
    console.log("the score update")
    socket.emit("judge-score", {
      judge: judgeName.toLocaleLowerCase(),
      color,
      score
    });
  }

  function incRed() {
    redScore++;
    sendScoreUpdate("red", redScore);
  }

  function decRed() {
    if (redScore > 0) {
      redScore--;
      sendScoreUpdate("red", redScore);
    }
  }

  function incBlue() {
    blueScore++;
    sendScoreUpdate("blue", blueScore);
  }

  function decBlue() {
    if (blueScore > 0) {
      blueScore--;
      
      sendScoreUpdate("blue", blueScore);
    }
  }
</script>

<!-- Judge Screen -->
<div class="w-full h-screen bg-black text-white flex flex-col items-center p-6">
  
  <!-- Judge Name -->
  <h1 class="text-3xl font-bold mb-6">{judgeName}</h1>
  
  <!-- Scores Area -->
  <div class="grid grid-cols-2 gap-6 w-full max-w-4xl flex-1">
    
    <!-- Red Athlete Controls -->
    <div class="flex flex-col items-center justify-center bg-red-900 rounded-2xl p-6 shadow-lg">
      <button class="btn btn-error text-2xl font-bold mb-4" on:click={incRed}>+1</button>
      <div class="text-7xl font-mono my-6">{redScore}</div>
      <button class="btn btn-outline btn-error text-2xl font-bold mt-4" on:click={decRed}>-1</button>
      <div class="mt-6 text-2xl text-red-200 font-bold">RED</div>
    </div>
    
    <!-- Blue Athlete Controls -->
    <div class="flex flex-col items-center justify-center bg-blue-900 rounded-2xl p-6 shadow-lg">
      <button class="btn btn-info text-2xl font-bold mb-4" on:click={incBlue}>+1</button>
      <div class="text-7xl font-mono my-6">{blueScore}</div>
      <button class="btn btn-outline btn-info text-2xl font-bold mt-4" on:click={decBlue}>-1</button>
      <div class="mt-6 text-2xl text-blue-200 font-bold">BLUE</div>
    </div>
  
  </div>
</div>
