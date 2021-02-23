const arrayProto = Array.prototype; // 数组原型
const arrayMethods = Object.create(arrayProto); // 具有重写方法的新数组原型
const methodsToPatch = [ // 需要重写的方法
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

methodsToPatch.forEach(method => {
  arrayMethods[method] = function (...args) {
    arrayProto[method].apply(this, args);

    let inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      // 监听插入的值
      observeArray(inserted);
    }

    console.log('update');
  };
});

function observeArray(obj) {
  for (let i = 0; i < obj.length; i++) {
    const item = obj[i];
    observer(item);
  }
}

function observer(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    Object.setPrototypeOf(obj, arrayMethods); // 只有被监听的数组才会重写原型链

    observeArray(obj);
  } else {
    for (const key in obj) {
      defineReactive(obj, key, obj[key]);
    }
  }
}

function defineReactive(obj, key, value) {
  observer(value); // 深度递归观察

  Object.defineProperty(obj, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue !== value) {
        observer(newValue); // 设置的新值也需要被监听

        value = newValue;

        console.log('update');
      }
    }
  });
}
