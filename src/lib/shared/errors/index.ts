export class TypingFlowError extends Error {
  public payload?: unknown;

  constructor(message: string, payload?: unknown) {
    super(message);
    this.name = "TypingFlowError";
    this.payload = payload;
  }

  static ContainerNotFoundException(selector: string) {
    return new TypingFlowError(
      `Container with selector '${selector}' not found`,
    );
  }
}
