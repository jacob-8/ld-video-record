<svelte:head>
	<script src="https://www.WebRTC-Experiment.com/RecordRTC.min.js"></script>
    <script src="https://apis.google.com/js/api.js"></script>

</svelte:head>

<script>
	import { onMount } from 'svelte';

	let video;
	let recorder;
    let blob;
	onMount(() => {
		video = document.querySelector('video');

		function captureCamera(callback) {
        navigator.mediaDevices.getUserMedia({
            audio: true, 
            video: true
        }).then(function(camera) {
            callback(camera);
        }).catch(function(error) {
            alert('Unable to capture your camera. Please check console logs.');
            console.error(error);
        });

        gapi.load("client:auth2", function() {
        gapi.auth2.init({client_id: "your client ID"});
        });
    }

    function stopRecordingCallback() {
        video.src = video.srcObject = null;
        video.muted = false;
        video.volume = 1;
        blob = new File([recorder.getBlob()], 'video.webm', {
          type: 'video/webm'
        });

        video.src = URL.createObjectURL(blob);
        console.log(video)
        console.log(blob);

        recorder.camera.stop();
        recorder.destroy();
        recorder = null;
    }

    document.getElementById('btn-start-recording').onclick = function() {
        (this as HTMLButtonElement).disabled = true;
        (document.getElementById('btn-pause-recording') as HTMLButtonElement).disabled = false;
        captureCamera(function(camera) {
            video.muted = true;
            video.volume = 0;
            video.srcObject = camera;

            recorder = RecordRTC(camera, {
                type: 'video/webm'
            });

            recorder.startRecording();

            // release camera on stopRecording
            recorder.camera = camera;

            (document.getElementById('btn-stop-recording') as HTMLButtonElement).disabled = false;
        });
    };

    document.getElementById('btn-stop-recording').onclick = function() {
        (this as HTMLButtonElement).disabled = true;
        (document.getElementById('btn-pause-recording') as HTMLButtonElement).disabled = true;
        (document.getElementById('btn-resume-recording') as HTMLButtonElement).disabled = true;

        recorder.stopRecording(stopRecordingCallback);
        (document.getElementById('btn-start-recording') as HTMLButtonElement).disabled = false;

    };

    document.getElementById('btn-pause-recording').onclick = function() {
        (this as HTMLButtonElement).disabled = true;
        (document.getElementById('btn-resume-recording') as HTMLButtonElement).disabled = false;

        recorder.pauseRecording();
    };

    document.getElementById('btn-resume-recording').onclick = function() {
        (this as HTMLButtonElement).disabled = true;
        (document.getElementById('btn-pause-recording') as HTMLButtonElement).disabled = false;
        (document.getElementById('btn-resume-recording') as HTMLButtonElement).disabled = true;

        recorder.resumeRecording();
    };
	})



    function authenticate() {
        return gapi.auth2.getAuthInstance()
            .signIn({scope: "https://www.googleapis.com/auth/youtube.upload"})
            .then(function() { console.log("Sign-in successful"); },
                function(err) { console.error("Error signing in", err); });
        }

    function loadClient() {
        gapi.client.setApiKey("Your API Key");
        return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
            .then(function() { console.log("GAPI client loaded for API"); },
                function(err) { console.error("Error loading GAPI client for API", err); });
        }

    function execute() {
        return gapi.client.youtube.videos.insert({
            "part": [
            "snippet,status"
            ],
            "resource": {
            "snippet": {
                "categoryId": "22",
                "description": "Description of uploaded video.",
                "title": "Test video upload."
            },
            "status": {
                "privacyStatus": "private"
            }
            },
            media_body: blob

        })
            .then(function(response) {
                    // Handle the results here (response.result has the parsed body).
                    console.log("Response", response);
                    },
                    function(err) { console.error("Execute error", err); });
        }

	

</script>

<button id="btn-start-recording">Start Recording</button>
<button id="btn-stop-recording" disabled>Stop Recording</button>
<br>
<button id="btn-pause-recording" disabled>Pause</button>
<button id="btn-resume-recording" disabled>Resume</button>
	
<hr>
<video controls autoplay playsinline bind:this={video}>
	<track kind='captions'>
</video>


<button on:click={authenticate}>
	Authenticate
</button>

<button on:click={loadClient}>
	LoadClient
</button>

<button on:click={execute}>
	Upload
</button>