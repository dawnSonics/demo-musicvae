canvas = document.getElementById('canvas')
button = document.getElementById('gen-button')

function changeButtonText(val) {
    button.value = val
    button.innerHTML = val
}

const vae_temperature = 0.5
const controlArgs = {
    key: 60
}
const vizConfig = {
    noteHeight: 6,
    pixelsPerTimeStep: 60,
    noteSpacing: 1,
    noteRGB: '255, 255, 255'
}

// music_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_2bar_small');
// music_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_small_q2');
// music_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_med_q2');
music_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_med_lokl_q2');
music_vae.initialize().then(() => changeButtonText("generate"));

Tone.start()

viz = null
player = new mm.Player(false)

function loopSample(sample) {
    player.start(sample).then(() => loopSample(sample))
}

function processSample(sample) {
    loopSample(sample)

    delete viz
    viz = new mm.Visualizer(sample, canvas, vizConfig);
}

function genVAE() {
  if (player.isPlaying()) {
    player.stop();
    changeButtonText("generate")
    return;
  }
  changeButtonText("stop")
  music_vae
  .sample(1, vae_temperature)
//   .sample(1, vae_temperature, controlArgs)
  .then((sample) => processSample(sample[0]));
//   .then((sample) => player.start(sample[0]));
}

button.onclick = genVAE