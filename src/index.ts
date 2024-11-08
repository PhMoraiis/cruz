import fs from 'node:fs'
import path from 'node:path'

// Função para formatar o arquivo
const formatArchiveAdToCSV = () => {
  // Caminho do arquivo de entrada e saída
  const inputFilePath = path.join(__dirname, 'docs/oldDocs/AD.txt')
  const outputFilePath = path.join(__dirname, 'docs/formatDocs/ad.csv')

  // Lê o arquivo de entrada
  fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err)
      return
    }

    // Divide o conteúdo em linhas e remove quebras de linha
    const lines = data
      .split('\n')
      .map(line => line.trim())
      .filter(line => line)
      .slice(1)
    // Formata para CSV
    const csvContent = `"Nome"\n${lines.join('\n')}`

    // Salva o conteúdo formatado em um novo arquivo CSV
    fs.writeFile(outputFilePath, csvContent, 'utf8', err => {
      if (err) {
        console.error('Erro ao escrever o arquivo CSV:', err)
        return
      }
      console.log('Arquivo CSV criado com sucesso:', outputFilePath)
    })
  })
}

const formatArchiveBitDefenderToCSV = () => {
  // Caminho do arquivo de entrada e saída
  const inputFilePath = path.join(__dirname, 'docs/oldDocs/BITDEFENDER.txt')
  const outputFilePath = path.join(__dirname, 'docs/formatDocs/bitdefender.csv')

  // Lê o arquivo de entrada
  fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err)
      return
    }

    // Divide o conteúdo em linhas e extrai a primeira coluna, removendo duplicatas
    const lines = data
      .split('\n')
      .map(line => line.trim())
      .filter(line => line)
    const firstColumn = [...new Set(lines.map(line => line.split(',')[0]))] // Extrai a primeira coluna e remove duplicatas

    // Formata para CSV
    const csvContent = firstColumn.join('\n')

    // Salva o conteúdo formatado em um novo arquivo CSV
    fs.writeFile(outputFilePath, csvContent, 'utf8', err => {
      if (err) {
        console.error('Erro ao escrever o arquivo CSV:', err)
        return
      }
      console.log('Arquivo CSV criado com sucesso:', outputFilePath)
    })
  })
}

const formatDHCPToCSV = () => {
  const dhcpInputFilePath = path.join(__dirname, 'docs/oldDocs/DHCP.txt')
  const dhcpOutputFilePath = path.join(__dirname, 'docs/formatDocs/dhcp.csv')

  // Lê o arquivo de entrada
  fs.readFile(dhcpInputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err)
      return
    }

    // Divide o conteúdo em linhas e extrai a coluna "Name", removendo duplicatas
    const uniqueNames = [
      ...new Set(
        data
          .split('\n')
          .map(line => {
            const values = line.trim().split('\t')
            // Remove ".sarah.br" do valor do "Name" (segundo valor)
            if (values[1]) {
              return values[1].replace(/\.sarah\.br$/, '') // Remove a parte ".sarah.br"
            }
            return null
          })
          .filter(name => name) // Filtra valores nulos
      ),
    ]

    // Formata para CSV
    const csvContent = uniqueNames.map(name => `"${name}"`).join('\n') // Adiciona aspas em cada valor

    // Salva o conteúdo formatado em um novo arquivo CSV
    fs.writeFile(dhcpOutputFilePath, csvContent, 'utf8', err => {
      if (err) {
        console.error('Erro ao escrever o arquivo CSV:', err)
        return
      }
      console.log('Arquivo CSV criado com sucesso:', dhcpOutputFilePath)
    })
  })
}

const formatKaceToCSV = () => {
  const inputFilePath = path.join(__dirname, 'docs/oldDocs/KACE.csv')
  const outputFilePath = path.join(__dirname, 'docs/formatDocs/kace.csv')

  // Lê o arquivo de entrada
  fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err)
      return
    }

    // Divide o conteúdo em linhas e extrai apenas a primeira coluna, removendo duplicatas
    const uniqueEntries = [
      ...new Set(
        data
          .split('\n')
          .map(line => {
            const values = line.trim().split(',')
            // Retorna apenas a primeira coluna
            return values[0] // Retorna a primeira coluna
          })
          .filter(entry => entry) // Filtra valores nulos
      ),
    ]

    // Formata para CSV
    const csvContent = uniqueEntries.join('\n')

    // Salva o conteúdo formatado em um novo arquivo CSV
    fs.writeFile(outputFilePath, csvContent, 'utf8', err => {
      if (err) {
        console.error('Erro ao escrever o arquivo CSV:', err)
        return
      }
      console.log('Arquivo CSV criado com sucesso:', outputFilePath)
    })
  })
}

