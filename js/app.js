const video = document.getElementById("webcam");
const label = document.getElementById("label");

const trainbtn = document.querySelector("#train");

const featureExtractor = ml5.featureExtractor('MobileNet', {
    numLabels: 3
}, modelLoaded);

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({video: true})
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
}

label.innerText = "Ready when you are!";


// When the model is loaded
function modelLoaded() {
    trainbtn.addEventListener("click", () => train());
    console.log('Model Loaded!');
}

const labelOneBtn = document.getElementById("labelOne")
const labelTwoBtn = document.getElementById("labelTwo")
const labelThreeBtn = document.getElementById("labelThree")
const classifybtn = document.getElementById("classify")
const savebtn = document.getElementById("save")

labelOneBtn.addEventListener("click", (event) => addLabeledImage(event));
labelTwoBtn.addEventListener("click", (event) => addLabeledImage(event));
labelThreeBtn.addEventListener("click", (event) => addLabeledImage(event));
classifybtn.addEventListener("click", () => classify());
savebtn.addEventListener("click", (event) => saveModel(event))

function addLabeledImage(e) {
    e.preventDefault()
    const imageLabel = document.getElementById('classname').value;
    console.log(imageLabel);
    classifier.addImage(video, imageLabel, () => {
        console.log("added image to model!")
    });
}

// Create a new classifier using those features and with a video element
const classifier = featureExtractor.classification(video, videoReady);

// Triggers when the video is ready
function videoReady() {
    console.log('The video is ready!');
}

// Retrain the network
function train() {
    classifier.train((lossValue) => {
        if (lossValue == null) {
            classify()
        }
    })
};

// Get a prediction for that image

function classify() {
    classifier.classify(video, (err, result) => {
        console.log(result);
    })
};

function saveModel(e) {
    e.preventDefault();
    featureExtractor.save();
}