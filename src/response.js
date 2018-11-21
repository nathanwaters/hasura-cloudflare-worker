/**
 
  Return response to client

**/
export async function response(data,status=200) {
  let headers = {
    "content-type": "application/json",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "authorization,content-type",
    "access-control-max-age": 86400
  };

  if (data.error)
    data = {
      errors: [{ path: data.path, error: data.error, code: data.code }]
    };
  return new Response(JSON.stringify(data), {
    status: status,
    headers: headers
  });
}
