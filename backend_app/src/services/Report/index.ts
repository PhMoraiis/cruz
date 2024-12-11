import { Prisma } from "../../lib/prisma";

export const reportService = {
	async populateNameColumn() {
		const tempAD = await Prisma.tempAD.findMany({
			select: {
				data: true, // Ensure you're selecting the correct field
			},
		});
		const tempBIT = await Prisma.tempBIT.findMany({
			select: {
				data: true,
			},
		});
		const tempDHCP = await Prisma.tempDHCP.findMany({
			select: {
				data: true,
			},
		});
		const tempKace = await Prisma.tempKACE.findMany({
			select: {
				data: true,
			},
		});

		// Combina todos os nomes em um único array
		const allNames = [
			...tempAD.map((item) => item.data),
			...tempBIT.map((item) => item.data),
			...tempDHCP.map((item) => item.data),
			...tempKace.map((item) => item.data),
		];

		// Filtra nomes únicos que não são nulos
		const uniqueNames = [...new Set(allNames)].filter((name) => name !== null);

		// Insere todos os nomes únicos na tabela report
		for (const name of uniqueNames) {
			if (name) {
				// Verifica se o nome não é nulo
				await Prisma.report.create({
					data: {
						name: name,
						ad: false,
						dhcp: false,
						bit: false,
						kace: false,
					},
				});
			}
		}
	},

	// TODO: Realizar o filtro da coluna "name" da tabela report com os dados das tabelas tempAD, tempDHCP, tempBit e tempKace
	async filterNameColumn() {
		const tempAD = await Prisma.tempAD.findMany({
			select: {
				data: true,
			},
		});
		const tempDHCP = await Prisma.tempDHCP.findMany({
			select: {
				data: true,
			},
		});
		const tempBit = await Prisma.tempBIT.findMany({
			select: {
				data: true,
			},
		});
		const tempKace = await Prisma.tempKACE.findMany({
			select: {
				data: true,
			},
		});

		console.log("Filtrando dados...");

		for (const tempADItem of tempAD) {
			if (tempADItem.data) {
				await Prisma.report.updateMany({
					where: { name: tempADItem.data },
					data: { ad: true },
				});
			}
		}

		// Filtra todos os nomes da tabela report com os dados das tabelas tempAD, tempDHCP, tempBit e tempKace
		for (const tempDHCPItem of tempDHCP) {
			if (tempDHCPItem.data) {
				await Prisma.report.updateMany({
					where: { name: tempDHCPItem.data },
					data: { dhcp: true },
				});
			}
		}

		for (const tempBitItem of tempBit) {
			if (tempBitItem.data) {
				await Prisma.report.updateMany({
					where: { name: tempBitItem.data },
					data: { bit: true },
				});
			}
		}

		for (const tempKaceItem of tempKace) {
			if (tempKaceItem.data) {
				await Prisma.report.updateMany({
					where: { name: tempKaceItem.data },
					data: { kace: true },
				});
			}
		}
	},

	async generateReport({
		type,
		format,
	}: {
		type: "complete" | "simple";
		format: "csv" | "txt";
	}): Promise<string> {
		await Prisma.report.deleteMany();
		await this.populateNameColumn();
		await this.filterNameColumn();

		const filter =
			type === "simple"
				? {
						OR: [
							{ ad: false },
							{ dhcp: false },
							{ bit: false },
							{ kace: false },
						],
					}
				: {};

		const reports = await Prisma.report.findMany({ where: filter });

		if (!["csv", "txt"].includes(format)) {
			throw new Error("Formato não suportado");
		}

		// Gera o conteúdo do relatório
		let content =
			"Nome,Presente em AD,Presente em DHCP,Presente em BitDefender,Presente em Kace\n";
		for (const report of reports) {
			content += `${report.name},${report.ad},${report.dhcp},${report.bit},${report.kace}\n`;
		}

		return content;
	},
};
