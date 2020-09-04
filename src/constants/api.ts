import config from "@/assets/config.json";

export const CALLBACK_ON_GOOGLE_MAP_API_LOADED = "onGoogleMapApiLoaded";

export const GOOGLE_MAP_API_URL = `https://maps.googleapis.com/maps/api/js?key=${config.google_map_api_key}&callback=${CALLBACK_ON_GOOGLE_MAP_API_LOADED}`;
