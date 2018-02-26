'use strict';

const Observer = (object, onChange) => {
	const handler = {
		get(target, property, receiver) {
			try {
				return new Proxy(target[property], handler);
			} catch (err) {
				return Reflect.get(target, property, receiver);
			}
		},
		defineProperty(target, property, descriptor) {
      console.log('On change <3 - scope handeling');
			onChange();
			return Reflect.defineProperty(target, property, descriptor);
		},
		deleteProperty(target, property) {
      console.log('On delete <3 - scope handeling');
			onChange();
			return Reflect.deleteProperty(target, property);
		}
	};

	return new Proxy(object, handler);
};

export { Observer }
