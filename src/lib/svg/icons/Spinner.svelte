<script lang="ts">
	export let size: number = 18;
</script>

<div class="circle text-brand" style={`--circle-size: ${size}px`}>
	<svg class="circle__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
		<circle class="circle__svg-circle" cx="50" cy="50" r="45" />
	</svg>
</div>

<style>
	.circle {
		--circle-stroke-color: currentColor;
		height: var(--circle-size);
		width: var(--circle-size);
	}

	.circle__svg {
		animation: 2s linear infinite both circle__svg;
	}

	@keyframes circle__svg {
		0% {
			transform: rotateZ(0deg);
		}
		100% {
			transform: rotateZ(360deg);
		}
	}

	.circle__svg-circle {
		animation: 4s linear infinite both circle__svg-circle;
		fill: transparent;
		stroke: var(--circle-stroke-color);
		stroke-dasharray: 90;
		stroke-linecap: round;
		stroke-width: 10px;
		transform-origin: 50% 50%;
	}

	@keyframes circle__svg-circle {
		0%,
		25% {
			/* stroke-dashoffset: 280; */
			/* transform: rotate(0); */
		}

		50%,
		75% {
			/* stroke-dashoffset: 75; */
			/* transform: rotate(45deg); */
		}

		100% {
			/* stroke-dashoffset: 280; */
			transform: rotate(360deg);
		}
	}
</style>
