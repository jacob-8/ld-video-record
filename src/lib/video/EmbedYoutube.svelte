<script>
	import type { IVimeoVideo } from '$lib/video/video.interface';
	export let video: IVimeoVideo;
	import { formatTime } from '$lib/video/time';
</script>

<a
	href={`/${video.id}`}
	sveltekit:prefetch
	class="hover:bg-gray-200 shadow overflow-hidden rounded-sm mb-2 flex
  items-stretch text-left"
>
	<div class="media-block bg-gray-500 relative">
		<img
			alt="Play Video"
			style="height: 100%; width: 100%; object-fit: cover;"
			src={video.pictures.sizes[1].link.replace('?r=pad', '')}
		/>
		<div
			class="absolute top-0 right-0 bottom-0 left-0 flex items-center
      justify-center"
		>
			<i class="fas fa-play fa-2x text-white" />
		</div>
	</div>
	<div class="p-2 flex-grow flex flex-col justify-between">
		<div class="text-sm font-semibold text-gray-900">
			{video.name}
		</div>
		<div class="flex justify-between items-center">
			<div class="text-xs text-gray-600">
				Video, {formatTime(video.duration)}
			</div>
		</div>
	</div>
</a>

<style>
	.media-block {
		flex: 0 0 200px;
		width: 200px;
		min-height: 200px;
	}
</style>
