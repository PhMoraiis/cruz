import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { Uploads } from "./routes/Uploads";
import { Workspace } from "./routes/Workspace/RouteWorkspace";
import { Report } from "./routes/Report/RouteReport";

const app = new Elysia()
	.get("/", () => "Hello Elysia 🦊", {
		detail: {
			tags: ["Home"],
		},
	})
	.use(
		swagger({
			path: "/docs",
			documentation: {
				info: {
					title: "Cruz API SARAH",
					version: "1.0.0",
				},
				tags: [
					{
						name: "Home",
						description: "Home page",
					},
					{
						name: "Uploads",
						description: "Upload files to the server",
					},
					{
						name: "Report",
						description: "Generate simple report",
					},
					{
						name: "Workspace",
						description: "Clear workspace",
					},
				],
			},
		}),
	)
	.use(Uploads)
	.use(Workspace)
	.use(Report)
	.use(
		cors({
			origin: "*",
			methods: ["GET", "POST", "OPTIONS", "PATCH"],
			allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
			exposeHeaders: ["Content-Disposition"],
			preflight: true,
		}),
	)
	.listen(8080);

console.log(
	`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
