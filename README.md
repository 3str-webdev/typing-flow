## Typing Flow

### Powerful utility for creating typing animations on your website.

- Tiny ⬇️
- Zero dependencies 🕊️
- Full TypeSafety 🔒

### Installation

```
npm i typing-flow
```

### Demo

See [Basic Demo](https://codesandbox.io/p/sandbox/typing-flow-demo-7fxjg8)

### Usage

```ts
import { TypingFlow } from "typing-flow";
import { simpleBrowserRenderer } from "typing-flow/renderers";
import {
  backspace,
  cursorLeft,
  cursorRight,
  delay,
  text,
} from "typing-flow/commands";

// Step 1. Create instance
const flow = new TypingFlow({
  renderer: simpleBrowserRenderer({ selector: ".test" }),
  loop: true,
});

// Step 2. Declare animation commands
flow.commands([
  text("Hello, worldd!!!", {
    delay: 130,
    instant: false,
  }),
  delay(300),
  cursorLeft(3, { delay: 120 }),
  backspace({ amount: 1, delay: 280 }),
  delay(310),
  cursorRight(3, { instant: true }),
]);

// Step 3. Start
flow.start();
```

### Documentation

See https://typing-flow.gitbook.io/docs
