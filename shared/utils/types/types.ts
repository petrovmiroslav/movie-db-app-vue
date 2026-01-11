import { z } from "zod";
import type { Ref, ShallowRef, WritableComputedRef, ComputedRef } from "vue";

export const StringDateSchema = z.string().brand<"StringDate">();
export type StringDate = z.infer<typeof StringDateSchema>;

export type RefOrGetter<T> =
  | Ref<T>
  | ShallowRef<T>
  | WritableComputedRef<T>
  | ComputedRef<T>
  | (() => T);
