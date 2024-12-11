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
	.onAfterHandle(({ request, set }) => {
    // Only process CORS requests
    if (request.method !== "OPTIONS") return;

    const allowHeader = set.headers["Access-Control-Allow-Headers"];
    if (allowHeader === "*") {
      set.headers["Access-Control-Allow-Headers"] =
        request.headers.get("Access-Control-Request-Headers") ?? "";
    }
  })
	.use(Uploads)
	.use(Workspace)
	.use(Report)
	.use(cors({
		origin: 'http://localhost:3000', // Explicitly set the exact origin
		methods: ['GET', 'POST', 'OPTIONS'], // Add OPTIONS method
		allowedHeaders: [
			'Content-Type', 
			'Authorization', 
			'Access-Control-Allow-Origin'
		],
		credentials: true,
		exposeHeaders: [
			'Content-Type', 
			'Content-Disposition'
		]
	}))
	.listen(8080);

console.log(
	`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
