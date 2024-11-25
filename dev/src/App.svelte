<script lang="ts">
	import './app.css'
	import reconnectingWebsocket from './lib/reconnecting-websocket'
	import NumberTicker from '$lib/component/NumberTicker.svelte'
	import type { PreciseData, WebSocketData } from '$lib/type'
	import { cn } from '$lib/utils'
	import KeyOverlay from '$lib/component/KeyOverlay.svelte'

	let currentPP = $state(0)
	let maxPP = $state(0)
	let menuPP = $state(0)

	let currentCombo = $state(0)
	let maxCombo = $state(0)

	let hit100 = $state(0)
	let hit50 = $state(0)
	let hit0 = $state(0)
	let hitSB = $state(0)

	let k1Count = $state(0)
	let k1IsPressed = $state(false)
	let k2Count = $state(0)
	let k2IsPressed = $state(false)

	let inGame = $state(false)
	let inMenu = $state(false)
	let comboBreak = $state(false)

	const socket = new reconnectingWebsocket(
		'ws://127.0.0.1:24050/websocket/v2',
	)

	socket.onmessage = (event) => {
		const data = JSON.parse(event.data) as WebSocketData

		// console.log(data)

		inGame = data.state.name === 'play'
		inMenu = data.state.name === 'selectPlay'

		currentCombo = data.play.combo.current
		maxCombo = data.play.combo.max

		currentPP = data.play.pp.current
		maxPP = data.play.pp.fc
		menuPP = data.performance.accuracy[100]

		hit100 = data.play.hits[100]
		hit50 = data.play.hits[50]
		hit0 = data.play.hits[0]
		hitSB = data.play.hits.sliderBreaks

		if (data.play.hits.sliderBreaks > 0 || data.play.hits[0] > 0) {
			comboBreak = true
		} else {
			comboBreak = false
		}
	}

	const preciseSocket = new reconnectingWebsocket(
		'ws://127.0.0.1:24050/websocket/v2/precise',
	)

	preciseSocket.onmessage = (event) => {
		const data = JSON.parse(event.data) as PreciseData

		k1Count = data.keys.k1.count
		k2Count = data.keys.k2.count
		k1IsPressed = data.keys.k1.isPressed
		k2IsPressed = data.keys.k2.isPressed
	}
</script>

<main class="h-screen w-screen">
	<div
		class={cn(
			'absolute right-[500px] top-64 text-3xl transition duration-1000 ease-in-out',
			inMenu ? 'opacity-100' : 'opacity-0',
		)}>
		<div
			class="flex w-fit min-w-[100px] items-center justify-center rounded-lg bg-[#161616] px-4 py-1 text-white">
			<div class="flex items-center gap-1 font-bold">
				<span>
					<NumberTicker value={menuPP} />
				</span>
				<span class="text-[#5d3fd3]">pp</span>
			</div>
		</div>
	</div>
	<div
		class={cn(
			'absolute right-8 top-80 h-64 w-96 text-3xl transition duration-1000 ease-in-out',
			inGame ? 'opacity-100' : 'opacity-0',
		)}>
		<KeyOverlay
			key={'k1'}
			isPressed={k1IsPressed}
			count={k1Count}
			class="top-0" />
		<KeyOverlay
			key={'k2'}
			isPressed={k2IsPressed}
			count={k2Count}
			class="top-16" />
	</div>
	<div
		class={cn(
			'absolute right-8 top-64 text-3xl transition duration-1000 ease-in-out',
			inGame ? 'opacity-100' : 'opacity-0',
		)}>
		<div
			class="w-fit rounded-lg bg-[#161616] px-4 pb-1 pt-2 text-white">
			<div class="flex items-center gap-4 font-bold">
				<div class="h-full border-t-2 border-green-500 px-1">
					{hit100}
				</div>
				<div class="h-full border-t-2 border-yellow-500 px-1">
					{hit50}
				</div>
				<div class="h-full border-t-2 border-red-500 px-1">
					{hit0}
				</div>
				<div class="h-full border-t-2 border-gray-500 px-1">
					{hitSB}
				</div>
			</div>
		</div>
	</div>
	<div
		class={cn(
			'absolute bottom-2 right-[calc(50%+10rem)] text-2xl transition duration-1000 ease-in-out',
			inGame ? 'opacity-100' : 'opacity-0',
		)}>
		<div
			class="w-fit -skew-x-[20deg] rounded-lg bg-[#161616] px-4 py-1 text-white">
			<div class="flex skew-x-[20deg] items-center gap-1 font-bold">
				<span>
					<NumberTicker value={currentCombo} />
				</span>
				<span class="text-[#5d3fd3]">x</span>
			</div>
		</div>
	</div>
	<div
		class={cn(
			'absolute bottom-2 left-[calc(50%+10rem)] text-2xl transition duration-1000 ease-in-out',
			inGame ? 'opacity-100' : 'opacity-0',
		)}>
		<div
			class="w-fit skew-x-[20deg] rounded-lg bg-[#161616] px-4 py-1 text-white">
			<div class="flex -skew-x-[20deg] items-center gap-1 font-bold">
				<span>
					<NumberTicker value={currentPP} />
				</span>
				{#if comboBreak}
					<span>/</span>
					<span>
						{maxPP.toFixed(0)}
					</span>
				{/if}
				<span class="text-[#5d3fd3]">pp</span>
			</div>
		</div>
	</div>
</main>
