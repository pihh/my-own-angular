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
      <button >Change Data</button>
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
  handleClickLi(e){
    // @TODO: More intuitive mapping to the click events

    for (let todo of this.todos) {
      if(todo.text === e.target.innerText.trim()){
        todo.done = !todo.done;
      }
    }

    let todos = this.todos;
    this.todos = [];
    this.todos = todos;
    return true;
  }

  @Event('click','button')
  handleClickButton(e){
    this.dataBind = 'Changed data binding and broadcasted';
    return true;
  }

  functionBind(what){
    console.log('Data Bind Function π',what);
  }
}


export default MyAppComponent;
