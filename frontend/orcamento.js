(() => {
  const form = document.getElementById("orcamentoForm");

  if (!form) {
    return;
  }

  const DRAFT_KEY = "orcamento-form-draft-v1";
  const SUMMARY_KEY = "orcamento-form-summary-v1";
  const QUOTE_PAYLOAD_KEY = "orcamento-form-quote-payload-v1";
  const BUSINESS_WHATSAPP_NUMBER = "5598970167795";
  let latestQuoteArtifact = null;

  const fields = {
    closeButton: document.getElementById("quote_close_button"),
    quoteSidebar: document.getElementById("estimate_sidebar"),
    whatsapp: document.getElementById("whatsapp_contato"),
    objetivoOutroToggle: document.getElementById("objetivo_outro_toggle"),
    objetivoOutroField: document.getElementById("objetivo_outro_field"),
    objetivoOutroText: document.getElementById("objetivo_outro_text"),
    identidadeAssetsField: document.getElementById("identidade_assets_field"),
    identidadeStatus: document.getElementById("identidade_status"),
    outraPagToggle: document.getElementById("outra_pag_toggle"),
    outraPagField: document.getElementById("outra_pag_field"),
    outraPagText: document.getElementById("outra_pag_text"),
    outraFuncionalidadeToggle: document.getElementById("outra_funcionalidade_toggle"),
    outraFuncionalidadeField: document.getElementById("outra_funcionalidade_field"),
    outraFuncionalidadeText: document.getElementById("outra_funcionalidade_text"),
    detailedSections: document.getElementById("detailed_form_sections"),
    priceResult: document.getElementById("orcamento_calculado"),
    priceDetails: document.getElementById("orcamento_detalhes"),
    priceBreakdown: document.getElementById("orcamento_breakdown"),
    estimateTypeLabel: document.getElementById("estimate_type_label"),
    estimateScopeBadges: document.getElementById("estimate_scope_badges"),
    estimateItems: document.getElementById("estimate_items"),
    estimateFootnote: document.getElementById("estimate_footnote"),
    mobileEstimateToggle: document.getElementById("estimate_mobile_toggle"),
    mobileEstimateBackdrop: document.getElementById("estimate_mobile_backdrop"),
    mobileEstimateClose: document.getElementById("estimate_mobile_close"),
    mobileEstimateValue: document.getElementById("estimate_mobile_value"),
    mobileEstimateType: document.getElementById("estimate_mobile_type"),
    mobileEstimateAction: document.getElementById("estimate_mobile_action"),
    feedback: document.getElementById("form_feedback"),
    summaryPanel: document.getElementById("summary_panel"),
    summaryOutput: document.getElementById("summary_output"),
    copyButton: document.getElementById("copy_summary_button"),
    downloadPdfButton: document.getElementById("download_pdf_button"),
    sendWhatsAppButton: document.getElementById("send_whatsapp_button"),
    clearButton: document.getElementById("clear_form_button")
  };

  const labels = {
    modeloProposta: {
      sob_medida: "Projeto sob medida",
      site_simples: "Site Simples"
    },
    tipoSite: {
      landing: "Landing Page",
      institucional: "Institucional",
      ecommerce: "E-commerce"
    },
    objetivo: {
      vender: "Vender produtos ou serviços",
      captar: "Captar clientes",
      portfolio: "Portfólio",
      institucional: "Institucional",
      outro: "Outro"
    },
    possui: {
      logo: "Logo",
      cores: "Cores definidas",
      tipografia: "Tipografia definida",
      manual: "Manual de marca"
    },
    estilo: {
      simples: "Simples",
      moderno: "Moderno",
      premium: "Premium",
      minimalista: "Minimalista",
      chamativo: "Chamativo",
      sofisticado: "Sofisticado"
    },
    paginas: {
      home: "Home",
      sobre: "Sobre",
      servicos: "Serviços",
      catalogo: "Catálogo / Loja",
      blog: "Blog",
      contato: "Contato",
      outra: "Outra página"
    },
    funcionalidades: {
      form_contato: "Formulário de contato",
      whatsapp: "Integração com WhatsApp",
      login: "Área de login",
      agendamento: "Sistema de agendamento",
      catalogo_produtos: "Catálogo de produtos",
      checkout: "Carrinho e checkout",
      pagamento_online: "Pagamento online",
      frete: "Cálculo de frete",
      painel: "Painel de gestão",
      blog: "Blog",
      redes_sociais: "Integração com redes sociais",
      outra: "Outra funcionalidade"
    },
    conteudo: {
      textos: "Textos prontos",
      imagens: "Imagens",
      videos: "Vídeos"
    },
    conteudoCriar: {
      textos: "Copy e textos",
      imagens: "Curadoria ou tratamento de imagens",
      videos: "Edição ou seleção de vídeos",
      estrutura: "Estrutura de conteúdo"
    },
    orcamento: {
      ate_1000: "Até R$ 1.000",
      "1000_2500": "R$ 1.000 a R$ 2.500",
      "2500_5000": "R$ 2.500 a R$ 5.000",
      "5000_10000": "R$ 5.000 a R$ 10.000",
      "10000_20000": "R$ 10.000 a R$ 20.000",
      "20000_plus": "R$ 20.000+"
    },
    prazo: {
      urgente: "Urgente",
      "15_dias": "Até 15 dias",
      "30_dias_plus": "30 dias ou mais",
      a_determinar_dev: "A determinar com o Dev"
    }
  };

  const pricing = {
    pacote: {
      site_simples: [500, 1000]
    },
    base: {
      landing: [500, 2000],
      institucional: [1500, 5000],
      ecommerce: [3000, 15000]
    },
    paginas: {
      home: [0, 0],
      sobre: [180, 420],
      servicos: [220, 480],
      catalogo: [450, 1600],
      blog: [600, 1800],
      contato: [120, 280],
      outra: [250, 900]
    },
    funcionalidades: {
      form_contato: [0, 150],
      whatsapp: [120, 320],
      login: [1200, 3200],
      agendamento: [1000, 2800],
      catalogo_produtos: [700, 2200],
      checkout: [1200, 3500],
      pagamento_online: [800, 2400],
      frete: [600, 1800],
      painel: [900, 2400],
      blog: [500, 1500],
      redes_sociais: [150, 350],
      outra: [400, 1400]
    },
    conteudoCriar: {
      textos: [300, 1200],
      imagens: [250, 900],
      videos: [600, 2200],
      estrutura: [350, 1200]
    },
    identidadeAusente: [400, 1600],
    identidadeComplemento: [300, 900],
    setupDominio: [100, 250],
    setupHospedagem: [150, 450]
  };

  function money(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  }

  function rangeText(min, max, openEnded = false) {
    return `${money(min)} - ${money(max)}${openEnded ? "+" : ""}`;
  }

  function siteTypeLabel(tipoSite) {
    return labels.tipoSite[tipoSite] || labels.tipoSite.landing;
  }

  function estimateTypeLabel(data) {
    if (data.modeloProposta === "site_simples") {
      return "Site Simples";
    }

    return siteTypeLabel(data.tipoSite);
  }

  function formatDisplayDate(date) {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short"
    }).format(date);
  }

  function formatFileTimestamp(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}_${hour}-${minute}`;
  }

  function sanitizeFileName(value) {
    return (value || "cliente")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "cliente";
  }

  function escapePdfText(text) {
    let result = "";

    for (const char of text) {
      const code = char.charCodeAt(0);
      const byte = code <= 255 ? code : 63;

      if (byte === 40 || byte === 41 || byte === 92) {
        result += `\\${String.fromCharCode(byte)}`;
        continue;
      }

      if (byte < 32 || byte > 126) {
        result += `\\${byte.toString(8).padStart(3, "0")}`;
        continue;
      }

      result += String.fromCharCode(byte);
    }

    return result;
  }

  function measurePdfTextWidth(text, size) {
    let width = 0;

    for (const char of text) {
      if (" il.,:;|!'`".includes(char)) {
        width += size * 0.28;
        continue;
      }

      if ("mwMW@#%&QO0".includes(char)) {
        width += size * 0.76;
        continue;
      }

      width += size * 0.56;
    }

    return width;
  }

  function wrapPdfText(text, maxWidth, size) {
    const normalized = text.replace(/\s+/g, " ").trim();

    if (!normalized) {
      return [""];
    }

    const words = normalized.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
      const candidate = currentLine ? `${currentLine} ${word}` : word;

      if (currentLine && measurePdfTextWidth(candidate, size) > maxWidth) {
        lines.push(currentLine);
        currentLine = word;
        return;
      }

      currentLine = candidate;
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  function buildPdfLineDefinitions(summary, data, estimate, issuedAt) {
    const lineDefinitions = [
      {
        text: "Briefing de Orçamento",
        font: "F2",
        size: 18,
        after: 8
      },
      {
        text: `Gerado em ${formatDisplayDate(issuedAt)} | Cliente: ${data.nome || "Não informado"}`,
        font: "F1",
        size: 10.5,
        after: 16
      }
    ];

    summary.split("\n").forEach((line) => {
      const trimmed = line.trim();

      if (!trimmed) {
        lineDefinitions.push({ text: "", size: 8 });
        return;
      }

      const isHeading = trimmed === trimmed.toUpperCase() && trimmed.length <= 24;

      lineDefinitions.push({
        text: trimmed,
        font: isHeading ? "F2" : "F1",
        size: isHeading ? 12 : 10.5,
        after: isHeading ? 6 : 4
      });
    });

    lineDefinitions.push({ text: "", size: 8 });
    lineDefinitions.push({
      text: `Estimativa detalhada: ${formatEstimateLabel(estimate)}`,
      font: "F2",
      size: 12,
      after: 6
    });

    estimate.breakdown.forEach((item) => {
      lineDefinitions.push({
        text: `- ${item}`,
        font: "F1",
        size: 10.5,
        after: 4
      });
    });

    if (estimate.notes.length) {
      lineDefinitions.push({ text: "", size: 8 });
      lineDefinitions.push({
        text: "Observações",
        font: "F2",
        size: 12,
        after: 6
      });

      estimate.notes.forEach((item) => {
        lineDefinitions.push({
          text: `- ${item}`,
          font: "F1",
          size: 10.5,
          after: 4
        });
      });
    }

    return lineDefinitions;
  }

  function buildPdfFile(summary, data, estimate, issuedAt = new Date()) {
    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const marginX = 52;
    const topY = pageHeight - 56;
    const bottomY = 56;
    const maxTextWidth = pageWidth - marginX * 2;
    const lineDefinitions = buildPdfLineDefinitions(summary, data, estimate, issuedAt);
    const pages = [[]];
    let currentPageIndex = 0;
    let cursorY = topY;

    function ensureSpace(requiredHeight) {
      if (cursorY - requiredHeight >= bottomY) {
        return;
      }

      pages.push([]);
      currentPageIndex += 1;
      cursorY = topY;
    }

    function addTextLine(text, font, size) {
      const lineHeight = size * 1.35;
      ensureSpace(lineHeight);
      pages[currentPageIndex].push(
        `BT /${font} ${size.toFixed(2)} Tf 1 0 0 1 ${marginX.toFixed(2)} ${cursorY.toFixed(2)} Tm (${escapePdfText(text)}) Tj ET`
      );
      cursorY -= lineHeight;
    }

    lineDefinitions.forEach((definition) => {
      const size = definition.size || 10.5;
      const gapAfter = definition.after ?? 0;

      if (!definition.text) {
        ensureSpace(size);
        cursorY -= size;
        return;
      }

      wrapPdfText(definition.text, maxTextWidth, size).forEach((line) => {
        addTextLine(line, definition.font || "F1", size);
      });

      cursorY -= gapAfter;
    });

    pages.forEach((commands, index) => {
      commands.push(
        `BT /F1 9.00 Tf 1 0 0 1 ${marginX.toFixed(2)} 28.00 Tm (${escapePdfText(`Página ${index + 1} de ${pages.length}`)}) Tj ET`
      );
    });

    const objectMap = [];
    objectMap[1] = "<< /Type /Catalog /Pages 2 0 R >>";
    objectMap[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
    objectMap[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

    const pageObjectNumbers = [];
    const contentObjectNumbers = [];
    let nextObjectNumber = 5;

    pages.forEach(() => {
      pageObjectNumbers.push(nextObjectNumber++);
      contentObjectNumbers.push(nextObjectNumber++);
    });

    objectMap[2] = `<< /Type /Pages /Count ${pages.length} /Kids [${pageObjectNumbers.map((number) => `${number} 0 R`).join(" ")}] >>`;

    pages.forEach((commands, index) => {
      const content = commands.join("\n");
      const contentObjectNumber = contentObjectNumbers[index];
      const pageObjectNumber = pageObjectNumbers[index];

      objectMap[contentObjectNumber] = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
      objectMap[pageObjectNumber] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth.toFixed(2)} ${pageHeight.toFixed(2)}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`;
    });

    const objectCount = objectMap.length;
    let pdf = "%PDF-1.4\n%1234\n";
    const offsets = new Array(objectCount).fill(0);

    for (let index = 1; index < objectCount; index += 1) {
      if (!objectMap[index]) {
        continue;
      }

      offsets[index] = pdf.length;
      pdf += `${index} 0 obj\n${objectMap[index]}\nendobj\n`;
    }

    const xrefOffset = pdf.length;
    pdf += `xref\n0 ${objectCount}\n`;
    pdf += "0000000000 65535 f \n";

    for (let index = 1; index < objectCount; index += 1) {
      pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
    }

    pdf += `trailer\n<< /Size ${objectCount} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

    const fileName = `briefing-${sanitizeFileName(data.nome)}-${formatFileTimestamp(issuedAt)}.pdf`;

    if (typeof File === "function") {
      return new File([pdf], fileName, { type: "application/pdf" });
    }

    const blob = new Blob([pdf], { type: "application/pdf" });
    blob.name = fileName;
    return blob;
  }

  function createQuoteArtifact(data, estimate, issuedAt = new Date()) {
    const summary = buildSummary(data, estimate);

    return {
      data,
      estimate,
      issuedAt,
      summary,
      pdfFile: buildPdfFile(summary, data, estimate, issuedAt)
    };
  }

  function persistQuoteArtifact(artifact) {
    localStorage.setItem(SUMMARY_KEY, artifact.summary);
    localStorage.setItem(
      QUOTE_PAYLOAD_KEY,
      JSON.stringify({
        data: artifact.data,
        estimate: artifact.estimate,
        issuedAt: artifact.issuedAt.toISOString()
      })
    );
  }

  function downloadPdfFile(file) {
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = file.name || "briefing.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1500);
  }

  function shortenText(value, maxLength) {
    const normalized = (value || "").replace(/\s+/g, " ").trim();

    if (!normalized) {
      return "";
    }

    if (normalized.length <= maxLength) {
      return normalized;
    }

    return `${normalized.slice(0, Math.max(0, maxLength - 3)).trim()}...`;
  }

  function yesNoText(value) {
    if (value === "sim") {
      return "Sim";
    }

    if (value === "nao") {
      return "Não";
    }

    return "Não informado";
  }

  function buildLegacyWhatsAppMessage(artifact) {
    return [
      `Olá, segue o briefing de orçamento de ${artifact.data.nome || "cliente"}.`,
      `Arquivo gerado: ${artifact.pdfFile.name}.`,
      `Estimativa inicial: ${rangeText(artifact.estimate.min, artifact.estimate.max)}.`,
      "Se o PDF não tiver sido anexado automaticamente, ele foi baixado neste dispositivo para ser enviado nesta conversa."
    ].join(" ");
  }

  function openLegacyWhatsAppConversation(artifact) {
    const url = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(buildLegacyWhatsAppMessage(artifact))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function deliverLegacyQuoteToWhatsApp(artifact) {
    if (!artifact) {
      return { status: "missing" };
    }

    const canShareFiles =
      typeof navigator.share === "function" &&
      typeof navigator.canShare === "function" &&
      navigator.canShare({ files: [artifact.pdfFile] });

    if (canShareFiles) {
      try {
        await navigator.share({
          files: [artifact.pdfFile],
          title: "Briefing de orçamento",
          text: buildLegacyWhatsAppMessage(artifact)
        });

        return { status: "shared" };
      } catch (error) {
        if (error?.name === "AbortError") {
          return { status: "cancelled" };
        }
      }
    }

    downloadPdfFile(artifact.pdfFile);
    openLegacyWhatsAppConversation(artifact);
    return { status: "fallback" };
  }

  async function sendLegacyQuoteWithBestEffort(artifact) {
    return deliverLegacyQuoteToWhatsApp(artifact);
  }

  function formatEstimateLabel(estimate) {
    return rangeText(estimate.min, estimate.max, Boolean(estimate.openEnded));
  }

  function isMobileEstimateMode() {
    return window.innerWidth <= 768;
  }

  function setMobileEstimateOpen(isOpen) {
    if (!fields.quoteSidebar) {
      return;
    }

    const shouldOpen = Boolean(isOpen) && isMobileEstimateMode();
    fields.quoteSidebar.dataset.mobileOpen = shouldOpen ? "true" : "false";
    fields.mobileEstimateToggle?.setAttribute("aria-expanded", shouldOpen ? "true" : "false");

    if (fields.mobileEstimateAction) {
      fields.mobileEstimateAction.textContent = shouldOpen ? "Fechar" : "Ver detalhes";
    }

    document.body.classList.toggle("estimate-sheet-open", shouldOpen);
  }

  function updateMobileEstimateDock(data, estimate) {
    if (fields.mobileEstimateValue) {
      fields.mobileEstimateValue.textContent = formatEstimateLabel(estimate);
    }

    if (fields.mobileEstimateType) {
      fields.mobileEstimateType.textContent = estimateTypeLabel(data);
    }
  }

  function buildWhatsAppMessage(artifact) {
    const { data, estimate } = artifact;
    const isSimplePackage = data.modeloProposta === "site_simples";
    const lines = [
      "Olá, Ailton. Segue um novo briefing de orçamento.",
      "",
      `Cliente: ${data.nome || "Não informado"}`,
      data.empresa ? `Empresa: ${data.empresa}` : "",
      `E-mail: ${data.email || "Não informado"}`,
      `WhatsApp: ${data.whatsapp || "Não informado"}`,
      `Tipo de site: ${estimateTypeLabel(data)}`,
      `Estimativa inicial: ${formatEstimateLabel(estimate)}`,
      isSimplePackage
        ? "Escopo do pacote: Landing Page simples com faixa fixa de R$ 500 a R$ 1.000."
        : `Objetivos: ${prettyList(data.objetivo, labels.objetivo)}`,
      isSimplePackage
        ? "Itens inclusos: até 5 páginas, formulário de agendamento e botão de contato."
        : data.acaoUsuario
          ? `Ação esperada: ${shortenText(data.acaoUsuario, 140)}`
          : "",
      isSimplePackage
        ? "Modelo escolhido: pacote rápido com estrutura definida."
        : `Público: ${shortenText([data.publico, data.nicho, data.regiao].filter(Boolean).join(" | "), 160) || "Não informado"}`,
      isSimplePackage ? "" : `Páginas: ${prettyList(data.paginas, labels.paginas)}`,
      isSimplePackage ? "" : `Funcionalidades: ${prettyList(data.funcionalidades, labels.funcionalidades)}`,
      isSimplePackage ? "" : `Conteúdo a criar: ${prettyList(data.conteudoCriar, labels.conteudoCriar)}`,
      isSimplePackage ? "" : `Identidade visual: ${yesNoText(data.identidade)}`,
      isSimplePackage ? "" : `Orçamento disponível: ${labels.orcamento[data.orcamento] || "Não informado"}`,
      isSimplePackage ? "" : `Prazo: ${labels.prazo[data.prazo] || "Não informado"}`,
      isSimplePackage ? "" : `Domínio: ${yesNoText(data.dominio)} | Hospedagem: ${yesNoText(data.hospedagem)}`,
      data.exemplos ? `Referências: ${shortenText(data.exemplos, 180)}` : "",
      data.descricao ? `Descrição: ${shortenText(data.descricao, 280)}` : "",
      estimate.notes[0] ? `Observação: ${shortenText(estimate.notes[0], 180)}` : "",
      "",
      "Se precisar, também posso enviar o PDF completo."
    ];

    return lines.filter(Boolean).join("\n");
  }

  function getWhatsAppConversationUrl(artifact) {
    const message = encodeURIComponent(buildWhatsAppMessage(artifact));
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "");

    if (isMobile) {
      return `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${message}`;
    }

    return `https://web.whatsapp.com/send?phone=${BUSINESS_WHATSAPP_NUMBER}&text=${message}&type=phone_number&app_absent=0`;
  }

  function openWhatsAppConversation(artifact) {
    if (!artifact) {
      return { status: "missing" };
    }

    const url = getWhatsAppConversationUrl(artifact);
    const popup = window.open(url, "_blank", "noopener,noreferrer");

    if (popup) {
      popup.opener = null;
      return { status: "opened" };
    }

    window.location.assign(url);
    return { status: "redirected" };
  }

  async function sendQuoteWithBestEffort(artifact) {
    return openWhatsAppConversation(artifact);
  }

  function updateSummaryActionsState(enabled) {
    [fields.copyButton, fields.downloadPdfButton, fields.sendWhatsAppButton].forEach((button) => {
      if (!button) {
        return;
      }

      button.disabled = !enabled;
    });
  }

  function getCheckedValues(name) {
    return Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
  }

  function getRadioValue(name) {
    return form.querySelector(`input[name="${name}"]:checked`)?.value || "";
  }

  function prettyList(values, map) {
    if (!values.length) {
      return "Não informado";
    }

    return values.map((value) => map[value] || value).join(", ");
  }

  function pluralize(count, singular, plural) {
    return `${count} ${count === 1 ? singular : plural}`;
  }

  function renderEstimateCard(data, estimate) {
    if (fields.estimateTypeLabel) {
      fields.estimateTypeLabel.textContent = `Estrutura atual: ${estimateTypeLabel(data)}`;
    }

    if (fields.estimateScopeBadges) {
      const badges =
        data.modeloProposta === "site_simples"
          ? [
              "AtÃ© 5 pÃ¡ginas incluÃ­das",
              "Agendamento incluÃ­do",
              "BotÃ£o de contato incluÃ­do",
              labels.prazo[data.prazo] ? `Prazo: ${labels.prazo[data.prazo]}` : "Prazo em aberto"
            ]
          : [
              `${pluralize(data.paginas.length + (data.outraPagina ? 1 : 0), "pÃ¡gina", "pÃ¡ginas")}`,
              `${pluralize(data.funcionalidades.length + (data.outraFuncionalidade ? 1 : 0), "funcionalidade", "funcionalidades")}`,
              data.conteudoCriar.length
                ? `${pluralize(data.conteudoCriar.length, "item de conteÃºdo", "itens de conteÃºdo")}`
                : "ConteÃºdo base do cliente",
              labels.prazo[data.prazo] ? `Prazo: ${labels.prazo[data.prazo]}` : "Prazo em aberto"
            ];

      fields.estimateScopeBadges.replaceChildren(
        ...badges.map((text) => {
          const badge = document.createElement("span");
          badge.className = "estimate-badge";
          badge.textContent = text;
          return badge;
        })
      );
    }

    if (fields.estimateItems) {
      if (!estimate.lineItems?.length) {
        const empty = document.createElement("div");
        empty.className = "estimate-empty";
        empty.textContent = "Selecione o escopo para comeÃ§ar a compor a estimativa.";
        fields.estimateItems.replaceChildren(empty);
      } else {
        fields.estimateItems.replaceChildren(
          ...estimate.lineItems.map((item) => {
            const wrapper = document.createElement("div");
            wrapper.className = `estimate-item ${item.kind || ""}`.trim();

            const body = document.createElement("div");
            body.className = "estimate-item-body";

            const label = document.createElement("span");
            label.className = "estimate-item-label";
            label.textContent = item.label;

            const meta = document.createElement("span");
            meta.className = "estimate-item-meta";
            meta.textContent = item.meta || (item.kind === "base" ? "Estrutura inicial considerada no cÃ¡lculo." : "Somado ao escopo atual.");

            const price = document.createElement("span");
            price.className = "estimate-item-price";
            price.textContent =
              item.kind === "included"
                ? "Incluído"
                : `${item.kind === "base" ? "" : "+"}${rangeText(item.min, item.max, Boolean(item.openEnded))}`;

            body.append(label, meta);
            wrapper.append(body, price);
            return wrapper;
          })
        );
      }
    }

    if (fields.estimateFootnote) {
      fields.estimateFootnote.textContent =
        estimate.notes[1] ||
        estimate.notes[0] ||
        "A estimativa muda conforme pÃ¡ginas, funcionalidades, conteÃºdo e urgÃªncia.";
    }
  }

  function clearFieldState() {
    form.querySelectorAll(".invalid").forEach((element) => element.classList.remove("invalid"));
  }

  function markInvalid(element) {
    if (!element) {
      return;
    }

    const target = element.closest(".choice") || element;
    target.classList.add("invalid");
  }

  function setConditional(container, active) {
    container.classList.toggle("active", active);

    container.querySelectorAll("input, textarea, select").forEach((field) => {
      field.disabled = !active;

      if (!active) {
        if (field.type === "checkbox" || field.type === "radio") {
          field.checked = false;
        } else {
          field.value = "";
        }

        field.classList.remove("invalid");
      }
    });
  }

  function syncChoiceCards() {
    form.querySelectorAll(".choice").forEach((choice) => {
      const input = choice.querySelector("input");
      choice.classList.toggle("active", Boolean(input?.checked));
    });
  }

  function normalizePhone(value) {
    return value.replace(/\D/g, "").slice(0, 11);
  }

  function applyPhoneMask(value) {
    const digits = normalizePhone(value);

    if (digits.length <= 2) {
      return digits ? `(${digits}` : "";
    }

    if (digits.length <= 6) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }

    if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  function updateDynamicFields() {
    const isSimplePackage = getRadioValue("modelo_proposta") === "site_simples";

    if (fields.detailedSections) {
      fields.detailedSections.hidden = isSimplePackage;
    }

    setConditional(fields.objetivoOutroField, fields.objetivoOutroToggle.checked);
    setConditional(fields.outraPagField, fields.outraPagToggle.checked);
    setConditional(fields.outraFuncionalidadeField, fields.outraFuncionalidadeToggle.checked);

    const identidade = getRadioValue("identidade");
    const identidadeAtiva = identidade === "sim";

    setConditional(fields.identidadeAssetsField, identidadeAtiva);

    fields.identidadeStatus.textContent = identidadeAtiva
      ? "Selecione tudo o que você já tem pronto para aproveitar no projeto."
      : "Se você ainda não tem identidade visual, o cálculo considera essa necessidade como parte do escopo.";
  }

  function collectData() {
    const modeloProposta = getRadioValue("modelo_proposta") || "sob_medida";
    const isSimplePackage = modeloProposta === "site_simples";

    if (isSimplePackage) {
      return {
        nome: form.nome.value.trim(),
        email: form.email.value.trim(),
        whatsapp: fields.whatsapp.value.trim(),
        empresa: form.empresa.value.trim(),
        modeloProposta,
        objetivo: [],
        objetivoOutro: "",
        acaoUsuario: "",
        publico: "",
        idade: "",
        nicho: "",
        regiao: "",
        tipoSite: "landing",
        identidade: "",
        possui: [],
        exemplos: "",
        estilo: [],
        paginas: [],
        outraPagina: "",
        funcionalidades: [],
        outraFuncionalidade: "",
        orcamento: "",
        prazo: "",
        conteudo: [],
        conteudoCriar: [],
        dominio: "",
        hospedagem: "",
        manutencao: "",
        descricao: ""
      };
    }

    return {
      nome: form.nome.value.trim(),
      email: form.email.value.trim(),
      whatsapp: fields.whatsapp.value.trim(),
      empresa: form.empresa.value.trim(),
      modeloProposta,
      objetivo: getCheckedValues("objetivo[]"),
      objetivoOutro: fields.objetivoOutroText.value.trim(),
      acaoUsuario: form.acao_usuario.value.trim(),
      publico: form.publico.value.trim(),
      idade: form.idade.value.trim(),
      nicho: form.nicho.value.trim(),
      regiao: form.regiao.value.trim(),
      tipoSite: getRadioValue("tipo_site") || "landing",
      identidade: getRadioValue("identidade"),
      possui: getCheckedValues("possui[]"),
      exemplos: form.exemplos.value.trim(),
      estilo: getCheckedValues("estilo[]"),
      paginas: getCheckedValues("paginas[]"),
      outraPagina: fields.outraPagText.value.trim(),
      funcionalidades: getCheckedValues("funcionalidades[]"),
      outraFuncionalidade: fields.outraFuncionalidadeText.value.trim(),
      orcamento: getRadioValue("orcamento"),
      prazo: getRadioValue("prazo"),
      conteudo: getCheckedValues("conteudo[]"),
      conteudoCriar: getCheckedValues("conteudo_criar[]"),
      dominio: getRadioValue("dominio"),
      hospedagem: getRadioValue("hospedagem"),
      manutencao: getRadioValue("manutencao"),
      descricao: form.descricao.value.trim()
    };
  }

  function calculateLegacyEstimate(data) {
    const base = pricing.base[data.tipoSite] || pricing.base.simples;
    const result = {
      min: base[0],
      max: base[1],
      breakdown: [`Base ${data.tipoSite === "premium" ? "do Site Premium" : "do Site Simples"}: ${rangeText(base[0], base[1])}`],
      notes: []
    };

    function addRange(range, label) {
      if (!range) {
        return;
      }

      result.min += range[0];
      result.max += range[1];
      result.breakdown.push(`${label}: +${rangeText(range[0], range[1])}`);
    }

    data.paginas.forEach((item) => addRange(pricing.paginas[item], labels.paginas[item] || item));
    data.funcionalidades.forEach((item) => addRange(pricing.funcionalidades[item], labels.funcionalidades[item] || item));
    data.conteudoCriar.forEach((item) => addRange(pricing.conteudoCriar[item], labels.conteudoCriar[item] || item));

    if (data.identidade === "nao") {
      addRange(pricing.identidadeAusente, "Criação ou ajuste de identidade visual");
    } else if (data.identidade === "sim") {
      const essenciais = ["logo", "cores", "tipografia"];
      const faltantes = essenciais.filter((item) => !data.possui.includes(item)).length;

      if (faltantes >= 2) {
        addRange(pricing.identidadeComplemento, "Complemento de identidade visual");
      }
    }

    if (data.dominio === "nao") {
      addRange(pricing.setupDominio, "Configuração de domínio");
    }

    if (data.hospedagem === "nao") {
      addRange(pricing.setupHospedagem, "Configuração de hospedagem");
    }

    if (data.prazo === "urgente") {
      result.min = Math.round(result.min * 1.2);
      result.max = Math.round(result.max * 1.35);
      result.breakdown.push("Acréscimo por urgência aplicado.");
      result.lineItems.push({
        label: "Acréscimo por urgência",
        min: surchargeMin,
        max: surchargeMax,
        kind: "warning",
        meta: "Entrega acelerada com esforço extra de produção."
      });
    } else if (data.prazo === "15_dias") {
      result.min = Math.round(result.min * 1.08);
      result.max = Math.round(result.max * 1.15);
      result.breakdown.push("Acréscimo por prazo curto aplicado.");
    }

    const escopoAvancado =
      data.paginas.length > 5 ||
      ["login", "agendamento", "ecommerce"].some((item) => data.funcionalidades.includes(item)) ||
      data.conteudoCriar.length >= 2;

    if (data.tipoSite === "simples" && escopoAvancado) {
      result.notes.push("Pelas escolhas atuais, a estrutura premium parece mais adequada.");
    }

    const budgetRanges = {
      "500-1000": [500, 1000],
      "1000-3000": [1000, 3000],
      "3000-7000": [3000, 7000],
      "7000+": [7000, Number.POSITIVE_INFINITY]
    };

    const selectedBudget = budgetRanges[data.orcamento];

    if (selectedBudget) {
      if (result.min > selectedBudget[1]) {
        result.notes.push("O escopo atual tende a ficar acima do orçamento informado.");
      } else if (result.max < selectedBudget[0]) {
        result.notes.push("Existe margem para ampliar o escopo dentro do orçamento informado.");
      }
    }

    if (data.manutencao === "sim") {
      result.notes.push("Manutenção contínua pode ser tratada separadamente como recorrência mensal.");
    }

    return result;
  }

  function roundEstimateValue(value) {
    return Math.round(value / 50) * 50;
  }

  function inferSuggestedSiteType(data) {
    const ecommerceSignals =
      data.paginas.includes("catalogo") ||
      ["catalogo_produtos", "checkout", "pagamento_online", "frete", "painel"].some((item) =>
        data.funcionalidades.includes(item)
      );

    if (ecommerceSignals) {
      return "ecommerce";
    }

    const pageCount = data.paginas.length + (data.outraPagina ? 1 : 0);
    const complexFeatures = ["login", "agendamento", "blog"].filter((item) =>
      data.funcionalidades.includes(item)
    ).length;

    if (pageCount <= 2 && complexFeatures === 0 && data.funcionalidades.length <= 3) {
      return "landing";
    }

    return "institucional";
  }

  function calculateEstimateLegacy(data) {
    const base = pricing.base[data.tipoSite] || pricing.base.landing;
    const result = {
      min: base[0],
      max: base[1],
      openEnded: data.tipoSite === "ecommerce",
      breakdown: [`Base de ${siteTypeLabel(data.tipoSite)}: ${rangeText(base[0], base[1], data.tipoSite === "ecommerce")}`],
      notes: [],
      lineItems: [
        {
          label: `Base de ${siteTypeLabel(data.tipoSite)}`,
          min: base[0],
          max: base[1],
          openEnded: data.tipoSite === "ecommerce",
          kind: "base",
          meta: "Estrutura inicial escolhida no formulÃ¡rio."
        }
      ]
    };

    function addRange(range, label, meta) {
      if (!range) {
        return;
      }

      result.min += range[0];
      result.max += range[1];
      result.breakdown.push(`${label}: +${rangeText(range[0], range[1])}`);
      result.lineItems.push({
        label,
        min: range[0],
        max: range[1],
        kind: "addition",
        meta: meta || "Adicionado conforme as escolhas atuais."
      });
    }

    data.paginas.forEach((item) => addRange(pricing.paginas[item], labels.paginas[item] || item));
    data.funcionalidades.forEach((item) => addRange(pricing.funcionalidades[item], labels.funcionalidades[item] || item));
    data.conteudoCriar.forEach((item) => addRange(pricing.conteudoCriar[item], labels.conteudoCriar[item] || item));

    if (data.identidade === "nao") {
      addRange(pricing.identidadeAusente, "Criação ou ajuste de identidade visual");
    } else if (data.identidade === "sim") {
      const essenciais = ["logo", "cores", "tipografia"];
      const faltantes = essenciais.filter((item) => !data.possui.includes(item)).length;

      if (faltantes >= 2) {
        addRange(pricing.identidadeComplemento, "Complemento de identidade visual");
      }
    }

    if (data.dominio === "nao") {
      addRange(pricing.setupDominio, "Configuração de domínio");
    }

    if (data.hospedagem === "nao") {
      addRange(pricing.setupHospedagem, "Configuração de hospedagem");
    }

    if (data.prazo === "urgente") {
      const surchargeMin = roundEstimateValue(result.min * 0.18);
      const surchargeMax = roundEstimateValue(result.max * 0.28);
      result.min += surchargeMin;
      result.max += surchargeMax;
      result.breakdown.push("Acréscimo por urgência aplicado.");
    } else if (data.prazo === "15_dias") {
      const surchargeMin = roundEstimateValue(result.min * 0.08);
      const surchargeMax = roundEstimateValue(result.max * 0.14);
      result.min += surchargeMin;
      result.max += surchargeMax;
      result.breakdown.push("Acréscimo por prazo curto aplicado.");
    }

    result.min = roundEstimateValue(result.min);
    result.max = roundEstimateValue(result.max);

    const suggestedType = inferSuggestedSiteType(data);
    const isMismatchedType = data.tipoSite !== suggestedType;

    if (isMismatchedType) {
      result.notes.push(`Pelas escolhas atuais, o projeto se aproxima mais de ${siteTypeLabel(suggestedType)}.`);
    } else {
      result.notes.push(`Faixa estimada com base no mercado para ${siteTypeLabel(data.tipoSite)}, ajustada pelo escopo informado.`);
    }

    if (data.tipoSite === "landing" && (data.paginas.length > 3 || data.funcionalidades.length >= 4)) {
      result.notes.push("O escopo já está acima de uma landing page enxuta e pode migrar para institucional.");
    }

    if (
      data.tipoSite !== "ecommerce" &&
      ["catalogo_produtos", "checkout", "pagamento_online", "frete", "painel"].some((item) =>
        data.funcionalidades.includes(item)
      )
    ) {
      result.notes.push("As funcionalidades marcadas têm perfil de loja virtual e tendem a puxar o projeto para a faixa de e-commerce.");
    }

    const budgetRanges = {
      ate_1000: [0, 1000],
      "1000_2500": [1000, 2500],
      "2500_5000": [2500, 5000],
      "5000_10000": [5000, 10000],
      "10000_20000": [10000, 20000],
      "20000_plus": [20000, Number.POSITIVE_INFINITY]
    };

    const selectedBudget = budgetRanges[data.orcamento];

    if (selectedBudget) {
      if (result.min > selectedBudget[1]) {
        result.notes.push("O escopo atual tende a ficar acima do orçamento informado.");
      } else if (result.max < selectedBudget[0]) {
        result.notes.push("Existe margem para ampliar escopo, performance ou conteúdo dentro do orçamento informado.");
      }
    }

    if (data.manutencao === "sim") {
      result.notes.push("Manutenção contínua pode entrar como plano mensal separado da implantação.");
    }

    result.openEnded =
      data.tipoSite === "ecommerce" ||
      result.max >= 15000 ||
      ["checkout", "pagamento_online", "frete", "painel"].some((item) => data.funcionalidades.includes(item));

    return result;
  }

  function calculateEstimate(data) {
    const isSimplePackage = data.modeloProposta === "site_simples";
    const base = isSimplePackage
      ? pricing.pacote.site_simples
      : (pricing.base[data.tipoSite] || pricing.base.landing);
    const displayType = isSimplePackage ? "Site Simples" : siteTypeLabel(data.tipoSite);
    const result = {
      min: base[0],
      max: base[1],
      openEnded: !isSimplePackage && data.tipoSite === "ecommerce",
      breakdown: [`Base de ${displayType}: ${rangeText(base[0], base[1], !isSimplePackage && data.tipoSite === "ecommerce")}`],
      notes: [],
      lineItems: [
        {
          label: `Base de ${displayType}`,
          min: base[0],
          max: base[1],
          openEnded: !isSimplePackage && data.tipoSite === "ecommerce",
          kind: "base",
          meta: isSimplePackage
            ? "Inclui landing page simples com até 5 páginas, formulário de agendamento e botão de contato."
            : "Estrutura inicial escolhida no formulário."
        }
      ]
    };

    if (isSimplePackage) {
      result.lineItems.push(
        {
          label: "Até 5 páginas inclusas",
          min: 0,
          max: 0,
          kind: "included",
          meta: "Estrutura simples e objetiva para apresentação do negócio."
        },
        {
          label: "Formulário de agendamento incluso",
          min: 0,
          max: 0,
          kind: "included",
          meta: "Captação direta de pedidos e agendamentos."
        },
        {
          label: "Botão de contato incluso",
          min: 0,
          max: 0,
          kind: "included",
          meta: "Atalho direto para atendimento comercial."
        }
      );
      result.notes.push("Pacote Site Simples ativo. A faixa fica fixa em R$ 500 a R$ 1.000.");
      return result;
    }

    function addRange(range, label, meta = "Adicionado conforme as escolhas atuais.") {
      if (!range) {
        return;
      }

      result.min += range[0];
      result.max += range[1];
      result.breakdown.push(`${label}: +${rangeText(range[0], range[1])}`);
      result.lineItems.push({
        label,
        min: range[0],
        max: range[1],
        kind: "addition",
        meta
      });
    }

    const packageIncludedFeatures = ["agendamento", "whatsapp"];

    if (isSimplePackage) {
      const selectedPages = [...data.paginas];
      const extraPages = selectedPages.slice(5);

      extraPages.forEach((item) =>
        addRange(
          pricing.paginas[item],
          `${labels.paginas[item] || item} além do pacote`,
          "Página extra além das 5 páginas incluídas no pacote simples."
        )
      );

      data.funcionalidades
        .filter((item) => !packageIncludedFeatures.includes(item))
        .forEach((item) => addRange(pricing.funcionalidades[item], labels.funcionalidades[item] || item));
    } else {
      data.paginas.forEach((item) => addRange(pricing.paginas[item], labels.paginas[item] || item));
      data.funcionalidades.forEach((item) => addRange(pricing.funcionalidades[item], labels.funcionalidades[item] || item));
    }

    data.conteudoCriar.forEach((item) => addRange(pricing.conteudoCriar[item], labels.conteudoCriar[item] || item));

    if (data.identidade === "nao") {
      addRange(pricing.identidadeAusente, "Criação ou ajuste de identidade visual", "Inclui direção visual inicial ou refinamento de marca.");
    } else if (data.identidade === "sim") {
      const essenciais = ["logo", "cores", "tipografia"];
      const faltantes = essenciais.filter((item) => !data.possui.includes(item)).length;

      if (faltantes >= 2) {
        addRange(pricing.identidadeComplemento, "Complemento de identidade visual", "A marca já existe, mas ainda precisa de base visual para o projeto.");
      }
    }

    if (data.dominio === "nao") {
      addRange(pricing.setupDominio, "Configuração de domínio", "Aponta domínio e estrutura a publicação inicial.");
    }

    if (data.hospedagem === "nao") {
      addRange(pricing.setupHospedagem, "Configuração de hospedagem", "Inclui setup técnico de publicação e ambiente.");
    }

    if (data.prazo === "urgente") {
      const surchargeMin = roundEstimateValue(result.min * 0.18);
      const surchargeMax = roundEstimateValue(result.max * 0.28);
      result.min += surchargeMin;
      result.max += surchargeMax;
      result.breakdown.push("Acréscimo por urgência aplicado.");
      result.lineItems.push({
        label: "Acréscimo por urgência",
        min: surchargeMin,
        max: surchargeMax,
        kind: "warning",
        meta: "Entrega acelerada com esforço extra de produção."
      });
    } else if (data.prazo === "15_dias") {
      const surchargeMin = roundEstimateValue(result.min * 0.08);
      const surchargeMax = roundEstimateValue(result.max * 0.14);
      result.min += surchargeMin;
      result.max += surchargeMax;
      result.breakdown.push("Acréscimo por prazo curto aplicado.");
      result.lineItems.push({
        label: "Acréscimo por prazo curto",
        min: surchargeMin,
        max: surchargeMax,
        kind: "warning",
        meta: "Entrega em janela reduzida de produção."
      });
    }

    result.min = roundEstimateValue(result.min);
    result.max = roundEstimateValue(result.max);

    const suggestedType = inferSuggestedSiteType(data);
    const isMismatchedType = !isSimplePackage && data.tipoSite !== suggestedType;

    if (isSimplePackage) {
      result.notes.push("Pacote Site Simples ativo. Itens fora do pacote aumentam a faixa final.");
    } else if (isMismatchedType) {
      result.notes.push(`Pelas escolhas atuais, o projeto se aproxima mais de ${siteTypeLabel(suggestedType)}.`);
    } else {
      result.notes.push(`Faixa estimada com base no mercado para ${siteTypeLabel(data.tipoSite)}, ajustada pelo escopo informado.`);
    }

    if (!isSimplePackage && data.tipoSite === "landing" && (data.paginas.length > 3 || data.funcionalidades.length >= 4)) {
      result.notes.push("O escopo já está acima de uma landing page enxuta e pode migrar para institucional.");
    }

    if (isSimplePackage && (data.paginas.length > 5 || data.funcionalidades.some((item) => !packageIncludedFeatures.includes(item)))) {
      result.notes.push("Você selecionou extras além do pacote simples, então a estimativa foi ampliada.");
    }

    if (
      !isSimplePackage &&
      data.tipoSite !== "ecommerce" &&
      ["catalogo_produtos", "checkout", "pagamento_online", "frete", "painel"].some((item) =>
        data.funcionalidades.includes(item)
      )
    ) {
      result.notes.push("As funcionalidades marcadas têm perfil de loja virtual e tendem a puxar o projeto para a faixa de e-commerce.");
    }

    const budgetRanges = {
      ate_1000: [0, 1000],
      "1000_2500": [1000, 2500],
      "2500_5000": [2500, 5000],
      "5000_10000": [5000, 10000],
      "10000_20000": [10000, 20000],
      "20000_plus": [20000, Number.POSITIVE_INFINITY]
    };

    const selectedBudget = budgetRanges[data.orcamento];

    if (selectedBudget) {
      if (result.min > selectedBudget[1]) {
        result.notes.push("O escopo atual tende a ficar acima do orçamento informado.");
      } else if (result.max < selectedBudget[0]) {
        result.notes.push("Existe margem para ampliar escopo, performance ou conteúdo dentro do orçamento informado.");
      }
    }

    if (data.manutencao === "sim") {
      result.notes.push("Manutenção contínua pode entrar como plano mensal separado da implantação.");
    }

    result.openEnded =
      (!isSimplePackage && data.tipoSite === "ecommerce") ||
      result.max >= 15000 ||
      ["checkout", "pagamento_online", "frete", "painel"].some((item) => data.funcionalidades.includes(item));

    return result;
  }

  function updateEstimate() {
    const data = collectData();
    const estimate = calculateEstimate(data);

    fields.priceResult.textContent = formatEstimateLabel(estimate);
    fields.priceDetails.textContent = estimate.notes[0] || "Estimativa baseada nas respostas atuais do formulário.";
    fields.priceBreakdown.textContent =
      data.modeloProposta === "site_simples"
        ? "Pacote fechado com itens inclusos nesta faixa."
        : estimate.lineItems.length > 1
        ? `${estimate.lineItems.length} componentes considerados nesta faixa atual.`
        : "Base inicial considerada no cálculo.";
    updateMobileEstimateDock(data, estimate);
    renderEstimateCard(data, estimate);
  }

  function buildSummary(data, estimate) {
    if (data.modeloProposta === "site_simples") {
      const lines = [
        "DADOS",
        `Nome: ${data.nome || "Não informado"}`,
        `E-mail: ${data.email || "Não informado"}`,
        `WhatsApp: ${data.whatsapp || "Não informado"}`,
        `Empresa: ${data.empresa || "Não informado"}`,
        "",
        "ESCOPO",
        `Modelo da proposta: ${labels.modeloProposta[data.modeloProposta] || "Não informado"}`,
        "Pacote escolhido: Landing Page simples com até 5 páginas, formulário de agendamento e botão de contato.",
        `Tipo de site: ${estimateTypeLabel(data)}`,
        "",
        "COMERCIAL",
        `Estimativa inicial: ${formatEstimateLabel(estimate)}`
      ];

      if (estimate.notes.length) {
        lines.push("", "OBSERVAÇÕES", estimate.notes.join(" "));
      }

      return lines.join("\n");
    }

    const lines = [
      "DADOS",
      `Nome: ${data.nome || "Não informado"}`,
      `E-mail: ${data.email || "Não informado"}`,
      `WhatsApp: ${data.whatsapp || "Não informado"}`,
      `Empresa: ${data.empresa || "Não informado"}`,
      "",
      "ESCOPO",
      `Modelo da proposta: ${labels.modeloProposta[data.modeloProposta] || "NÃ£o informado"}`,
      `Objetivos: ${prettyList(data.objetivo, labels.objetivo)}`,
      `Outro objetivo: ${data.objetivoOutro || "Não informado"}`,
      `Ação esperada do usuário: ${data.acaoUsuario || "Não informado"}`,
      `Público-alvo: ${data.publico || "Não informado"}`,
      `Faixa etária: ${data.idade || "Não informado"}`,
      `Nicho: ${data.nicho || "Não informado"}`,
      `Região: ${data.regiao || "Não informado"}`,
      "",
      "ESTRUTURA",
      `Tipo de site: ${estimateTypeLabel(data)}`,
      `Páginas: ${prettyList(data.paginas, labels.paginas)}`,
      `Outra página: ${data.outraPagina || "Não informado"}`,
      `Funcionalidades: ${prettyList(data.funcionalidades, labels.funcionalidades)}`,
      `Outra funcionalidade: ${data.outraFuncionalidade || "Não informado"}`,
      `Estilo desejado: ${prettyList(data.estilo, labels.estilo)}`,
      `Referências: ${data.exemplos || "Não informado"}`,
      "",
      "IDENTIDADE E CONTEÚDO",
      `Identidade visual: ${data.identidade === "sim" ? "Sim" : data.identidade === "nao" ? "Não" : "Não informado"}`,
      `Materiais visuais disponíveis: ${prettyList(data.possui, labels.possui)}`,
      `Conteúdo já disponível: ${prettyList(data.conteudo, labels.conteudo)}`,
      `Conteúdo a criar: ${prettyList(data.conteudoCriar, labels.conteudoCriar)}`,
      "",
      "COMERCIAL",
      `Orçamento disponível: ${labels.orcamento[data.orcamento] || "Não informado"}`,
      `Prazo desejado: ${labels.prazo[data.prazo] || "Não informado"}`,
      `Estimativa inicial: ${formatEstimateLabel(estimate)}`,
      "",
      "DETALHES TÉCNICOS",
      `Domínio: ${data.dominio === "sim" ? "Sim" : data.dominio === "nao" ? "Não" : "Não informado"}`,
      `Hospedagem: ${data.hospedagem === "sim" ? "Sim" : data.hospedagem === "nao" ? "Não" : "Não informado"}`,
      `Manutenção contínua: ${data.manutencao === "sim" ? "Sim" : data.manutencao === "nao" ? "Não" : "Não informado"}`,
      "",
      "DESCRIÇÃO LIVRE",
      data.descricao || "Não informado"
    ];

    if (estimate.notes.length) {
      lines.push("", "OBSERVAÇÕES", estimate.notes.join(" "));
    }

    return lines.join("\n");
  }

  function showSummaryFromArtifact(artifact) {
    latestQuoteArtifact = artifact;
    fields.summaryOutput.textContent = artifact.summary;
    fields.summaryPanel.hidden = false;
    updateSummaryActionsState(true);
  }

  function showLegacyDeliveryFeedback(status, automatic) {
    if (status === "server-sent") {
      showFeedback(
        "success",
        automatic
          ? "PDF gerado e enviado para o seu WhatsApp com sucesso."
          : "PDF enviado para o seu WhatsApp com sucesso."
      );
      return;
    }

    if (status === "shared") {
      showFeedback(
        "success",
        automatic
          ? "PDF gerado. Escolha o WhatsApp no compartilhamento para concluir o envio."
          : "Compartilhamento aberto. Escolha o WhatsApp para enviar o PDF."
      );
      return;
    }

    if (status === "fallback") {
      showFeedback(
        "success",
        automatic
          ? "PDF gerado. O arquivo foi baixado e o WhatsApp foi aberto com uma mensagem pronta. Anexe o PDF na conversa."
          : "PDF baixado e conversa do WhatsApp aberta. Anexe o arquivo baixado para concluir o envio."
      );
      return;
    }

    if (status === "cancelled") {
      showFeedback("error", "O compartilhamento foi cancelado. Use os botões abaixo para tentar novamente ou baixar o PDF.");
      return;
    }

    showFeedback("error", "Não foi possível preparar o envio do PDF agora.");
  }

  function showDeliveryFeedback(status, automatic) {
    if (status === "opened" || status === "redirected") {
      showFeedback(
        "success",
        automatic
          ? "Briefing gerado e WhatsApp Web aberto com a mensagem pronta para envio."
          : "WhatsApp Web aberto novamente com o briefing pronto."
      );
      return;
    }

    if (status === "missing") {
      showFeedback("error", "Gere um resumo válido antes de abrir o WhatsApp.");
      return;
    }

    showFeedback("error", "Não foi possível abrir o WhatsApp Web agora.");
  }

  function showFeedback(type, message) {
    fields.feedback.className = `feedback show ${type}`;
    fields.feedback.textContent = message;
  }

  function hideFeedback() {
    fields.feedback.className = "feedback";
    fields.feedback.textContent = "";
  }

  function hideSummary() {
    fields.summaryPanel.hidden = true;
    updateSummaryActionsState(false);
  }

  function invalidateSummary() {
    latestQuoteArtifact = null;
    hideSummary();
    localStorage.removeItem(SUMMARY_KEY);
    localStorage.removeItem(QUOTE_PAYLOAD_KEY);
  }

  function validateForm() {
    clearFieldState();

    const errors = [];
    let firstInvalid = null;
    const setError = (element, message) => {
      errors.push(message);
      markInvalid(element);
      if (!firstInvalid) {
        firstInvalid = element;
      }
    };

    if (!form.nome.value.trim()) {
      setError(form.nome, "Informe seu nome.");
    }

    if (!form.email.validity.valid) {
      setError(form.email, "Informe um e-mail válido.");
    }

    if (normalizePhone(fields.whatsapp.value).length < 10) {
      setError(fields.whatsapp, "Informe um WhatsApp válido.");
    }

    if (getRadioValue("modelo_proposta") !== "site_simples") {
      if (!getCheckedValues("objetivo[]").length) {
        setError(form.querySelector('input[name="objetivo[]"]'), "Selecione pelo menos um objetivo do site.");
      }

      if (fields.objetivoOutroToggle.checked && !fields.objetivoOutroText.value.trim()) {
        setError(fields.objetivoOutroText, "Descreva o outro objetivo selecionado.");
      }

      if (!getCheckedValues("paginas[]").length) {
        setError(form.querySelector('input[name="paginas[]"]'), "Selecione pelo menos uma página.");
      }

      if (fields.outraPagToggle.checked && !fields.outraPagText.value.trim()) {
        setError(fields.outraPagText, "Descreva a outra página selecionada.");
      }

      if (fields.outraFuncionalidadeToggle.checked && !fields.outraFuncionalidadeText.value.trim()) {
        setError(fields.outraFuncionalidadeText, "Descreva a outra funcionalidade selecionada.");
      }

      if (getRadioValue("identidade") === "sim" && !getCheckedValues("possui[]").length) {
        setError(form.querySelector('input[name="possui[]"]'), "Se você já tem identidade visual, marque o que já possui.");
      }

      if (!getRadioValue("orcamento")) {
        setError(form.querySelector('input[name="orcamento"]'), "Selecione a faixa de orçamento disponível.");
      }

      if (!getRadioValue("prazo")) {
        setError(form.querySelector('input[name="prazo"]'), "Selecione o prazo desejado.");
      }
    }

    if (errors.length) {
      showFeedback("error", errors.join(" "));
      firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
      firstInvalid?.focus?.();
      return false;
    }

    return true;
  }

  function draftKeyFor(element) {
    if (element.type === "checkbox" || element.type === "radio") {
      return `${element.name}::${element.value}`;
    }

    return element.id || element.name;
  }

  function saveDraft() {
    const draft = {};

    form.querySelectorAll("input, textarea, select").forEach((element) => {
      const key = draftKeyFor(element);

      if (element.type === "checkbox" || element.type === "radio") {
        draft[key] = element.checked;
      } else {
        draft[key] = element.value;
      }
    });

    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }

  function restoreDraft() {
    const raw = localStorage.getItem(DRAFT_KEY);

    if (!raw) {
      return;
    }

    try {
      const draft = JSON.parse(raw);

      form.querySelectorAll("input, textarea, select").forEach((element) => {
        const key = draftKeyFor(element);

        if (!(key in draft)) {
          return;
        }

        if (element.type === "checkbox" || element.type === "radio") {
          element.checked = Boolean(draft[key]);
        } else {
          element.value = draft[key];
        }
      });
    } catch {
      localStorage.removeItem(DRAFT_KEY);
    }
  }

  function resetForm() {
    form.reset();
    localStorage.removeItem(DRAFT_KEY);
    localStorage.removeItem(SUMMARY_KEY);
    localStorage.removeItem(QUOTE_PAYLOAD_KEY);
    latestQuoteArtifact = null;
    setMobileEstimateOpen(false);
    hideSummary();
    hideFeedback();
    clearFieldState();
    updateDynamicFields();
    syncChoiceCards();
    updateEstimate();
  }

  fields.mobileEstimateToggle?.addEventListener("click", () => {
    const isOpen = fields.quoteSidebar?.dataset.mobileOpen === "true";
    setMobileEstimateOpen(!isOpen);
  });

  fields.mobileEstimateBackdrop?.addEventListener("click", () => {
    setMobileEstimateOpen(false);
  });

  fields.mobileEstimateClose?.addEventListener("click", () => {
    setMobileEstimateOpen(false);
  });

  window.addEventListener("resize", () => {
    if (!isMobileEstimateMode()) {
      setMobileEstimateOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMobileEstimateOpen(false);
    }
  });

  form.addEventListener("input", (event) => {
    if (event.target === fields.whatsapp) {
      fields.whatsapp.value = applyPhoneMask(fields.whatsapp.value);
    }

    hideFeedback();
    invalidateSummary();
    updateDynamicFields();
    syncChoiceCards();
    updateEstimate();
    saveDraft();
  });

  form.addEventListener("change", () => {
    hideFeedback();
    invalidateSummary();
    updateDynamicFields();
    syncChoiceCards();
    updateEstimate();
    saveDraft();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = collectData();
    const estimate = calculateEstimate(data);
    const artifact = createQuoteArtifact(data, estimate);

    showSummaryFromArtifact(artifact);
    fields.summaryPanel.scrollIntoView({ behavior: "smooth", block: "start" });

    persistQuoteArtifact(artifact);
    showDeliveryFeedback((await sendQuoteWithBestEffort(artifact)).status, true);
  });

  fields.copyButton.addEventListener("click", async () => {
    const summary = fields.summaryOutput.textContent.trim();

    if (!summary) {
      showFeedback("error", "Nenhum resumo foi gerado ainda.");
      return;
    }

    try {
      await navigator.clipboard.writeText(summary);
      showFeedback("success", "Resumo copiado para a área de transferência.");
    } catch {
      showFeedback("error", "Não foi possível copiar automaticamente. Tente copiar manualmente.");
    }
  });

  fields.downloadPdfButton.addEventListener("click", () => {
    if (!latestQuoteArtifact) {
      showFeedback("error", "Gere um resumo válido antes de baixar o PDF.");
      return;
    }

    downloadPdfFile(latestQuoteArtifact.pdfFile);
    showFeedback("success", "PDF baixado com sucesso.");
  });

  fields.sendWhatsAppButton.addEventListener("click", async () => {
    if (!latestQuoteArtifact) {
      showFeedback("error", "Gere um resumo válido antes de abrir o WhatsApp Web.");
      return;
    }

    showDeliveryFeedback((await sendQuoteWithBestEffort(latestQuoteArtifact)).status, false);
  });

  fields.closeButton?.addEventListener("click", () => {
    resetForm();

    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.href = "home.html";
  });

  fields.clearButton.addEventListener("click", resetForm);

  restoreDraft();
  updateSummaryActionsState(false);

  const rawQuotePayload = localStorage.getItem(QUOTE_PAYLOAD_KEY);
  if (rawQuotePayload) {
    try {
      const payload = JSON.parse(rawQuotePayload);
      const issuedAt = payload.issuedAt ? new Date(payload.issuedAt) : new Date();

      if (payload.data && payload.estimate) {
        showSummaryFromArtifact(createQuoteArtifact(payload.data, payload.estimate, issuedAt));
      }
    } catch {
      localStorage.removeItem(QUOTE_PAYLOAD_KEY);
    }
  } else {
    const lastSummary = localStorage.getItem(SUMMARY_KEY);
    if (lastSummary) {
      fields.summaryOutput.textContent = lastSummary;
      fields.summaryPanel.hidden = false;
      fields.copyButton.disabled = false;
    }
  }

  fields.whatsapp.value = applyPhoneMask(fields.whatsapp.value);
  updateDynamicFields();
  syncChoiceCards();
  updateEstimate();
})();
