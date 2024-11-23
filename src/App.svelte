<script lang="ts">
  import { onMount } from "svelte";
  import TrackList from "./components/TrackList.svelte";

  interface Track {
    id: number;
    label: string;
    songUrl: string;
  }

  interface SongInfo {
    title: string;
    year: string;
    views: string;
    difficulty: string;
  }

  let tracks: Track[] = [];
  let songInfo: SongInfo | null = null;
  let currentSongIndex = 0;
  let database = [];
  let userGuess = ""; // User's input for guessing the song
  let suggestions: string[] = []; // Suggestions for the input box
  let feedbackMessage = ""; // Feedback for the user

  onMount(async () => {
    await fetchSongs();
    loadSong(currentSongIndex);
  });

  async function fetchSongs() {
    try {
      const response = await fetch("http://localhost:3000/api/songs");
      database = await response.json();
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  }

  function loadSong(index: number) {
    if (index < database.length) {
      const song = database[index];
      tracks = [
        { id: 1, label: "Drums", songUrl: song.songs[0] },
        { id: 2, label: "Bass + Piano", songUrl: song.songs[1] },
        { id: 3, label: "Synth + Strings", songUrl: song.songs[2] },
        { id: 4, label: "Combined", songUrl: song.songs[3] },
      ];
      songInfo = {
        title: song.title,
        year: song.year,
        views: "185M",
        difficulty: "Hard (par 4)",
      };
      feedbackMessage = ""; // Clear feedback when loading a new song
      userGuess = ""; // Clear input field
    }
  }

  function nextSong() {
    if (currentSongIndex < database.length - 1) {
      currentSongIndex++;
      loadSong(currentSongIndex);
    }
  }

  function handleInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    userGuess = input;

    // Generate suggestions dynamically
    suggestions = database
      .map((song) => song.title)
      .filter((title) => title.toLowerCase().includes(input.toLowerCase()));
  }

  function handleGuess() {
    if (userGuess.trim().toLowerCase() === songInfo?.title.toLowerCase()) {
      feedbackMessage = "🎉 You got it!";
    } else {
      feedbackMessage = "❌ You don’t got it!";
    }
  }
</script>

<main>
  <h1>Guess the Song Game</h1>
  <TrackList {tracks}  />
  <div style="text-align: center; margin-top: 20px;">
    <button on:click={nextSong} disabled={currentSongIndex >= database.length - 1}>
      Next Song
    </button>
  </div>
  <div style="margin-top: 30px; text-align: center;">
    <input
      type="text"
      bind:value={userGuess}
      placeholder="Guess the song title..."
      on:input={handleInput}
      style="padding: 10px; width: 60%; border: 1px solid #ddd; border-radius: 5px;"
    />
    <button on:click={handleGuess} style="padding: 10px 20px; margin-left: 10px; background-color: #2196f3; color: white; border: none; border-radius: 5px; cursor: pointer;">
      Submit Guess
    </button>
    <ul style="list-style: none; padding: 0; margin-top: 10px; text-align: left; display: inline-block; width: 60%; background: #fff; border: 1px solid #ddd; border-radius: 5px;">
      {#each suggestions as suggestion}
        <button 
          style="padding: 5px 10px; cursor: pointer; background: none; border: none; text-align: left; width: 100%;"
          on:click={() => (userGuess = suggestion)}
        >
          {suggestion}
        </button>
      {/each}
    </ul>
    {#if feedbackMessage}
      <p style="margin-top: 20px; font-size: 18px; color: {feedbackMessage.includes('got it') ? 'green' : 'red'};">
        {feedbackMessage}
      </p>
    {/if}
  </div>
</main>

<style>
  main {
    color: #ffffff;
    background-color: #333;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  h1 {
    text-align: center;
    color: #f5a623;
  }

  
</style>
