import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import nc from "next-connect";
import cors from "cors";

const handler = nc()
  .use(cors())
  .get(async (_: NextApiRequest, res: NextApiResponse) => {
    axios
      .get(
        "https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies",
      )
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          res.status(500).json(error.message);
        } else {
          res.status(500).json({ message: "An unexpected error occurred" });
        }
      });
  });

export default handler;
