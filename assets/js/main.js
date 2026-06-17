/* =========================================================
   AC Acessórios — interações do site
   ========================================================= */

// >>> CONFIGURAÇÃO RÁPIDA — ajuste aqui se mudar os números <<<
const WHATSAPP = "556635446545";    // Varejo / oficial (WhatsApp) — 55 + DDD + número
const TEL_ATACADO = "556635450677"; // Atacado (somente telefone, sem WhatsApp)

// Marcas (logo em assets/img/marcas/<slug>.png; se faltar, mostra o nome estilizado)
const BRANDS = [
  { name: "Pilkington", slug: "pilkington" },
  { name: "Saint-Gobain Sekurit", slug: "sekurit" },
  { name: "AGC", slug: "agc" },
  { name: "Fanavid", slug: "fanavid" },
  { name: "Universal Soluções Automotivas", slug: "universal" },
  { name: "Arteb", slug: "arteb" },
  { name: "Metagal", slug: "metagal" },
  { name: "TYC", slug: "tyc" },
  { name: "DEPO", slug: "depo" },
  { name: "Lumax", slug: "lumax" },
  { name: "Bosch", slug: "bosch" },
  { name: "Osram", slug: "osram" },
  { name: "DTS Parachoque", slug: "dts-parachoque" },
  { name: "Flash Cover", slug: "flash-cover" },
  { name: "Centauro Autoparts", slug: "centauro-autoparts" },
  { name: "Ponteiras Rodrigues", slug: "ponteiras-rodrigues" },
  { name: "Grid Car Calotas", slug: "grid-car-calotas" },
  { name: "Elite Calotas", slug: "elite-calotas" },
  { name: "Autotravi", slug: "autotravi" },
  { name: "Karina KJ Autopeças", slug: "karina-kj" },
  { name: "Ori Truck", slug: "ori-truck" },
  { name: "Fitam Lanternas", slug: "fitam" },
  { name: "Fipparts", slug: "fipparts" },
  { name: "F. Confuorto", slug: "f-confuorto" },
  { name: "Tekbond", slug: "tekbond" },
  { name: "Tecbrill", slug: "tecbrill" },
  { name: "Shocklight", slug: "shocklight" },
  { name: "Magneti Marelli", slug: "magneti-marelli" },
  { name: "Loma Plast", slug: "loma-plast" },
  { name: "Vetroex", slug: "vetroex" },
  { name: "Ficosa SPJ", slug: "ficosa-spj" },
  { name: "Cofran", slug: "cofran" },
  { name: "PC Fix", slug: "pc-fix" },
  { name: "Central Sul", slug: "central-sul" },
  { name: "Shermman", slug: "shermman" },
  { name: "Fortflex", slug: "fortflex" },
  { name: "Vip Rack de Tetos", slug: "vip-rack" },
  { name: "Blawers", slug: "blawers" },
  { name: "Engekar", slug: "engekar" },
  { name: "Bruck", slug: "bruck" },
  { name: "Metalvis", slug: "metalvis" },
  { name: "BRB Tapetes", slug: "brb-tapetes" },
  { name: "Camper", slug: "camper" },
  { name: "Unipac", slug: "unipac" },
  { name: "Mundial Prime", slug: "mundial-prime" },
  { name: "Atemis", slug: "atemis" },
  { name: "Ziniguel", slug: "ziniguel" },
  { name: "NAT", slug: "nat" },
  { name: "Autplast", slug: "autplast" },
  { name: "Marcon Emblemas e Calhas", slug: "marcon" },
  { name: "Vetor", slug: "vetor" },
  { name: "Teslla", slug: "teslla" },
  { name: "LS Indústria", slug: "ls-industria" },
];

