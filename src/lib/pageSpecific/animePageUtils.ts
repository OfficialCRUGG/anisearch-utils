export function getAdditionalButtonsContainer() {
  let element: HTMLDivElement | null = document.querySelector("#asuAdditionalButtonsContainer");
  if (!element) {
    element = document.createElement("div") as HTMLDivElement;
    element.id = "asUtilsAdditionalButtonsContainer";
    element.style.display = "inline-flex";
    element.style.flexWrap = "wrap";
    element.style.alignItems = "center";
    element.style.gap = "5px";
    element.style.marginRight = "5px";
    const parent = document.querySelector("section#information div.showall") as HTMLDivElement;
    parent.style.display = "flex";
    parent.style.alignItems = "center";
    parent.style.justifyContent = "end";
    parent.insertBefore(element, parent.firstChild);
  }
  return element;
}

export function registerAdditionalButton(button: HTMLButtonElement | HTMLAnchorElement) {
  getAdditionalButtonsContainer().appendChild(button);
}
