# ===== Site institucional AC Acessórios — imagem de produção =====
# Servidor estático leve com Nginx (Alpine)
FROM nginx:1.27-alpine

# Configuração customizada (gzip + cache de assets)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Arquivos do site
COPY index.html /usr/share/nginx/html/index.html
COPY assets/ /usr/share/nginx/html/assets/

# Nginx escuta na porta 80 dentro do container
EXPOSE 80

# Healthcheck simples (EasyPanel/Docker)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
