import { env } from "@/config/env";
import { defineConfig } from "orval";

export default defineConfig({
	flyfood: {
		input: "./src/service/flyfood-api/open-api.json",
		output: {
			// baseUrl: `${env.clients.flyfoodApi.baseURL}`,
			mode: "split",
			client: "react-query",
			httpClient: "fetch",
			schemas: "./src/service/flyfood-api/types",
			target: "./src/service/flyfood-api/routes.ts",
		},
	},
});
