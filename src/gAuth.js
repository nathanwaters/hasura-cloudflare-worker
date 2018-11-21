import { response } from "./response";

/**
 
  Verify auth request
  /gauth

**/
export async function gAuth(token) {
  try {
    //get Facebook ID
    let fb = await (await fetch(
      `https://graph.facebook.com/v3.1/me?fields=id&access_token=${token.slice(
        7
      )}`
    )).json();
    if (fb.error)
      throw { path: "/gauth", error: "facebook user not found", code: "gauth" };

    //get user role
    const headers = new Headers();
    headers.append("x-hasura-access-key", process.env.X_HASURA_ACCESS_KEY);
    let body = JSON.stringify({
      query: 'query{person(where:{fb_id:{_eq:"' + fb.id + '"}}){role}}'
    });

    let user = await (await fetch("https:" + process.env.GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: headers,
      body: body
    })).json();
    if (user.data.person.length == 0)
      throw { path: "/gauth", error: "okhome user not found", code: "gauth" };

    let data = {
      "x-hasura-role": user.data.person[0].role,
      "x-hasura-user-id": fb.id
    };
    return response(data);
  } catch (e) {
    return response(e,401);
  }
}
