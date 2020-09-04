import { CALLBACK_ON_GOOGLE_MAP_API_LOADED } from "@/constants/api";

export declare global {
  interface Window {
    google: any;
    [CALLBACK_ON_GOOGLE_MAP_API_LOADED]: () => void;
  }
}
