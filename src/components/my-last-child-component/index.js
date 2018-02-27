import { Component } from '../../lib/component';
import { Event } from '../../lib/event';

@Component({
  selector: 'my-last-child-component',
  template: `
      <hr>
      <h4>Last Component <%= data %></h4>
      <my-child-component data="data" func="func">Loading....</my-child-component>
      `,
  scope: {
    data: '=', // data binding
    func: '@' // funtion binding
  }
})
class MyLastChildComponent{
  constructor(){}

  // @Event('click','h4')
  handleClick(e){
    if(this.func){
      this.func();
    }

    return true; // to Render because 2way Db not defined
  }
}

export { MyLastChildComponent }
