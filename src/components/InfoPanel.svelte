<script>
  export let songInfo;
</script>

<div class="info-panel">
  <div>
      <strong>Released in</strong> <span>{songInfo.year}</span>
  </div>
  <div>
      <strong>YouTube views</strong> <span>{songInfo.views}</span>
  </div>
  <div>
      <strong>Difficulty</strong> <span>{songInfo.difficulty}</span>
  </div>
</div>

<style>
  .info-panel {
      display: flex;
      justify-content: space-around;
      padding: 10px;
      background: #444;
      color: #fff;
      font-size: 0.9em;
  }
  .info-panel div {
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  strong {
      font-weight: bold;
      color: #bbb;
  }
</style>
