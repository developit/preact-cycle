/** High-order component that passes its props down as context. */
export default function Contextualize() {}

Contextualize.prototype.getChildContext = function() {
	let { children, ...context } = this.props;
	return context;
};

Contextualize.prototype.render = ({ children }) => children[0];
