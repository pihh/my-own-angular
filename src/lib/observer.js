'use strict';

const ObjectObserver = (object, onChange) => {
	const handler = {
	  get: function(target, property) {
	    // property is index in this case
	    return target[property];
	  },
	  set: function(target, property, value, receiver) {

	    target[property] = value;
			onChange();
	    // you have to return true to accept the changes
	    return true;
	  }
	};

	return new Proxy( object, handler );
}

// const ObjectObserver = (array, onChange) => {
// 	const handler = {
// 	  get: function(target, property) {
// 	    // property is index in this case
// 	    return target[property];
// 	  },
// 	  set: function(target, property, value, receiver) {
//
// 	    target[property] = value;
// 			onChange();
// 	    // you have to return true to accept the changes
// 	    return true;
// 	  }
// 	};
// }

const Observer = (object, onChange) => {
	const handler = {
		defineProperty(target, property, descriptor) {
      // console.log('On change <3 - scope handeling');
			onChange();
			return Reflect.defineProperty(target, property, descriptor);
		},
		deleteProperty(target, property) {
      // console.log('On delete <3 - scope handeling');
			onChange();
			return Reflect.deleteProperty(target, property);
		}
	};

	return new Proxy(object, handler);
};

export { Observer, ObjectObserver }
