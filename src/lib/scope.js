'use strict';

import { PubSub } from './pubsub';
import { Observer, ObjectObserver } from './observer';
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
	if(!instance.$trackedProperties){
		instance.$trackedProperties = [];
	}

	Object.keys(instance).forEach(key => {

		if(key !== '$trackedProperties' && instance[key] && typeof instance[key] === "object"){
			console.log('Observing instance key', key);
			instance[key] = ObjectObserver(instance[key], ()=>{
			 	PubSub.publish(_chanel,instance);
			})
			instance.$trackedProperties.push(key);
		}

	});

	return Observer(instance, ()=>{
		PubSub.publish(_chanel,instance);
	})
}

export { Scope }
