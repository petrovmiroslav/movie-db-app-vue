import type { FetchConfigurationApiResponse } from "~/features/configuration/api/fetchConfigurationApi/types";

const INJECTION_KEY = Symbol() as InjectionKey<
  Ref<FetchConfigurationApiResponse | undefined>
>;

export function provideConfiguration(
  data: Ref<FetchConfigurationApiResponse | undefined>,
) {
  return provide(INJECTION_KEY, data);
}

export function useConfiguration() {
  return inject(INJECTION_KEY);
}