document.addEventListener("DOMContentLoaded", () => {

  /* ---- Ano no rodapé ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Carrossel de marcas ---- */
  const track = document.getElementById("marqueeTrack");
  const marquee = document.getElementById("marquee");
  if (track && marquee && BRANDS.length) {
    const makeItem = (b) => {
      const item = document.createElement("div");
      item.className = "brand-item";
      const img = document.createElement("img");
      img.src = `assets/img/marcas/${b.slug}.png`;
      img.alt = b.name;
      img.draggable = false;
      img.addEventListener("error", () => {
        item.classList.add("brand-item--text");
        item.textContent = b.name;
      });
      item.appendChild(img);
      return item;
    };
    // duplica a lista para o loop ser contínuo
    const N = BRANDS.length;
    [...BRANDS, ...BRANDS].forEach((b) => track.appendChild(makeItem(b)));

    // largura de um "set" (onde o conteúdo se repete) = início da 2ª cópia
    const setWidth = () => (track.children[N] ? track.children[N].offsetLeft : track.scrollWidth / 2);
    const wrap = (v, w) => (w > 0 ? ((v % w) + w) % w : v);

    const SPEED = 0.6; // px por frame (rolagem automática)
    // pos = deslocamento (float). Aplicado via transform — não usa scroll nativo,
    // então o navegador não disputa o movimento (resolve o travamento no mobile).
    let pos = 0, dragging = false, startX = 0, startPos = 0;

    const step = () => {
      const w = setWidth();
      if (!dragging) pos += SPEED;
      pos = wrap(pos, w);                 // loop infinito nos dois sentidos
      track.style.transform = `translateX(${-pos}px)`;
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);

    // ---- arrastar p/ frente e trás (mouse e touch) — pausa só enquanto arrasta ----
    marquee.addEventListener("pointerdown", (e) => {
      dragging = true;
      startX = e.clientX;
      startPos = pos;
      try { marquee.setPointerCapture(e.pointerId); } catch (_) {}
      marquee.classList.add("grabbing");
    });
    marquee.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      pos = startPos - (e.clientX - startX); // o wrap acontece no step()
    });
    const endDrag = () => { dragging = false; marquee.classList.remove("grabbing"); };
    ["pointerup", "pointercancel"].forEach((ev) =>
      marquee.addEventListener(ev, endDrag)
    );
  }

  /* ---- Vídeo do hero: garante o autoplay mudo ---- */
  const heroVideo = document.querySelector(".hero__video");
  if (heroVideo) {
    heroVideo.muted = true;
    const tryPlay = heroVideo.play();
    if (tryPlay && typeof tryPlay.catch === "function") tryPlay.catch(() => {});
  }

  /* ---- Header com sombra ao rolar ---- */
  const header = document.getElementById("header");
  const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Menu mobile ---- */
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---- Reveal on scroll (com rede de segurança) ---- */
  const revealEls = document.querySelectorAll(".reveal");
  const showAll = () => revealEls.forEach((el) => el.classList.add("is-visible"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 80}ms`;
      io.observe(el);
    });
    // Garantia: se por qualquer motivo o observer não disparar,
    // revela todo o conteúdo para nunca ficar invisível.
    setTimeout(() => {
      const stuck = document.querySelectorAll(".reveal:not(.is-visible)");
      if (stuck.length === revealEls.length) showAll();
    }, 1800);
  } else {
    showAll();
  }

  /* ---- Contadores animados ---- */
  const counters = document.querySelectorAll("[data-count]");
  const finalText = (el) =>
    (el.dataset.prefix || "") + el.dataset.count + (el.dataset.suffix || "");

  const runCounter = (el) => {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const target = parseInt(el.dataset.count, 10);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const dur = 1500;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window && counters.length) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            runCounter(e.target);
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => cio.observe(c));
    // Garantia: se o observer/rAF não rodar (aba oculta, reduced-motion etc.),
    // grava os valores finais diretamente para nunca ficar zerado.
    setTimeout(() => counters.forEach((c) => { c.textContent = finalText(c); }), 2500);
  } else {
    counters.forEach((c) => { c.textContent = finalText(c); });
  }

  /* ---- Formulário de orçamento ---- */
  const form = document.getElementById("contactForm");
  if (form) {
    const btn = document.getElementById("formBtn");
    const note = document.getElementById("formNote");
    const tipoEl = form.tipo;

    // Atualiza o botão/aviso conforme Varejo (WhatsApp) ou Atacado (telefone)
    const syncUI = () => {
      const atacado = tipoEl.value === "Atacado";
      if (btn) btn.textContent = atacado ? "Ligar para o Atacado" : "Enviar pelo WhatsApp";
      if (note)
        note.textContent = atacado
          ? "O atacado é atendido por telefone: (66) 3545-0677."
          : "Ao enviar, abriremos uma conversa no WhatsApp com os seus dados preenchidos.";
    };
    tipoEl.addEventListener("change", syncUI);
    syncUI();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = form.nome.value.trim();
      const tel = form.tel.value.trim();
      const tipo = tipoEl.value;
      const msg = form.msg.value.trim();

      if (!nome || !tel) {
        alert("Por favor, preencha ao menos o nome e o telefone.");
        return;
      }

      // Atacado não tem WhatsApp -> direciona para ligação telefônica
      if (tipo === "Atacado") {
        window.location.href = `tel:+${TEL_ATACADO}`;
        return;
      }

      const texto =
        `Olá! Gostaria de um orçamento (Varejo).%0A%0A` +
        `*Nome:* ${nome}%0A` +
        `*Telefone:* ${tel}%0A` +
        (msg ? `*Interesse:* ${msg}` : "");

      window.open(`https://wa.me/${WHATSAPP}?text=${texto}`, "_blank");
    });
  }
});
