var _dec, _dec2, _class, _desc, _value, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

const __components__ = [];

function init() {
  // Load all components
  __components__.forEach(comp => {
    document.querySelectorAll(comp.selector).forEach(node => {
      let inst = new comp.class();
      node.innerHTML = comp.template(inst);

      Object.keys(inst.__events__).forEach(type => {
        node.addEventListener(type, function (e) {
          inst.__events__[type].forEach(item => {
            if (e.target.matches(item.selector)) {
              item.fn.call(inst);
            }
          });
        }, false);
      });
    });
  });
}

function Component(config) {
  config.template = _.template(config.template);
  // To decorate a class the decorator takes only 1 param
  return function (target) {
    target.childComponents = [];

    config.class = target; // A própria classe passa a ser propriedade deste componente
    __components__.push(config);
  };
}

function Event(type, selector) {
  return function (target, key, descriptor) {
    console.log({
      target: target,
      key: key,
      descriptor: descriptor,
      type: type,
      selector: selector
    });

    if (!target.__events__) target.__events__ = {};
    if (!target.__events__[type]) target.__events__[type] = [];

    target.__events__[type].push({
      selector,
      fn: descriptor.value
    });

    return descriptor;
  };
}

let MyAppComponent = (_dec = Component({
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
}), _dec2 = Event('click', 'li'), _dec(_class = (_class2 = class MyAppComponent {
  constructor() {
    this.todos = [];
    this.todos.push({ text: 'Get a cat' });
    this.todos.push({ text: 'Buy Milk' });
  }

  handleClick(e) {
    console.log(e);
    let todo = this.todos.filter(todo => todo.text === e.target.innerText.trim())[0];

    todo.done = !todo.done;
  }
}, (_applyDecoratedDescriptor(_class2.prototype, 'handleClick', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleClick'), _class2.prototype)), _class2)) || _class);


init();
alert('xxx');
