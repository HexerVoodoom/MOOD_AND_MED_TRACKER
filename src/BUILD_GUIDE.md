# 🚀 Guia Completo: Build do Projeto React

## 📦 Gerar Build de Produção

### Passo 1: Instalar Dependências

```bash
npm install
```

Isso instala todas as bibliotecas necessárias:
- React 18.2.0
- React DOM
- Vite (bundler)
- Lucide React (ícones)
- Recharts (gráficos)
- Tailwind CSS

### Passo 2: Build de Produção

```bash
npm run build
```

Isso vai:
1. ✅ Compilar todo o código React
2. ✅ Otimizar e minificar arquivos
3. ✅ Gerar a pasta `dist/` com tudo pronto
4. ✅ Criar arquivos otimizados para produção

### Passo 3: Testar Localmente

```bash
npm run preview
```

Abre em: `http://localhost:4173`

---

## 📁 Estrutura do Projeto Completo

```
mood-med-tracker/
│
├── 📄 App.tsx                          # Componente principal (gerencia navegação)
├── 📄 main.tsx                         # Entry point do React
├── 📄 index.html                       # HTML base
│
├── 📂 components/                      # Todos os componentes
│   ├── WelcomeScreen.tsx              # Tela de boas-vindas (onboarding 1/3)
│   ├── PermissionsScreen.tsx          # Tela de permissões (onboarding 2/3)
│   ├── MoodReminderScreen.tsx         # Configuração de lembrete (onboarding 3/3)
│   ├── HomeScreen.tsx                 # Tela inicial (rastreamento de humor)
│   ├── MoodRecordingScreen.tsx        # Registro detalhado de humor
│   ├── MedicationsScreen.tsx          # Lista de medicações
│   ├── AddMedicationScreen.tsx        # Adicionar medicação
│   ├── MedicationDetailScreen.tsx     # Detalhes da medicação
│   ├── MedicationCheckModal.tsx       # Modal para marcar medicação
│   ├── PillVisualization.tsx          # Visualização de comprimido
│   ├── ReportsScreen.tsx              # Relatórios e gráficos
│   ├── SettingsScreen.tsx             # Configurações
│   ├── SetupPreferencesScreen.tsx     # Preferências de notificação
│   ├── TabBar.tsx                     # Barra de navegação inferior
│   └── Button.tsx                     # Componente de botão reutilizável
│
├── 📂 styles/
│   └── globals.css                    # Estilos globais + Tailwind
│
├── 📂 imports/                        # Importações do Figma
│   ├── Container.tsx
│   ├── MoodMedTrackerApp.tsx
│   ├── MoodMedTrackerApp-41-1939.tsx
│   ├── MoodMedTrackerApp-42-2353.tsx
│   └── svg-*.ts                       # SVGs vetoriais
│
├── 📂 components/ui/                  # Componentes UI (shadcn)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── checkbox.tsx
│   ├── select.tsx
│   ├── slider.tsx
│   ├── switch.tsx
│   ├── tabs.tsx
│   └── ... (mais 30+ componentes)
│
├── 📄 manifest.json                   # Configuração PWA
├── 📄 capacitor.config.json           # Configuração Capacitor
├── 📄 vite.config.ts                  # Configuração Vite
├── 📄 package.json                    # Dependências e scripts
├── 📄 netlify.toml                    # Configuração Netlify
│
└── 📂 dist/                           # ⭐ PASTA GERADA (após build)
    ├── index.html
    ├── assets/
    │   ├── index-[hash].js           # JavaScript otimizado
    │   ├── index-[hash].css          # CSS otimizado
    │   └── [imagens e assets]
    └── manifest.json
```

---

## 📂 Conteúdo da Pasta `dist/` (após build)

Após executar `npm run build`, a pasta `dist/` conterá:

```
dist/
├── index.html                  # HTML minificado
├── manifest.json               # PWA manifest
├── icon-192.png               # Ícone 192x192
├── icon-512.png               # Ícone 512x512
├── assets/
│   ├── index-abc123.js        # Todo React compilado (~200-500KB)
│   ├── index-xyz789.css       # Estilos compilados (~50KB)
│   └── vendor-def456.js       # Bibliotecas (React, Recharts, etc)
└── styles/
    └── globals.css
```

