import { Prisma } from '../../lib/prisma'
import fs from 'node:fs'
import { filesService } from '../Files'

export const BitdefenderService = {
  async formatArchiveBitDefenderToCSV(filePath: string): Promise<string> {
    // Lê o conteúdo do arquivo
    const text = fs.readFileSync(filePath, 'utf8')

    // Divide o conteúdo em linhas e extrai a primeira coluna, removendo duplicatas
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line)

    const firstColumn = Array.from(
      new Set(lines.map(line => line.split(',')[0]))
    )

    // Formata para CSV
    const csvContent = firstColumn.join('\n')
    return csvContent
  },

  async handlePopulateTempBitDefender(filePath: File) {
    try {
      const savedFilePath = await filesService.saveFile(filePath, 'tempBIT')
      const csvContent = await this.formatArchiveBitDefenderToCSV(savedFilePath) // Chama a função de formatação
      const data = csvContent.split('\n').slice(1) // Ignora o cabeçalho

      for (const name of data) {
        if (name) {
          await Prisma.tempBIT.create({
            data: {
              data: name.trim(),
              file_path: savedFilePath,
            },
          })
        }
      }
      return {
        status: 200,
        message: 'Arquivo processado e populado com sucesso!',
        data: {
          filePath: savedFilePath,
          data,
        },
      }
    } catch (error) {
      return {
        status: 500,
        message: 'Erro ao processar o arquivo',
      }
    }
  },
}
