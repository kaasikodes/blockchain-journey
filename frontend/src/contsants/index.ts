export const APP_ROUTES = {
  home: "/",
  users: "/users",
  bank: "/bank",
  createAccount: "/create-account",
  profile: (id?: string) => {
    return {
      format: "/users/:id",
      path: `/users/${id ?? ""}`,
    };
  },
};
