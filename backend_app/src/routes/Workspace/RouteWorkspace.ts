import Elysia from "elysia"
import { WorkspaceService } from "../../services/Workspace"

export const Workspace = new Elysia()
Workspace.post("/clear", async () => {
    await WorkspaceService.clearTables()
    return {
        status: "success",
        message: "Database cleared"
    }
},
    {
    detail: {
        tags: ["Workspace"]
    }
}
)