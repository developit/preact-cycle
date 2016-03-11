# preact-cycle

[![NPM](http://img.shields.io/npm/v/preact-cycle.svg)](https://www.npmjs.com/package/preact-cycle)
[![travis-ci](https://travis-ci.org/developit/preact-cycle.svg?branch=master)](https://travis-ci.org/developit/preact-cycle)

> Minimal functional _(-reactive)_ Virtual DOM rendering using [Preact].


---


### Simple Example

[**View this example on esnextb.in**](http://esnextb.in/?gist=d804796c481218488309)

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


---


### To-Do List Example

A simple example, where reducers are just pure functions.
Note that `TOGGLE` mutates state in-place, which works fine but is discouraged.

[**View this example on esnextb.in**](http://esnextb.in/?gist=9c992087c4133003a716)

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


### Component-Based Example

Normal [preact] components still work great with preact-cycle. As of `v0.4`, `mutate()` and `mutation()` are conveniently available as [context] properties, which means they are automatically passed down through the VDOM tree. For pure functional components, [context] is simply passed as a second argument.

A component-based variant of the previous To-Do List example follows, using pure functions and context.

[**View this example on Webpackbin**](http://www.webpackbin.com/EyjngQinx)

```js
import { h, render } from 'preact-cycle';
/** @jsx h */


/** initial data to populate the store */
const INITIAL_DATA = {
	todos: [
		{ text:'Type some text' },
		{ text:'...then hit [enter]' },
		{ text:'Now you\'re productive!' }
	]
};

/** Appends a new todo item */
const ADD = ({ todos, text, ...state }) => ({
	todos: todos.concat({ text }),
	text: '',
	...state
});

/** Remove the given todo item */
const REMOVE = ({ todos, ...state }, todo) => ({
	todos: todos.filter(t => t!==todo),
	...state
});

/** Toggles the given todo item as done */
const TOGGLE = (state, todo) => {
	todo.done = !todo.done;
};


/** a simple helper to derive a mutated value from an event */
let fromEvent = (prev, e) => e.target.value;


/** The todo list app */
const App = ({ text, todos }) => (
	<div id="app">
		<Form text={text} />
		<ul>{ todos.map( todo => (
			<Item todo={todo} />
		)) }</ul>
	</div>
);

/** New todo entry form */
const Form = ({ text }, { mutation }) => (
	<form onSubmit={mutation(ADD)} action="javascript:">
		<input placeholder="New item..."
			value={text}
			onInput={mutation('text', fromEvent)} />
	</form>
);

/** A single todo list item */
const Item = ({ todo }, { mutation }) => (
	<li onClick={mutation(TOGGLE, todo)} class={{ done: todo.done }}>
		<input type="checkbox" checked={todo.done} readonly />
		<a onClick={mutation(REMOVE, todo)}>✕</a>
		<p>{ todo.text }</p>
	</li>
);

// Kick off the cycle!
render(App, INITIAL_DATA, document.body);
```


---


### License

[MIT]


[Preact]: https://github.com/developit/preact
[context]: https://facebook.github.io/react/docs/context.html
[MIT]: http://choosealicense.com/licenses/mit/
