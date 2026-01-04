# Guia de Build e PWA - Mood & Med Tracker

## 📱 Visão Geral do App

**Mood & Med Tracker** é um aplicativo mobile para iPhone 13 (390×844px) que rastreia humor e medicação com estética minimalista usando azuis/verdes suaves e cinzas neutros.

---

## 🗂️ Estrutura de Arquivos Principais

### Arquivos Essenciais para Build

```
/
├── App.tsx                          # Componente principal e gerenciamento de estado
├── index.html                       # HTML base
├── styles/
│   └── globals.css                  # Estilos globais e tokens CSS
├── components/
│   ├── HomeScreen.tsx               # Tela principal com cards de período
│   ├── ReportsScreen.tsx            # Tela de relatórios e gráficos
│   ├── MoodDetailScreen.tsx         # Registro detalhado de humor
│   ├── MedicationScreen.tsx         # Gerenciamento de medicamentos
│   ├── SettingsScreen.tsx           # Configurações do app
│   ├── OnboardingScreen.tsx         # Fluxo de boas-vindas
│   ├── OnboardingFlow.tsx           # Wizard de configuração inicial
│   ├── MedicationCheckModal.tsx     # Modal de confirmação de medicamento
│   ├── PillVisualization.tsx        # Visualização de comprimidos
│   ├── Button.tsx                   # Componente de botão
│   ├── BottomTabBar.tsx            # Barra de navegação inferior
│   └── figma/
│       └── ImageWithFallback.tsx    # Componente de imagem (protegido)
└── imports/
    └── [arquivos de assets do Figma]
```

---

## 🎯 Funcionalidades Principais

### 1. **Tela Home (HomeScreen.tsx)**
**Localização:** `/components/HomeScreen.tsx`

**Elementos principais:**
- **Cards de período** (Manhã, Tarde, Noite) com scroll horizontal infinito
- **Seleção de humor**: 5 emojis (😟 Triste, 😶 Apático, 😫 Ansioso, 😠 Irritado, 😁 Feliz)
- **Lista de medicamentos** com scroll interno por período
- **Checkboxes de alimentação** (açúcar, glúten, álcool, cafeína)
- **Informações climáticas** no header (se ativado)

**Background:** Gradiente azul/verde suave (`figma:asset/b518b9f4b297cc8b217716933a81b1d2f0c00236.png`)

### 2. **Tela de Relatórios (ReportsScreen.tsx)**
**Localização:** `/components/ReportsScreen.tsx`

**Elementos principais:**
- **Gráfico de linha** (7 dias de humor)
- **Gráfico de barras** (distribuição de humores)
- **Insights de IA** gerados dinamicamente
- **Correlações** entre humor, sono, medicação e alimentação

**Background:** Branco limpo

### 3. **Registro de Humor (MoodDetailScreen.tsx)**
**Localização:** `/components/MoodDetailScreen.tsx`

**Elementos principais:**
- Seleção de humor com emojis grandes
- Nível de intensidade (slider 1-10)
- Entrada de texto livre para notas
- Horas de sono
- Botão de salvar

### 4. **Gerenciamento de Medicação (MedicationScreen.tsx)**
**Localização:** `/components/MedicationScreen.tsx`

**Elementos principais:**
- Lista de medicamentos cadastrados
- Editor de medicamento com:
  - Nome e dosagem
  - Horários de dose
  - Visualização de comprimido personalizável
  - Forma: cápsula, redondo, quadrado, triangular
  - Tamanho: S, M, L
  - Cores: 2 cores personalizáveis

### 5. **Configurações (SettingsScreen.tsx)**
**Localização:** `/components/SettingsScreen.tsx`

**Seções:**
- **Rastreamento de Alimentação**: toggles para açúcar, glúten, álcool, cafeína
- **Clima e Hora**: toggle para rastreamento climático
- **Relatórios**: toggle para insights de IA
- **Conta**: opções de conta
- **Sobre**: informações do app

### 6. **Onboarding (OnboardingScreen.tsx + OnboardingFlow.tsx)**
**Localização:** `/components/OnboardingScreen.tsx` e `/components/OnboardingFlow.tsx`

**Fluxo:**
1. Tela de boas-vindas
2. Configuração de rastreamento de alimentação
3. Configuração de clima
4. Cadastro de medicamentos
5. Confirmação

---

## 🎨 Sistema de Design

### Cores Principais
**Localização:** `/styles/globals.css`

```css
--color-primary: 99 186 177        /* Verde-azulado principal */
--color-primary-dark: 79 166 157   /* Tom mais escuro */
--color-secondary: 186 222 255     /* Azul suave */
--color-accent: 255 159 122        /* Coral (destaque) */
--color-text: 24 24 27            /* Texto principal */
--color-text-secondary: 113 113 122 /* Texto secundário */
--color-background: 255 255 255    /* Fundo branco */
--color-gray-100: 244 244 245     /* Cinza muito claro */
--color-border: 228 228 231       /* Bordas */
```

