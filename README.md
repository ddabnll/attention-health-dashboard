# Attention Health Dashboard ⚡

Dashboard interativo de análise de dados focado no monitoramento de bem-estar digital e produtividade. Este projeto foi desenvolvido para transformar dados brutos de consumo de redes sociais em insights visuais acionáveis.

## 📋 Sobre o Projeto

O Attention Health Dashboard é uma aplicação Full Stack que integra um backend em Django com um frontend em React. Ele permite visualizar métricas críticas como tempo de tela, níveis de foco e taxas de conclusão de tarefas em uma interface moderna e responsiva.

## 🚀 Instruções de Instalação e Execução

Para rodar a aplicação localmente, siga os passos abaixo:

### ⚠️ Pré-requisitos
* Python 3.10+
* Node.js (LTS)
* Git

---

### 1. Configuração do Backend (Django)

1. Entre na pasta raiz do servidor:
   cd consumo

2. Crie e ative seu ambiente virtual:
   python -m venv venv
   # Windows: .\venv\Scripts\activate
   # Linux/Mac: source venv/bin/activate

3. Instale as dependências:
   pip install django django-cors-headers djangorestframework

4. Prepare o banco de dados e importe os registros:
   python manage.py migrate
   python manage.py import_data

5. Inicie o servidor:
   python manage.py runserver
   *Backend disponível em: http://127.0.0.1:8000/*

---

### 2. Configuração do Frontend (React)

1. Em um novo terminal, entre na pasta do dashboard:
   cd dashboard-consumo

2. Instale os pacotes do Node:
   npm install

3. Inicie a aplicação:
   npm start
   *Frontend disponível em: http://localhost:3000/*

---

## 🛠️ Tecnologias e Recursos

* Frontend: React.js, Recharts, Axios.
* Backend: Django REST Framework, SQLite.
* Gráficos Integrados:
    * Usage by Platform: Distribuição entre TikTok, Instagram e YouTube.
    * Average Focus by Screen Time: Impacto do tempo de uso no foco.
    * Average Stress Level: Níveis de estresse por rede social.
    * Screen Time vs Completion Rate: Tendência de produtividade.

## ⚡ Insights Principais (Key Insights)

* Produtividade Crítica: Heavy users (>8h) apresentam a menor taxa de conclusão de tarefas.
* Fator de Estresse: O TikTok lidera o estresse médio entre as plataformas.
* Fadiga de Foco: O nível de foco reduz drasticamente após 2 horas de exposição contínua.

---
Desenvolvido por Daniel Bonilla - Aluno de Desenvolvimento de Sistemas (ETE).