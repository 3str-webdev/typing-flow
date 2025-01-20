export type BrowserRendererConfig = {
  selector: string;
  baseNodeClasses?: string[];
  nodeWithCursorClasses?: string[];
};

export type HtmlRendererConfig = {
  selector: string;
  baseNodeClasses?: string[];
  nodeWithCursorClasses?: string[];
};

export type AttributeRendererConfig<T extends HTMLElement> = {
  selector: string;
  attributes: (keyof T | `data-${string}`)[];
}