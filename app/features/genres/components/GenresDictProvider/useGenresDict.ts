import type { Genre } from "~/features/genres/types";

export type GenresDict = {
  [key: Genre["id"]]: Genre | undefined;
};

const INJECTION_KEY = Symbol() as InjectionKey<Ref<GenresDict | undefined>>;

export function provideGenresDict(data: Ref<GenresDict | undefined>) {
  return provide(INJECTION_KEY, data);
}

export function useGenresDict() {
  return inject(INJECTION_KEY);
}