const compareFilesAndGenerateCompleteReport = () => {
  const adFilePath = path.join(__dirname, 'docs/formatDocs/ad.csv')
  const bitdefenderFilePath = path.join(
    __dirname,
    'docs/formatDocs/bitdefender.csv'
  )
  const dhcpFilePath = path.join(__dirname, 'docs/formatDocs/dhcp.csv')
  const kaceFilePath = path.join(__dirname, 'docs/formatDocs/kace.csv')
  const reportFilePath = path.join(
    __dirname,
    'docs/formatDocs/completeReport.csv'
  )

  // Lê os arquivos CSV
  const readCSV = (filePath: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err)
          return
        }
        const lines = data
          .split('\n')
          .map(line => line.trim())
          .filter(line => line) as string[]
        resolve(lines)
      })
    })
  }

  Promise.all([
    readCSV(adFilePath),
    readCSV(bitdefenderFilePath),
    readCSV(dhcpFilePath),
    readCSV(kaceFilePath),
  ])
    .then(([adLines, bitdefenderLines, dhcpLines, kaceLines]) => {
      const reportLines: string[] = []
      const allFiles = {
        AD: new Set<string>(adLines),
        Bitdefender: new Set<string>(bitdefenderLines),
        DHCP: new Set<string>(dhcpLines),
        Kace: new Set<string>(kaceLines),
      }

      // Compara AD com os outros arquivos
      // biome-ignore lint/complexity/noForEach: <explanation>
      adLines.forEach(name => {
        const reportEntry = [
          name,
          'Sim',
          allFiles.Bitdefender.has(name) ? 'Sim' : 'Não',
          allFiles.DHCP.has(name) ? 'Sim' : 'Não',
          allFiles.Kace.has(name) ? 'Sim' : 'Não',
        ]
        reportLines.push(reportEntry.join(','))
      })

      // Compara Bitdefender com os outros arquivos
      // biome-ignore lint/complexity/noForEach: <explanation>
      bitdefenderLines.forEach(name => {
        const reportEntry = [
          name,
          allFiles.AD.has(name) ? 'Sim' : 'Não',
          'Sim',
          allFiles.DHCP.has(name) ? 'Sim' : 'Não',
          allFiles.Kace.has(name) ? 'Sim' : 'Não',
        ]
        reportLines.push(reportEntry.join(','))
      })

      // Compara DHCP com os outros arquivos
      // biome-ignore lint/complexity/noForEach: <explanation>
      dhcpLines.forEach(name => {
        const reportEntry = [
          name,
          allFiles.AD.has(name) ? 'Sim' : 'Não',
          allFiles.Bitdefender.has(name) ? 'Sim' : 'Não',
          'Sim',
          allFiles.Kace.has(name) ? 'Sim' : 'Não',
        ]
        // Adiciona ao relatório apenas se algum campo estiver vazio
        reportLines.push(reportEntry.join(','))
      })

      // Compara Kace com os outros arquivos
      // biome-ignore lint/complexity/noForEach: <explanation>
      kaceLines.forEach(name => {
        const reportEntry = [
          name,
          allFiles.AD.has(name) ? 'Sim' : 'Não',
          allFiles.Bitdefender.has(name) ? 'Sim' : 'Não',
          allFiles.DHCP.has(name) ? 'Sim' : 'Não',
          'Sim',
        ]
        reportLines.push(reportEntry.join(','))
      })

      // Salva o relatório em um novo arquivo CSV
      const csvContent = [
        'Nome,Possui AD,Possui Bitdefender,Possui DHCP,Possui Kace',
        ...reportLines.filter(line => !line.startsWith('"Nome"')),
      ].join('\n')
      fs.writeFile(reportFilePath, csvContent, 'utf8', err => {
        if (err) {
          console.error('Erro ao escrever o arquivo de relatório:', err)
          return
        }
        console.log('Relatório criado com sucesso:', reportFilePath)
      })
    })
    .catch(err => {
      console.error('Erro ao ler os arquivos CSV:', err)
    })
}

