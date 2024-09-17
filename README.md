## Typing Flow

> Powerful utility for creating typing animations on your website.

- Tiny ⬇️
- Zero dependencies 🕊️
- Full TypeSafety 🔒
- Chain design 🔗

### Installation

```
npm i typing-flow
```

<br />

### Usage

```ts
import { TypingFlow } from "typing-flow";

const flow = new TypingFlow(".containerSelector", options).type("Hello, Flow!");

flow.start();
```

<br />

### Configuration

```ts
const flow = new TypingFlow(".selector", {
	mode: "lite" | "default",
	interval: 150,
	attr: "innerHTML",
	loop: false,
	charClass: ["class1", "class2", ...],
	charWithCursorClass: ["cursorClass1", "cursorClass2", ...],
});
```

- `mode` - Property for setting animation mode. In **default** mode every visible symbol wraps into `<span>`. This makes styling easier. The **lite** mode means that text will be typed as simple string. It's comfortable for simple animations and "streaming" animation to other attributes different `innerHTML`.
- `interval` - Property for setting default interval between two "presses on keys".
- `attr` - Property for setting container attribute for streaming flow. In **default** mode attr property can be `innerHTML` only. In **lite** mode you can set any attribute of flow container (value, placeholder, data-\*).
- `loop` - Animation should be replay on finish if `loop: true`.
- `charClass` - List of classes for `<span>` wrapper around symbols in **default** mode. Each of this classes will be applied to every **visible** symbol.
- `charWithCursorClass` - List of classes for `<span>` wrapper around single symbol with cursor.
  > Note: cursor always pinned to symbol. Cursor should be displayed **before** symbol with equal position.

<br />

### API

`flow.type(text: string, [options])`

Method to add text for "typing". Text can include spaces and any symbols.

```ts
flow.type("Some text");
```

<br />

`flow.config([options])`

Method to configure flow. You can setting options: `interval | attr | loop |`.

```ts
flow
	.type("First text") // typing with interval 150 (default)
	.config({
		interval: 70,
	})
	.type("Second text"); // typing with interval 70 (configured)
```

<br />

`flow.tag(tag: string, [options])`

Method to add tag to flow. Support only single tags.

```ts
flow.tag("<br />");
```

<br />

`flow.delay(ms: number)`

Method to add delay in animation. You can enter any delay in ms.

```ts
flow.delay(2000); // 2 sec
```

<br />

`flow.moveCursor(diff: number, [options])`

Method to move cursor around **visible** typed symbols. You can enter position different as int.

```ts
flow1.type("Hello").moveCursor(-2); // Hel|lo

flow2.type("Hello").moveCursor(-4).moveCursor(1); // He|llo
```

<br />

`flow.backspace(amount: number, [options])`

Method to delete symbols on **left** side of cursor position. You can enter amount of symbols for deleting as int.

```ts
flow.type("Hello").backspace(2); // Hel|
```

<br />

`flow.delete(amount: number, [options])`

Method to delete symbols on **right** side of cursor position. You can enter amount of symbols for deleting as int.

```ts
flow.type("Hello").moveCursor(-2).delete(2); // Hel|
```

<br />

`flow.on(event: "start" | "finish", cb: () => void)`

Method to add animation hook. You can subscribe and apply callbacks on some animation lifecycle events.

**Available events**: start | finish

```ts
flow
	.type("Hello")
	.on("start", () => {
		console.log("Flow Start");
	})
	.on("finish", () => {
		console.log("Flow Finish");
	});
```

<br />

### Utils

`chainedFlows(...flows: TypingFlow[])`

Utility for chaining many flows in one animation. Each flow will be start on finish prevent flow.

`loop` will be disabled for all flows in chain.

> This function return ref on **first** flow in chain.

```ts
const flow1 = new TypingFlow(".flow1").type("Hello");

const flow2 = new TypingFlow(".flow2").type("Flow");

const resultFlow = chainedFlows(flow1, flow2); // resultFlow === flow1;

resultFlow.start();
```
