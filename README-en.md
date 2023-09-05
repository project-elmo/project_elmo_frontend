<h1 align="center">
  <br>
  <img src="https://github.com/project-elmo/frontend/assets/72433681/2f99edb0-c873-478a-9add-d21eef560ccc" alt="ELMO" width="300">
</h1>

<h4 align="center">
Easy LLM Online Model Optimizer
</h4>
<p align="center">
  <a href="https://github.com/project-elmo/frontend/blob/main/README.md" target="_blank">
    한국어
  </a>
	|
  <a href="https://github.com/project-elmo/frontend/blob/main/README-en.md" target="_blank">English</a>
</p>
<h4 align="center">
  <a href="https://elmo-beta.vercel.app/" target="_blank">
    🌐 Demo
  </a> | 
  <a href="#" target="_blank">🖥️ Video</a>
</h4>

<p align="center">
  <a href="#Intro">Intro</a> •
  <a href="#Features">Features</a> •
  <a href="#Architecture">Architecture</a> •
  <a href="#Development">Development</a> •
  <a href="#Tech-Stack">Tech Stack</a> •
  <a href="#References">References</a> •
  <a href="#Credits">Credits</a>
</p>

<div align="center">

| [<img src="https://github.com/hhkim0729.png" width="100px;"/><br /><sub><b>Heehyun Kim</b></sub>](https://github.com/hhkim0729) | [<img src="https://github.com/jharinn.png" width="100px;"/><br /><sub><b>Harim Jung</b></sub>](https://github.com/jharinn)<br /> |
| :-----------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: |
|                                                            Frontend                                                             |                                                           Backend, AI                                                            |

</div>

## Intro

Open source project solution to create your own LLM-trained GPT without a background in AI

- Duration: Aug 2023 - Sep 2023 (4 weeks)

### 1. Background

- **Generative AI On The Rise**

  Recently, natural language processing technology has gained great popularity through services such as ChatGPT, and is expected to be used in various fields.

- **The Growth and Need for Large Language Models (LLMs)**

  IT giants are rolling out large language models (LLMs) and recognizing the need for fine-tuning for specific performance improvements. As a result, the growth of enterprise and personalized LLMs is expected.

- **High Demand for LLMs and Difficulty Accessing Them**

  LLMs are in high demand, but they are not accessible to the masses. Large language models require expensive GPUs, which are mostly only available to large companies. Also, training a language model requires deep knowledge. As a result, there is a need for a service that can easily fine-tune language models.

- **The Rise of Small Language Models**

  The importance of small language models specialized for a specific domain or purpose is being emphasized. This enables domain-specific training without the hardware costs and reduces training costs and time. Meta's research emphasizes that models with small parameter sizes can perform as well as larger models with high-quality training data and repeated training, and that purpose-built GPTs can be created on personal computers by training on publicly available data on the Internet.

### 2. Purpose

- **Making Personalized AI Models More Accessible**

  Studying for an LLM is a complex process and can be a major barrier to entry for the average person. The main objective of this project is to provide user-friendly interfaces and services to lower this barrier.

- **Highly Versatile in a Variety of Fields**

  This project will enable both individuals and companies to use LLMs in a variety of fields. For example, in education, LLMs can be used to create customized textbooks and learning materials, and in marketing, they can be used to classify customer data and derive insights.

- **Popularizing AI Technology by Providing User-Centered Services**

  By providing a platform where individuals and companies can easily fine-tune and utilize LLM for their specific purposes, we aim to make AI technology commonplace and popular.

### 3. Applications

- **Marketing**
  - Develop customized marketing campaigns based on customer interests and needs
  - Create product-specific content such as blog posts, newsletters, etc.
- **Education**
  - Create customized learning materials, examples for each student
  - Answering questions about lectures, assignments, etc.
- **Enterprise**
  - In-house chatbot service specialized for corporate domains
  - Customer support chatbot services for small businesses

## Features

### 1. Training models

<img src="https://github.com/project-elmo/frontend/assets/72433681/a5a06711-3546-48ed-a5c2-18a64dc1884f" alt="Select a model" width="500">

- Select a pre-trained model
  - Show model list
  - Download the model

<img src="https://github.com/project-elmo/frontend/assets/72433681/c9eef064-58d9-4d5e-ab44-d1e923cc0c1e" alt="Upload a dataset" width="500">

- Upload a dataset
  - Add JSON, CSV files

<img src="https://github.com/project-elmo/frontend/assets/72433681/e52c9c53-f42d-433e-bc8e-ddd5185ca024" alt="Set parameters" width="500">
<img src="https://github.com/project-elmo/frontend/assets/72433681/a14531f8-0ab2-40be-9186-dc1d3858ceb9" alt="Model training progress" width="500">
<img src="https://github.com/project-elmo/frontend/assets/72433681/0f180642-39c2-4dd1-9472-d6d5c68bd4b4" alt="Model training results" width="500">

- Train a model
  - Adjust LLM training parameters
  - Display model training progress
  - Save model training results

### 2. Managing models

<img src="https://github.com/project-elmo/frontend/assets/72433681/502e230a-0aba-4916-b2ac-7d594f0634b7" alt="Previous training results" width="500">

- Get previous training results
  - Display model relationships in a flow chart
  - Display training model metadata
- Download previous model training results
  - Download weight files locally
- Continue to train a previous model

### 3. Testing models

<img src="https://github.com/project-elmo/frontend/assets/72433681/2897cbb8-ecc7-449b-a69b-2e5a56e6a7ff" alt="Select a model to test" width="500">
<img src="https://github.com/project-elmo/frontend/assets/72433681/e1bfe440-3b57-4604-ab57-552d8534f29e" alt="Test in chat format" width="500">

- Generating text
  - Choosing which model to test
  - Test in chat format

## Architecture

![image](https://github.com/project-elmo/frontend/assets/72433681/aeebd11b-60ed-4872-add0-9aab406ae8a6)

## Development

### 1. Server

- With Docker:
  ```python
  docker compose build
  docker compose up --build
  ```
- Without Docker :

  1. Install poetry to add packages

  ```python
  pip install poetry==1.6.0
  ```

  2. Install required packages with poetry

  ```python
  poetry install
  ```

  3. Prepare Redis & MySQL

  ```python
  (macOS)
  brew install redis

  (Linux -e.g., Ubuntu-)
  sudo apt-get install redis-server

  (window)
  you can use WSL or a Redis Windows port.

  redis-server redis.conf

  sudo apt-get update
  sudo apt-get install mysql-server-5.7
  sudo mysql_install_db

  (macOS)
  brew services start mysql@5.7
  # brew services restart mysql@5.7

  (Linux)
  mysql.server start

  mysql -u root -p

  mysql
  **CREATE DATABASE fastapi;
  SET PASSWORD FOR 'root'@'localhost' = PASSWORD('fastapi');**
  ```

  4. Set up DB with alembic

  ```python
  alembic upgrade head
  ```

  5. Start the server

  ```python
  poetry run python3 main.py --env {env} --debug
  ```

### 2. Client

1. Install pnpm to add packages

   https://pnpm.io/installation

2. Install required packages
   ```sh
   pnpm install
   ```
3. Start the server
   ```sh
   pnpm run dev
   ```

## Tech Stack

### Frontend

![react](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tanstack Query](https://img.shields.io/badge/-Tanstack%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Axios](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![radixui](https://img.shields.io/badge/radixui-161618?style=for-the-badge&logo=radixui&logoColor=white)
![d3.js](https://img.shields.io/badge/d3.js-F9A03C?style=for-the-badge&logo=d3dotjs&logoColor=white)
![React Flow](https://img.shields.io/badge/React%20Flow-db0070?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Icons](https://img.shields.io/badge/React%20Icons-c82361?style=for-the-badge)

![typescript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![vite](https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

### Backend

![python](https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![hugging face](https://img.shields.io/badge/hugging%20face-f3d13b?style=for-the-badge)
![uvicorn](https://img.shields.io/badge/uvicorn-4752b1?style=for-the-badge)
![gunicorn](https://img.shields.io/badge/gunicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=white)
![mysql](https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![redis](https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![fastapi](https://img.shields.io/badge/fastapi-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![alchemy](https://img.shields.io/badge/alchemy-0C0C0E?style=for-the-badge&logo=alchemy&logoColor=white)
![Alembic](https://img.shields.io/badge/Alembic-black?style=for-the-badge)

![docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

### Development

![Git](https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

### Collaboration

![GitHub](https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-FFFFFF.svg?style=for-the-badge&logo=notion&logoColor=black)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![swagger](https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

## References

- [[커버스토리] 챗GPT 타고 확산하는 ‘거대언어모델’…sLLM 구축 확대일로](http://www.itdaily.kr/news/articleView.html?idxno=215587)
- [작지만 똑똑한 AI … sLLM 시대 온다](https://www.mk.co.kr/news/it/10791394)
- Touvron, Hugo, et al. "LLaMA: Open and Efficient Foundation Language Models." (2023).

## Credits

- Logo image: [Emoji Kitchen](https://emojikitchen.dev/)
- Backend template: [FastAPI Boilerplate](https://github.com/teamhide/fastapi-boilerplate)
- Demo dataset used in the video: [CareCall for Seniors](https://github.com/naver-ai/carecall-corpus)
  - All rights (including intellectual property rights such as copyright) to all data are reserved by NAVER.
