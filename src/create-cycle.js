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
		let key, r;
		if (typeof fn==='string') {
			key = fn;
			fn = args.splice(0, 1)[0];
		}
		let p = key ? data[key] : data;
		if (typeof fn!=='function') p = fn;
		else if ( (r=fn(p, ...args))!==undefined ) p = r;
		if (key) data[key] = p;
		else data = p;
		if (!debounce) debounce = setTimeout(render, 1);
	}

	// mutation future/thunk
	// eg:	let double = mutation('value', v => v*2 )
	let mutation = (...args) => (...args2) => mutate(...args, ...args2);

	return render();
}
