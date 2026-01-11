import { type DeepReadonly } from "@vue/reactivity";

type HeaderHeightContextType = DeepReadonly<{
  headerHeight: number;
  setHeaderHeight: (height: number) => void;
}>;

const INJECTION_KEY = Symbol() as InjectionKey<HeaderHeightContextType>;

export function provideHeaderHeight(data: HeaderHeightContextType) {
  return provide(INJECTION_KEY, data);
}

export function useHeaderHeight() {
  return inject(INJECTION_KEY, { headerHeight: 0, setHeaderHeight: () => {} });
}
