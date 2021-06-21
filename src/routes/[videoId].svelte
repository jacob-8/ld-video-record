<script context="module">
	import { fetchVideoData } from '$lib/video/fetch-video';

	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ page: { params } }) => {
		const video = await fetchVideoData(params.videoId);
		return { props: { video } };
	};
</script>

<script>
	import Button from '$lib/components/Button.svelte';
	import JSON from '$lib/components/JSON.svelte';
	import type { IVimeoVideo } from '$lib/video/video.interface';
	export let video: IVimeoVideo;
</script>

<h1>{video.name}</h1>
<!-- shareImage={video.pictures.sizes[4].link_with_play_button.replace('?r=pad', '')} -->
<div style="padding-top: 56.25%" class="bg-black shadow overflow-hidden md:rounded-lg relative">
	<iframe
		class="absolute top-0 w-full left-0 h-full"
		title="Video"
		src="https://player.vimeo.com/video/{video.id}"
		frameborder="0"
		allow="autoplay; fullscreen"
		allowfullscreen
	/>
	<!-- <img
        alt="Play Video"
        style="height: 100%; width: 100%; object-fit: cover;"
        src={video.data.pictures.sizes[3].link_with_play_button.replace('?r=pad', '')} /> -->
	<!-- Or sizes[4].link -->
</div>

<div class="my-2">
	{video.description}
</div>

<div>
	<Button href="https://vimeo.com/manage/{video.id}/general">Edit in Vimeo</Button>
	<JSON obj={video} />
</div>

<div class="text-gray-600 text-xs my-2">Help text</div>
