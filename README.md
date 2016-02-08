# preact-cycle

[![NPM](http://img.shields.io/npm/v/preact-cycle.svg)](https://www.npmjs.com/package/preact-cycle)
[![travis-ci](https://travis-ci.org/developit/preact-cycle.svg?branch=master)](https://travis-ci.org/developit/preact-cycle)

> Minimal functional_(-reactive)_ Virtual DOM rendering using [Preact].


### Simple Example

```js
import { render, h } from 'preact-cycle';
/** @jsx h */

const App = ({ value, mutation }) => (
  <div>
    <p>Value: { value }</p>
    <button onClick={ mutation('value', v => v+1) }>Increment</button>
  </div>
);

render(App, { value: 0 });
```


### To-Do List Example

A simple example, where reducers are just pure functions.
Note that `TOGGLE` mutates state in-place, which works fine but is discouraged.

```js
import { render, h } from 'preact-cycle';
/** @jsx h */

const ADD = ({ text, todos, ...state }) => ({
	todos: todos.concat({ text }),
	text: '',
	...state
});

const TOGGLE = (state, todo) => {
	todo.done = !todo.done;
	return state;
};

const REMOVE = ({ todos, ...state }, todo) => ({
	todos: todos.filter( t => t!==todo ),
	...state
});


const TodoList = ({ text, todos, mutate, mutation }) => (
	<div>
		<form onSubmit={mutation(ADD)} action="javascript:">
			<input value={text} onInput={e => mutate('text', e.target.value)} />
			<button action="submit">Add</button>
		</form>
		<ul>
			{ todos.map( todo => (
				<li onClick={mutation(TOGGLE, todo)}>
					<input type="checkbox" checked={todo.done} readonly />
					<p>{ todo.text }</p>
					<a onClick={mutation(REMOVE, todo)}>✕</a>
				</li>
			))}
		</ul>
	</div>
);

render(TodoList, { todos: [] }, document.body);
```


---


### License

[MIT]


[Preact]: https://github.com/developit/preact
[MIT]: http://choosealicense.com/licenses/mit/
