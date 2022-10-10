// JSON wiki: https://github.com/l3lackShark/gosumemory/wiki/JSON-values
// Menu states: https://vk.cc/aA7DJJ

let socket = new ReconnectingWebSocket('ws://127.0.0.1:24050/ws');

// Bottom section
let bottom = document.getElementById('bottom');
let combo_container = document.getElementById('combo_container');
let combo_current = document.getElementById('combo_current');
let combo_suffix = document.getElementById('combo_suffix');
let pp_container = document.getElementById('pp_container');
let pp = document.getElementById('pp');
let pp_current = document.getElementById('pp_current');
let pp_separator = document.getElementById('pp_separator');
let pp_max = document.getElementById('pp_max');
let pp_suffix = document.getElementById('pp_suffix');
let h100 = document.getElementById('h100_count');
let h50 = document.getElementById('h50_count');
let h0 = document.getElementById('h0_count');
let sb = document.getElementById('sb_count');

// Hit counter
let hit_counter_container = document.getElementById('hit_counter_container');

// Menu PP counter
let menu_counter = document.getElementById('menu_counter');
let menu_pp_max = document.getElementById('menu_pp_max');

// Key overlay
let keys = document.getElementById('keys');

// Variables
let tempCombo,
	tempPP,
	tempMaxPP,
	tempH100,
	tempH50,
	tempH0,
	tempSB,
	tempKeys,
	tempMenuPP;
let combo_container_width, pp_container_width;

socket.onopen = () => {
	console.log('Successfully Connected');
};

socket.onclose = (event) => {
	console.log('Socket Closed Connection: ', event);
	socket.send('Client Closed!');
};

socket.onerror = (error) => {
	console.log('Socket Error: ', error);
};

let animation = {
	combo_current: new CountUp('combo_current', 0, 0, 0, 0.2, {
		useEasing: true,
		useGrouping: true,
		separator: ' ',
		decimal: '.',
		// suffix: "x"
	}),
	pp_current: new CountUp('pp_current', 0, 0, 0, 0.2, {
		useEasing: true,
		useGrouping: true,
		separator: ' ',
		decimal: '.',
	}),
	pp_max: new CountUp('pp_max', 0, 0, 0, 0.2, {
		useEasing: true,
		useGrouping: true,
		separator: ' ',
		decimal: '.',
		suffix: '',
	}),
	menu_pp_max: new CountUp('menu_pp_max', 0, 0, 0, 0.2, {
		useEasing: true,
		useGrouping: true,
		separator: ' ',
		decimal: '.',
		suffix: '',
	}),
	h100: new CountUp('h100_count', 0, 0, 0, 0.2, {
		useEasing: true,
		useGrouping: true,
		separator: ' ',
		decimal: '.',
		suffix: '',
	}),
	h50: new CountUp('h50_count', 0, 0, 0, 0.2, {
		useEasing: true,
		useGrouping: true,
		separator: ' ',
		decimal: '.',
		suffix: '',
	}),
	h0: new CountUp('h0_count', 0, 0, 0, 0.2, {
		useEasing: true,
		useGrouping: true,
		separator: ' ',
		decimal: '.',
		suffix: '',
	}),
	sb: new CountUp('sb_count', 0, 0, 0, 0.2, {
		useEasing: true,
		useGrouping: true,
		separator: ' ',
		decimal: '.',
		suffix: '',
	}),
	k1: new KeyOverlay('k1', 'k1Tiles', {
		speed: 0.4,
		keyTextId: 'k1Text',
	}),
	k2: new KeyOverlay('k2', 'k2Tiles', {
		speed: 0.4,
	}),
	m1: new KeyOverlay('m1', 'm1Tiles', {
		speed: 0.4,
	}),
	m2: new KeyOverlay('m2', 'm2Tiles', {
		speed: 0.4,
	}),
};

