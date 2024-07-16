import { error } from "console";
import { resolve } from "path";

export const api = {
  login: async (
    email: string,
    password: string
  ): Promise<{ error: string; token?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email !== "evandromsantana@hotmail.com") {
          resolve({ error: "E-mail e/ou senha não batem." });
        } else {
          resolve({ error: "", token: "123" });
        }
      }, 1000);
    });
  },
  forgotPassword: async (email: string): Promise<{ error: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ error: "" });
      }, 1000);
    });
  },
};
