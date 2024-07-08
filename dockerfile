# Étape 1 : construire l'application
FROM node:14-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier package.json et le fichier package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Installer Expo CLI globalement
RUN npm install -g expo-cli

# Construire l'application
RUN expo build:web

# Étape 2 : servir l'application
FROM nginx:alpine

# Copier les fichiers de l'application construits dans le répertoire par défaut de Nginx
COPY --from=build /app/web-build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
