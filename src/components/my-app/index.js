import { Component } from '../../lib/component';
import { Event } from '../../lib/event';

@Component({
  selector: 'my-app',
  template: `
      <h4>My Todos:</h4>
      <ul>
        <% todos.forEach(todo => { %>
          <li style="text-decoration: <%= todo.done ? 'line-through': 'none' %>" (click)="handleClick">
            <%= todo.text %>
          </li>
        <% }) %>
      </ul>
      <my-child-component data="dataBind" func="functionBind('xxxx')">Loading....</my-child-component>
      <my-last-child-component data="dataBind" func="functionBind('xxx')">Loading....</my-last-child-component>
    `
})
class MyAppComponent{
  constructor(){
    this.todos = [];
    this.todos.push({ text: 'Get a cat' });
    this.todos.push({ text: 'Buy Milk' });
    this.dataBind = 'Data Bind ❤';
  }

  @Event('click','li')
  handleClick(e){
    console.log(e);
    // @TODO: More intuitive mapping to the click events
    let todo = this.todos.filter(todo => todo.text === e.target.innerText.trim())[0];
    todo.done = !todo.done;

    return true; // to Render because 2way Db not defined
  }

  functionBind(what){
    console.log('Data Bind Function π',what);
  }
}


export default MyAppComponent;
