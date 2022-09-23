# React-Hooks

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

Hacemos esto al incluir una función de retorno al final del *useEffect* Hook.

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

  return () => clearTimeout(timer)
  }, []);

  return <h1>I've rendered {count} times!</h1>;
}
```
## useContext

React Context es una forma de administrar el estado globalmente. 

Se puede usar junto con *useState* Hook para compartir el estado entre componentes profundamente anidados más fácilmente que con *useState* solo.

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

Para crear un context, debe importar *createContext* e
inicializarlo:

```javascript
import { useState, createContext } from "react";
import ReactDOM from "react-dom/client";

const UserContext = createContext()
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

Para usar el Context en un componente secundario, necesitamos acceder a él usando el *UseContext* Hook.

Primero, incluya *useContext* en la declaración de importación:

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






