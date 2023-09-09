function preload() {
	dudler = loadFont('assets/Dudler-Regular.woff');
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-div');

	prevWindowWidth = windowWidth
	prevWindowHeight = windowHeight

	// WebMidi
	// 	.enable()
	// 	.then(onMidiEnabled)
	// 	// .catch(err => alert(err));
}

function draw() {
	background(0)
	
}

// =============================================

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)

    prevWindowWidth = windowWidth
    prevWindowHeight = windowHeight
}

function onMidiEnabled() {
	console.log("WebMidi enabled!")

	// Inputs
	console.log("Inputs:")
	WebMidi.inputs.forEach(input => console.log(input.manufacturer, input.name));

	// Outputs
	console.log("Outputs:")
	WebMidi.outputs.forEach(output => console.log(output.manufacturer, output.name));

    let midiOutSelect = document.getElementById('midiout-select');
    for (let output of WebMidi.outputs) {
        let opt = document.createElement('option');
        opt.value = output.name;
        opt.innerHTML = output.name;
        midiOutSelect.appendChild(opt);
    }
}

// document.getElementById('midiout-select').onchange = function () {
//     if (this.value != '') {
// 		midiOut = WebMidi.getOutputByName(this.value);
//     }
// };