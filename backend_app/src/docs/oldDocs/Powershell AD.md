### 1- Verificar o último logon do computador no AD com powershell
### 2- Cruzar informações e mostras o que está branco e mostrar o último logon do computador
### 3- Mostrar o último logon se maior que 30 dias
### 4- Exportar o resultado

## Problemas:
- [ ] caracter aspa  
- [ ]sarah.br  
- [ ] nomes duplicados  
- [ ] maiúsculas e minúsculos  
- [ ] padrão de nome das unidades tem 3 letras (LN tem duas letras)

---

```powershell
Get-ADComputer -Filter * -SearchBase "OU=LagoNorte, OU=Unidades, DC=sarah, DC=br" | Select-object Name | Export-Csv -NoType c:\temp\AD_Computadores_OU_LagoNorte.txt
```  

```powershell
Get-ADComputer -Filter * -Properties * | Select -Property Name,DNSHostName,Enabled,LastLogonDate
```


