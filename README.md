## Generate certificate
### Windows
```powershell
dotnet dev-certs https -ep "$env:USERPROFILE\.aspnet\https\aspnetapp.pfx"  -p $CREDENTIAL_PLACEHOLDER$
dotnet dev-certs https --trust
```


docker-compose -f docker-compose.yml -f docker-compose.override.yml -p todo up -d
