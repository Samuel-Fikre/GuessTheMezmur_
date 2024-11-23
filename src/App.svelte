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

  onMount(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/songs");
      const data: Array<{ title: string; year: string; songs: string[] }> =
        await response.json();

      if (data.length > 0) {
        const song = data[0];
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
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
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
