<script module>
	export class Color {
		static fromHex(literal) {
			let c

			if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(literal)) {
				c = literal.substring(1).split('')

				if (c.length === 3) {
					c = [c[0], c[0], c[1], c[1], c[2], c[2]]
				}

				c = '0x' + c.join('')
				return new Color((c >> 16) & 255, (c >> 8) & 255, c & 255)
			}

			throw new Error('Bad Hex')
		}

		constructor(red, green, blue, alpha = 1) {
			this._red = red
			this._green = green
			this._blue = blue
			this._alpha = alpha
		}

		setAlpha(alpha) {
			this._alpha = alpha
			return this
		}

		getAlpha() {
			return this._alpha
		}

		clone() {
			return new Color(
				this._red,
				this._green,
				this._blue,
				this._alpha,
			)
		}

		toString() {
			return `rgba(${this._red}, ${this._green}, ${this._blue}, ${this._alpha})`
		}
	}

	Color.TRANSPARENT = new Color(0, 0, 0, 0)

	export class GraphFill {
		/**
		 * @param {Color} fill
		 * @param border
		 */
		constructor(fill, border = undefined) {
			this._fill = fill
			this._border =
				border !== undefined ? border : fill.clone().setAlpha(1)
			this._gradient = undefined
			this._width = undefined
			this._height = undefined
			this._colorUsed = undefined
		}

		/**
		 * @param {Color} color
		 */
		setFill(color) {
			this._fill = color
			return this
		}

		/**
		 * @param {Color} color
		 */
		setBorder(color) {
			this._border = color
			return this
		}

		create(context, chartArea) {
			const chartWidth = chartArea.right - chartArea.left
			const chartHeight = chartArea.bottom - chartArea.top

			if (
				this._gradient === undefined ||
				this._width !== chartWidth ||
				this._height !== chartHeight ||
				this._colorUsed !== this._fill.toString()
			) {
				// Create the gradient because this is either the first render or the size of the chart has changed

				this._width = chartWidth
				this._height = chartHeight
				this._gradient = context.createLinearGradient(
					0,
					chartArea.bottom,
					0,
					chartArea.top,
				)

				this._gradient.addColorStop(
					0,
					this._fill.clone().setAlpha(0.1).toString(),
				)
				// this._gradient.addColorStop(0.4, this._fill.toString())
				this._gradient.addColorStop(0, this._fill.toString())
			}

			return this._gradient
		}

		border() {
			return () => this._border.toString()
		}

		/**
		 * Creates a function for Chart config. This function can be assigned to borderColor or backgroundColor property
		 * @returns {function(*): CanvasGradient}
		 */
		background() {
			return (context) => {
				const chart = context.chart
				if (!chart.chartArea) {
					// This case happens on initial chart load
					return
				}

				return this.create(chart.ctx, chart.chartArea)
			}
		}
	}
	/**
	 * Turn filter output to Chart.js input since Chart.js does not like statically typed array...
	 *
	 * @param {Float64Array} filterOutput
	 * @return {number[]}
	 */
	export function toChartData(filterOutput) {
		return Array.from(filterOutput)
	}
	/**
	 * Find the maximum or array slice. Start is inclusive but end is exclusive
	 *
	 * @param array
	 * @param start
	 * @param end
	 * @return {number}
	 */
	export function max(array, start = 0, end = -1) {
		if (end === -1) {
			end = array.length
		}

		let maximum = Number.NEGATIVE_INFINITY

		for (let i = start; i < array.length && i < end; i++) {
			if (maximum < array[i]) {
				maximum = array[i]
			}
		}

		return maximum
	}

	/**
	 * Calculate sum of array slice. Start is inclusive but end is exclusive
	 *
	 * @param {ArrayLike<number>} array
	 * @param {number} start
	 * @param {number} end
	 * @return {number}
	 */
	function sum(array, start = 0, end = -1) {
		if (end === -1) {
			end = array.length
		}

		let s = 0

		for (let i = start; i < array.length && i < end; i++) {
			s += array[i]
		}

		return s
	}

	/**
	 * Calculate mean of array slice. Start is inclusive but end is exclusive
	 *
	 * @param {ArrayLike<number>} array
	 * @param {number} start
	 * @param {number} end
	 * @return {number}
	 */
	function mean(array, start = 0, end = -1) {
		return sum(array, start, end) / end
	}

	/**
	 * @param {ArrayLike<number>} array
	 * @param {number} windowWidth
	 * @param {boolean} doSmoothEnds
	 * @return {Float64Array}
	 */
	function smooth(array, windowWidth, doSmoothEnds) {
		const width = Math.round(windowWidth)
		if (width <= 1) {
			return new Float64Array(array)
		}

		const half = Math.round(width / 2)
		const ret = new Float64Array(array.length)

		let sumPoints = sum(array, 0, width)
		let i = 0

		for (; i < array.length - width + 1; i++) {
			ret[i + half - 1] = Math.max(0, sumPoints)
			sumPoints -= array[i]
			sumPoints += array[i + width]
		}

		ret[i + half] = Math.max(
			0,
			sum(array, array.length - width + 1, array.length),
		)

		for (let j = 0; j < ret.length; j++) {
			ret[j] /= width
		}

		if (!doSmoothEnds) {
			return ret
		}

		const start = (windowWidth + 1) / 2
		ret[0] = (array[0] + array[1]) / 2

		for (let j = 1; j < start; j++) {
			ret[j] = Math.max(0, mean(array, 0, 2 * j - 1))
			ret[array.length - j] = Math.max(
				0,
				mean(array, array.length - 2 * j + 2, array.length),
			)
		}

		ret[ret.length - 1] = Math.max(
			0,
			(array[array.length - 1] + array[array.length - 2]) / 2,
		)

		return ret
	}

	export const FAST_SMOOTH_TYPE_NO_SMOOTHING = 0
	export const FAST_SMOOTH_TYPE_RECTANGULAR = 1
	export const FAST_SMOOTH_TYPE_TRIANGULAR = 2
	export const FAST_SMOOTH_TYPE_PSEUDO_GAUSSIAN_3 = 3
	export const FAST_SMOOTH_TYPE_PSEUDO_GAUSSIAN_4 = 4
	export const FAST_SMOOTH_TYPE_MULTIPLE_WIDTH = 5

	/**
	 * Smooths array with smooth of width windowWidth.
	 * The argument "type" determines the smooth type:
	 * - If type = FAST_SMOOTH_TYPE_RECTANGULAR = 0, rectangular (sliding-average or boxcar)
	 * - If type = FAST_SMOOTH_TYPE_TRIANGULAR = 1, triangular (2 passes of sliding-average)
	 * - If type = FAST_SMOOTH_TYPE_PSEUDO_GAUSSIAN_3 = 2, pseudo-Gaussian (3 passes of sliding-average)
	 * - If type = FAST_SMOOTH_TYPE_PSEUDO_GAUSSIAN_4 = 3, pseudo-Gaussian (4 passes of same sliding-average)
	 * - If type = FAST_SMOOTH_TYPE_MULTIPLE_WIDTH = 4, multiple-width (4 passes of different sliding-average)
	 * The argument "doSmoothEnds" controls how the "ends" of the signal (the first w/2 points and the last w/2 points) are
	 * handled.
	 * - If ends=0, the ends are zero. (In this mode the elapsed time is independent of the smooth width). The fastest.
	 * - If ends=1, the ends are smoothed with progressively smaller smooths the closer to the end. (In this mode the
	 * elapsed time increases with increasing smooth widths).
	 *
	 * Version 3.0, October 2016.
	 *
	 * Copyright (c) 2024, Jan Horák
	 *
	 * Copyright (c) 2012, Thomas C. O'Haver
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 *
	 * @param array
	 * @param windowWidth
	 * @param type
	 * @param doSmoothEnds
	 * @return {Float64Array}
	 * @see https://www.mathworks.com/matlabcentral/fileexchange/19998-fast-smoothing-function
	 */
	export function fastSmooth(
		array,
		windowWidth,
		type = FAST_SMOOTH_TYPE_RECTANGULAR,
		doSmoothEnds = false,
	) {
		const a = array
		const w = windowWidth
		const e = doSmoothEnds

		switch (type) {
			case FAST_SMOOTH_TYPE_NO_SMOOTHING:
				return new Float64Array(array)

			default:
			case FAST_SMOOTH_TYPE_RECTANGULAR:
				return smooth(a, w, e)

			case FAST_SMOOTH_TYPE_TRIANGULAR:
				return smooth(smooth(a, w, e), w, e)

			case FAST_SMOOTH_TYPE_PSEUDO_GAUSSIAN_3:
				return smooth(smooth(smooth(a, w, e), w, e), w, e)

			case FAST_SMOOTH_TYPE_PSEUDO_GAUSSIAN_4:
				return smooth(
					smooth(smooth(smooth(a, w, e), w, e), w, e),
					w,
					e,
				)

			case FAST_SMOOTH_TYPE_MULTIPLE_WIDTH:
				return smooth(
					smooth(
						smooth(
							smooth(a, Math.round(1.6 * w), e),
							Math.round(1.4 * w),
							e,
						),
						Math.round(1.2 * w),
						e,
					),
					w,
					e,
				)
		}
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils'
	import Chart, { plugins } from 'chart.js/auto'
	import { onMount } from 'svelte'

	let {
		graphWebsocketData,
		graphProgress,
		show,
	}: { graphWebsocketData: any; graphProgress: any; show: boolean } =
		$props()

	const gradientDarker = new GraphFill(
		new Color(40, 40, 40, 1),
		new Color(0, 0, 0, 0),
	)
	const gradientLighter = new GraphFill(new Color(185, 234, 255, 1))

	/** @type {0 | 1 | 2 | 3 | 4 | 5} from 0 (no smoothing) to 5 (max smoothing)  */
	let graphSmoothing = 2

	let configDarker = createChartConfig(gradientDarker)
	let configLighter = createChartConfig(gradientLighter)
	let chartDarker
	let chartLighter
	let chartProgress

	const channels = new Set(['aim', 'speed'])

	$effect(() => {
		renderGraph(graphWebsocketData)
		if (chartProgress) {
			chartProgress.style.width = String(graphProgress) + '%'
		}
	})

	function createChartConfig(fill) {
		return {
			type: 'line',
			data: {
				labels: [],
				datasets: [
					{
						borderColor: fill.border(),
						borderWidth: 1.5,
						backgroundColor: fill.background(),
						data: [],
						fill: true,
					},
				],
			},
			options: {
				elements: {
					line: {
						tension: 0.4,
						cubicInterpolationMode: 'monotone',
					},
					point: {
						radius: 0,
					},
				},
				responsive: false,
				scales: {
					x: {
						display: false,
					},
					y: {
						display: false,
					},
				},
				plugins: {
					legend: {
						display: false,
					},
					tooltip: {
						enable: false,
					},
				},
			},
		}
	}

	function renderGraph(graphData) {
		// Better be sure. In case someone forgets
		if (
			chartDarker === undefined ||
			chartLighter === undefined ||
			chartProgress === undefined
		) {
			return
		}

		console.time('[GRAPH SMOOTHING]')

		// Combine channels that represent the beatmaps difficulty
		const data = new Float32Array(graphData.xaxis.length)
		for (const series of graphData.series) {
			if (!channels.has(series.name)) {
				continue
			}

			for (
				let i = 0;
				i < data.length && i < series.data.length;
				i++
			) {
				data[i] += series.data[i]
			}
		}

		// Count up samples that don't represent intro, breaks, and outro sections
		const percent = max(data) / 100
		let drainSamples = 0
		for (let i = 0; i < data.length; i++) {
			data[i] = Math.max(0, data[i])

			if (data[i] > percent) {
				drainSamples++
			}
		}

		/**
		 * Y = 0.00609 * X + 0.88911
		 *
		 * The number were not chosen randomly, but they are a result of linear regression of hand-picked points:
		 * - X = 100; Y = 1
		 * - X = 220; Y = 2
		 * - X = 500; Y = 4
		 * - X = 610; Y = 4
		 * - X = 700; Y = 5
		 * - X = 1000; Y = 8
		 * - X = 1350; Y = 10
		 * - X = 2876; Y = 18
		 * - X = 8068; Y = 50
		 *
		 * @type {number}
		 */
		const windowWidth = 0.00609 * drainSamples + 0.88911
		const smoothness = Math.max(
			FAST_SMOOTH_TYPE_NO_SMOOTHING,
			Math.min(graphSmoothing, FAST_SMOOTH_TYPE_MULTIPLE_WIDTH),
		)

		const fs = toChartData(fastSmooth(data, windowWidth, smoothness))

		console.timeEnd('[GRAPH SMOOTHING]')

		configDarker.data.datasets[0].data = fs
		configDarker.data.labels = fs

		configLighter.data.datasets[0].data = fs
		configLighter.data.labels = fs

		chartDarker.update()
		chartLighter.update()
	}

	onMount(() => {
		if (!document) return

		try {
			chartDarker = new Chart(
				document
					.querySelector('.difficulty-graph .darker')
					.getContext('2d'),
				configDarker,
			)

			chartProgress = document.querySelector(
				'.difficulty-graph .progress',
			)

			chartLighter = new Chart(
				document
					.querySelector('.difficulty-graph .lighter')
					.getContext('2d'),
				configLighter,
			)
		} catch (error) {
			console.log('error', error)
		}
	})
</script>

<div
	class={cn(
		'difficulty-graph absolute top-80 transition duration-1000 ease-in-out',
		show ? 'opacity-100' : 'opacity-0',
	)}>
	<canvas class="chart darker" width="250" height="100"></canvas>
	<div class="progress">
		<canvas class="chart lighter" width="250" height="100"></canvas>
	</div>
	<div id="hit-judgements"></div>
</div>

<style>
	.difficulty-graph {
		position: relative;
		height: 64px;
		width: 250px;
		margin: 0 10px;
	}

	.difficulty-graph > * {
		position: absolute;
		top: 0;
	}

	.difficulty-graph .progress {
		width: 250px;
		overflow: hidden;
		transition: ease 600ms;
	}

	/* .difficulty-graph .chart {
		transform: scale(1, -1);
	} */

	/* .flipped {
		transform: scaleY(-1);
	} */
</style>
