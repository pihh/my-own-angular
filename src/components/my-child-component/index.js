import { Component } from '../../lib/component';
import { Event } from '../../lib/event';

@Component({
  selector: 'my-child-component',
  template: `
      <hr>
      <small><%= data %></small>
      `,
  scope: {
    data: '=', // data binding
    func: '@' // funtion binding
  }
})
class MyChildComponent{
  constructor(){}

  @Event('click','small')
  handleClick(e){
    if(this.func){
      this.func();
    }

    return true; // to Render because 2way Db not defined
  }
}

export { MyChildComponent };
