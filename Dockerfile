# Pega uma versão leve e oficial do Python
FROM python:3.11-slim

# Cria uma pasta de trabalho chamada /app dentro do container
WORKDIR /app

# Copia o arquivo de dependências e as instala
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia o resto do nosso código para dentro da pasta /app
COPY . .

# O comando que vai iniciar a nossa API quando o container ligar
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]