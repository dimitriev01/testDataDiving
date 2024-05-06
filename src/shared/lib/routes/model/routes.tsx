export enum EnumRoutesName {
  MAIN = "main",
  USER = "user",
}

export const routes: Record<EnumRoutesName, string> = {
  [EnumRoutesName.MAIN]: "/",
  [EnumRoutesName.USER]: "/:id",
}
