const satellitesPositions = {
	kenobi: [-50, 1],
	skywalker: [0, 2],
	sato: [40, 3]
}


const getLocation = function(distances) {

	const x1 = satellitesPositions.kenobi[0];
				y1 = satellitesPositions.kenobi[1];

	const x2 = satellitesPositions.skywalker[0];
				y2 = satellitesPositions.skywalker[1];

	const x3 = satellitesPositions.sato[0];
				y3 = satellitesPositions.sato[1];

	const r1 = distances[0];
				r2 = distances[1];
				r3 = distances[2];

	A = ((-2)*x1 + 2*x2);
	B = ((-2)*y1 + 2*y2);
	C = (r1**2) - (r2**2) - (x1**2) + (x2**2) - (y1**2) + (y2**2);
	
	D = ((-2)*x2 + 2*x3);
	E = ((-2)*y2 + 2*y3);
	F = (r2**2) - (r3**2) - (x2**2) + (x3**2) - (y2**2) + (y3**2);

	x = (C*E - F*B) / (E*A - B*D);
	y = (C*D - A*F) / (B*D - A*E);

	const position = [x.toFixed(2), y.toFixed(2)];

	return position
}

const getMessage = function(messages){

	let mess = '';

	
	
	return mess;

	
}

// console.log(getLocation([Math.random() * 10, Math.random() * 10, Math.random() * 10]))

const messages = [
	["este", "", "", "mensaje", ""],
	["", "es", "", "", "secreto"],
	["este", "", "un", "", ""]
];

console.log(getMessages(messages));

