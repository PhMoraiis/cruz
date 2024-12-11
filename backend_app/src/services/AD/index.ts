// src/services/AD/ad.ts
import { Prisma } from '../../lib/prisma'
import fs from 'node:fs'
import { filesService } from '../Files'

export const ADService = {
  async handlePopulateTempAD(file: File) {
    try {
      const savedFilePath = await filesService.saveFile(file, 'tempAD');
      const csvContent = await this.formatArchiveAdToCSV(savedFilePath);
      const data = csvContent.split('\n').slice(1);
  
      for (const name of data) {
        if (name) {
          await Prisma.tempAD.create({
            data: {
              data: name.trim(),
              file_path: savedFilePath,
            },
          });
        }
      }
  
      return {
        status: 200,
        message: 'Arquivo processado e populado com sucesso!',
        data: {
          filePath: savedFilePath,
          data,
        },
      };
    } catch (error) {
      console.error('Erro no serviço ADService:', error);
      return {
        status: 500,
        message: 'Erro ao processar o arquivo',
      };
    }
  },
  

  async formatArchiveAdToCSV(filePath: string): Promise<string> {
    const text = fs.readFileSync(filePath, 'utf8')
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter((line, index) => index !== 0 && line)

    return `"Nome"\n${lines.join('\n')}`
  },
}
