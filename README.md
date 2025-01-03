## Typing Flow

### Powerful utility for creating typing animations on your website.

- Tiny ⬇️
- Zero dependencies 🕊️
- Full TypeSafety 🔒

### Installation

```
npm i typing-flow
```

### Usage

You should make sure that at the time the animation starts, the element with the specified selector is rendered in the DOM.

```ts
import { backspace, browserRenderer, text, TypingFlow } from "typing-flow";

const flow = new TypingFlow({
  selector: ".test",
  renderer: browserRenderer(),
  loop: true,
}).commands([
  text("Hello, world!!!", {
    delay: 200,
    instant: false,
  }),
  backspace({ amount: 15, delay: 200, instant: false }),
]);

flow.start();
```

### Configuration

```ts
new TypingFlow({
  selector: ".test", // selector of animation container
  renderer: browserRenderer(), // function for displaying animation state
  loop: true, // should the animation be looped
});
```

### Renderers

TypingFlow operates on "nodes" to build a typing snapshot. Renderer is a function that should render a snapshot after processing each command. The package has several ready-made renderers.

#### Browser Renderer

Will display each character by wrapping it in a `span` with the specified classes. TypingFlow does not provide any styles. You can customize the display as you like.

```ts
type BrowserRendererConfig = {
  baseNodeClasses?: string[]; // default: typing-node
  nodeWithCursorClasses?: string[]; // default: typing-node_with-cursor
};

browserRenderer({
  baseNodeClasses: ["typing-node"],
  nodeWithCursorClasses: ["typing-node_with-cursor"],
});
```

#### Attribute Renderer

Translates the current state of the animation into the specified container attributes.

```ts
attributeRenderer<HTMLInputElement>(["placeholder", "data-text"]);
```

#### Custom Renderer

Renderer is a function like this:

```ts
const someRenderer = (
  container: HTMLElement,
  typingSnapshot: TypingSnapshot,
) => {
  // render behavior
};
```

If you want to parametrize the renderer, you can do it like this:

```ts
// definition
const someRenderer = (...args: unknown[]): RendererType => {
  return (container, typingSnapshot) => {
    // render behavior
  };
};

// usage
new TypingFlow({
  selector: ".test",
  renderer: someRenderer(...args),
});
```

### API

TypingFlow has a very simple API.

#### Commands

You can create a flow with the `commands` method. It accepts an array of commands.

```ts
new TypingFlow({
  selector: ".test",
  renderer: browserRenderer(),
}).commands([
  // array of commands
]);
```

**Supported commands:**

- `text`
- `backspace`
- `del`
- `cursorLeft`
- `cursorRight`
- `delay`

#### Hooks

You can do anything during the animation's lifecycle with **hooks**.
TypingFlow supports the following hooks:

- `onStart`
- `onFinish`

```ts
new TypingFlow({
  selector: ".test",
  renderer: browserRenderer(),
})
  .on("start", () => {
    console.log("Animation started");
  })
  .on("finish", () => {
    console.log("Animation finished");
  });
```

Also you can apply many callbacks to the same hook like this:

```ts
new TypingFlow({
  selector: ".test",
  renderer: browserRenderer(),
})
  .on("start", () => {
    console.log("Animation started");
  })
  .on("start", () => {
    console.log("Animation started again");
  });
```

### Types

TypingFlow exports the following types:

```ts
type TypingSnapshot = {
  content: Array<string>;
  cursorPosition: number;
};

type RendererType = (
  container: HTMLElement,
  typingSnapshot: TypingSnapshot,
) => void;
```
