import { add } from '../add';

describe('add()', function(){
	it('add two numbers', function(){
		expect(add(2, 3)).toEqual(5);
	})

	it('doesnot add the third number', function(){
		expect(add(2,3,5)).toEqual(add(2,3));
	})
})