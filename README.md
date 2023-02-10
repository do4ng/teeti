# teeti

Box for nodejs

```
   ┌───────────────────── notice ──────────────────────┐
   │                                                   │
   │                    Hello World                    │
   │                                                   │
   └───────────────────────────────────────────────────┘
```

## Installation

```bash
npm install teeti
```

## Usage

```ts
const { box } = require('teeti');

console.log(box('Hello World'));
/*
┌───────────┐
│Hello World│
└───────────┘
*/
console.log(box('Hello World', { title: 'abc' }));
/*
┌────abc────┐
│Hello World│
└───────────┘
*/
```

## Options

### title

- type: `string`

### titlePadding

- type: `number`

```js
console.log(box('Hello World', { title: 'abc', titlePadding: 1 }));
/*
┌─── abc ───┐
│Hello World│
└───────────┘
*/
```

### titleAlign

- type: `string`
- default: `center`

```
- left
┌abc────────┐
│Hello World│
└───────────┘
- center
┌────abc────┐
│Hello World│
└───────────┘
- right
┌────────abc┐
│Hello World│
└───────────┘
```

### textAlign

- type: `string`
- default: `left`

```js
console.log(box('Hello World', { textAlign: 'left', minWidth: 25 }));
console.log(box('Hello World', { textAlign: 'center', minWidth: 25 }));
console.log(box('Hello World', { textAlign: 'right', minWidth: 25 }));

/*
┌───────────────────────┐
│Hello World            │
└───────────────────────┘
┌───────────────────────┐
│      Hello World      │
└───────────────────────┘
┌───────────────────────┐
│            Hello World│
└───────────────────────┘
*/
```

### padding

- type: `number`

```js
console.log(box('Hello World', { padding: 1 }));

/*
┌─────────────┐
│             │
│ Hello World │
│             │
└─────────────┘
*/
```
