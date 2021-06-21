<script>
	import EmbedYoutube from '$lib/video/EmbedYoutube.svelte';
	import { fetchVideoData } from '$lib/video/fetch-video';
	import Recorder from '$lib/video/Recorder.svelte';

	const videoIds = ['442251310', '483886724'];
</script>

<h1>Record video here</h1>
<Recorder />

<h1>Display Videos</h1>
<p class="mb-3">
	Display videos here using mocked video IDs (or repurpose the TODOS page to simulate database
	storage)
</p>

{#each videoIds as videoId}
	{#await fetchVideoData(videoId)}
		<a href={`/${videoId}`}>Watch {videoId}</a>
	{:then video}
		<EmbedYoutube {video} />
	{:catch error}
		Error on video {videoId}: {error}
	{/await}
{/each}
