# Await it

A wrapper for async/await calls without the need of try/catch block.

If someone told you that you should `try / catch` once at the root of your application and then do your async calls anywhere in the codebase, they are wrong. You should `try / catch` every `async / await` call or use `.then() / .catch()` chainables. Better than callback hell? I think it leads to similar problem...

This module attempts to solve that nesting hell and instead provide clean and fluent api with tuple destructuring.

<br>

## Installation

Use your favourite package manager... In my case that's `pnpm`.

```bash
pnpm i @dvlden/await-it
```

<br>

### Usage

We'll pretend that we have some kind of `Promise` already declared globally, to avoid bulky **README** file.

```ts
// Fake Global Promises
const fakeResolve = Promise.resolve({ name: 'Nenad Novakovic', age: 28 })
const fakeReject = Promise.reject(new Error('Rejection reason...'))
```

```ts
import { it } from '@dvlden/await-it'

;(async () => {
  interface User {
    name: string
    age: number
  }

  const [res] = await it<User>(fakeResolve)

  console.log(res.name) // Nenad Novakovic
})()
```

<br>

```js
// Import as CommonJS
const { it } = require('@dvlden/await-it')

// Import as ESM
import { it } from '@dvlden/await-it'
```
