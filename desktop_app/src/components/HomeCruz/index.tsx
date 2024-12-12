"use client";

import { FormCard, Loader } from "@/components/FormCard";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import LogoCruz from "../Logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useToast } from "@/hooks/use-toast";
import { API_URL } from "@/lib/env";

export function HomeCruz() {
	const [loadingComplete, setLoadingComplete] = useState(false);
	const [loadingSimple, setLoadingSimple] = useState(false);
	const [activeTab, setActiveTab] = useState("upload");
	const [format, setFormat] = useState("csv");
	const { toast } = useToast();

	const downloadReport: (type: "complete" | "simple") => Promise<void> = async (type) => {
		const setLoading = type === "complete" ? setLoadingComplete : setLoadingSimple;
		setLoading(true);
		try {
			const response = await fetch(`${API_URL}/report/${type}?format=${format}`, {
				method: "GET",
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
				},
			});

			if (!response.ok) {
				throw new Error("Erro ao gerar o relatório");
			}

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `${type}-report.${format}`);
			document.body.appendChild(link);
			link.click();
			link.parentNode?.removeChild(link);

			toast({
				variant: "success",
				title: "Download concluído",
				description: "O download do relatório foi concluído com sucesso!",
			});
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Erro ao gerar o relatório",
				description: `O download falhou: ${error}`,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto p-6 space-y-6">
			<div className="text-left">
				<LogoCruz />
				<p className="text-gray-500 text-sm">
					Com essa ferramenta você pode realizar o cruzamento de dados entre
					diferentes arquivos de gerenciamento de máquinas dentro da{" "}
					<span className="font-helveticaBD uppercase text-[#333] dashed">
						Rede SARA<span className="decoration-dashed">H</span>
					</span>
					.
				</p>
			</div>
			<Tabs
				defaultValue="upload"
				value={activeTab}
				onValueChange={setActiveTab}
				className="w-full"
			>
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="upload">Upload</TabsTrigger>
					<TabsTrigger value="download">Download</TabsTrigger>
				</TabsList>
				<TabsContent value="upload">
					<Card className="shadow-md">
						<CardHeader>
							<CardTitle>Upload</CardTitle>
							<CardDescription>
								Faça o upload dos arquivos em ordem. Clique em enviar quando
								estiver tudo pronto.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<FormCard onSuccessfulSubmit={() => setActiveTab("download")} />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="download">
					<Card className="shadow-md">
						<CardHeader>
							<CardTitle>Download</CardTitle>
							<CardDescription>
								Faça o download do arquivo clicando no botão abaixo.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="mb-4">
								<label htmlFor="format" className="block mb-2 font-helveticaBD">
									Selecione o formato:
								</label>
								<Select
									onValueChange={(value) => setFormat(value)}
									value={format}
								>
									<SelectTrigger>
										<SelectValue placeholder="Escolha o formato do arquivo" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Formato</SelectLabel>
											<SelectItem value="csv">CSV</SelectItem>
											<SelectItem value="txt">TXT</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>

							<div className="space-x-4">
								{/* Botão para baixar relatório completo */}
								<Button
									type="button"
									disabled={loadingSimple}
									onClick={() => downloadReport("complete")}
								>
									{loadingComplete ? <Loader color="secondary" /> : <Download />} Download relatório completo
								</Button>

								{/* Botão para baixar relatório simples */}
								<Button
									variant="secondary"
									type="button"
									disabled={loadingComplete}
									onClick={() => downloadReport("simple")}
								>
									{loadingSimple ? <Loader color="primary" /> : <Download />} Download relatório simples
								</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
