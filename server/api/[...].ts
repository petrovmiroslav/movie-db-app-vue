import { createProxyMiddleware } from "http-proxy-middleware";
import { CLIENT_SIDE_BASE_URL } from "#shared/utils/api/constants";

const target = process.env.NUXT_BASE_URL;
const V4_API_KEY = process.env.NUXT_V4_API_KEY;

const apiProxyMiddleware = createProxyMiddleware({
  pathRewrite: { [`^${CLIENT_SIDE_BASE_URL}`]: "" },
  target,
  changeOrigin: true,
  secure: false,
  headers: {
    Authorization: `Bearer ${V4_API_KEY}`,
  },
  logger: process.env["NODE_ENV"] === "development" ? console : undefined,
  on: {
    error: (_err, _req, res) => {
      if ("writeHead" in res) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Something went wrong.");
      }
    },
  },
});

export default defineEventHandler(
  async (event) =>
    new Promise(async (resolve, reject) => {
      const next = (err?: Error) => {
        event.node.res.off("close", next);
        event.node.res.off("error", next);

        return err ? reject(createError(err)) : resolve(undefined);
      };

      try {
        event.node.res.once("close", next);
        event.node.res.once("error", next);

        return apiProxyMiddleware(event.node.req, event.node.res, next);
      } catch (error) {
        next(error as Error);
      }
    }),
);
