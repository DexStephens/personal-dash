import { graphConfig } from "./microsoftAuth.config";

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export async function callMsGraph(accessToken: string) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);
  headers.append("Content-Type", "application/json");

  const options = {
    method: "GET",
    headers: headers,
  };
  const response = await fetch(graphConfig.graphMeEndpoint, options);

  const data = await response.json();

  return data;
}
