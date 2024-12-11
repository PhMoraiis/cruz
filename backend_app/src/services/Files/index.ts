import { mkdir } from 'node:fs/promises'

const UPLOAD_DIR = './files/uploads'

export const filesService = {
  // Função utilitária para salvar o arquivo
  async saveFile(file: File, folderName: string) {
    try {
      const fileName = `${Date.now()}_${file.name}`
      const folderPath = `${UPLOAD_DIR}/${folderName}`
      
      // Criação do diretório, se não existir
      await mkdir(folderPath, { recursive: true })
      const filePath = `${folderPath}/${fileName}`
      
      // Salva o arquivo usando Bun
      await Bun.write(filePath, await file.arrayBuffer())
      
      return filePath // Retorna o caminho do arquivo salvo
    } catch (error) {
      // Log e tratamento de erro
      console.error('Erro ao salvar o arquivo:', error)
      throw new Error('Erro ao salvar o arquivo.')
    }
  },
}
