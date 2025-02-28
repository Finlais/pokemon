# Étape 1 : construire l'application
FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier package.json et le fichier package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Installer Expo CLI globalement
RUN npm install -g expo-cli

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN npx expo export -p web

# Étape 2 : servir l'application
FROM nginx:alpine

# Déclaration de la variable d'env VERSION
ENV VERSION 'dev'

# Copier les fichiers de l'application construits dans le répertoire par défaut de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

# Créer une nouvelle configuration Nginx qui écoute sur le port 8080
RUN echo 'server { \
    listen 8080; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Exposer le port 8080
EXPOSE 8080

# Copier le script d'entrée
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# Ajouter les permissions d'exécution
RUN chmod +x /usr/local/bin/entrypoint.sh

# Définir le point d'entrée pour utiliser /bin/sh ou /bin/bash
ENTRYPOINT ["/bin/sh", "-c"]

# Démarrer Nginx
CMD ["/usr/local/bin/entrypoint.sh"]