Esta pasta `dist/` é o que você vai:
- 📤 Hospedar no Netlify
- 📱 Usar para gerar APK
- 🌐 Fazer deploy em qualquer servidor

---

## 🎯 Como Obter o Projeto Completo

### Opção 1: Download da Pasta `dist/`

Após o build:

```bash
npm run build
```

A pasta `dist/` contém tudo compilado e pronto para uso.

### Opção 2: Todo o Código Fonte

Se você está no Figma Make e quer baixar tudo:

1. **Via Git:**
```bash
git init
git add .
git commit -m "Mood & Med Tracker - versão completa"
```

2. **Criar arquivo ZIP:**

No terminal (Linux/Mac):
```bash
zip -r mood-med-tracker.zip . -x "node_modules/*" -x ".git/*"
```

No Windows (PowerShell):
```powershell
Compress-Archive -Path * -DestinationPath mood-med-tracker.zip -Exclude node_modules,.git
```

### Opção 3: Copiar Arquivos Manualmente

Lista de arquivos essenciais para copiar:

**Raiz:**
- App.tsx
- main.tsx
- index.html
- package.json
- vite.config.ts
- manifest.json
- netlify.toml

**Pastas:**
- components/ (todos os arquivos)
- styles/ (globals.css)
- imports/ (se houver)

---

## 🚀 Deploy Completo (3 Métodos)

### Método 1: Netlify (Mais Fácil)

```bash
# Build
npm run build

# Opção A: Drag & Drop
# Acesse https://app.netlify.com/drop
# Arraste a pasta dist/

# Opção B: CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Método 2: Vercel

```bash
# Instalar
npm install -g vercel

# Deploy
vercel --prod
```

### Método 3: GitHub Pages

```bash
# Instalar
npm install --save-dev gh-pages

# Adicionar no package.json:
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}

# Deploy
npm run deploy
```

---

## 📊 Tamanhos Estimados

```
Código Fonte Completo:  ~2-3 MB (com node_modules: ~200-300 MB)
Build (dist/):          ~500 KB - 1 MB (comprimido)
APK Final:              ~5-10 MB
```

---

## ✅ Checklist de Build

- [ ] `npm install` executado sem erros
- [ ] `npm run build` completa com sucesso
- [ ] Pasta `dist/` foi criada
- [ ] `npm run preview` mostra o app funcionando
- [ ] Todos os componentes carregam corretamente
- [ ] LocalStorage funciona (teste registrar humor)
- [ ] Navegação entre telas funciona
- [ ] Gráficos aparecem (Reports)
- [ ] Medicações podem ser adicionadas

---

## 🐛 Problemas Comuns

### "Module not found"

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### "Out of memory"

```bash
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Build muito lento

Vite já é rápido, mas você pode:
```bash
npm run build -- --mode production
```

---

## 📦 Exportar para Outras Plataformas

### Para APK (Android)
```bash
npm run build
# Hospedar dist/ no Netlify
# Usar PWABuilder com a URL
```

### Para iOS (necessita Mac)
```bash
npm install @capacitor/ios
npx cap add ios
npm run build
npx cap sync ios
npx cap open ios
# Compilar no Xcode
```

### Para Desktop (Electron)
```bash
npm install electron electron-builder
# Configurar electron
npm run build
npm run electron:build
```

---

## 🎉 Resumo Rápido

**Para gerar tudo:**

```bash
npm install          # Instalar dependências
npm run build        # Gerar build de produção
npm run preview      # Testar localmente
```

**Resultado:** Pasta `dist/` pronta para deploy! 🚀

---

## 💾 Backup Recomendado

Sempre faça backup de:
- ✅ Todo código fonte (pasta raiz)
- ✅ `package.json` e `package-lock.json`
- ✅ Pasta `components/`
- ✅ `manifest.json` e configurações
- ✅ **Keystore** (se gerar APK)

---

**Pronto! Seu projeto React está 100% funcional e pronto para build!** 🎊
