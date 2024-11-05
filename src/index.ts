import fs from 'fs';
import path from 'path';

// Função para formatar o arquivo
const formatArchiveAdToCSV = () => {
  // Caminho do arquivo de entrada e saída
  const inputFilePath = path.join(__dirname, 'docs/oldDocs/Bitdefender.txt')
  const outputFilePath = path.join(__dirname, 'docs/formattedDocs/bitdefender.txt')

  // Lê o arquivo de entrada
  fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err)
      return;
    }

    // Divide o conteúdo em linhas e remove quebras de linha
    const lines = data.split('\n').map(line => line.trim()).filter(line => line).slice(1)
    // Formata para CSV
    const csvContent = `"Nome"\n${lines.join(',')}"`

    // Salva o conteúdo formatado em um novo arquivo CSV
    fs.writeFile(outputFilePath, csvContent, 'utf8', (err) => {
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
  const inputFilePath = path.join(__dirname, 'docs/oldDocs/Bitdefender.txt')
  const outputFilePath = path.join(__dirname, 'docs/formattedDocs/bitdefender.txt')

  // Lê o arquivo de entrada
  fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return;
    }

    // Divide o conteúdo em linhas
    const lines = data.split('\n').map(line => line.trim()).filter(line => line);

    // Formata para CSV
    const csvContent = lines.join('\n');

    // Salva o conteúdo formatado em um novo arquivo CSV
    fs.writeFile(outputFilePath, csvContent, 'utf8', (err) => {
      if (err) {
        console.error('Erro ao escrever o arquivo CSV:', err);
        return;
      }
      console.log('Arquivo CSV criado com sucesso:', outputFilePath);
    });
  });
}

const formatDHCPToCSV = () => {
  const dhcpInputFilePath = path.join(__dirname, 'docs/oldDocs/DHCP.txt');
  const dhcpOutputFilePath = path.join(__dirname, 'docs/formattedDocs/dhcp.csv');

  // Lê o arquivo de entrada
  fs.readFile(dhcpInputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return;
    }

    // Divide o conteúdo em linhas e formata para CSV
    const csvContent = data.split('\n')
      .map(line => {
        const values = line.trim().split('\t');
        // Remove ".sarah.br" do valor do "Name" (segundo valor)
        if (values[1]) {
          values[1] = values[1].replace(/\.sarah\.br$/, ''); // Remove a parte ".sarah.br"
        }
        return values.map(value => `"${value}"`).join(','); // Adiciona aspas em cada valor
      })
      .join('\n');

    // Salva o conteúdo formatado em um novo arquivo CSV
    fs.writeFile(dhcpOutputFilePath, csvContent, 'utf8', (err) => {
      if (err) {
        console.error('Erro ao escrever o arquivo CSV:', err);
        return;
      }
      console.log('Arquivo CSV criado com sucesso:', dhcpOutputFilePath);
    });
  });
}


// Chama a função para formatar o arquivo
formatArchiveAdToCSV()
formatArchiveBitDefenderToCSV()
formatDHCPToCSV()