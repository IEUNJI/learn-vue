// 工具方法
function isObject(value) {
  return typeof value === 'object' && value !== null;
}

function hasOwn(target, key) {
  return target.hasOwnProperty(key);
}

// 全局变量
const toProxy = new WeakMap(); // 源对象 => 代理对象
const toRaw = new WeakMap(); // 代理对象 => 源对象
const effectStack = []; // 副作用函数栈
const targetsMap = new WeakMap(); // 依赖映射表

// 入口方法一：reactive
function reactive(target) {
  return createReactiveObject(target);
}

function createReactiveObject(target) {
  if (!isObject(target)) {
    return target;
  }

  const oldProxy = toProxy.get(target);
  if (oldProxy) {
    return oldProxy;
  }

  if (toRaw.has(target)) {
    return target;
  }

  const baseHandlers = {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);

      track(target, key);

      return reactive(result);
    },
    set(target, key, value, receiver) {
      const hadKey = hasOwn(target, key);
      const oldValue = target[key];

      const result = Reflect.set(target, key, value, receiver);

      if (!hadKey) {
        trigger(target, 'add', key);
      } else if (oldValue !== value) {
        trigger(target, 'set', key);
      }

      return result;
    },
    deleteProperty(target, key) {
      return Reflect.deleteProperty(target, key);
    }
  };

  const proxy = new Proxy(target, baseHandlers);

  toProxy.set(target, proxy);
  toRaw.set(proxy, target);

  return proxy;
}

// 入口方法二：effect
function effect(fn) {
  const effect = createReactiveEffect(fn);

  effect(); // 先执行一次
}

function createReactiveEffect(fn) {
  const effect = function () {
    return run(effect, fn);
  };

  return effect;
}

function run(effect, fn) {
  try {
    effectStack.push(effect);
    fn();
  } finally {
    effectStack.pop();
  }
}

function track(target, key) {
  const effect = effectStack[effectStack.length - 1];

  if (effect) {
    let depsMap = targetsMap.get(target);
    if (!depsMap) {
      targetsMap.set(target, (depsMap = new Map()));
    }

    let deps = depsMap.get(key);
    if (!deps) {
      depsMap.set(key, (deps = new Set()));
    }

    if (!deps.has(effect)) {
      deps.add(effect);
    }
  }
}

function trigger(target, type, key) {
  const depsMap = targetsMap.get(target);

  if (depsMap) {
    const deps = depsMap.get(key);
    if (deps) {
      deps.forEach(effect => {
        effect();
      });
    }
  }
}

const proxy = reactive({
  name: 'ieunji'
});

effect(() => {
  console.log('effect1', proxy.name);
});

effect(() => {
  console.log('effect2', proxy.name);
});

proxy.name = 'linzijun';
