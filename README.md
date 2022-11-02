# React-Hooks

[General Info](#general-info)
- [React-Hooks](#react-hooks)
  - [useState](#usestate)
  - [useEffect](#useeffect)
  - [useContext](#usecontext)
  - [useRef](#useref)
  - [useMemo](#usememo)
  - [useReducer](#usereducer)
  - [useCallback](#usecallback)
  - [useId](#useid)
  - [useLayoutEffect](#uselayouteffect)
  
## useState

El useState Hook de React nos permite rastrear el estado en un componente de función. El estado generalmente se refiere a datos o propiedades que deben rastrearse en una aplicación.

**Inicializar useState**

Inicializamos nuestro estado llamando a useState en nuestro componente de función. useState acepta un estado inicial y devuelve dos valores:

- El estado actual.
- Una función que actualiza el estado.

```javascript
import { useState } from "react";

function FavoriteColor() {
  const [color, setColor] = useState("");
}
```

El primer valor, _color_, es nuestro estado actual. El segundo valor, _setColor_, es la función que se utiliza para actualizar nuestro estado. Por último, establecemos el estado inicial en una cadena vacía: _useState("")_.

**Leer el state**

Ahora podemos incluir nuestro estado en cualquier parte de nuestro componente.

```javascript
import { useState } from "react";
import ReactDOM from "react-dom/client";

function FavoriteColor() {
  const [color, setColor] = useState("red");

  return <h1>My favorite color is {color}!</h1>;
}
```

**Actualizar el state**

Para actualizar nuestro estado, usamos nuestra función de actualización de estado.

```javascript
import { useState } from "react";
import ReactDOM from "react-dom/client";

function FavoriteColor() {
  const [color, setColor] = useState("red");

  return (
    <>
      <h1>My favorite color is {color}!</h1>
      <button type="button" onClick={() => setColor("blue")}>
        Blue
      </button>
    </>
  );
}
```

**¿Qué puede retener el estado?**

UseState Hook se puede usar para realizar un seguimiento de cadenas, números, booleanos, matrices, objetos y cualquier combinación de estos.

Podríamos crear Hooks de múltiples estados para rastrear valores individuales.

```javascript
import { useState } from "react";
import ReactDOM from "react-dom/client";

function Car() {
  const [brand, setBrand] = useState("Ford");
  const [model, setModel] = useState("Mustang");
  const [year, setYear] = useState("1964");
  const [color, setColor] = useState("red");

  return (
    <>
      <h1>My {brand}</h1>
      <p>
        It is a {color} {model} from {year}.
      </p>
    </>
  );
}
```

¡O simplemente podemos usar un estado e incluir un objeto en su lugar!

```javascript
import { useState } from "react";
import ReactDOM from "react-dom/client";

function Car() {
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red",
  });

  return (
    <>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
    </>
  );
}
```

**Actualización de objetos y matrices en estado**

Cuando se actualiza el estado, se sobrescribe todo el estado.

¿Y si solo queremos actualizar el color de nuestro coche?

Si solo llamamos a _setCar({color: "blue"})_, esto eliminaría la marca, el modelo y el año de nuestro estado.

Podemos usar el operador de propagación(...) de JavaScript para ayudarnos.

```javascript
import { useState } from "react";
import ReactDOM from "react-dom/client";

function Car() {
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red",
  });

  const updateColor = () => {
    setCar((previousState) => {
      return { ...previousState, color: "blue" };
    });
  };

  return (
    <>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
      <button type="button" onClick={updateColor}>
        Blue
      </button>
    </>
  );
}
```

Como necesitamos el valor actual de state, pasamos una función a nuestra función **setCar**. Esta función recibe el valor anterior.

Luego devolvemos un objeto, extendiendo el _previousState_ y sobrescribiendo solo el color.

## useEffect

_UseEffect_ Hook le permite realizar efectos secundarios en sus componentes.

Algunos ejemplos de efectos secundarios son: obtención de datos, actualización directa del DOM y temporizadores.

_useEffect_ acepta dos argumentos. El segundo argumento es opcional.

_useEffect(<función>, <dependencia>)_

Use _setTimeout()_ para contar 1 segundo después del procesamiento inicial:

```javascript
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  });

  return <h1>I've rendered {count} times!</h1>;
}
```

¡¡Pero espera!! ¡Sigue contando aunque solo debería contar una vez!

_useEffect_ se ejecuta en cada renderizado. Eso significa que cuando cambia el conteo, ocurre un renderizado, que luego desencadena otro efecto.

Esto no es lo que queremos. Hay varias formas de controlar cuándo se presentan los efectos secundarios.

Siempre debemos incluir el segundo parámetro que acepta una matriz. Opcionalmente, podemos pasar dependencias a _useEffect_ en esta matriz.

```javascript
useEffect(() => {
  //Se ejecuta en cada render
});

useEffect(() => {
  //Se ejecuta solo en el primer render
}, []);

useEffect(() => {
  //Se ejecuta en el primer render
  //Y cada vez que cambia cualquier valor de dependencia
}, [prop, state]);
```

Entonces, para solucionar este problema, solo ejecutemos este efecto en el renderizado inicial.

```javascript
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []); // <- add empty brackets here

  return <h1>I've rendered {count} times!</h1>;
}
```

Aquí hay un ejemplo de un _useEffect_ Hook que depende de una variable. Si la variable de _count_ se actualiza, el efecto se ejecutará nuevamente:

```javascript
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Counter() {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]); // <- agregue la variable count aquí

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>
    </>
  );
}
```

Algunos efectos requieren limpieza para reducir las fugas de memoria.

Se deben desechar los tiempos de espera, las suscripciones, los detectores de eventos y otros efectos que ya no se necesitan.

Hacemos esto al incluir una función de retorno al final del _useEffect_ Hook.

Limpie el temporizador al final del useEffect Hook:

```javascript
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return <h1>I've rendered {count} times!</h1>;
}
```

## useContext

React Context es una forma de administrar el estado globalmente.

Se puede usar junto con _useState_ Hook para compartir el estado entre componentes profundamente anidados más fácilmente que con _useState_ solo.

**El problema**

El estado debe estar en manos del componente principal más alto en la pila que requiere acceso al estado.

Para ilustrar, tenemos muchos componentes anidados. El componente en la parte superior e inferior de la pila necesita acceso al estado.

Para hacer esto sin contexto, necesitaremos pasar el estado como "props" a través de cada componente anidado. Esto se llama "prop drilling".

```javascript
import { useState } from "react";
import ReactDOM from "react-dom/client";

function Component1() {
  const [user, setUser] = useState("Jesse Hall");

  return (
    <>
      <h1>{`Hello ${user}!`}</h1>
      <Component2 user={user} />
    </>
  );
}

function Component2({ user }) {
  return (
    <>
      <h1>Component 2</h1>
      <Component3 user={user} />
    </>
  );
}

function Component3({ user }) {
  return (
    <>
      <h1>Component 3</h1>
      <Component4 user={user} />
    </>
  );
}

function Component4({ user }) {
  return (
    <>
      <h1>Component 4</h1>
      <Component5 user={user} />
    </>
  );
}

function Component5({ user }) {
  return (
    <>
      <h1>Component 5</h1>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}
```

Aunque los componentes 2-4 no necesitaban el estado, tenían que pasar el estado para que pudiera llegar al componente 5.

**La solución**

**Create Context**

Para crear un context, debe importar _createContext_ e
inicializarlo:

```javascript
import { useState, createContext } from "react";
import ReactDOM from "react-dom/client";

const UserContext = createContext();
```

A continuación, usaremos el Context Provider para envolver el árbol de componentes que necesitan el state Context.

**Context Provider**

Envuelva los componentes secundarios en el proveedor de contexto y proporcione el valor del estado.

```javascript
function Component1() {
  const [user, setUser] = useState("Jesse Hall");

  return (
    <UserContext.Provider value={user}>
      <h1>{`Hello ${user}!`}</h1>
      <Component2 user={user} />
    </UserContext.Provider>
  );
}
```

Ahora, todos los componentes de este árbol tendrán acceso al context del usuario.

**Use el useContext Hook**

Para usar el Context en un componente secundario, necesitamos acceder a él usando el _UseContext_ Hook.

Primero, incluya _useContext_ en la declaración de importación:

```javascript
import { useState, createContext, useContext } from "react";
```

Luego puede acceder al Context del usuario en todos los componentes:

```javascript
function Component5() {
  const user = useContext(UserContext);

  return (
    <>
      <h1>Component 5</h1>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}
```

**Ejemplo completo**

Aquí está el ejemplo completo usando React Context:

```javascript
import { useState, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";

const UserContext = createContext();

function Component1() {
  const [user, setUser] = useState("Jesse Hall");

  return (
    <UserContext.Provider value={user}>
      <h1>{`Hello ${user}!`}</h1>
      <Component2 />
    </UserContext.Provider>
  );
}

function Component2() {
  return (
    <>
      <h1>Component 2</h1>
      <Component3 />
    </>
  );
}

function Component3() {
  return (
    <>
      <h1>Component 3</h1>
      <Component4 />
    </>
  );
}

function Component4() {
  return (
    <>
      <h1>Component 4</h1>
      <Component5 />
    </>
  );
}

function Component5() {
  const user = useContext(UserContext);

  return (
    <>
      <h1>Component 5</h1>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}
```


## useRef

*UseRef* Hook le permite persistir valores entre renderizaciones. 

Se puede usar para almacenar un valor mutable que no provoca una nueva representación cuando se actualiza. 

Se puede utilizar para acceder a un elemento DOM directamente.

**No causa re-renderizaciones**

Si tratáramos de contar cuántas veces nuestra aplicación se renderiza usando el *useState* Hook, estaríamos atrapados en un bucle infinito ya que este Hook en sí mismo provoca una nueva renderización. 

Para evitar esto, podemos usar el useRef Hook.

Use *useRef* para realizar un seguimiento de los renderizados de la aplicación.

```javascript
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [inputValue, setInputValue] = useState("");
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h1>Render Count: {count.current}</h1>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

*useRef()* solo devuelve un elemento. Devuelve un Objeto llamado *current*. 

Cuando inicializamos *useRef* establecemos el valor inicial: *useRef(0)*.

Es como hacer esto: *const count = {current: 0}*. Podemos acceder al count usando *count.current*.

**Acceso a elementos DOM**

En general, queremos dejar que React maneje toda la manipulación del DOM. 

Pero hay algunos casos en los que se puede usar *useRef* sin causar problemas. 

En React, podemos agregar un atributo ref a un elemento para acceder a él directamente en el DOM.

Use useRef para enfocar la input:

```javascript
import { useRef } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const inputElement = useRef();

  const focusInput = () => {
    inputElement.current.focus();
  };

  return (
    <>
      <input type="text" ref={inputElement} />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

**Seguimiento de cambios de state**

*UseRef* Hook también se puede usar para realizar un seguimiento de los valores de state anteriores. 

Esto se debe a que podemos conservar los valores de *useRef* entre renderizaciones.

Use *useRef* para realizar un seguimiento de los valores de estado anteriores:

```javascript
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [inputValue, setInputValue] = useState("");
  const previousInputValue = useRef("");

  useEffect(() => {
    previousInputValue.current = inputValue;
  }, [inputValue]);

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h2>Current Value: {inputValue}</h2>
      <h2>Previous Value: {previousInputValue.current}</h2>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

Esta vez usamos una combinación de *useState*, *useEffect* y *useRef* para realizar un seguimiento del estado anterior. 

En *useEffect*, estamos actualizando el valor actual de *useRef* cada vez que se actualiza *inputValue* ingresando texto en el campo de entrada.


## useMemo

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

Devuelve un valor memorizado.

Pasa una función de “crear” y un arreglo de dependencias. useMemo solo volverá a calcular el valor memorizado cuando una de las dependencias haya cambiado. Esta optimización ayuda a evitar cálculos costosos en cada render.

La función pasada a *useMemo* se ejecuta durante el renderizado. No hagas nada allí que normalmente no harías al renderizar. Por ejemplo, los efectos secundarios pertenecen a *useEffect*, no *auseMemo*.

Si no se proporciona un arreglo, se calculará un nuevo valor en cada renderizado.

Puede confiar en useMemo como una optimización del rendimiento, no como una garantía semántica. En el futuro, React puede elegir “olvidar” algunos valores previamente memorizados y recalcularlos en el próximo renderizado, por ejemplo para liberar memoria para componentes fuera de pantalla. Escribe tu código para que aún funcione sin *useMemo* - y luego agrégalo para optimizar el rendimiento.

## useReducer

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

Una alternativa a *useState*. Acepta un reducer de tipo *(state, action) => newState* y devuelve el estado actual emparejado con un método *dispatch*. (Si está familiarizado con Redux, ya sabe cómo funciona).

*useReducer* a menudo es preferible a *useState* cuando se tiene una lógica compleja que involucra múltiples subvalores o cuando el próximo estado depende del anterior. *useReducer* además te permite optimizar el rendimiento para componentes que activan actualizaciones profundas, porque puedes pasar hacia abajo dispatch en lugar de callbacks.

Aquí está el ejemplo del contador de la sección *[useState]*, reescrito para usar un reductor:

```javascript
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

**Especificar el estado inicial**

Hay dos formas diferentes de inicializar el estado de *useReducer*. Puedes elegir uno u otro dependiendo de tu caso. La forma más simple para pasar el estado inicial es como un segundo argumento:

```javascript
const [state, dispatch] = useReducer(
    reducer,
    {count: initialCount}
  );
```

**Inicialización diferida**

También puedes crear el estado inicial de manera diferida. Para hacerlo, le puedes pasar una función *init* como tercer argumento. El estado inicial será establecido como *init(initialArg)*.

Esto te permite extraer la lógica para calcular el estado inicial fuera del reductor. También es útil para reiniciar el estado luego en respuesta a una acción:

```javascript
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

**Evitar un dispatch**

Si devuelves el mismo valor del estado actual desde un Hook reductor, React evitará renderizar los hijos y disparar efectos. React utiliza el algoritmo de comparación Object.is(determina si dos valores son iguales.).

Ten en cuenta que React podría aún necesitar renderizar nuevamente ese componente específico antes de evitar el renderizado. Esto no debería ser una preocupación ya que React no va “más adentro” del árbol de forma innecesaria. Si estás haciendo cálculos muy costosos mientras renderizas, puedes optimizarlos con *useMemo*.

## useCallback

```javascript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

Devuelve un callback memorizado.

Pasa un callback en línea y un arreglo de dependencias. *useCallback* devolverá una versión memorizada del callback que solo cambia si una de las dependencias ha cambiado. Esto es útil cuando se transfieren callbacks a componentes hijos optimizados que dependen de la igualdad de referencia para evitar renders innecesarias (por ejemplo, *shouldComponentUpdate*).

*useCallback(fn, deps)* es igual a *useMemo(() => fn, deps)*.

## useId

```javascript
const id = useId();
```

*useId* genera ID únicos que son estables en el servidor y el cliente.

*useId* no es para generar *kesy* en una lista. Las *keys* deben generarse a partir de sus datos.

Para un ejemplo básico, pase el *id* directamente a los elementos que la necesitan:

```javascript
function Checkbox() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Do you like React?</label>
      <input id={id} type="checkbox" name="react"/>
    </>
  );
};
```

Para varias ID en el mismo componente, agregue un sufijo usando la misma *id*:

```javascript
function NameFields() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id + '-firstName'}>First Name</label>
      <div>
        <input id={id + '-firstName'} type="text" />
      </div>
      <label htmlFor={id + '-lastName'}>Last Name</label>
      <div>
        <input id={id + '-lastName'} type="text" />
      </div>
    </div>
  );
}
```

## useLayoutEffect

La firma es idéntica a *useEffect*, pero se dispara de forma síncrona después de todas las mutaciones de DOM. Use esto para leer el diseño del DOM y volver a renderizar de forma sincrónica. Las actualizaciones programadas dentro de *useLayoutEffect* se vaciarán sincrónicamente, antes de que el navegador tenga la oportunidad de pintar.

Prefiera el useEffect estándar cuando sea posible para evitar el bloqueo de actualizaciones visuales.

Si estas migrando código de un componente de clase, recuerda que *useLayoutEffect* se activa en la misma fase que *componentDidMount* y *componentDidUpdate*. Sin embargo, recomendamos empezar con *useEffect* primero y solo intentar con *useLayoutEffect* si lo anterior causa problemas.

Si usas renderizado en el servidor, ten en cuenta que ni *useLayoutEffect* ni *useEffect* pueden ejecutarse hasta que no se haya descargado el código JavaScript. Por eso es que React advierte cuando un componente renderizado en el servidor contiene *useLayoutEffect*. Para corregirlo, puedes o bien mover la lógica a *useEffect* (si no es necesaria para el primer renderizado), o retrasar el momento de mostrar el componente hasta después de que se haya renderizado el cliente (si el HTML luciera roto, hasta que se ejecute *useLayoutEffect).

Para excluir del HTML renderizado en el servidor a un componente que necesita efectos de layout, renderízalo condicionalmente con *showChild && <Child />* y retrasa mostrarlo con *useEffect(() => { setShowChild(true); }, [])*. De esta manera, la interfaz de usuario no lucirá rota antes de la hidratación.