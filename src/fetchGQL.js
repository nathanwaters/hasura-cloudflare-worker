import { response } from "./response";
import { gAuth } from "./gAuth";

/**
 
  Fetch GraphQL request from Hasura
  /auth

**/
export async function fetchGQL(protocol, token, request) {
  try {
    const graphqlURL = protocol + process.env.GRAPHQL_ENDPOINT;

    const headers = new Headers(request.headers);
    if (protocol == "https:") {
      //non-subscription
      let auth = await (await gAuth(token)).json(); //check Facebook
      if (auth.errors)
        throw {
          path: "/graphql",
          error: auth.errors[0].message,
          code: "gauth"
        };
      for (let key in auth) {
        headers.append(key, auth[key]);
      }
      //hardcode a final check to avoid data leaks
      if (auth["x-hasura-user-id"]) {
        headers.append("x-hasura-access-key", process.env.X_HASURA_ACCESS_KEY);
      } else {
        throw { path: "/graphql", error: "user id missing", code: "gauth" };
      }
    }

    const body = await request.text();

    return fetch(graphqlURL, {
      method: "POST",
      headers: headers,
      body: body
    });
  } catch (e) {
    return response(e);
  }
}
