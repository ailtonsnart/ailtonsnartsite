
// =========== FunÃ§Ãµes para controlar o Carousel =========
let mobileTechCarouselInterval = null;
let mobileTechCarouselIndex = 0;

function getTechCarouselItems() {
  return Array.from(document.querySelectorAll('.tech-3d .carousel-track .item'));
}

function clearMobileTechCarouselState() {
  getTechCarouselItems().forEach((item) => {
    item.classList.remove('mobile-active');
  });
}

function updateMobileTechCarousel() {
  const items = getTechCarouselItems();

  if (!items.length || window.innerWidth > 768) {
    return;
  }

  items.forEach((item, index) => {
    item.classList.toggle('mobile-active', index === mobileTechCarouselIndex);
  });
}

function startMobileTechCarousel() {
  const items = getTechCarouselItems();

  if (!items.length || window.innerWidth > 768) {
    return;
  }

  if (mobileTechCarouselInterval) {
    clearInterval(mobileTechCarouselInterval);
  }

  mobileTechCarouselIndex = mobileTechCarouselIndex % items.length;
  updateMobileTechCarousel();

  mobileTechCarouselInterval = setInterval(() => {
    mobileTechCarouselIndex = (mobileTechCarouselIndex + 1) % items.length;
    updateMobileTechCarousel();
  }, 1800);
}

function stopMobileTechCarousel() {
  if (mobileTechCarouselInterval) {
    clearInterval(mobileTechCarouselInterval);
    mobileTechCarouselInterval = null;
  }
}

function syncTechCarouselMode() {
  const carouselTrack = document.querySelector('.carousel-track');

  if (!carouselTrack) {
    return;
  }

  if (window.innerWidth <= 768) {
    carouselTrack.classList.remove('paused');
    startMobileTechCarousel();
    return;
  }

  stopMobileTechCarousel();
  clearMobileTechCarouselState();
}

function pauseCarousel() {
  const carouselTrack = document.querySelector('.carousel-track');
  if (carouselTrack) {
    if (window.innerWidth <= 768) {
      stopMobileTechCarousel();
      return;
    }

    carouselTrack.classList.add('paused');
  }
}

function resumeCarousel() {
  const carouselTrack = document.querySelector('.carousel-track');
  if (carouselTrack) {
    if (window.innerWidth <= 768) {
      startMobileTechCarousel();
      return;
    }

    carouselTrack.classList.remove('paused');
  }
}

// =========== Menu HambÃºrguer e Sidebar =========
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.getElementById('navOverlay');

  if (sidebar && hamburger && overlay) {
    const isActive = sidebar.classList.toggle('active');
    hamburger.classList.toggle('active', isActive);
    overlay.classList.toggle('active', isActive);
    hamburger.setAttribute('aria-expanded', String(isActive));
    document.body.style.overflow = isActive ? 'hidden' : 'auto';
  }
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.getElementById('navOverlay');

  if (sidebar && hamburger && overlay) {
    sidebar.classList.remove('active');
    hamburger.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = 'auto';
  }
}

// =========== Modal de Projeto =========
let currentProjectIndex = 0;
let currentImageIndex = 0;
let projectImages = [];
let projectData = {};
const DEFAULT_GITHUB_URL = 'https://github.com/ailtonsnart/ailtonsnartsite';
const SITE_REVIEW_API_LOCAL_BASE_URL = 'https://backend-ailtonsnartsite.onrender.com';
const SITE_REVIEW_API_FALLBACK_BASE_URL = 'https://backend-ailtonsnartsite.onrender.com';
const MAX_VISIBLE_SITE_REVIEWS = 6;

