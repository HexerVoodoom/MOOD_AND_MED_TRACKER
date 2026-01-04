# 🔑 Configurações do Projeto - Mood & Med Tracker

## 📱 Informações Básicas do App

```
App Name: Mood & Med Tracker
Short Name: MoodMed
Package ID: com.moodmedtracker.app
Version: 1.0.0
Version Code: 1
```

## 🌐 URLs

```
Manifest URL: https://SEU-DOMINIO.netlify.app/manifest.json
App URL: https://SEU-DOMINIO.netlify.app/
Start URL: /
```

## 🎨 Tema e Cores

```
Theme Color: #6B9BD1
Background Color: #FFFFFF
Status Bar Style: light
Orientation: portrait
Display Mode: standalone
```

## 📦 Package Details (Para Antigravity/PWABuilder)

```json
{
  "packageId": "com.moodmedtracker.app",
  "name": "Mood & Med Tracker",
  "launcherName": "MoodMed",
  "version": "1.0.0",
  "versionCode": 1,
  "minSdkVersion": 24,
  "targetSdkVersion": 34,
  "display": "standalone",
  "orientation": "portrait",
  "themeColor": "#6B9BD1",
  "backgroundColor": "#FFFFFF"
}
```

## 🔐 Signing Key (Keystore) - IMPORTANTE

### Para PWABuilder:

**Opção 1: Deixar PWABuilder Gerar (Recomendado para início)**
- PWABuilder pode gerar automaticamente uma keystore
- Você receberá os arquivos para download
- **GUARDE ESSES ARQUIVOS COM SEGURANÇA!**

**Opção 2: Criar Sua Própria Keystore**

Execute este comando no terminal:

```bash
keytool -genkey -v -keystore moodmed-release.keystore -alias moodmed -keyalg RSA -keysize 2048 -validity 10000
```

Você será perguntado:
- **Password**: Crie uma senha forte (ex: `MoodMed2024@Secure`)
- **First and last name**: Seu Nome Completo
- **Organizational unit**: Development
- **Organization**: MoodMed Tracker
- **City**: Sua Cidade
- **State**: Seu Estado
- **Country code**: BR

**ATENÇÃO:** Guarde estas informações com muita segurança:

```
Keystore File: moodmed-release.keystore
Keystore Password: [SUA_SENHA_AQUI]
Key Alias: moodmed
Key Password: [MESMA_SENHA_OU_DIFERENTE]
```

### Informações para o Antigravity/PWABuilder:

Quando solicitado, forneça:

```
Key Alias: moodmed
Store Password: [SUA_SENHA]
Key Password: [SUA_SENHA]
```

## 📋 Configuração Completa para PWABuilder

### Passo 1: Package Settings

```
App Name: Mood & Med Tracker
Package ID: com.moodmedtracker.app
Host: [SEU_DOMINIO].netlify.app
Start URL: /
```

### Passo 2: App Settings

```
Theme Color: #6B9BD1
Background Color: #FFFFFF
Display Mode: standalone
Orientation: portrait
```

### Passo 3: Icons

```
Icon 192x192: https://[SEU_DOMINIO].netlify.app/icon-192.png
Icon 512x512: https://[SEU_DOMINIO].netlify.app/icon-512.png
Maskable Icon: Sim
```

### Passo 4: Signing Key

**Escolha uma opção:**

**A) Gerar Nova (Primeira vez)**
- Marque "Generate signing key"
- PWABuilder criará automaticamente
- Faça download e guarde com segurança

**B) Upload Existente**
- Faça upload do arquivo `.keystore`
- Forneça alias e senhas

## 🔒 Segurança - NUNCA COMPARTILHE

**Arquivos Sensíveis (NÃO commitar no Git):**
```
✗ *.keystore
✗ *.jks
✗ key.properties
✗ google-services.json
✗ Senhas
```

**Local Seguro para Guardar:**
- Gerenciador de senhas (1Password, Bitwarden)
- Cloud criptografado (Google Drive, Dropbox com 2FA)
- Backup físico (pen drive em local seguro)

## 📝 Notas Importantes

### Para Primeira Publicação:
1. Use keystore gerada pelo PWABuilder
2. Baixe TODOS os arquivos
3. Guarde senhas em local seguro
4. Nunca perca a keystore (impossível recuperar!)

### Para Atualizações Futuras:
1. SEMPRE use a MESMA keystore
2. Google Play rejeita APKs assinados com chaves diferentes
3. Perder a keystore = perder controle do app na Play Store

## 🚀 Como Informar ao Antigravity

### Se usando PWABuilder:

1. Acesse: https://www.pwabuilder.com/
2. Cole sua URL: `https://[SEU_DOMINIO].netlify.app`
3. Clique em "Package for Stores"
4. Selecione "Android"
5. Preencha:
   - **Package ID**: `com.moodmedtracker.app`
   - **App name**: `Mood & Med Tracker`
   - **Launcher name**: `MoodMed`
   - **Version**: `1.0.0`
   - **Version code**: `1`
   - **Min SDK**: `24` (Android 7.0+)
   - **Host**: Seu domínio Netlify

6. Na seção "Signing Key":
   - Opção 1: "Generate" (recomendado)
   - Opção 2: Upload sua keystore + forneça senhas

7. Clique em "Generate Package"

8. Baixe:
   - ✅ APK assinado
   - ✅ Keystore (se gerou nova)
   - ✅ Arquivo de senhas

### Se usando Bubblewrap:

```bash
# Instalar
npm install -g @bubblewrap/cli

# Inicializar
bubblewrap init --manifest https://[SEU_DOMINIO].netlify.app/manifest.json

# Preencher quando perguntado:
Application ID: com.moodmedtracker.app
Application name: Mood & Med Tracker
Display name: MoodMed
Start URL: /

# Build
bubblewrap build

# APK estará em:
# ./app-release-signed.apk
```

## ✅ Checklist Antes de Gerar APK

- [ ] URL HTTPS funcionando
- [ ] manifest.json acessível
- [ ] Ícones 192x192 e 512x512 carregando
- [ ] App funciona no navegador mobile
- [ ] Definiu Package ID único
- [ ] Escolheu método de signing key
- [ ] Tem local seguro para guardar keystore

## 📞 Suporte

Se tiver dúvidas:
- PWABuilder Docs: https://docs.pwabuilder.com/
- GitHub Issues: https://github.com/pwa-builder/PWABuilder/issues

---

**LEMBRE-SE:** A keystore é como a "senha mestre" do seu app. Perder = nunca mais conseguir atualizar o app na Play Store! 🔐
