export const getBrowserNodeTagView = (browserNode: HTMLElement) => {
  const tagName = browserNode.tagName.toLowerCase();
  let openPart = tagName;

  for (const attribute of browserNode.attributes) {
    openPart += ` ${attribute.name}="${attribute.value}"`;
  }

  return { open: `<${openPart}>`, close: `</${tagName}>` };
};

export const typingFlowDOMParser = new DOMParser();

export const isTagString = (str: string) =>
  str.startsWith("<") && str.endsWith(">");
