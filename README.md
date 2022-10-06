# Await it
A wrapper for async/await calls without the need of try/catch block.

If someone told you that you should `try / catch` once at the root of your application and then do your async calls anywhere in the codebase, they are wrong. You should `try / catch` every `async / await` call or use `.then() / .catch()` chainables. Better than callback hell? I think it leads to similar problem...

This module attempts to solve that nesting hell and instead provide clean and fluent api with tuple destructuring.

<br>

### Installation _(pick one)_
- `npm i @dvlden/await-it`
- `pnpm i @dvlden/await-it`
- `yarn add @dvlden/await-it`

<br>

### Usage

We'll pretend that we have some kind of `Promise` already declared globally, to avoid bulky **README** file.

```js
// Fake Global Promises
const fakeResolve = Promise.resolve({ name: 'Nenad Novakovic', age: 28 })
const fakeReject = Promise.reject(new Error('Rejection reason...'))
```

<br>

> Without TypeScript
```js
import { it } from 'await-it'

(async () => {
  const [res, err] = await it(fakeResolve);

  console.log(res) // { name: 'Nenad Novakovic', age: 28 }
  console.log(err) // null
})()

(async () => {
  const [res, err] = await it(fakeReject);

  console.log(res) // undefined
  console.log(err.message) // Rejection reason...
})
```

<br>

> With TypeScript
```ts
import { it } from 'await-it'

(async () => {
  interface User {
    name: string;
    age: number;
  }

  const [res] = await it<User>(fakeResolve);

  console.log(res) // { name: 'Nenad Novakovic', age: 28 }
})()
```

<br>

> Node Environment

```js
// Import as CommonJS
const { it } = require('await-it')

// Import as ESM 
import { it } from 'await-it'
```
