# 🚀 Guia: Criar APK com Antigravity (ou alternativas)

## 📱 O que é Antigravity?

Antigravity e ferramentas similares convertem Progressive Web Apps (PWA) em APKs Android nativos automaticamente, sem precisar instalar Android Studio ou SDKs.

---

## 🌐 Ferramentas Online Recomendadas

### 1. **PWABuilder** (Recomendado - Microsoft)
🔗 https://www.pwabuilder.com/

**Vantagens:**
- ✅ Gratuito e confiável
- ✅ Gera APK pronto para Play Store
- ✅ Suporta Trusted Web Activity (TWA)
- ✅ Interface simples

### 2. **Bubblewrap CLI** (Google)
🔗 https://github.com/GoogleChromeLabs/bubblewrap

**Vantagens:**
- ✅ Oficial do Google
- ✅ Linha de comando
- ✅ TWA nativo

### 3. **APK Builder Online**
🔗 https://appsgeyser.com/ ou https://appcreator24.com/

**Vantagens:**
- ✅ Super simples (100% online)
- ✅ Não precisa de conhecimento técnico

---

## 🎯 PASSO A PASSO - PWABuilder (Recomendado)

### **1. Preparar o Build**

No seu projeto, execute:

```bash
npm run build
```

Isso gera a pasta `dist/` com todos os arquivos.

---

### **2. Hospedar o App (Opções)**

Você precisa de um URL público HTTPS. Escolha uma opção:

#### **Opção A: Netlify (Mais Fácil)**

1. Crie conta em: https://www.netlify.com/
2. Arraste a pasta `dist/` no Netlify Drop
3. Copie a URL gerada (ex: `https://moodmed-tracker.netlify.app`)

#### **Opção B: Vercel**

1. Instale: `npm i -g vercel`
2. Execute: `vercel --prod`
3. Copie a URL gerada

#### **Opção C: GitHub Pages**

```bash
# Instale gh-pages
npm install --save-dev gh-pages

# Adicione no package.json:
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}

# Deploy
npm run deploy
```

URL será: `https://seu-usuario.github.io/nome-do-repo`

---

### **3. Usar PWABuilder**

1. Acesse: https://www.pwabuilder.com/

2. Cole a URL do seu app hospedado

3. Clique em **"Start"**

4. O PWABuilder vai analisar seu app

5. Clique em **"Package for Stores"**

6. Escolha **"Android"**

7. Configure:
   - **Package ID**: `com.moodmedtracker.app`
   - **App name**: `Mood & Med Tracker`
   - **Version**: `1.0.0`
   - **Version Code**: `1`

8. Clique em **"Generate"**

9. Faça download do APK!

---

## 🛠️ ALTERNATIVA: Bubblewrap CLI (Terminal)

Se preferir usar linha de comando:

### **1. Instalar**

```bash
npm install -g @bubblewrap/cli
```

### **2. Inicializar**

```bash
bubblewrap init --manifest https://seu-app.netlify.app/manifest.json
```

### **3. Configurar**

O CLI vai perguntar:
- **Application ID**: `com.moodmedtracker.app`
- **Display name**: `Mood & Med Tracker`
- **Ícone**: Caminho para `icon-512.png`

### **4. Build**

```bash
bubblewrap build
```

### **5. APK Gerado**

Estará em: `./app-release-signed.apk`

---

## 🎨 Criar Ícones

Você precisa de ícones 192x192 e 512x512.

### **Opção 1: Online**

Use: https://realfavicongenerator.net/
- Faça upload de uma imagem 1024x1024
- Baixe e renomeie para `icon-192.png` e `icon-512.png`
- Coloque na pasta `public/`

### **Opção 2: Com IA**

Use Figma/Canva para criar:
- **512x512px** - Fundo branco, logo centralizado
- **192x192px** - Mesma proporção

---

## ✅ Checklist Pré-Build

Antes de gerar o APK, verifique:

