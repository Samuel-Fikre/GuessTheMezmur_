<script>
  export let track;
</script>

<div class="track-item" class:selected={track.guessed}>
  <span class:selected={track.guessed}>{track.id} - {track.label}</span>
  <button on:click={() => alert(`Playing ${track.label}`)}>
      ▶️
  </button>
</div>

<style>
  .track-item {
      display: flex;
      align-items: center;
      padding: 10px;
      background: #444;
      margin: 5px 0;
      border-radius: 5px;
      color: #fff;
      font-size: 1em;
  }
  .track-item span {
      flex: 1;
  }
  .track-item button {
      background: none;
      border: none;
      color: #bbb;
      cursor: pointer;
      font-size: 1.2em;
  }
  .track-item.selected {
      background-color: #2e7d32;
  }
  .track-item.selected span {
      color: #fff;
  }
</style>
