import axios from "axios";
import { eventHandler } from "h3";

const TOKEN_TYPE = "Bearer";

const extractToken = (authHeaderValue: string) => {
  const [, token] = authHeaderValue.split(`${TOKEN_TYPE} `);
  return token;
};

export default eventHandler(async (event) => {
  const authHeaderValue = getRequestHeader(event, "authorization");
  if (typeof authHeaderValue === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }

  const extractedToken = extractToken(authHeaderValue);

  const response = await axios.get("http://localhost:9000/api/me", {
    headers: {
      Connection: "Keep-Alive",
      ContentType: "application/json",
      Authorization: `Bearer ${extractedToken}`,
    },
  });

  return response?.data;
});
