import { response } from "./response";

/**
 
  Fetch long-lived Facebook token
  /oauth

**/
export async function oAuth(token) {
  try {
    let oauth = await (await fetch(
      `https://graph.facebook.com/v3.1/oauth/access_token?grant_type=fb_exchange_token&client_id=${
        process.env.FB_CLIENT_ID
      }&client_secret=${
        process.env.FB_CLIENT_SECRET
      }&fb_exchange_token=${token.slice(7)}`
    )).json();
    if (oauth.error)
      throw {
        path: "/oauth",
        error: oauth.error.message.toLowerCase(),
        code: "oauth"
      };

    let data = {
      token: oauth.access_token
    };

    return response(data);
  } catch (e) {
    return response(e);
  }
}
