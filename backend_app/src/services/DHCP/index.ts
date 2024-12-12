import fs from 'node:fs'
import { Prisma } from '../../lib/prisma'
import { filesService } from '../Files'

export const DHCPService = {
  async formatDHCPToCSV(filePath: string): Promise<string> {
    // Lê o conteúdo do arquivo
    const text = fs.readFileSync(filePath, 'utf8')

    // Divide o conteúdo em linhas e extrai a coluna "Name", removendo duplicatas
    const uniqueNames = Array.from(
      new Set(
        text
          .split('\n')
          .map(line => {
            const values = line.trim().split('\t')
            if (values[1]) {
              return values[1].replace(/\.sarah\.br$/, '')
            }
            return null
          })
          .filter(name => name)
      )
    )

    // Formata para CSV
    const csvContent = uniqueNames.map(name => `"${name}"`).join('\n')

    return csvContent
  },

  async handlePopulateTempDHCP(filePath: File) {
  await Prisma.tempDHCP.deleteMany();
    try {
      const savedFilePath = await filesService.saveFile(filePath, 'tempDHCP')
      const csvContent = await this.formatDHCPToCSV(savedFilePath)
      const data = csvContent.split('\n').slice(1)

      for (const name of data) {
        if (name) {
          await Prisma.tempDHCP.create({
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
  }
}
