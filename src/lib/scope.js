'use strict';

import { PubSub } from './pubsub';
import { Observer, DeepObserver } from './observer';
import { Render } from './template';

const _chanel = 'scope:changed';

function scopeChange(instance){
	if(instance.$rendered){
		setTimeout(() =>{
		instance.$rendered = false;
		instance.render();
		},1);
	}
}

PubSub.subscribe(_chanel,(instance) => {
	// console.log('subscribing',instance);
	scopeChange(instance);
})


function Scope(instance){
	Object.keys(instance).forEach(k => {
		if(instance[k] && typeof instance[k] === "object"){
			DeepObserver(instance[k],{
				set(target, path, value, receiver) {
				   PubSub.publish(_chanel,instance);
				},
				deleteProperty(target, path) {
				   console.log('remove observed property');
				}
			})
		}

	})
	return Observer(instance, ()=>{
		PubSub.publish(_chanel,instance);
	})
}

export { Scope }