- [ ] ✅ `manifest.json` criado e configurado
- [ ] ✅ Ícones 192x192 e 512x512 na pasta `/public`
- [ ] ✅ `npm run build` funciona sem erros
- [ ] ✅ App hospedado com HTTPS
- [ ] ✅ URL acessível publicamente
- [ ] ✅ App funciona no navegador mobile

---

## 🧪 Testar o APK

### **1. Instalar no Android**

Envie o APK para o celular e instale.

**Atenção:** Pode precisar ativar "Instalar apps desconhecidos" nas configurações.

### **2. Verificar**

- [ ] App abre normalmente
- [ ] Telas navegam corretamente
- [ ] LocalStorage funciona
- [ ] Cores e fontes corretas
- [ ] Botões clicam (área de toque 44x44)

---

## 🏪 Publicar na Google Play Store

### **1. Criar Conta**

- Acesse: https://play.google.com/console
- Taxa única: $25 USD
- Preencha dados da conta de desenvolvedor

### **2. Criar App Bundle (AAB)**

PWABuilder gera automaticamente `.aab` (recomendado pelo Google).

Se você tem só APK, use:

```bash
bundletool build-bundle --modules=base.zip --output=app.aab
```

### **3. Upload na Play Console**

1. Crie um novo app
2. Preencha:
   - Nome do app
   - Descrição curta (80 caracteres)
   - Descrição completa
   - Screenshots (mínimo 2)
   - Ícone (512x512)
   - Banner (1024x500)
3. Faça upload do AAB
4. Preencha questionário de conteúdo
5. Defina países e preço (gratuito)
6. Envie para revisão

⏰ **Revisão demora 1-7 dias**

---

## 📊 Comparação de Métodos

| Método | Dificuldade | Tempo | Resultado |
|--------|-------------|-------|-----------|
| **PWABuilder** | ⭐ Fácil | 10 min | APK pronto |
| **Bubblewrap** | ⭐⭐ Médio | 20 min | APK + AAB |
| **Capacitor** | ⭐⭐⭐ Difícil | 2 horas | APK nativo completo |
| **Android Studio** | ⭐⭐⭐⭐ Avançado | 4+ horas | Controle total |

---

## 🐛 Problemas Comuns

### **"PWA não detectado"**

Verifique se:
- `manifest.json` está acessível
- Tem ícones 192x192 e 512x512
- App está em HTTPS

### **"APK não instala"**

- Ative "Instalar apps desconhecidos"
- Verifique se não há vírus (alguns AVs bloqueiam)
- Use `adb install -r app.apk` via USB

### **"App não abre"**

- Verifique console do navegador mobile
- Teste a versão web primeiro
- Verifique se todos os assets carregam

---

## 💡 Dicas Extras

### **SSL Gratuito**

Netlify e Vercel incluem SSL automático!

### **Domínio Personalizado**

Configure um domínio tipo `moodmed.app` no Netlify:
1. Compre domínio (GoDaddy, Namecheap)
2. Configure DNS no Netlify
3. Regenere APK com nova URL

### **Atualizar App**

1. Faça mudanças no código
2. `npm run build`
3. Deploy (Netlify auto-atualiza)
4. Usuários verão mudanças na próxima vez que abrirem
5. Para forçar update, aumente `version` no `manifest.json`

---

## 🎬 Resumo Rápido (5 minutos)

```bash
# 1. Build
npm run build

# 2. Deploy no Netlify
# Arraste pasta dist/ em netlify.com/drop

# 3. Acesse PWABuilder
# https://www.pwabuilder.com/

# 4. Cole URL
# Ex: https://moodmed-123456.netlify.app

# 5. Clique Package > Android > Generate

# 6. Download APK e instale!
```

---

## 📞 Suporte

- **PWABuilder Docs**: https://docs.pwabuilder.com/
- **Bubblewrap GitHub**: https://github.com/GoogleChromeLabs/bubblewrap
- **Play Store Help**: https://support.google.com/googleplay/android-developer

Seu app está pronto para virar APK! 🎉📱
