const video = document.getElementById("video");
const button = document.getElementById("startCamera");

button.onclick = async () => {

    try{

        const stream = await navigator.mediaDevices.getUserMedia({
            video:true,
            audio:false
        });

        video.srcObject = stream;

    }catch(error){

        alert("Unable to access the camera.");
        console.error(error);

    }

};
