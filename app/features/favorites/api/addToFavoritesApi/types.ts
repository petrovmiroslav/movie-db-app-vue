import { type Favorite } from "../../types";

export type AddToFavoritesApiParams = Pick<
  Required<Favorite>,
  "type" | "entityId"
>;
