import type { Favorite } from "~/features/favorites/types";

export type FavoritesDict = {
  [key: NonNullable<Favorite["entityId"]>]: Favorite | undefined;
};

const INJECTION_KEY = Symbol() as InjectionKey<Ref<FavoritesDict | undefined>>;

export function provideFavoritesDict(data: Ref<FavoritesDict | undefined>) {
  return provide(INJECTION_KEY, data);
}

export function useFavoritesDict() {
  return inject(INJECTION_KEY);
}
