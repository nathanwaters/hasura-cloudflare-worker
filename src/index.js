import { response } from "./response";
import { fetchGQL } from "./fetchGQL";
import { gAuth } from "./gAuth";
import { oAuth } from "./oAuth";

addEventListener("fetch", event => {
  event.respondWith(handle(event.request));
});

/**

  Call function based on API request
  https://api.okhome.ai/{}

**/
async function handle(request) {
  try {
    //check if websocket and token exists
    const url = new URL(request.url),
      websocket = request.headers.get("upgrade") || false,
      token = request.headers.get("authorization") || false;
    let protocol = "";
    if (token == "false" || (!token && !websocket))
      throw {
        path: url.pathname,
        error: "access token required",
        code: "auth"
      };
    websocket ? (protocol = "wss:") : (protocol = "https:");

    switch (url.pathname) {
      case "/graphql": //fetch from Hasura
        return fetchGQL(protocol, token, request);
      case "/oauth": //fetch long-lived Facebook token
        return oAuth(token);
      case "/gauth": //verify Auth with Facebook
        return gAuth(token);
      default:
        throw { path: "/", error: "api endpoint missing", code: "api" };
    }
  } catch (e) {
    return response(e);
  }
}
