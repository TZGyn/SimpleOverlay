<script lang="ts">
	import { cubicOut } from 'svelte/easing'
	import { spring, tweened } from 'svelte/motion'
	import { cn } from '$lib/utils'
	let initial = $state(0)
	let duration = $state(1000)

	let {
		value,
		class: className,
		shadow = false,
	}: { value: number; class?: string; shadow?: boolean } = $props()

	let num = $derived(
		tweened(initial, {
			duration: duration,
			easing: cubicOut,
		}),
	)

	$effect(() => {
		num.set(value)
	})
</script>

<div
	id="ticker"
	class={cn('inline-block tracking-normal text-white', className)}>
	{$num.toFixed(0)}
</div>

{#if shadow}
	<style>
		#ticker {
			text-shadow:
				0 0 0.2em black,
				0 0 0.5em black,
				0 0 0.8em black;
		}
	</style>
{/if}
