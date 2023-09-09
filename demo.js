var vae_temperature = 0.0

music_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_small_q2');
music_vae.initialize();

Tone.start()

canvas = document.getElementById('canvas')

viz = null

player = new mm.Player()

function processSample(sample) {
    player.start(sample[0])

    delete viz
    viz = new mm.Visualizer(sample[0], canvas, {noteRGB: '255, 255, 255'});
}

function playVAE() {
  if (player.isPlaying()) {
    player.stop();
    return;
  }
  music_vae
  .sample(1, vae_temperature)
  .then((sample) => processSample(sample));
//   .then((sample) => player.start(sample[0]));
}

document.getElementById('gen-button').onclick = playVAE