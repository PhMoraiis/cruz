import fs from 'node:fs'
import { Prisma } from '../../lib/prisma'
import { filesService } from '../Files'

export const KaceService = {
  // Método para formatar Kace para CSV
  async formatKaceToCSV(filePath: string): Promise<string> {
    // Lê o conteúdo do arquivo
    const text = await fs.readFileSync(filePath, 'utf8')

    // Divide o conteúdo em linhas e extrai apenas a primeira coluna, removendo duplicatas
    const uniqueEntries = Array.from(
      new Set(
        text
          .split('\n')
          .map(line => {
            const values = line.trim().split(',')
            return values[0] // Retorna a primeira coluna
          })
          .filter(entry => entry)
      )
    )

    // Formata para CSV e retorna
    return uniqueEntries.join('\n')
  },

  // Método para popular o Kace temporário
  async handlePopulateTempKace(filePath: File) {
    await Prisma.tempKACE.deleteMany()
    try {
      const savedFilePath = await filesService.saveFile(filePath, 'tempKace')
      const csvContent = await this.formatKaceToCSV(savedFilePath)
      const data = csvContent.split('\n').slice(1)

      for (const name of data) {
        if (name) {
          await Prisma.tempKACE.create({
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
        message: 'Erro ao processar o arquivo.',
      }
    }
  },
}
