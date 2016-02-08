/** A little helper library to do FR.
 *	@param {Function} renderer	A function to perform a single render
 *	@param {Object} [data={}]	Initial data
 */
export default function createCycle(renderer, data={}) {
	let debounce;

	function render() {
		clearTimeout(debounce);
		debounce = null;
		return renderer({ mutate, mutation, ...data });
	}

	// optionally key-specific mutation of data
	// eg:	mutate('value', v => v*2 )
	function mutate(fn, ...args) {
		let key;
		if (typeof fn==='string') {
			key = fn;
			fn = args.splice(0, 1)[0];
		}
		let p = key ? data[key] : data;
		if (typeof fn==='function') p = fn(p, ...args);
		else p = fn;
		if (key) data[key] = p;
		else data = p;
		if (!debounce) debounce = setTimeout(render, 1);
	}

	// mutation future/thunk
	// eg:	let double = mutation('value', v => v*2 )
	let mutation = (...args) => () => mutate(...args);

	return render();
}