const compareFilesAndGenerateSimpleReport = () => {
  const adFilePath = path.join(__dirname, 'docs/formatDocs/ad.csv')
  const bitdefenderFilePath = path.join(
    __dirname,
    'docs/formatDocs/bitdefender.csv'
  )
  const dhcpFilePath = path.join(__dirname, 'docs/formatDocs/dhcp.csv')
  const kaceFilePath = path.join(__dirname, 'docs/formatDocs/kace.csv')
  const reportFilePath = path.join(
    __dirname,
    'docs/formatDocs/simpleReport.csv'
  )

  // Lê os arquivos CSV
  const readCSV = (filePath: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err)
          return
        }
        const lines = data
          .split('\n')
          .map(line => line.trim())
          .filter(line => line) as string[]
        resolve(lines)
      })
    })
  }

  Promise.all([
    readCSV(adFilePath),
    readCSV(bitdefenderFilePath),
    readCSV(dhcpFilePath),
    readCSV(kaceFilePath),
  ])
    .then(([adLines, bitdefenderLines, dhcpLines, kaceLines]) => {
      const reportLines: string[] = []
      const allFiles = {
        AD: new Set<string>(adLines),
        Bitdefender: new Set<string>(bitdefenderLines),
        DHCP: new Set<string>(dhcpLines),
        Kace: new Set<string>(kaceLines),
      }

      // Compara AD com os outros arquivos
      // biome-ignore lint/complexity/noForEach: <explanation>
      adLines.forEach(name => {
        const reportEntry = [
          name,
          'Sim',
          allFiles.Bitdefender.has(name) ? 'Sim' : 'Não',
          allFiles.DHCP.has(name) ? 'Sim' : 'Não',
          allFiles.Kace.has(name) ? 'Sim' : 'Não',
        ]
        // Adiciona ao relatório apenas se algum campo estiver vazio
        if (reportEntry.includes('Não')) {
          reportLines.push(reportEntry.join(','))
        }
      })

      // Compara Bitdefender com os outros arquivos
      // biome-ignore lint/complexity/noForEach: <explanation>
      bitdefenderLines.forEach(name => {
        const reportEntry = [
          name,
          allFiles.AD.has(name) ? 'Sim' : 'Não',
          'Sim',
          allFiles.DHCP.has(name) ? 'Sim' : 'Não',
          allFiles.Kace.has(name) ? 'Sim' : 'Não',
        ]
        // Adiciona ao relatório apenas se algum campo estiver vazio
        if (reportEntry.includes('Não')) {
          reportLines.push(reportEntry.join(','))
        }
      })

      // Compara DHCP com os outros arquivos
      // biome-ignore lint/complexity/noForEach: <explanation>
      dhcpLines.forEach(name => {
        const reportEntry = [
          name,
          allFiles.AD.has(name) ? 'Sim' : 'Não',
          allFiles.Bitdefender.has(name) ? 'Sim' : 'Não',
          'Sim',
          allFiles.Kace.has(name) ? 'Sim' : 'Não',
        ]
        // Adiciona ao relatório apenas se algum campo estiver vazio
        if (reportEntry.includes('Não')) {
          reportLines.push(reportEntry.join(','))
        }
      })

      // Compara Kace com os outros arquivos
      // biome-ignore lint/complexity/noForEach: <explanation>
      kaceLines.forEach(name => {
        const reportEntry = [
          name,
          allFiles.AD.has(name) ? 'Sim' : 'Não',
          allFiles.Bitdefender.has(name) ? 'Sim' : 'Não',
          allFiles.DHCP.has(name) ? 'Sim' : 'Não',
          'Sim',
        ]
        // Adiciona ao relatório apenas se algum campo estiver vazio
        if (reportEntry.slice(1).some(field => field === 'Não')) {
          reportLines.push(reportEntry.join(','))
        }
      })

      // Salva o relatório em um novo arquivo CSV
      const csvContent = [
        'Nome,Possui AD,Possui Bitdefender,Possui DHCP,Possui Kace',
        ...reportLines.filter(line => !line.startsWith('"Nome"')),
      ].join('\n')
      fs.writeFile(reportFilePath, csvContent, 'utf8', err => {
        if (err) {
          console.error('Erro ao escrever o arquivo de relatório:', err)
          return
        }
        console.log('Relatório criado com sucesso:', reportFilePath)
      })
    })
    .catch(err => {
      console.error('Erro ao ler os arquivos CSV:', err)
    })
}

// // Chama a função para formatar o arquivo
// formatArchiveAdToCSV()
// formatArchiveBitDefenderToCSV()
// formatDHCPToCSV()
// formatKaceToCSV()

// Chama a função para gerar o relatório
compareFilesAndGenerateCompleteReport()
compareFilesAndGenerateSimpleReport()
