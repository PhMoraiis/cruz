import { Elysia } from "elysia";
import { reportService } from "../../services/Report/index";

export const Report = new Elysia().get(
  "/report/:type",
  async ({ set, params, query }) => {
    const { type } = params as { type: "complete" | "simple" };
    const { format } = query as { format: "csv" | "txt" };

    if (!["complete", "simple"].includes(type)) {
      throw new Error("Tipo de relatório inválido");
    }

    if (!["csv", "txt"].includes(format)) {
      throw new Error("Formato de relatório inválido");
    }

    // Gera o relatório
    const fileData = await reportService.generateReport({ type, format });

    // Configura cabeçalhos para o download
    set.headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
      "content-type": format === "txt" ? "text/plain" : "text/csv",
      "content-disposition": `attachment; filename="${type}-report.${format}"`,
      "cache-control": "no-store",
    };

    return Buffer.from(fileData, "utf-8");
  }
);