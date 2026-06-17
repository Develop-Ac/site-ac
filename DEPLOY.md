# Deploy do site AC Acessórios no EasyPanel (Hostinger)

Site estático servido com **Nginx** dentro de um container Docker.
O EasyPanel builda a imagem a partir do `Dockerfile` deste repositório.

---

## Arquivos de deploy (já prontos)

| Arquivo | Função |
|---|---|
| `Dockerfile` | Constrói a imagem Nginx com o site |
| `nginx.conf` | Configuração do servidor (gzip + cache) |
| `.dockerignore` | Exclui arquivos que não vão para a imagem |
| `.gitignore` | Exclui arquivos do repositório Git |

O container **escuta na porta 80**.

---

## Passo 1 — Subir o código para um repositório Git

O EasyPanel buildar a partir de um repositório (GitHub é o mais simples).

```bash
# dentro da pasta site-institucional
git init
git add .
git commit -m "Site institucional AC Acessórios"

# crie um repositório no GitHub (ex.: ac-acessorios-site) e:
git remote add origin https://github.com/SEU_USUARIO/ac-acessorios-site.git
git branch -M main
git push -u origin main
```

> Já deixei o `git init` + primeiro commit feitos. Falta só criar o repositório no GitHub e fazer o `git remote add` + `git push`.

---

## Passo 2 — Criar o serviço no EasyPanel

1. Acesse o painel do EasyPanel.
2. **Project** → abra um projeto (ou crie um novo, ex.: `site-institucional`).
3. **+ Service** → **App**.
4. Em **Source**:
   - Escolha **GitHub** (autorize o repositório) **ou** **Git** (cole a URL do repo).
   - **Branch:** `main`
   - **Build Path / Root:** `/` (se o repositório for a pasta `site-institucional`).
     Se você subir a pasta `DESENVOLVIMENTO` inteira, ponha `/site-institucional`.
5. Em **Build**:
   - **Método:** `Dockerfile`
   - **Dockerfile Path:** `Dockerfile`
6. Clique em **Deploy**. O EasyPanel vai buildar e subir o container.

---

## Passo 3 — Domínio e HTTPS

1. No serviço, vá em **Domains** → **Add Domain**.
2. Informe o domínio (ex.: `www.acacessorios.com.br`) ou use o subdomínio temporário do EasyPanel.
3. **Port:** `80`  (a porta interna do Nginx)
4. Ative **HTTPS** (o EasyPanel emite o certificado Let's Encrypt automaticamente).
5. No seu DNS (Hostinger), aponte o domínio para o **IP do VPS** (registro `A`).

---

## Atualizações futuras

Sempre que mudar o site:

```bash
git add .
git commit -m "ajustes no site"
git push
```

No EasyPanel, clique em **Deploy** novamente (ou ative o **Auto Deploy** para buildar a cada push).

---

## Observações

- **Cache:** o `index.html` não é cacheado (pega sempre a versão nova). CSS/JS usam `?v=` e têm cache longo. Imagens/vídeo têm cache de 7 dias — se trocar uma logo, peça aos visitantes um Ctrl+F5 ou troque o nome do arquivo.
- **Tamanho:** a imagem fica em ~15 MB (a maior parte é o vídeo institucional).
- **Sem backend:** é 100% estático, não precisa de banco de dados nem variáveis de ambiente.
