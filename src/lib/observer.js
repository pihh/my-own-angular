'use strict';

/*
const Observer = function(_target, _handler) {
	const beforeProxy = new WeakMap(); // Investigate weakmaps and theyr utillity

	function _buildHandler(_path){
		return {
			set( target, key, value, reciever ){

				console.log('set', {
					target: target,
					key: key,
					value: value,
					reciever: reciever
				});

				if(typeof value === "object") {
					value = _makeProxy(value, [..._path,key]);
				}

				target[key] = value;

				if(_handler.set) {
					handler.set(target, [..._path, key], value, reciever );
				}

				return true;
			},
			deleteProperty(target, key) {
				if(Reflect.has(target,key)) {
					_deleteProxy(target,key);
					let _deleted = Reflect.deleteProperty(target, key);
					if(_deleted && _handler.deleteProperty) {
							handler.deleteProperty(target, [..._path, key]);
					}
					return deleted;
				}
				return false;
			}
		}
	}

	function _buildProxy(_obj, _path){
		for(let key of Object.keys(_obj)) {
				if(typeof _obj[key] === 'object') {
						_obj[key] = proxify(_obj[key], [..._path, key]);
				}
		}
		let p = new Proxy(obj, _buildHandler(path));
		beforeProxy.set(p, obj);
		return p;
	}

	function _deleteProxy(_obj, _key){
		if(preproxy.has(_obj[_key])) {
				obj[key] = beforeProxy.get(_obj[_key]);
				beforeProxy.delete(_obj[_key]);
		}

		for(let k of Object.keys(_obj[_key])) {
				if(typeof _obj[_key][k] === 'object') {
						unproxy(_obj[_key], k);
				}
		}
	}

	return _buildProxy(target, []);
}
*

function Observer(target, handler) {
    const preproxy = new WeakMap();

    function makeHandler(path) {
        return {
            set(target, key, value, receiver) {
                if(value && typeof value === 'object') {
                    value = proxify(value, [...path, key]);
                }
                target[key] = value;

                if(handler.set) {
                    handler.set(target, [...path, key], value, receiver);
                }
                return true;
            },

            deleteProperty(target, key) {
                if(Reflect.has(target, key)) {
                    unproxy(target, key);
                    let deleted = Reflect.deleteProperty(target, key);
                    if(deleted && handler.deleteProperty) {
                        handler.deleteProperty(target, [...path, key]);
                    }
                    return deleted;
                }
                return false;
            }
        }
    }

    function unproxy(obj, key) {
        if(preproxy.has(obj[key])) {
            // console.log('unproxy',key);
            obj[key] = preproxy.get(obj[key]);
            preproxy.delete(obj[key]);
        }

        for(let k of Object.keys(obj[key])) {
            if(typeof obj[key][k] === 'object') {
                unproxy(obj[key], k);
            }
        }

    }

    function proxify(obj, path) {
        for(let key of Object.keys(obj)) {
            if(typeof obj[key] === 'object') {
                obj[key] = proxify(obj[key], [...path, key]);
            }
        }
        let p = new Proxy(obj, makeHandler(path));
        preproxy.set(p, obj);
        return p;
    }

    return proxify(target, []);
}

let obj = {};
let proxied = createDeepProxy(obj, {
    set(target, path, value, receiver) {
        console.log('set',target);
    },

    deleteProperty(target, path) {
        console.log('delete');
    }
});

*/

// const ObjectObserver = (object, onChange) => {
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
//
// 	return new Proxy( object, handler );
// }

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

const DeepObserver = function(target, handler) {
    const preproxy = new WeakMap();

    function makeHandler(path) {
        return {
            set(target, key, value, receiver) {
                if(value && typeof value === 'object') {
                    value = proxify(value, [...path, key]);
                }
                target[key] = value;

                if(handler.set) {
                    handler.set(target, [...path, key], value, receiver);
                }
                return true;
            },

            deleteProperty(target, key) {
                if(Reflect.has(target, key)) {
                    unproxy(target, key);
                    let deleted = Reflect.deleteProperty(target, key);
                    if(deleted && handler.deleteProperty) {
                        handler.deleteProperty(target, [...path, key]);
                    }
                    return deleted;
                }
                return false;
            }
        }
    }

    function unproxy(obj, key) {
        if(preproxy.has(obj[key])) {
            // console.log('unproxy',key);
            obj[key] = preproxy.get(obj[key]);
            preproxy.delete(obj[key]);
        }

        for(let k of Object.keys(obj[key])) {
            if(typeof obj[key][k] === 'object') {
                unproxy(obj[key], k);
            }
        }

    }

    function proxify(obj, path) {
        for(let key of Object.keys(obj)) {
            if(typeof obj[key] === 'object') {
                obj[key] = proxify(obj[key], [...path, key]);
            }
        }
        let p = new Proxy(obj, makeHandler(path));
        preproxy.set(p, obj);
        return p;
    }

    return proxify(target, []);
}


export { Observer, DeepObserver }
