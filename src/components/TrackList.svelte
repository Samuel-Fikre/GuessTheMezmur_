<script lang="ts">
  export let tracks: { id: number; label: string; songUrl: string }[] = [];


  let currentTrackIndex: number | null = null; // Tracks the currently playing index
  let audio: HTMLAudioElement | null = null; // For playing audio

  function playTrack(index: number) {
    if (audio) {
      audio.pause(); // Stop current audio
    }
    audio = new Audio(tracks[index].songUrl); // Load new track
    audio.play(); // Play the track
    currentTrackIndex = index; // Update state
  }

  function skipTrack() {
    if (currentTrackIndex !== null && currentTrackIndex < tracks.length - 1) {
      playTrack(currentTrackIndex + 1); // Play next track
    }
  }
</script>

<style>
  .track-list {
    margin-top: 20px;
    background-color: #444;
    border-radius: 10px;
    padding: 20px;
  }



  .track {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #666;
  }

  .track.active {
    background-color: #222;
    color: #00ff00;
  }

  button {
    margin-left: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .play-button {
    background-color: #4caf50;
    color: white;
  }

  .skip-button {
    background-color: #2196f3;
    color: white;
  }
</style>



<div class="track-list">
  {#each tracks as track, index}
    <div class="track {currentTrackIndex === index ? 'active' : ''}">
      <span>{track.id} - {track.label}</span>
      <button class="play-button" on:click={() => playTrack(index)}>
        {currentTrackIndex === index ? "Playing..." : "Play"}
      </button>
      {#if currentTrackIndex === index}
        <button class="skip-button" on:click={skipTrack}>Skip</button>
      {/if}
    </div>
  {/each}
</div>
