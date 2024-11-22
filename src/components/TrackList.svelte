<script>
  export let tracks = [];

  let currentSongUrl = null;

  // Play the selected song
  function playSong(songUrl) {
    currentSongUrl = songUrl;
    const audio = new Audio(songUrl);
    audio.play();
  }

  // Handle keyboard events for accessibility
  function handleKeydown(event, songUrl) {
    if (event.key === 'Enter' || event.key === ' ') {
      playSong(songUrl);
    }
  }
</script>

<div>
  <h2>Track List</h2>
  <ul>
    {#each tracks as track (track.id || track.songUrl)}
      <li>
        <button
          on:click={() => playSong(track.songUrl)}
          on:keydown={(event) => handleKeydown(event, track.songUrl)}
          aria-label={`Play ${track.label}`}
        >
          {track.label}
        </button>
        <span>{track.guessed ? 'Guessed' : 'Not Guessed'}</span>
      </li>
    {/each}
  </ul>

  {#if currentSongUrl}
    <div>
      <h3>Currently Playing</h3>
      <audio controls autoplay>
        <source src={currentSongUrl} type="audio/mp3" />
      </audio>
    </div>
  {/if}
</div>

<style>
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin: 5px;
  }

  button {
    padding: 10px;
    margin: 5px;
    background-color: #444;
    border: none;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
  }

  button:hover {
    background-color: #555;
  }

  h2 {
    color: #f5a623;
  }

  h3 {
    color: #fff;
  }

  audio {
    margin-top: 10px;
    width: 100%;
  }
</style>