// Dados dos projetos
const projectsData = {
  0: { // Sistema De Consultas MÃ©dicas
    title: "Site para Fisioterapia e Reabilitação",
    images: [
      "assets/images/fisio1.png",
      "assets/images/fisio2.png",
      "assets/images/fisio3.png",
      "assets/images/fisio4.png",
      "assets/images/fisio5.png",
      "assets/images/fisio6.png",
      "assets/images/fisio7.png"
    ],
    badges: ["HTML", "CSS", "JS", "Node.js", "PostgreSQL"],
    description: "Sistema feito para clínicas de fisioterapia e reabilitação com foco em usabilidade e eficiência.",
    github: DEFAULT_GITHUB_URL
  },
  1: { // Sistema Para Academia
    title: "Sistema Para Academia",
    images: [
      "assets/images/siteacademiahome.png",
      "assets/images/siteacademiasobre.png",
      "assets/images/siteacademiaestrutura.png",
      "assets/images/siteacademiaalunos.png",
      "assets/images/siteacademiaplanos.png",
      "assets/images/siteacademiacadastrar.png"
    ],
    badges: ["HTML", "CSS", "JS", "Node.js", "PostgreSQL"],
    description: "Plataforma completa para gestão de academias, com controle de alunos, planos e acompanhamento de progresso físico.",
    github: DEFAULT_GITHUB_URL
  },
  2: { // Sistema Para Advocacia
    title: "Sistema Para Advocacia",
    images: [
      "assets/images/advocacia1.png",
      "assets/images/advocacia2.png",
      "assets/images/advocacia3.png",
      "assets/images/advocacia4.png",
      "assets/images/advocacia5.png"
    ],
    badges: ["HTML", "CSS", "JS", "Node.js", "PostgreSQL"],
    description: "Sistema jurídico completo para escritórios de advocacia, com gestão de processos, clientes e prazos.",
    github: DEFAULT_GITHUB_URL
  }
};