socket.onmessage = (event) => {
	let data = JSON.parse(event.data),
		menu = data.menu,
		gameplay = data.gameplay;
	// switch (menu.state) {
	if (menu.state == 0) {
		bottom.style.opacity = 0;
		hit_counter_container.style.opacity = 0;
		menu_counter.style.opacity = 0;
		keys.style.opacity = 0;
	} else if (menu.state == 2) {
		menu_counter.style.opacity = 0;
		bottom.style.opacity = 1;
		hit_counter_container.style.opacity = 1;
		keys.style.opacity = 1;
		let combo_length = 0;
		combo_length += gameplay.combo.current.toString().length;
		combo_length *= 20;
		combo_length += 50;
		combo_container.style.width = combo_length + 'px';
		let pp_length = 0;
		pp_length += gameplay.pp.current.toString().length;
		// if combo break, show max pp
		if (gameplay.hits.sliderBreaks > 0 || gameplay.hits[0] > 0) {
			pp_length += gameplay.pp.fc.toString().length;
			pp_separator.style.opacity = '1';
			pp_separator.style.fontSize = '25px';
			pp_max.style.opacity = '1';
			pp_max.style.fontSize = '25px';
			pp_suffix.style.marginLeft = '0px';
		} else {
			pp_separator.style.opacity = '0';
			pp_separator.style.fontSize = '0px';
			pp_max.style.opacity = '0';
			pp_max.style.fontSize = '0px';
			pp_suffix.style.marginLeft = '-10px';
		}
		pp_length *= 20;
		pp_length += 65;
		pp_container.style.width = pp_length + 'px';
	} else if (menu.state == 5) {
		bottom.style.opacity = 0;
		hit_counter_container.style.opacity = 0;
		menu_counter.style.opacity = 1;
		keys.style.opacity = 0;
	} else if (menu.state == 7) {
		bottom.style.opacity = 0;
		hit_counter_container.style.opacity = 0;
		menu_counter.style.opacity = 0;
		keys.style.opacity = 0;
		// animation.menu_pp_max.update(gameplay.pp.current);
	} else {
		bottom.style.opacity = 0;
		hit_counter_container.style.opacity = 0;
		menu_counter.style.opacity = 1;
		keys.style.opacity = 0;
	}
	// update scores
	if (tempMaxPP !== gameplay.pp.fc) {
		tempMaxPP = gameplay.pp.fc;
		pp_max.innerHTML = tempMaxPP;
		animation.pp_max.update(pp_max.innerHTML);
	}
	if (tempH100 !== gameplay.hits[100]) {
		tempH100 = gameplay.hits[100];
		h100.innerHTML = tempH100;
		animation.h100.update(h100.innerHTML);
	}
	if (tempH50 !== gameplay.hits[50]) {
		tempH50 = gameplay.hits[50];
		h50.innerHTML = tempH50;
		animation.h50.update(h50.innerHTML);
	}
	if (tempH0 !== gameplay.hits[0]) {
		tempH0 = gameplay.hits[0];
		h0.innerHTML = tempH0;
		animation.h0.update(h0.innerHTML);
	}
	if (tempSB !== gameplay.hits.sliderBreaks) {
		tempSB = gameplay.hits.sliderBreaks;
		sb.innerHTML = tempSB;
		animation.sb.update(sb.innerHTML);
	}
	// update scores (odometer)
	if (tempCombo !== gameplay.combo.current) {
		tempCombo = gameplay.combo.current;
		combo_current.innerHTML = tempCombo;
		animation.combo_current.update(combo_current.innerHTML);
	}
	if (tempPP !== gameplay.pp.current) {
		tempPP = gameplay.pp.current;
		pp_current.innerHTML = tempPP;
		animation.pp_current.update(pp_current.innerHTML);
	}
	// update menu pp preview
	if (tempMenuPP !== gameplay.pp.current) {
		tempMenuPP = menu.pp['100'];
		menu_pp_max.innerHTML = tempMenuPP;
		animation.menu_pp_max.update(menu_pp_max.innerHTML);
	}
	// update keys (on different thread)
	animation.k1.update(gameplay.keyOverlay.k1);
	animation.k2.update(gameplay.keyOverlay.k2);
	animation.m1.update(gameplay.keyOverlay.m1);
	animation.m2.update(gameplay.keyOverlay.m2);
};