### Tipografia
- **Fonte padrão**: System UI / Sans-serif
- **Tamanhos**: Definidos em `globals.css` (não usar classes Tailwind para font-size)
- **Pesos**: Regular, Medium, Semibold

### Espaçamento
- Sistema baseado em 8px
- Padding dos cards: 16px/24px
- Áreas de toque: mínimo 44×44px

---

## 📦 Assets e Imagens

### Assets do Figma
**Localização:** `/imports/`

**Importante:**
- Imagens raster usam `figma:asset/[hash].png`
- SVGs usam caminho relativo `./imports/svg-[id]`
- **Nunca** modificar `/components/figma/ImageWithFallback.tsx` (protegido)

**Exemplo de importação:**
```tsx
// Imagem raster
import bgImage from "figma:asset/b518b9f4b297cc8b217716933a81b1d2f0c00236.png";

// SVG
import svgPaths from "./imports/svg-wg56ef214f";
```

---

## 🔧 Dependências Principais

### Bibliotecas Instaladas
```json
{
  "react": "^18.x",
  "lucide-react": "ícones",
  "recharts": "gráficos e visualizações",
  "motion": "animações (Framer Motion)",
  "sonner@2.0.3": "toast notifications"
}
```

### Ícones Lucide-React Utilizados
- `Settings`, `Home`, `BarChart3`, `Pill`, `Plus`, `Trash2`, `ChevronLeft`, `ChevronRight`
- `Cloud`, `CloudRain`, `Sun`, `CloudSnow`, `Sunrise`, `Moon`
- `Candy`, `Wheat`, `Wine`, `Coffee`, `Clock`, `Check`

---

## 🚀 Preparação para Build

### 1. Verificar Arquivos Essenciais

**Checklist:**
- [ ] `/App.tsx` existe e tem export default
- [ ] `/index.html` configurado
- [ ] `/styles/globals.css` com tokens CSS
- [ ] Todos os componentes em `/components/` estão funcionais
- [ ] Assets em `/imports/` estão acessíveis
- [ ] Nenhum erro no console do navegador

### 2. Testar Funcionalidades

**Fluxo de teste:**
1. **Onboarding**: Completar o fluxo inicial
2. **Home**: 
   - Selecionar humor em cada período
   - Marcar medicamentos como tomados
   - Testar checkboxes de alimentação
   - Scroll entre cards de período
3. **Relatórios**: Verificar gráficos e insights
4. **Medicação**: Adicionar/editar/remover medicamentos
5. **Configurações**: Testar todos os toggles
6. **Navegação**: Testar bottom tab bar

### 3. Validar Responsividade

**Dimensões alvo:**
- iPhone 13: 390×844px (padrão)
- Testar orientação portrait
- Verificar áreas de toque (mínimo 44×44px)

---

## 📱 Configuração PWA

### Arquivos Necessários

#### 1. **manifest.json**
Criar na raiz do projeto:

