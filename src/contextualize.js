/** High-order component that passes its props down as context. */
export default function Contextualize() {}

Contextualize.prototype.getChildContext = function() {
	let { children, ...props } = this.props;
	return props;
};

Contextualize.prototype.render = ({ children }) => children[0];
