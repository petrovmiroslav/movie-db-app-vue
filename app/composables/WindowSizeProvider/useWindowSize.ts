type WindowSize = Pick<Window, "innerWidth" | "innerHeight">;

const INJECTION_KEY = Symbol() as InjectionKey<Ref<WindowSize>>;

export function provideWindowSize(data: Ref<WindowSize>) {
  return provide(INJECTION_KEY, data);
}

export function useWindowSize() {
  return inject(INJECTION_KEY, ref({ innerWidth: 0, innerHeight: 0 }));
}
