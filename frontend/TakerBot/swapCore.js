const BigNumber = require('bignumber.js');
let swapMatrix = [];

export function getFee(dexIdx) {
	switch (dexIdx) {
		case 0:
			return 0.001;
		case 1:
			return 0.001;
		default:
			return 0.001;
	}
}

export function addressFinder(tokenData, tokenIdx) {
	return tokenData[tokenIdx];
}

export function indexFinder(tokenData, token) {
	return tokenData.indexOf(token);
}

export function swapUnit(amountA, amountB, dexIdx) {
	let swap = {};
	swap.dex = dexIdx;
	swap.x = BigNumber(amountA);
	swap.y = BigNumber(amountB);
	swap.k = BigNumber(amountA).multipliedBy(amountB);
	swap.fee = getFee(dexIdx);
	return swap;
}

export function estimateOut(swapUnit, amount) {
	if (BigNumber(amount).isZero()) {
		return BigNumber(0);
	}
	amount = BigNumber(amount).multipliedBy(swap.fee);
	let amountOut = BigNumber(amount).multipliedBy(swap.y).div(BigNumber(swap.x).plus(amount)).dp(0, 1);
	return amountOut;
}

export class SwapCore {
	constructor(from, to) {
		this.from = from;
		this.to = to;
		this.swap = swapUnit(1, 1);
	}

	addSwapUnit(x, y, DID = 0) {
		this.swap = swapUnit(x, y, DID);
	}
}

export class SwapRoute {
	constructor(tokenData, from) {
		this.tokenData = tokenData;
		this.row = [];
		this.from = from;
		this.size = tokenData.length;
		for (let i = 0; i < this.size; i++) {
			this.row.push({ estimateOut: 0, route: [] });
		}
	}

	copySwapRoute() {
		return new SwapRoute(this.tokenData, this.from);
	}
	initSwapRoute(amountIn) {
		for (let j = 0; j < this.size; j++) {
			if (this.from == j) continue;

			this.row[j]['estimateOut'] = estimateOut(this.swap, amountIn);
		}
	}
	concatSwapRoute(path, k) {
		var param;
		try {
			param = path[path.length - 1].split(',');
		} catch (err) {
			return [null, 0];
		}
		const from = indexFinder(this.tokenData, param[0]);
		const to = indexFinder(this.tokenData, param[1]);

		for (let k = 0; k < path.length - 1; k++) {
			const kParams = path[k].split(',');

			if ((kParams[0] == params[0] && kParams[1] == params[1]) || path[k].split(',')[0] == params[1]) {
				return [null, BigNumber(0)];
			}
		}

		const res1 = swapMatrix[from][to].estimateOut(param[2]);
		const res2 = swapMatrix[from][k].estimateOut(res1);

		let newPath = path.slice();
		newPath.push(this.tokenData[to] + ',' + this.tokenData[k] + ',' + res2);

		return [newPath, res2];
	}
	getSwapRoute(maxDepth, amountIn) {
		this.initSwapRoute(amountIn);
		let newRow = [];
		for (let i = 0; i < this.size; i++) {
			newRow.push({ estimateOut: 0, route: [] });
		}
		for (let j = 0; j < this.size; j++) {
			for (let k = 0; k < this.size; k++) {
				for (let l = 0; l < this.size; l++) {
					if (this.row[k]['path'].length == 0) {
						continue;
					}
					let addedPath = this.concatSwapRoute(this.row[k]['path'], l);
					let max = newRow[l]['estimateOut'];
					if (this.row[l]['estimateOut'] > max) {
						max = this.row[l]['estimateOut'];
						newRow[l]['estimateOut'] = this.row[l]['estimateOut'];
						newRow[l]['path'] = this.row[l]['path'];
					}
					if (addedPath[1] > max) {
						max = addedPath[1];
						newRow[l]['estimateOut'] = addedPath[1];
						newRow[l]['path'] = addedPath[0];
					}
				}
			}
			if (JSON.stringify(newRow) == JSON.stringify(this.row)) {
				break;
			}
			const temp = this.row;
			this.row = newRow;
			newRow = temp;
		}
	}
}
