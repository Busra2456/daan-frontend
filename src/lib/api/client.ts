import { ofetch } from "ofetch";

export const api = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  	credentials: "include",
  onRequest({ options }) {
    const headers = new Headers(options.headers);


if (options.body instanceof FormData) {
headers.delete("Content-Type");
} else if (!options.headers.has("Content-Type")) {
headers.set("Content-Type", "application/json");
}
options.headers = headers;
},
  

});
