export const isInstanceOfHTMLElement = (x: EventTarget | null): x is HTMLElement => {
   return x instanceof HTMLElement;
};
