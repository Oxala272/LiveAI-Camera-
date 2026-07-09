const video = document.getElementById("video");
const canvas = document.getElementById("output");
const ctx = canvas.getContext("2d");
const button = document.getElementById("startCamera");

button.onclick = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user"
      },
      audio: false
    });

    video.srcObject = stream;
    await video.play();
const faceMesh = new FaceMesh({

  locateFile: (file) =>

    `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`

});

faceMesh.setOptions({

  maxNumFaces: 1,

  refineLandmarks: true,

  minDetectionConfidence: 0.5,

  minTrackingConfidence: 0.5

});

faceMesh.onResults(onResults);

const camera = new Camera(video, {

  onFrame: async () => {

    await faceMesh.send({ image: video });

  },

  width: 640,

  height: 480

});

camera.start();
    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Show the canvas and hide the raw video
      canvas.style.display = "block";
      video.style.display = "none";

      function draw() {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(draw);
      }

      draw();
    };

  } catch (error) {
    alert("Unable to access the camera.");
    console.error(error);
  }
};
function onResults(results) {
  const canvas = document.getElementById("output");
  const ctx = canvas.getContext("2d");

  canvas.width = results.image.width;
  canvas.height = results.image.height;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(results.image, 0, 0);

  if (results.multiFaceLandmarks) {
    for (const landmarks of results.multiFaceLandmarks) {
      for (const point of landmarks) {
        ctx.beginPath();
        ctx.arc(
          point.x * canvas.width,
          point.y * canvas.height,
          1.5,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "#00ff00";
        ctx.fill();
      }
    }
  }
}
