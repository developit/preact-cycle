import { expect } from 'chai';
import preactCycle from '../src';
/**@jsx h */

/*eslint-env mocha*/

describe('preact-cycle', () => {
	expect(preactCycle.h).to.be.a('function');
	expect(preactCycle.render).to.be.a('function');

	xit('should have proper tests', () => {});
});
