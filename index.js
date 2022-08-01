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

// Hit counter
let hit_counter_container = document.getElementById('hit_counter_container');

// Menu PP counter
let menu_counter = document.getElementById('menu_counter');
let menu_pp_max = document.getElementById('menu_pp_max');

// Variables
let tempCombo, tempPP;
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
};

socket.onmessage = (event) => {
	let data = JSON.parse(event.data),
		menu = data.menu,
		gameplay = data.gameplay;
	switch (menu.state) {
		case 0:
			bottom.style.opacity = 0;
			hit_counter_container.style.opacity = 0;
			menu_counter.style.opacity = 0;
			break;
		case 2:
			menu_counter.style.opacity = 0;
			bottom.style.opacity = 1;
			hit_counter_container.style.opacity = 1;
			// update scores
			animation.pp_max.update(gameplay.pp.fc);
			animation.h100.update(gameplay.hits[100]);
			animation.h50.update(gameplay.hits[50]);
			animation.h0.update(gameplay.hits[0]);
			animation.sb.update(gameplay.hits.sliderBreaks);
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
			break;
		case 5:
			bottom.style.opacity = 0;
			hit_counter_container.style.opacity = 0;
			menu_counter.style.opacity = 1;
			animation.menu_pp_max.update(menu.pp['100']);
			break;
		default:
			bottom.style.opacity = 0;
			hit_counter_container.style.opacity = 0;
			menu_counter.style.opacity = 1;
			animation.menu_pp_max.update(menu.pp['100']);
			break;
	}
};
