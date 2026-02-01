# Mood & Med Tracker - Backlog de Funcionalidades

## 📱 Visão Geral
App de rastreamento de humor e medicação para iPhone 13 (390×844px) com estética minimalista e calma, usando azuis/verdes suaves, cinzas neutros e cores de destaque.

## ✅ Funcionalidades Implementadas

### 🎯 Onboarding Flow
- **Tela de Boas-vindas** (`WelcomeScreen.tsx`)
  - Apresentação inicial do app
  - Botão para iniciar configuração
  
- **Tela de Permissões** (`PermissionsScreen.tsx`)
  - Solicitação de permissões de notificação
  - Explicação clara do uso de cada permissão
  
- **Configuração de Lembretes** (`ReminderSetupScreen.tsx`)
  - Configuração de horários para registro de humor
  - Seleção de frequência de lembretes
  - Sistema de notificações configurável

### 🏠 Tela Principal (Home)
- **Header Dinâmico**
  - Saudação baseada no horário do dia (Bom dia/Boa tarde/Boa noite)
  - Exibição de clima e temperatura atual
  - Data formatada em português
  
- **Registro Rápido de Humor**
  - 5 níveis de humor (Terrível, Ruim, OK, Bom, Ótimo)
  - Seleção em 1-2 toques
  - Feedback visual com emojis e cores
  
- **Gráfico de 7 Dias**
  - Visualização de tendências de humor
  - Gráfico de linha interativo
  - Pontos clicáveis com detalhes

### 😊 Sistema de Registro de Humor
- **Tela de Seleção de Humor** (`MoodSelectionScreen.tsx`)
  - 5 opções de humor com cores distintas
  - Interface intuitiva e acessível
  
- **Detalhes Opcionais** (`MoodDetailsScreen.tsx`)
  - Nota/diário pessoal
  - Horas de sono (com contador visual)
  - Fatores dietéticos (checkboxes):
    - ☕ Café
    - 🍷 Álcool
    - 🥗 Refeições balanceadas
    - 🍬 Açúcar/doces
    - 💧 Hidratação adequada
  - Clima automático (integração futura)

### 💊 Gerenciamento de Medicação

#### Lista de Medicamentos (`MedicationsScreen.tsx`)
- Cards visuais com informações do medicamento
- Status de hoje (Tomado/Pendente)
- Próxima dose com horário
- Visualização de comprimidos/cápsulas
- Navegação para detalhes

#### Adicionar Medicamento (`AddMedicationScreen.tsx`)
- **📸 Identificação por Foto**
  - Botão "Tire uma foto da caixa"
  - Captura usando câmera traseira (`capture="environment"`)
  - Identificação automática de nome e tipo (simulado)
  - Feedback de processamento
  
- **Card 1: Informações Básicas**
  - Nome do medicamento
  - Tipo (comprimido, cápsula, gota, ml)
  - Quantidade por dose
  
- **Card 2: Horários e Frequência**
  - Múltiplos horários de dose
  - Adição/remoção dinâmica de horários
  - Seleção de dias da semana (D-S)
  - Checkboxes visuais para cada dia
  
- **Card 3: Aparência do Medicamento**
  - **Modo Foto**: Upload de imagem real
  - **Modo Gerado**: Customização visual
    - Formas: Redondo, Cápsula, Quadrado, Triangular
    - Tamanhos: Pequeno, Médio, Grande
    - Cores: 6 opções de paleta pastel (2 cores por comprimido)
    - Pré-visualização em tempo real
  - Sistema de visualização (`PillVisualization.tsx`)

#### Detalhes do Medicamento (`MedicationDetailScreen.tsx`)
- Informações completas do medicamento
- Histórico de doses
- Edição de configurações
- Exclusão com confirmação

### 📊 Histórico de Humor
- **Tela de Histórico** (`HistoryScreen.tsx`)
  - Lista cronológica de registros
  - Filtros por período (7/30/90 dias)
  - Cartões expandíveis com detalhes completos
  - Persistência em localStorage
  - Exibição de:
    - Humor com emoji e cor
    - Notas pessoais
    - Horas de sono
    - Fatores dietéticos
    - Clima e temperatura
    - Data e hora do registro

### ⚙️ Configurações
- **Tela de Configurações** (`SettingsScreen.tsx`)
  - Perfil do usuário
  - Configurações de notificação
  - Preferências de privacidade
  - Sobre o app

