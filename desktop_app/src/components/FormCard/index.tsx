import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FileInput } from "@/components/InputFile";
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { API_URL } from "@/lib/env";

const formSchema = z.object({
	ad: z.instanceof(File).nullable(),
	bitdefender: z.instanceof(File).nullable(),
	dhcp: z.instanceof(File).nullable(),
	kace: z.instanceof(File).nullable(),
});

export function FormCard({
	onSuccessfulSubmit,
}: { onSuccessfulSubmit: () => void }) {
	const { toast } = useToast();
	const handleSubmitForm = async (
		values: z.infer<typeof formSchema>,
		onSuccessfulSubmit: () => void,
	) => {
		// Iterando sobre os valores e enviando os arquivos para o respectivo endpoint
		for (const [key, value] of Object.entries(values)) {
			if (value) {
				const formData = new FormData();
				formData.append(key, value); // Adicionando o arquivo no FormData
				formData.append("filePath", value); // Adicionando o caminho do arquivo, que pode ser o nome do arquivo
				try {
					const response = await uploadFile(key, formData); // Enviando para o endpoint baseado no campo
					console.log(`File ${key} uploaded successfully!`, response);
				} catch (error) {
					toast({
						variant: "destructive",
						title: "Upload falhou",
						description: `O upload dos arquivos falhou: ${error}`,
					});
					console.error(`Error uploading file ${key}:`, error);
				} finally {
					toast({
						variant: "success",
						title: "Upload concluído",
						description: "O upload dos arquivos foi concluído com sucesso!",
					});
				}
			}
		}
		onSuccessfulSubmit(); // Chama a função após todos os uploads
	};

	// Função para upload
	async function uploadFile(endpoint: string, formData: FormData) {
		try {
			const response = await fetch(`${API_URL}/upload/${endpoint}`, {
				method: "POST",
				body: formData, // Automatically handles headers for multipart
			});
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Server error: ${errorText}`);
			}
			return await response.json();
		} catch (error) {
			console.error(`Error uploading to ${endpoint}:`, error);
			throw error;
		}
	}

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			ad: null,
			bitdefender: null,
			dhcp: null,
			kace: null,
		},
	});

	const isFormValid = Object.values(form.watch()).every(
		(file) => file !== null,
	);

	return (
		<div className="space-y-4">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((values) =>
						handleSubmitForm(values, onSuccessfulSubmit),
					)}
					className="space-y-6 w-full"
				>
					<FormField
						control={form.control}
						name="ad"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Arquivo AD</FormLabel>
								<FormControl>
									<FileInput
										onChange={(file) => field.onChange(file)}
										value={field.value}
										accept=".csv,.txt,.xlsx,.xls"
										placeholder="Arraste ou clique para selecionar o arquivo AD"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="bitdefender"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Arquivo Bitdefender</FormLabel>
								<FormControl>
									<FileInput
										onChange={(file) => field.onChange(file)}
										value={field.value}
										accept=".csv,.txt,.xlsx,.xls"
										placeholder="Arraste ou clique para selecionar o arquivo Bitdefender"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="dhcp"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Arquivo DHCP</FormLabel>
								<FormControl>
									<FileInput
										onChange={(file) => field.onChange(file)}
										value={field.value}
										accept=".csv,.txt,.xlsx,.xls"
										placeholder="Arraste ou clique para selecionar o arquivo DHCP"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="kace"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Arquivo Kace</FormLabel>
								<FormControl>
									<FileInput
										onChange={(file) => field.onChange(file)}
										value={field.value}
										accept=".csv,.txt,.xlsx,.xls"
										placeholder="Arraste ou clique para selecionar o arquivo Kace"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
			<footer>
				<Button
					onClick={form.handleSubmit((values) =>
						handleSubmitForm(values, onSuccessfulSubmit),
					)}
					className="w-1/4"
					disabled={!isFormValid || form.formState.isSubmitting}
				>
					{form.formState.isLoading ? <Loader color="secondary" /> : "Enviar"}
				</Button>
			</footer>
		</div>
	);
}

export const Loader = ({ color }: { color: string }) => {
	return (
		<div
			className={`animate-spin rounded-full h-4 w-4 border-b-2 border-${color}`}
		/>
	);
};
