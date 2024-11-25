const samplePreciseData = {
	currentTime: 4238,
	keys: {
		k1: {
			isPressed: false,
			count: 0,
		},
		k2: {
			isPressed: false,
			count: 0,
		},
		m1: {
			isPressed: false,
			count: 0,
		},
		m2: {
			isPressed: false,
			count: 0,
		},
	},
	hitErrors: [0, 10, 20],
	tourney: [
		{
			ipcId: 1,
			keys: {
				k1: {
					isPressed: false,
					count: 100,
				},
				k2: {
					isPressed: false,
					count: 100,
				},
				m1: {
					isPressed: false,
					count: 100,
				},
				m2: {
					isPressed: false,
					count: 100,
				},
			},
			hitErrors: [0, 10, 20],
		},
	],
}

export type PreciseData = typeof samplePreciseData

const sampleWebSocketData = {
	state: {
		number: 0,
		name: 'Menu',
	},
	session: {
		playTime: 2786,
		playCount: 0,
	},
	settings: {
		interfaceVisible: true,
		replayUIVisible: true,
		chatVisibilityStatus: {
			number: 0,
			name: 'Hidden',
		},
		leaderboard: {
			visible: false,
			type: {
				number: 1,
				name: 'Global',
			},
		},
		progressBar: {
			number: 1,
			name: 'Pie',
		},
		bassDensity: 0.5,
		resolution: {
			fullscreen: false,
			width: 1600,
			height: 900,
			widthFullscreen: 2560,
			heightFullscreen: 1440,
		},
		client: {
			updateAvailable: false,
			branch: 0,
			version: 'b20240121cuttingedge',
		},
		scoreMeter: {
			type: {
				number: 2,
				name: 'Error',
			},
			size: 1,
		},
		cursor: {
			useSkinCursor: true,
			autoSize: true,
			size: 1,
		},
		mouse: {
			rawInput: true,
			disableButtons: false,
			disableWheel: true,
			sensitivity: 1,
		},
		mania: {
			speedBPMScale: true,
			usePerBeatmapSpeedScale: true,
		},
		sort: {
			number: 3,
			name: 'Date',
		},
		group: {
			number: 12,
			name: 'Show_All',
		},
		skin: {
			useDefaultSkinInEditor: false,
			ignoreBeatmapSkins: true,
			tintSliderBall: true,
			useTaikoSkin: true,
			name: '-         《CK》 WhiteCat 3.0 ~ red',
		},
		mode: {
			number: 0,
			name: 'Osu',
		},
		audio: {
			ignoreBeatmapSounds: true,
			useSkinSamples: true,
			volume: {
				master: 0,
				music: 85,
				effect: 100,
			},
			offset: {
				universal: 0,
			},
		},
		background: {
			dim: 88,
			video: false,
			storyboard: false,
		},
		keybinds: {
			osu: {
				k1: 'O',
				k2: 'P',
				smokeKey: 'S',
			},
			fruits: {
				k1: 'Left',
				k2: 'Right',
				Dash: 'LeftShift',
			},
			taiko: {
				innerLeft: 'X',
				innerRight: 'C',
				outerLeft: 'Z',
				outerRight: 'V',
			},
			quickRetry: 'L',
		},
	},
	profile: {
		userStatus: {
			number: 65793,
			name: 'Connected',
		},
		banchoStatus: {
			number: 0,
			name: 'Idle',
		},
		id: 9893708,
		name: 'cyperdark',
		mode: {
			number: 0,
			name: 'Osu',
		},
		rankedScore: 2035933824,
		level: 96.28121185302734,
		accuracy: 97.47,
		pp: 3382,
		playCount: 23902,
		globalRank: 185019,
		countryCode: {
			number: 185,
			name: 'RU',
		},
		backgroundColour: 'ff010101',
	},
	beatmap: {
		time: {
			live: 2197,
			firstObject: 0,
			lastObject: 0,
		},
		status: {
			number: 0,
		},
		checksum: '54309531bb7402174969a8d837aead31',
		id: 0,
		set: -1,
		artist: 'nekodex',
		artistUnicode: 'nekodex',
		title: 'circles!',
		titleUnicode: 'circles!',
		mapper: 'peppy',
		version: '',
		stats: {
			stars: {
				live: 0,
				total: 0,
			},
			ar: {
				original: 5,
				converted: 0,
			},
			cs: {
				original: 5,
				converted: 0,
			},
			od: {
				original: 5,
				converted: 0,
			},
			hp: {
				original: 5,
				converted: 0,
			},
			bpm: {
				common: 0,
				min: 0,
				max: 0,
			},
			objects: {
				circles: 0,
				sliders: 0,
				spinners: 0,
				holds: 0,
				total: 0,
			},
			maxCombo: 0,
		},
	},
	play: {
		playerName: '',
		mode: {
			number: 0,
			name: 'Osu',
		},
		score: 0,
		accuracy: 0,
		healthBar: {
			normal: 0,
			smooth: 0,
		},
		hits: {
			'0': 0,
			'50': 0,
			'100': 0,
			'300': 0,
			geki: 0,
			katu: 0,
			sliderBreaks: 0,
		},
		hitErrorArray: [],
		combo: {
			current: 0,
			max: 0,
		},
		mods: {
			number: 0,
			name: '',
		},
		rank: {
			current: '',
			maxThisPlay: '',
		},
		pp: {
			current: 0,
			fc: 0,
			maxAchievedThisPlay: 0,
		},
		unstableRate: 0,
	},
	leaderboard: [],
	performance: {
		accuracy: {
			'95': 0,
			'96': 0,
			'97': 0,
			'98': 0,
			'99': 0,
			'100': 0,
		},
		graph: {
			series: [],
			xaxis: [],
		},
	},
	resultsScreen: {
		playerName: '',
		mode: {
			number: 0,
			name: 'Osu',
		},
		score: 0,
		accuracy: 0,
		hits: {
			'0': 0,
			'50': 0,
			'100': 0,
			'300': 0,
			geki: 0,
			katu: 0,
		},
		mods: {
			number: 0,
			name: '',
		},
		rank: 'X',
		maxCombo: 0,
		pp: {
			current: 0,
			fc: 0,
		},
		createdAt: '',
	},
	folders: {
		game: 'F:\\Games\\osu!skins',
		skin: '-         《CK》 WhiteCat 3.0 ~ red',
		songs: 'F:\\Games\\osu!skins\\Songs',
		beatmap: '',
	},
	files: {
		beatmap: 'nekodex - circles! (peppy).osu',
		background: '',
		audio: 'circles.ogg',
	},
	directPath: {
		beatmapFile:
			'1359962 onoken feat Natsukawa Yoko - Sakimori Souka\\onoken feat. Natsukawa Yoko - Sakimori Souka (ThunderBird2678) [Hyper].osu',
		beatmapBackground:
			'1359962 onoken feat Natsukawa Yoko - Sakimori Souka\\snow.jpg',
		beatmapAudio:
			'1359962 onoken feat Natsukawa Yoko - Sakimori Souka\\audio.mp3',
		beatmapFolder:
			'1359962 onoken feat Natsukawa Yoko - Sakimori Souka',
		skinFolder: 'theskin',
	},
	tourney: {
		scoreVisible: true,
		starsVisible: true,
		ipcState: 1,
		bestOF: 1,
		team: {
			left: '',
			right: '',
		},
		points: {
			left: 0,
			right: 0,
		},
		chat: [],
		totalScore: {
			left: 0,
			right: 0,
		},
		clients: [
			{
				team: 'left',
				user: {
					id: 0,
					name: '',
					country: '',
					accuracy: 0,
					rankedScore: 0,
					playCount: 0,
					globalRank: 0,
					totalPP: 0,
				},
				play: {
					playerName: '',
					mode: {
						number: 0,
						name: 'osu',
					},
					score: 0,
					accuracy: 0,
					healthBar: {
						normal: 0,
						smooth: 0,
					},
					hits: {
						'0': 0,
						'50': 0,
						'100': 0,
						'300': 0,
						geki: 0,
						katu: 0,
						sliderBreaks: 0,
					},
					hitErrorArray: [],
					mods: {
						number: 0,
						name: '',
					},
					combo: {
						current: 0,
						max: 0,
					},
					rank: {
						current: '',
						maxThisPlay: '',
					},
					pp: {
						current: 0,
						fc: 0,
						maxAchievedThisPlay: 0,
					},
					unstableRate: 0,
				},
			},
			{
				team: 'right',
				user: {
					id: 0,
					name: '',
					country: '',
					accuracy: 0,
					rankedScore: 0,
					playCount: 0,
					globalRank: 0,
					totalPP: 0,
				},
				play: {
					playerName: '',
					mode: {
						number: 0,
						name: 'osu',
					},
					score: 0,
					accuracy: 0,
					healthBar: {
						normal: 0,
						smooth: 0,
					},
					hits: {
						'0': 0,
						'50': 0,
						'100': 0,
						'300': 0,
						geki: 0,
						katu: 0,
						sliderBreaks: 0,
					},
					hitErrorArray: [],
					mods: {
						number: 0,
						name: '',
					},
					combo: {
						current: 0,
						max: 0,
					},
					rank: {
						current: '',
						maxThisPlay: '',
					},
					pp: {
						current: 0,
						fc: 0,
						maxAchievedThisPlay: 0,
					},
					unstableRate: 0,
				},
			},
		],
	},
}

export type WebSocketData = typeof sampleWebSocketData
