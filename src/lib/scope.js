'use strict';

import { PubSub } from './pubsub';
import { Observer } from './observer';
import { Render } from './template';

const _chanel = 'scope:changed';

PubSub.subscribe(_chanel,(instance) => {
	console.log('subscribing',instance);
})

function Scope(instance){

	return Observer(instance, ()=>{
		PubSub.publish(_chanel,instance);
	})
}


export { Scope }
