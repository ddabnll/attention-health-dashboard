# Dashboard Consumo - Frontend

Dashboard React para visualização de dados de bem-estar digital.

## 🚀 Configuração Rápida

### Pré-requisitos
- Node.js 16+ (LTS recomendado)
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Criar arquivo .env baseado no exemplo
cp .env.example .env
```

### Executar em Desenvolvimento

```bash
npm start
```

A aplicação abrirá em `http://localhost:3000`

### Build para Produção

```bash
npm run build
```

### Testes

```bash
npm test
```

## 📦 Dependências Principais

- **React 19**: Framework principal
- **Recharts 3.8**: Visualização de gráficos
- **Axios 1.15**: Cliente HTTP
- **Testing Library**: Testes unitários

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` baseado em `.env.example`:

```env
REACT_APP_API_URL=http://127.0.0.1:8000
```

## 📂 Estrutura do Projeto

```
src/
├── App.js           # Componente principal
├── App.css          # Estilos globais
├── index.js         # Entrada da aplicação
└── ...
```

## 🎨 Design & UI

- **Tema Dark**: Interface escura para melhor usabilidade
- **Cores Personalizadas**: Paleta com índigo, rosa, verde e âmbar
- **Responsivo**: Layout adaptativo para diferentes resoluções

## 📊 Recursos

- Filtros dinâmicos (Plataforma, Idade, Intensidade)
- KPIs em tempo real
- 5 gráficos interativos (Pie, Line, Bar, Composed)
- Insights automáticos baseados em dados

---

**Desenvolvido por Daniel Bonilla**
