import { setupAPIClient } from "./api";
import { setupAPIAdmin } from "./apiAdmin";
export const api = setupAPIClient();
export const apiAdmin = setupAPIAdmin();