function openProjectModal(projectIndex) {
  currentProjectIndex = projectIndex;
  currentImageIndex = 0;
  projectData = projectsData[projectIndex];
  
  // Atualizar tÃ­tulo
  document.getElementById('modalTitle').textContent = projectData.title;
  
  // Atualizar badges
  const badgesContainer = document.getElementById('modalTechBadges');
  badgesContainer.innerHTML = projectData.badges.map(badge => 
    `<span class="badge">${badge}</span>`
  ).join('');
  
  // Atualizar descriÃ§Ã£o
  document.getElementById('modalDescription').textContent = projectData.description;
  
  // Criar pÃ¡ginas das imagens
  const galleryBook = document.getElementById('galleryBook');
  galleryBook.innerHTML = projectData.images.map((image, index) => 
    `<div class="page ${index === 0 ? 'active' : index === 1 ? 'next' : ''}">
      <img src="${image}" alt="Projeto ${projectIndex + 1} - Imagem ${index + 1}">
    </div>`
  ).join('');
  
  // Mostrar modal
  const modal = document.getElementById('projectModal');
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  
  updateGalleryNavigation();
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

function openBudgetModal() {
  const modal = document.getElementById('budgetModal');
  if (!modal) return;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeBudgetModal() {
  const modal = document.getElementById('budgetModal');
  if (!modal) return;
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

function nextImage() {
  const pages = document.querySelectorAll('.gallery-book .page');
  if (currentImageIndex < pages.length - 1) {
    currentImageIndex++;
    updateGalleryDisplay();
  }
}

function prevImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    updateGalleryDisplay();
  }
}

function updateGalleryDisplay() {
  const pages = document.querySelectorAll('.gallery-book .page');
  
  pages.forEach((page, index) => {
    page.className = 'page';
    
    if (index === currentImageIndex) {
      page.classList.add('active');
    } else if (index === currentImageIndex - 1) {
      page.classList.add('prev');
    } else if (index === currentImageIndex + 1) {
      page.classList.add('next');
    }
  });
  
  updateGalleryNavigation();
}

function updateGalleryNavigation() {
  const modal = document.getElementById('projectModal');
  const prevBtn = modal?.querySelector('.gallery-prev');
  const nextBtn = modal?.querySelector('.gallery-next');

  if (!prevBtn || !nextBtn || !projectData?.images?.length) {
    return;
  }

  prevBtn.style.opacity = currentImageIndex === 0 ? '0.5' : '1';
  nextBtn.style.opacity = currentImageIndex === projectData.images.length - 1 ? '0.5' : '1';
}

function openGitHub() {
  window.open(projectData.github || DEFAULT_GITHUB_URL, '_blank', 'noopener,noreferrer');
}

function openExternalLink(url) {
  if (!url) {
    return;
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}

function normalizeApiBaseUrl(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}

function getSiteReviewApiBaseUrl() {
  const configuredApiBaseUrl = normalizeApiBaseUrl(document.body?.dataset.apiBaseUrl);
  const isLocalEnvironment =
    window.location.protocol === "file:" ||
    ["localhost", "127.0.0.1"].includes(window.location.hostname);

  if (isLocalEnvironment) {
    return configuredApiBaseUrl || SITE_REVIEW_API_LOCAL_BASE_URL;
  }

  return configuredApiBaseUrl || SITE_REVIEW_API_FALLBACK_BASE_URL;
}

function getSiteReviewsApiUrl() {
  const apiBaseUrl = getSiteReviewApiBaseUrl();
  return `${apiBaseUrl}/avaliacao`;
}

function getSiteReviewStatsApiUrl() {
  const apiBaseUrl = getSiteReviewApiBaseUrl();
  return `${apiBaseUrl}/avaliacao/stats`;
}

async function fetchSiteReviews(limit = MAX_VISIBLE_SITE_REVIEWS) {
  const response = await fetch(getSiteReviewsApiUrl(), {
    method: "GET",
    headers: {
      Accept: "application/json"
    },
    cache: "no-store"
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload?.erro || "Nao foi possivel carregar as avaliacoes.");
  }

  return Array.isArray(payload) ? payload.slice(0, limit) : [];
}

async function fetchSiteReviewStats() {
  const response = await fetch(getSiteReviewStatsApiUrl(), {
    method: "GET",
    headers: {
      Accept: "application/json"
    },
    cache: "no-store"
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload?.erro || "Nao foi possivel carregar os dados das avaliacoes.");
  }

  return {
    totalReviews: Number(payload?.total || 0),
    averageRating: Number(payload?.media || 0)
  };
}

async function submitSiteReview(review) {
  const apiBaseUrl = getSiteReviewApiBaseUrl();
  const response = await fetch(`${apiBaseUrl}/avaliacao`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(review)
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload?.erro || "Nao foi possivel enviar a avaliacao.");
  }

  return payload;
}

function formatSiteReviewDate(isoDate) {
  if (!isoDate) {
    return 'Agora';
  }

  const parsedDate = new Date(isoDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Agora';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(parsedDate);
}

// Fechar modal ao clicar fora
document.addEventListener('DOMContentLoaded', () => {
  const projectModal = document.getElementById('projectModal');
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  const budgetModal = document.getElementById('budgetModal');
  if (budgetModal) {
    budgetModal.addEventListener('click', (e) => {
      if (e.target === budgetModal) {
        closeBudgetModal();
      }
    });
  }

  // Adicionar event listeners aos botÃµes "Ver Projeto"
  document.querySelectorAll('.btn-project').forEach((button, index) => {
    button.addEventListener('click', () => {
      openProjectModal(index);
    });
  });

  document.querySelectorAll('[data-github-url]').forEach((button) => {
    button.addEventListener('click', () => {
      openExternalLink(button.dataset.githubUrl || DEFAULT_GITHUB_URL);
    });
  });

  // Adicionar listeners para abrir modal de orÃ§amento (botÃµes especÃ­ficos)
  document.querySelectorAll('.btn-gradient').forEach((button) => {
    button.addEventListener('click', (event) => {
      const isBudgetButton = event.currentTarget.closest('.btn-gradient') !== null && event.currentTarget.textContent.includes('Solicitar OrÃ§amento');
      if (isBudgetButton) {
        openBudgetModal();
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // seu cÃ³digo aqui

syncTechCarouselMode();

//=========== AnimaÃ§Ã£o CardImage Projects ================
const images = document.querySelectorAll('.image');

images.forEach(image => {

  image.addEventListener('mousemove', (e) => {

    const rect = image.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 6;
    const rotateY = (centerX - x) / 6;

    image.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

    // brilho
    image.style.setProperty('--x', `${x}px`);
    image.style.setProperty('--y', `${y}px`);
  });

  image.addEventListener('mouseleave', () => {
    image.style.transform =
      `rotateX(0deg) rotateY(0deg) scale(1)`;
  });

});

// =========== NavegaÃ§Ã£o das Tabs ==============
const buttons = document.querySelectorAll(".nav button");
const tabs = document.querySelectorAll(".tab");
const floatingReviewButton = document.getElementById("floatingReviewButton");
const siteReviewSection = document.getElementById("avaliacao-site");
const siteReviewForm = document.getElementById("siteReviewForm");
const siteReviewNameInput = document.getElementById("siteReviewName");
const siteReviewRatingInput = document.getElementById("siteReviewRating");
const siteReviewCommentInput = document.getElementById("siteReviewComment");
const siteReviewFeedback = document.getElementById("siteReviewFeedback");
const siteReviewAverage = document.getElementById("siteReviewAverage");
const siteReviewCount = document.getElementById("siteReviewCount");
const siteReviewList = document.getElementById("siteReviewList");
const siteReviewStarGroup = document.getElementById("siteReviewStarGroup");
const siteReviewStars = Array.from(document.querySelectorAll(".review-star"));
const siteReviewSubmitButton = document.querySelector(".review-submit");
let selectedSiteReviewRating = Number(siteReviewRatingInput?.value || 0);

function triggerSiteReviewSpotlight() {
  if (!siteReviewForm) {
    return;
  }

  siteReviewForm.classList.remove("is-spotlight");
  void siteReviewForm.offsetWidth;
  siteReviewForm.classList.add("is-spotlight");

  setTimeout(() => {
    siteReviewForm.classList.remove("is-spotlight");
  }, 1500);
}

function syncFloatingReviewButtonVisibility() {
  if (!floatingReviewButton || !siteReviewSection) {
    return;
  }

  const activeTabId = document.querySelector(".tab.active")?.id;

  if (activeTabId !== "home") {
    floatingReviewButton.classList.remove("is-hidden");
    return;
  }

  const reviewSectionRect = siteReviewSection.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const isReviewSectionVisible =
    reviewSectionRect.top < viewportHeight * 0.72 &&
    reviewSectionRect.bottom > viewportHeight * 0.28;

  floatingReviewButton.classList.toggle("is-hidden", isReviewSectionVisible);
}

function openTab(target) {
  if (!target) {
    return;
  }

  const targetButton = Array.from(buttons).find((button) => button.dataset.tab === target);
  const targetTab = Array.from(tabs).find((tab) => tab.id === target);

  if (!targetButton || !targetTab) {
    return;
  }

  closeSidebar();

  buttons.forEach((button) => button.classList.remove("active"));
  targetButton.classList.add("active");

  if (targetTab.classList.contains("active")) {
    syncFloatingReviewButtonVisibility();
    return;
  }

  tabs.forEach((tab) => {
    if (tab.classList.contains("active")) {
      tab.classList.remove("active");
      tab.classList.add("exit");

      setTimeout(() => {
        tab.classList.remove("exit");
      }, 600);
    }

    if (tab.id === target) {
      setTimeout(() => {
        tab.classList.add("active");
        syncFloatingReviewButtonVisibility();
      }, 630);
    }
  });
}

function scrollToTabSection(targetTab, sectionId) {
  const targetSection = document.getElementById(sectionId);

  if (!targetSection) {
    openTab(targetTab);
    return;
  }

  const performScroll = () => {
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    if (sectionId === "avaliacao-site") {
      triggerSiteReviewSpotlight();
    }

    setTimeout(syncFloatingReviewButtonVisibility, 180);
  };

  if (document.querySelector(".tab.active")?.id === targetTab) {
    performScroll();
    return;
  }

  openTab(targetTab);
  setTimeout(performScroll, 720);
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    openTab(btn.dataset.tab);
  });
});

document.querySelectorAll("[data-open-tab]").forEach((element) => {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    const targetTab = element.dataset.openTab;
    const scrollTarget = element.dataset.scrollTarget;

    if (scrollTarget) {
      scrollToTabSection(targetTab, scrollTarget);
      return;
    }

    openTab(targetTab);
  });
});

function setSiteReviewFeedback(message, isError = false) {
  if (!siteReviewFeedback) {
    return;
  }

  siteReviewFeedback.textContent = message;
  siteReviewFeedback.classList.toggle("is-visible", Boolean(message));
  siteReviewFeedback.classList.toggle("is-error", isError);
}

function updateSiteReviewStars(rating) {
  siteReviewStars.forEach((star, index) => {
    star.classList.toggle("is-active", index < rating);
    star.setAttribute("aria-pressed", String(index + 1 === rating));
  });

  if (siteReviewStarGroup) {
    siteReviewStarGroup.setAttribute(
      "aria-label",
      rating
        ? `Nota selecionada: ${rating} de 5 estrelas`
        : "Selecione uma nota de 1 a 5 estrelas"
    );
  }
}

function createSiteReviewCard(review) {
  const reviewRating = Number(review?.estrelas || 0);
  const reviewCard = document.createElement("article");
  reviewCard.className = "review-card";

  const cardTop = document.createElement("div");
  cardTop.className = "review-card-top";

  const cardMeta = document.createElement("div");

  const author = document.createElement("strong");
  author.className = "review-card-author";
  author.textContent = String(review.nome || "").trim() || "Visitante";

  const date = document.createElement("span");
  date.className = "review-card-date";
  date.textContent = formatSiteReviewDate(review.createdAt);

  cardMeta.appendChild(author);
  cardMeta.appendChild(date);

  const starRow = document.createElement("div");
  starRow.className = "review-card-stars";
  starRow.setAttribute("aria-label", `${reviewRating} de 5 estrelas`);

  for (let index = 0; index < 5; index += 1) {
    const star = document.createElement("span");
    star.className = "review-card-star";
    star.innerHTML = "&#9733;";

    if (index < reviewRating) {
      star.classList.add("filled");
    }

    starRow.appendChild(star);
  }

  const comment = document.createElement("p");
  comment.textContent = String(review.comentario || "").trim();

  cardTop.appendChild(cardMeta);
  cardTop.appendChild(starRow);
  reviewCard.appendChild(cardTop);
  reviewCard.appendChild(comment);

  return reviewCard;
}

function renderSiteReviewsEmpty(titleText, descriptionText) {
  if (!siteReviewList) {
    return;
  }

  siteReviewList.innerHTML = "";

  const emptyState = document.createElement("div");
  emptyState.className = "review-empty";

  const title = document.createElement("strong");
  title.textContent = titleText;

  const description = document.createElement("p");
  description.textContent = descriptionText;

  emptyState.appendChild(title);
  emptyState.appendChild(description);
  siteReviewList.appendChild(emptyState);
}

function renderSiteReviews(data) {
  const reviews = Array.isArray(data?.reviews) ? data.reviews : [];
  const totalReviews = Number(data?.totalReviews || 0);
  const averageRating = Number(data?.averageRating || 0);

  if (siteReviewAverage) {
    siteReviewAverage.textContent = totalReviews
      ? averageRating.toFixed(1).replace(".", ",")
      : "0,0";
  }

  if (siteReviewCount) {
    siteReviewCount.textContent = String(totalReviews);
  }

  if (!siteReviewList) {
    return;
  }

  siteReviewList.innerHTML = "";

  if (!reviews.length) {
    renderSiteReviewsEmpty(
      "Nenhuma avaliação enviada ainda",
      "Seja a primeira pessoa a deixar uma nota sobre a experiência deste site."
    );
    return;
  }

  reviews.forEach((review) => {
    siteReviewList.appendChild(createSiteReviewCard(review));
  });
}

async function loadSiteReviews() {
  try {
    const [reviews, stats] = await Promise.all([
      fetchSiteReviews(MAX_VISIBLE_SITE_REVIEWS),
      fetchSiteReviewStats()
    ]);

    renderSiteReviews({
      reviews,
      totalReviews: stats.totalReviews,
      averageRating: stats.averageRating
    });
    setSiteReviewFeedback("");
  } catch (error) {
    renderSiteReviewsEmpty(
      "Avaliações indisponíveis no momento",
      "Verifique se a API está rodando em http://localhost:10000 e se o banco está conectado."
    );
  }
}

siteReviewStars.forEach((star) => {
  star.addEventListener("mouseenter", () => {
    updateSiteReviewStars(Number(star.dataset.rating));
  });

  star.addEventListener("focus", () => {
    updateSiteReviewStars(Number(star.dataset.rating));
  });

  star.addEventListener("click", () => {
    selectedSiteReviewRating = Number(star.dataset.rating);

    if (siteReviewRatingInput) {
      siteReviewRatingInput.value = String(selectedSiteReviewRating);
    }

    updateSiteReviewStars(selectedSiteReviewRating);
    setSiteReviewFeedback("");
  });
});

siteReviewStarGroup?.addEventListener("mouseleave", () => {
  updateSiteReviewStars(selectedSiteReviewRating);
});

siteReviewStarGroup?.addEventListener("focusout", (event) => {
  if (!siteReviewStarGroup.contains(event.relatedTarget)) {
    updateSiteReviewStars(selectedSiteReviewRating);
  }
});

siteReviewForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const authorName = siteReviewNameInput?.value.trim() || "";
  const comment = siteReviewCommentInput?.value.trim() || "";
  const rating = Number(siteReviewRatingInput?.value || selectedSiteReviewRating);

  if (authorName.length < 2) {
    setSiteReviewFeedback("Informe seu nome antes de enviar a avaliacao.", true);
    siteReviewNameInput?.focus();
    return;
  }

  if (!rating) {
    setSiteReviewFeedback("Selecione de 1 a 5 estrelas antes de enviar.", true);
    siteReviewStars[0]?.focus();
    return;
  }

  if (comment.length < 8) {
    setSiteReviewFeedback("Escreva um comentário com pelo menos 8 caracteres.", true);
    siteReviewCommentInput?.focus();
    return;
  }

  if (siteReviewSubmitButton) {
    siteReviewSubmitButton.disabled = true;
    siteReviewSubmitButton.textContent = "Enviando...";
  }

  try {
    await submitSiteReview({
      nome: authorName.slice(0, 80),
      estrelas: rating,
      comentario: comment.slice(0, 280)
    });

    selectedSiteReviewRating = 0;
    siteReviewForm.reset();

    if (siteReviewRatingInput) {
      siteReviewRatingInput.value = "";
    }

    updateSiteReviewStars(0);
    await loadSiteReviews();
    setSiteReviewFeedback("Avaliacao enviada. Obrigado pelo feedback.");
  } catch (error) {
    setSiteReviewFeedback(
      error.message || "Nao foi possivel salvar a avaliacao no servidor.",
      true
    );
  } finally {
    if (siteReviewSubmitButton) {
      siteReviewSubmitButton.disabled = false;
      siteReviewSubmitButton.textContent = "Enviar avaliação";
    }
  }
});

updateSiteReviewStars(selectedSiteReviewRating);
renderSiteReviewsEmpty("Carregando avaliações...", "Buscando comentários mais recentes no servidor.");
loadSiteReviews();
syncFloatingReviewButtonVisibility();
window.addEventListener("scroll", syncFloatingReviewButtonVisibility);
window.addEventListener("resize", syncFloatingReviewButtonVisibility);

// =========== Galerias locais da aba Projetos =========
const projectStackGalleries = document.querySelectorAll("#projetos .project-gallery-stack");
const stackFlipDuration = 800;

function decorateProjectStack(book) {
  const pages = Array.from(book.querySelectorAll(".page"));

  if (!pages.length) {
    return;
  }

  pages.forEach((page, index) => {
    page.classList.remove("stack-front", "stack-second", "stack-third", "stack-hidden");

    if (index === 0) {
      page.classList.add("stack-front");
      return;
    }

    if (index === 1) {
      page.classList.add("stack-second");
      return;
    }

    if (index === 2) {
      page.classList.add("stack-third");
      return;
    }

    page.classList.add("stack-hidden");
  });
}

projectStackGalleries.forEach((gallery) => {
  const book = gallery.querySelector(".stack-book");
  const nextButton = gallery.querySelector(".stack-next");
  const prevButton = gallery.querySelector(".stack-prev");

  if (!book || !book.querySelector(".page")) {
    return;
  }

  decorateProjectStack(book);
  book.dataset.animating = "false";

  nextButton?.addEventListener("click", () => {
    if (book.dataset.animating === "true") {
      return;
    }

    const pages = Array.from(book.querySelectorAll(".page"));
    const firstPage = pages[0];

    if (!firstPage || pages.length < 2) {
      return;
    }

    book.dataset.animating = "true";
    firstPage.classList.add("flipping-next");

    setTimeout(() => {
      firstPage.classList.remove("flipping-next");
      book.appendChild(firstPage);
      decorateProjectStack(book);
      book.dataset.animating = "false";
    }, stackFlipDuration);
  });

  prevButton?.addEventListener("click", () => {
    if (book.dataset.animating === "true") {
      return;
    }

    const pages = Array.from(book.querySelectorAll(".page"));
    const lastPage = pages[pages.length - 1];

    if (!lastPage || pages.length < 2) {
      return;
    }

    book.dataset.animating = "true";
    book.insertBefore(lastPage, pages[0]);
    decorateProjectStack(book);

    lastPage.classList.add("flipping-prev", "flipping-prev-start");
    void lastPage.offsetWidth;
    lastPage.classList.remove("flipping-prev-start");

    setTimeout(() => {
      lastPage.classList.remove("flipping-prev");
      decorateProjectStack(book);
      book.dataset.animating = "false";
    }, stackFlipDuration);
  });
});

const elements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  document.querySelectorAll(".parallax").forEach(el => {
    const speed = el.getAttribute("data-speed");

    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

// =========== AnimaÃ§Ãµes ao Rolar (Scroll Animations) =========
const scrollObserverOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Adiciona classe de animaÃ§Ã£o
      entry.target.classList.add('animate');
      
      // Remove observer apÃ³s primeira animaÃ§Ã£o
      scrollObserver.unobserve(entry.target);
    }
  });
}, scrollObserverOptions);

