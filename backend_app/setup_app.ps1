# Instalar o Bun no Windows
Write-Output "Instalando o Bun..."
powershell -c "irm bun.sh/install.ps1 | iex"

# Fechar o terminal após a instalação do Bun
Write-Output "Fechando o terminal atual..."
Stop-Process -Id $PID

# Abrir um novo terminal para os próximos comandos
Write-Output "Abrindo um novo terminal para executar os próximos comandos..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd cruz/backend_app; bun install; bun dev"
