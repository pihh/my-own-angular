const __components__ = [];

function init(){
  // Load all components
  __components__.forEach(comp => {
    document.querySelectorAll(comp.selector).forEach(node => {
      let inst = new comp.class();
      node.innerHTML = comp.template(inst);

      Object.keys(inst.__events__)
        .forEach(type => {
          node.addEventListener(type, function(e) {
            inst.__events__[type].forEach(item => {
              if(e.target.matches(item.selector)){
                item.fn.call(inst, e);
              }
            })
          },false);
      })
    });
  });
}

function Component(config){
  config.template= _.template(config.template);
  // To decorate a class the decorator takes only 1 param
  return function(target){
    target.childComponents = [];

    config.class= target; // A própria classe passa a ser propriedade deste componente
    __components__.push(config);
  }
}

function Event(type,selector){
  return function(target, key, descriptor){
    console.log({
      target: target,
      key: key,
      descriptor: descriptor,
      type: type,
      selector: selector
    });

    if(!target.__events__) target.__events__ = {};
    if(!target.__events__[type]) target.__events__[type] = [];

    target.__events__[type].push({
      selector,
      fn: descriptor.value
    });

    return descriptor;
  }
}



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
      </ul>  `
})
class MyAppComponent{
  constructor(){
    this.todos = [];
    this.todos.push({ text: 'Get a cat' });
    this.todos.push({ text: 'Buy Milk' });
  }

  @Event('click','li')
  handleClick(e){
    console.log(e);
    let todo = this.todos.filter(todo => todo.text === e.target.innerText.trim())[0];

    todo.done = !todo.done;
  }
}


init();
alert('xxx');
