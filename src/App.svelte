<script>
  import { onMount } from 'svelte';
  import TrackList from './components/TrackList.svelte';

  let tracks = [];

  // Fetch songs from backend when the component is mounted
  onMount(async () => {
    try {
      const response = await fetch('http://localhost:3000/api/songs');
      const data = await response.json();
      
      // Map the data to fit the structure we want
      tracks = data.map(song => ({
        id: song._id?.$oid,  // Use MongoDB's _id for the key
        label: song.title,
        songUrl: song.songs[0],  // Assuming the first song URL is the one to be used
        guessed: false
      }));

    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  });
</script>

<main>
  <h1>Guess the Song Game</h1>
  <TrackList {tracks} />
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
