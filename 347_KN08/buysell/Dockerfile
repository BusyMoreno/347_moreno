# Nutze ein schlankes Node-Image
FROM node:18-slim

# Arbeitsverzeichnis im Container erstellen
WORKDIR /app

# Package-Dateien kopieren und Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Den restlichen Code kopieren
COPY . .

# Der Port, auf dem dein Service läuft
EXPOSE 8002

# Befehl zum Starten
CMD ["node", "index.js"]