canvas = document.getElementById('canvas')
button = document.getElementById('gen-button')
select = document.getElementById('gen-select')
slider = document.getElementById('gen-slider')

function changeButtonText(val) {
    button.value = val
    button.innerHTML = val
}

var vae_temperature = 0.5
const controlArgs = {
    chordProgression: ["Dm", "F", "Am", "G"]
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
// music_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_chords');
// music_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_16bar_small_q2');

melody2bar_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_2bar_small');
melody_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_med_lokl_q2');
drum_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/drums_2bar_lokl_small');

melody_vae.initialize().then(() => changeButtonText("generate"));
melody2bar_vae.initialize();
drum_vae.initialize();

music_vae = melody_vae

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
  if (!music_vae.initialized) {
    return;
  }
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
}

button.onclick = genVAE
select.onchange = function() {
    if (this.value == 'percussion') {
        music_vae = drum_vae
    } else if (this.value == 'melody2bar') {
        music_vae = melody2bar_vae
    } else if (this.value == 'melody') {
        music_vae = melody_vae
    }
};
slider.onchange = function() {
    vae_temperature = this.value / 50.0
    console.log(vae_temperature)
}