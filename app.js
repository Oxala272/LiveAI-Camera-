const video = document.getElementById("video");
const startButton = document.getElementById("startCamera");

startButton.addEventListener("click", async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user"
            },
            audio: false
        });

        video.srcObject = stream;

    } catch(err){
        alert("Camera permission denied.");
        console.error(err);
    }
});