```json
{
  "name": "Mood & Med Tracker",
  "short_name": "MoodMed",
  "description": "Rastreie seu humor e medicação de forma simples",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#63bab1",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

#### 2. **Service Worker (opcional)**
Para funcionalidade offline, criar `/sw.js`:

```javascript
const CACHE_NAME = 'moodmed-v1';
const urlsToCache = [
  '/',
  '/styles/globals.css',
  '/App.tsx'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

#### 3. **Atualizar index.html**
Adicionar no `<head>`:

```html
<!-- PWA Meta Tags -->
<meta name="theme-color" content="#63bab1">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="MoodMed">

<!-- Manifest -->
<link rel="manifest" href="/manifest.json">

<!-- Icons -->
<link rel="apple-touch-icon" href="/icon-192.png">
<link rel="icon" type="image/png" href="/icon-192.png">
```

### Ícones do App

**Criar ícones em:**
- `/public/icon-192.png` (192×192px)
- `/public/icon-512.png` (512×512px)

**Design sugerido:**
- Fundo: Gradiente verde-azulado (#63bab1 → #badeFF)
- Símbolo: Emoji 😁 ou coração estilizado
- Bordas arredondadas (20% do tamanho)

---

## 🔍 Localização de Elementos Específicos

### Estado Global do App
**Arquivo:** `/App.tsx`

**Estados principais:**
```typescript
- showOnboarding: boolean           // Controla exibição do onboarding
- currentScreen: string             // Tela atual ('home'|'reports'|'medication'|'settings')
- medications: Array                // Lista de medicamentos
- medicationTaken: Object           // Registro de medicamentos tomados
- todayMoods: Object               // Humores do dia (morning/afternoon/night)
- moodHistory: Array               // Histórico de 7 dias
- dietaryTrackers: Object          // Configuração de rastreamento
- trackWeatherTime: boolean        // Toggle de clima
- enableAIInsights: boolean        // Toggle de IA
```

### Dados de Exemplo/Mock
**Arquivo:** `/App.tsx`

**Medicamentos exemplo:**
```typescript
const defaultMedications = [
  {
    id: '1',
    name: 'Sertralina 50mg',
    doseTimes: ['08:00', '20:00'],
    pill: {
      shape: 'capsule',
      size: 'M',
      color1: '#4A90E2',
      color2: '#FFFFFF'
    }
  }
]
```

**Histórico de humor exemplo:**
```typescript
const mockMoodHistory = [
  { date: 'Seg', mood: 'Happy', intensity: 8, sleep: 7 },
  { date: 'Ter', mood: 'Anxious', intensity: 6, sleep: 5 },
  // ... 7 dias
]
```

### Componentes Reutilizáveis

#### Button Component
**Arquivo:** `/components/Button.tsx`
**Variantes:** `primary`, `secondary`, `outline`

#### PillVisualization Component
**Arquivo:** `/components/PillVisualization.tsx`
**Props:** `shape`, `size`, `color1`, `color2`

#### BottomTabBar Component
**Arquivo:** `/components/BottomTabBar.tsx`
**Abas:** Home, Relatórios, Medicação, Configurações

---

## ⚙️ Configurações de Build

### Variáveis de Ambiente (se necessário)

Criar `.env.local`:
```env
VITE_APP_NAME=Mood & Med Tracker
VITE_APP_VERSION=1.0.0
```

### Build Command
```bash
npm run build
# ou
yarn build
```

### Deploy para PWA

**Opções recomendadas:**
1. **Vercel**: Deploy automático com suporte a PWA
2. **Netlify**: Configuração simples de PWA
3. **Firebase Hosting**: Excelente para PWAs

**Configuração Vercel (vercel.json):**
```json
{
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Service-Worker-Allowed",
          "value": "/"
        }
      ]
    }
  ]
}
```

---

## ✅ Checklist Final para Build

### Antes do Build
- [ ] Testar todas as funcionalidades no navegador
- [ ] Verificar console sem erros
- [ ] Validar responsividade (390px)
- [ ] Testar fluxo de onboarding completo
- [ ] Verificar todos os assets carregam corretamente

### Configuração PWA
- [ ] Criar `manifest.json`
- [ ] Adicionar meta tags no `index.html`
- [ ] Criar ícones 192px e 512px
- [ ] (Opcional) Implementar Service Worker
- [ ] Testar instalação PWA no mobile

### Deploy
- [ ] Build sem erros (`npm run build`)
- [ ] Testar build localmente
- [ ] Deploy em plataforma escolhida
- [ ] Testar PWA instalada no iPhone real

---

## 🐛 Troubleshooting

### Erro: "Cannot find module 'figma:asset/...'"
**Solução:** Verificar que os assets do Figma estão na pasta `/imports/` e o hash está correto.

### Erro: Service Worker não registra
**Solução:** Verificar que HTTPS está habilitado (ou usar localhost).

### Erro: PWA não instala no iPhone
**Solução:** 
- Verificar `manifest.json` está linkado
- Adicionar `apple-mobile-web-app-capable`
- Testar em Safari (não Chrome)

### Gráficos não aparecem
**Solução:** Verificar que `recharts` está instalado e dados de `moodHistory` estão populados.

---

## 📞 Informações Técnicas

### Compatibilidade
- **Mobile**: iOS 13+ (Safari)
- **Desktop**: Chrome, Firefox, Safari (para testes)
- **PWA**: iOS 11.3+, Android 5.0+

### Performance
- App otimizado para 390×844px
- Scroll suave com CSS
- Transições com Motion/React
- Lazy loading não necessário (app pequeno)

### Acessibilidade
- Áreas de toque: 44×44px mínimo ✅
- Contraste de cores: WCAG AA ✅
- Labels acessíveis em botões ✅

---

## 📝 Notas Adicionais

### Idioma
Todo o app está em **português brasileiro**.

### Dados Persistentes
Atualmente usa `localStorage` do navegador. Para versão de produção, considerar:
- IndexedDB para mais capacidade
- Backend com Supabase (já preparado no código)

### Backup de Dados
Usuários podem exportar dados via configurações (funcionalidade a ser implementada).

---

## 🎉 Conclusão

Este guia cobre todos os elementos necessários para:
1. ✅ Entender a estrutura do app
2. ✅ Localizar componentes e funcionalidades
3. ✅ Preparar o build de produção
4. ✅ Configurar e deploy como PWA

**Próximos passos recomendados:**
1. Testar o app completamente
2. Criar os ícones do PWA
3. Configurar `manifest.json`
4. Fazer build e deploy
5. Testar instalação no iPhone real

---

**Versão do documento:** 1.0  
**Data:** Janeiro 2026  
**App:** Mood & Med Tracker v1.0
