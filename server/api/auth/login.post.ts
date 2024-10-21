import axios from "axios";
import { eventHandler } from "h3";

export default eventHandler(async (event) => {
  const body = await readBody(event);

  const response = await axios.post(
    "http://localhost:9000/api/auth/token",
    { email: body.username, password: body.password },
    {
      headers: {
        Connection: "Keep-Alive",
        ContentType: "application/json",
      },
    }
  );

  if (!response) {
    throw createError({
      statusCode: 403,
      statusMessage: "Error",
    });
  }

  return {
    token: response.data.token,
  };
});