// Elementos que recebem animaÃ§Ã£o ao rolar
const animatedSelectors = [
  '.cta-container',
  '.project-card',
  '.projects-section h2',
  '.tech-3d',
  '.tech-3d h2',
  '.sobre-mim h2',
  '.sobre-container',
  '.sobre-circle',
  '.sobre-left',
  '.tech-section',
  '.tech-title',
  '.tech-category',
  '.tech-card',
  '.stat-item',
  '.services-section',
  '.services-title',
  '.service-category',
  '.service-card',
  '.service-item',
  '.about-section',
  '.about-title',
  '.about-container',
  '.about-image',
  '.about-content',
  '.about-stats',
  '.about-buttons',
  '.journey-section',
  '.timeline-item',
  '.website-card',
  '.app-card',
  '.review-intro',
  '.review-form-card',
  '.review-list-panel'
];

animatedSelectors.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    scrollObserver.observe(el);
  });
});

// =========== Cálculo Dinâmico de Preço no Formulário de Orçamento =========
function calcularPreco() {
  const tipoSite = document.querySelector('input[name="tipo_site"]:checked');
  const precoDisplay = document.getElementById('orcamento_calculado');

  if (!tipoSite || !precoDisplay) return;

  let preco = 0;
  let descricao = '';

  switch (tipoSite.value) {
    case 'simples':
      preco = 2500;
      descricao = 'Site Simples: R$ 2.500,00';
      break;
    case 'premium':
      preco = 8000;
      descricao = 'Site Premium: R$ 8.000,00';
      break;
    default:
      preco = 0;
      descricao = 'Selecione um tipo de site';
  }

  precoDisplay.textContent = descricao;
  precoDisplay.style.color = preco > 0 ? '#ff0040' : '#666';
  precoDisplay.style.fontWeight = 'bold';
  precoDisplay.style.fontSize = '1.2em';
}

// Adicionar event listeners aos radio buttons do tipo de site
const radioButtons = document.querySelectorAll('input[name="tipo_site"]');
radioButtons.forEach(radio => {
  radio.addEventListener('change', calcularPreco);
});

// Calcular preÃ§o inicial se jÃ¡ houver seleÃ§Ã£o
calcularPreco();

// =========== AnimaÃ§Ã£o das Barras de NÃ­vel =========
const levelObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const levelBar = entry.target.querySelector('.level-bar');
      if (levelBar) {
        const width = levelBar.style.width;
        levelBar.style.width = '0';
        setTimeout(() => {
          levelBar.style.width = width;
        }, 200);
      }
      levelObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.tech-card').forEach(card => {
  levelObserver.observe(card);
});

});

window.addEventListener('resize', () => {
  if (window.innerWidth > 980) {
    closeSidebar();
  }

  syncTechCarouselMode();
});