### 🧩 Componentes Reutilizáveis
- **Button** (`Button.tsx`) - Botões padronizados
- **TabBar** (`TabBar.tsx`) - Navegação inferior (Home, Medications)
- **PillVisualization** (`PillVisualization.tsx`) - Renderização de medicamentos
- **DietCheckbox** (`DietCheckbox.tsx`) - Checkboxes de dieta customizados

## 🎨 Sistema de Design

### Cores
- **Primária**: Azul/Verde suave
- **Secundária**: Cinza neutro
- **Humor Colors**:
  - Terrível: Vermelho (#FF6B6B)
  - Ruim: Laranja (#FFA06B)
  - OK: Amarelo (#FFD93D)
  - Bom: Verde claro (#A8E6CF)
  - Ótimo: Verde (#6BCF7F)

### Tipografia
- Títulos: Cinza 90%
- Corpo: Peso regular
- Sistema de tamanhos consistente

### Espaçamento
- Grid de 8/16/24px
- Áreas de toque: mínimo 44×44px
- Cantos arredondados: 8-24px

### Layout
- Mobile-first (390×844px)
- Safe areas para iPhone
- Navegação bottom tab
- Cards com elevação sutil

## 💾 Persistência de Dados
- **localStorage** para:
  - Histórico de humor
  - Lista de medicamentos
  - Configurações do usuário
  - Estado de onboarding

## 🔮 Funcionalidades Futuras (Ocultas/Planejadas)

### 📈 AI Insights & Reports (Temporariamente Oculto)
- **Arquivo**: `ReportsScreen.tsx` (código mantido)
- **Funcionalidades planejadas**:
  - Análise de padrões de humor vs medicação
  - Correlação com sono e dieta
  - Impacto de fatores climáticos
  - Insights personalizados com IA
  - Gráficos comparativos
  - Recomendações inteligentes
  - Exportação de relatórios PDF

### 🔄 Integrações Futuras
- API de clima real (substituir mock)
- OCR real para identificação de medicamentos
- Banco de dados de medicamentos (ex: ANVISA)
- Sincronização em nuvem
- Backup automático
- Compartilhamento com médicos

### 📱 Recursos Mobile Avançados
- Notificações push reais
- Widgets iOS
- Apple Health integration
- Lembretes inteligentes baseados em contexto

## 🏗️ Estrutura do Projeto

```
/
├── App.tsx                          # Componente principal e roteamento
├── components/
│   ├── WelcomeScreen.tsx           # Onboarding 1
│   ├── PermissionsScreen.tsx       # Onboarding 2
│   ├── ReminderSetupScreen.tsx     # Onboarding 3
│   ├── HomeScreen.tsx              # Tela principal
│   ├── MoodSelectionScreen.tsx     # Seleção de humor
│   ├── MoodDetailsScreen.tsx       # Detalhes do humor
│   ├── HistoryScreen.tsx           # Histórico completo
│   ├── MedicationsScreen.tsx       # Lista de medicamentos
│   ├── AddMedicationScreen.tsx     # Adicionar medicamento
│   ├── MedicationDetailScreen.tsx  # Detalhes do medicamento
│   ├── ReportsScreen.tsx           # [OCULTO] AI Insights
│   ├── SettingsScreen.tsx          # Configurações
│   ├── TabBar.tsx                  # Navegação inferior
│   ├── Button.tsx                  # Botão reutilizável
│   ├── PillVisualization.tsx       # Visualização de pills
│   └── DietCheckbox.tsx            # Checkbox customizado
└── styles/
    └── globals.css                 # Estilos globais e tokens
```

## 📝 Notas de Implementação

### Decisões de Design
1. **Modo Gerado vs Foto**: Permite customização mesmo sem foto real
2. **Checkboxes de Dieta**: Cor primária alinhada com cards de medicamento
3. **Saudação Dinâmica**: Melhora personalização e engajamento
4. **Forma Triangular**: Pontas arredondadas para consistência visual
5. **Autocomplete Removido**: UX não estava satisfatória

### Performance
- Componentes otimizados
- localStorage para persistência local
- Lazy loading preparado para futuro
- Mock data para desenvolvimento

### Acessibilidade
- Áreas de toque >= 44px
- Contraste de cores adequado
- Labels semânticos
- Feedback visual claro

## 🎯 Métricas de Sucesso
- Tempo de setup < 2 minutos
- Registro de humor em 1-2 toques
- Taxa de adesão a medicamentos
- Engajamento diário com o app

---

**Versão**: 1.0.0  
**Status**: Desenvolvimento Completo (MVP)  
**Plataforma**: Web App (preparado para build Android/iOS)
