<script lang="ts">
	import { cn } from '$lib/utils'
	import { onMount } from 'svelte'
	import NumberTicker from './NumberTicker.svelte'

	let tile: HTMLDivElement
	let {
		key,
		class: className,
		isPressed,
		count,
	}: {
		key: string
		class?: string
		isPressed: boolean
		count: number
	} = $props()

	let lastMode = $state(false)

	$effect(() => {
		if (isPressed && lastMode == false) {
			createNewTile()
			lastMode = true
		}
		lastMode = isPressed
	})

	const createNewTile = () => {
		const child = document.createElement('div')
		child.style.height = '40px'
		child.style.width = '2px'
		child.style.backgroundColor = '#86feae'
		child.style.position = 'absolute'
		child.style.top = '5px'
		child.style.bottom = '3px'
		child.style.left = '300px'
		child.style.borderRadius = '0.5rem'
		child.style.zIndex = '0'
		// child.style.opacity = '0.8'
		tile.appendChild(child)
	}

	const updateTiles = () => {
		if (tile) {
			const children = tile.getElementsByTagName('div')
			let removeList = []
			for (var i = 0; i < children.length; i++) {
				const child = children[i]
				if (i == children.length - 1) {
					if (isPressed) {
						child.style.width = `${parseInt(child.style.width) + 4}px`
					}
				}
				if (
					parseInt(child.style.left) + parseInt(child.style.width) <=
					0
				) {
					removeList.push(child)
				}
				child.style.left = `${parseInt(child.style.left) - 4}px`
			}
			removeList.map((child) => {
				tile.removeChild(child)
			})
		}
		requestAnimationFrame(updateTiles)
	}

	onMount(() => {
		requestAnimationFrame(updateTiles)
	})
</script>

<div
	class={cn(
		'absolute flex h-[50px] w-96 overflow-hidden',
		className,
	)}>
	<div bind:this={tile} class="grow" id="tiles"></div>
	<div
		class="relative flex h-full w-16 items-center justify-start text-white">
		<div
			class={cn(
				'h-full w-2 shadow-2xl',
				isPressed ? 'bg-[#86feae]' : 'bg-white',
			)}>
		</div>
		<span
			class="absolute right-24 top-0 flex h-full items-center justify-center text-[#86feae]">
			<NumberTicker value={count} class="text-[#86feae]" shadow />
		</span>
	</div>
</div>

<style>
	#tiles {
		-webkit-mask: linear-gradient(
			to left,
			rgba(0, 0, 0, 1) 80%,
			rgba(0, 0, 0, 0) 100%
		);
		mask: linear-gradient(
			to left,
			rgba(0, 0, 0, 1) 80%,
			rgba(0, 0, 0, 0) 100%
		);
	}
</style>
