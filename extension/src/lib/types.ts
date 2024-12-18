export type Tab = {
  id: string;
  name: string;
};

export type KeyboardAction = {
  name: string;
  defaultKey: string;
  action: () => void;
  inject: (el: HTMLElement) => void;
};

export type KeyboardArea = {
  id: string;
  inject: (el: HTMLElement) => void;
  actions: KeyboardAction[];
};
