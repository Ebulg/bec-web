/**
 * BERNAL'S ENGLISH COURSE — FLOATING TOOLBAR & CONTROLS
 * Provides:
 * 1. Access guard (redirects if not authenticated with code KA12SD123J238.123)
 * 2. Morphing FAB toolbar button (converts from icon to horizontal toolbar)
 * 3. 1 Hoja / 2 Hojas view switcher (Single vs Spread)
 * 4. Full PDF download (Ctrl + P simulation)
 * 5. Selective download modal (page ranges / specific sheets)
 * 6. Return to menu button
 */

(function(){
  'use strict';

  // ══════════════════════════════════════════════════════
  // 1. GUARD DE ACCESO
  // ══════════════════════════════════════════════════════
  var VALID_CODE = 'KA12SD123J238.123';
  var STORAGE_KEY = 'bec_access';
  var auth = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
  if (auth !== VALID_CODE) {
    window.location.replace('index.html');
    return;
  }
  // Sincronizar sesión
  sessionStorage.setItem(STORAGE_KEY, VALID_CODE);

  // ══════════════════════════════════════════════════════
  // 2. ESTADO Y CONFIGURACIÓN
  // ══════════════════════════════════════════════════════
  var currentView = localStorage.getItem('bec_book_view') || 'Spread'; // 'Spread' (2 hojas) o 'Single' (1 hoja)
  var TOTAL_PAGES = 204; // Total de páginas de First Book

  var PAGE_TITLES = {
    1: 'Portada (Cover)',
    2: 'Página de Título',
    3: 'Introducción (Prólogo)',
    4: 'Instrucciones de Estudio',
    5: 'Lección 1: Inicio (A Doll, A Car...) [Hoja 1]',
    6: 'Lección 1: Vocabulario (A Spoon, A Fork...) [Hoja 2]',
    7: 'Lección 1: Animales (A Cow, A Horse...) [Hoja 3]',
    8: 'Lección 1: Singular/Plural (A Peach...) [Hoja 4]',
    9: 'Lección 1: Plantas y Frutas (A Plant, Plants) [Hoja 5 / orig 10]',
    10: 'Lección 1: Escritura (Let\'s write a sentence) [Hoja 6 / orig 10]',
    11: 'Lección 1: Forma Interrogativa [Hoja 7 / orig 11]',
    12: 'Lección 1: El Alfabeto (ABCDEFG) [Hoja 8 / orig 12]',
    13: 'Lección 2: Inicio (Pronombres y Verbo To Be) [Hoja 9 / orig 13]'
  };

  // ══════════════════════════════════════════════════════
  // 3. INYECCIÓN DEL DOM AL CARGAR
  // ══════════════════════════════════════════════════════
  function initToolbar() {
    if (document.getElementById('becFabRoot')) return;

    // Crear contenedor principal del FAB
    var fabRoot = document.createElement('div');
    fabRoot.id = 'becFabRoot';
    fabRoot.className = 'bec-fab-root';

    fabRoot.innerHTML = `
      <!-- Elemento Morphing (Pill / Toolbar) -->
      <div id="becFabPill" class="bec-fab-pill is-collapsed" title="Herramientas de lectura">
        
        <!-- Icono cuando está colapsado -->
        <div class="bec-fab-trigger-icon" id="becFabIcon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
        </div>
        <div class="bec-fab-tooltip">Herramientas del Libro</div>

        <!-- Contenido cuando está desplegado como barra -->
        <div class="bec-toolbar-content" id="becToolbarContent">
          
          <!-- Botón Regresar al Menú -->
          <button class="bec-tool-btn bec-btn-return" id="becBtnReturn" type="button" title="Volver a la Biblioteca de Libros">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5"></path>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Menú</span>
          </button>

          <div class="bec-divider"></div>

          <!-- Selector de Vista: 1 Hoja / 2 Hojas -->
          <div class="bec-view-segmented" title="Modo de visualización de páginas">
            <button class="bec-view-btn" id="becBtnView1" type="button">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              </svg>
              <span>1 Hoja</span>
            </button>
            <button class="bec-view-btn" id="becBtnView2" type="button">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <span>2 Hojas</span>
            </button>
          </div>

          <div class="bec-divider"></div>

          <!-- Botón Descargar PDF Completo -->
          <button class="bec-tool-btn" id="becBtnDownloadAll" type="button" title="Descargar libro completo en PDF (Ctrl + P)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Descargar PDF</span>
          </button>

          <!-- Botón Descarga Selectiva -->
          <button class="bec-tool-btn" id="becBtnDownloadSelective" type="button" title="Descargar u organizar hojas específicas en PDF">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span>Descarga Selectiva</span>
          </button>

          <div class="bec-divider"></div>

          <!-- Botón Cerrar / Contraer Barra -->
          <button class="bec-tool-btn bec-btn-close" id="becBtnCloseBar" type="button" title="Ocultar barra de herramientas">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

        </div>
      </div>
    `;

    // Modal de Descarga Selectiva
    var modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'becModalBackdrop';
    modalBackdrop.className = 'bec-modal-backdrop';

    modalBackdrop.innerHTML = `
      <div class="bec-modal-card" id="becModalCard">
        <div class="bec-modal-head">
          <div class="bec-modal-title-group">
            <div class="bec-modal-icon-badge">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div>
              <h3>Descarga Selectiva de Hojas</h3>
              <p>Elige las páginas exactas que deseas exportar o imprimir en PDF</p>
            </div>
          </div>
          <button class="bec-modal-close" id="becModalCloseBtn" type="button" aria-label="Cerrar modal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="bec-modal-body">
          <p class="bec-modal-desc">
            Indica números de página individuales o rangos separados por comas. Por ejemplo: <code>1-5, 8, 12-20</code>.
          </p>

          <div class="bec-modal-input-label">
            <span>Rango de Páginas</span>
            <span class="bec-modal-total-badge">Total del libro: 204 páginas</span>
          </div>

          <input
            type="text"
            id="becPageRangeInput"
            class="bec-modal-input"
            placeholder="Ej: 1-10, 15, 24-30"
            autocomplete="off"
            spellcheck="false"
          >

          <!-- Chips de atajo -->
          <div class="bec-quick-chips">
            <button class="bec-chip" type="button" data-range="5-9">★ Lección 1: Hasta Plantas (5-9)</button>
            <button class="bec-chip" type="button" data-range="5-10">Lección 1: Con Escritura (5-10)</button>
            <button class="bec-chip" type="button" data-range="5-12">Lección 1: Completa (5-12)</button>
            <button class="bec-chip" type="button" data-range="1-4">Introducción (1-4)</button>
            <button class="bec-chip" type="button" data-range="1-204">Todo el libro (1-204)</button>
          </div>

          <div class="bec-modal-tip">
            <strong>💡 Referencia rápida de páginas:</strong>
            <ul>
              <li><strong>Pág. 5:</strong> Primera página de la Lección 1 (Hoja 1).</li>
              <li><strong>Pág. 9:</strong> Hoja 5 donde están las <strong>Plantas y Frutas</strong> (orig 10). <em>Si solo quieres descargar hasta aquí, usa el rango <strong>5-9</strong>.</em></li>
              <li><strong>Pág. 10:</strong> Hoja 6 con los ejercicios de escritura (Let's write a sentence).</li>
            </ul>
          </div>

          <!-- Feedback de cuántas páginas están seleccionadas -->
          <div class="bec-selection-feedback is-empty" id="becSelectionFeedback">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span id="becFeedbackText">Escribe el rango de páginas a descargar</span>
          </div>
        </div>

        <div class="bec-modal-actions">
          <button class="bec-modal-btn-cancel" id="becModalCancelBtn" type="button">Cancelar</button>
          <button class="bec-modal-btn-print" id="becModalConfirmBtn" type="button" disabled>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Generar y Descargar PDF</span>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(fabRoot);
    document.body.appendChild(modalBackdrop);

    setupEvents();
    syncViewButtons();
  }

  // ══════════════════════════════════════════════════════
  // 4. EVENTOS Y CONTROLADORES
  // ══════════════════════════════════════════════════════
  function setupEvents() {
    var pill = document.getElementById('becFabPill');
    var btnClose = document.getElementById('becBtnCloseBar');
    var btnReturn = document.getElementById('becBtnReturn');
    var btnView1 = document.getElementById('becBtnView1');
    var btnView2 = document.getElementById('becBtnView2');
    var btnDownloadAll = document.getElementById('becBtnDownloadAll');
    var btnDownloadSel = document.getElementById('becBtnDownloadSelective');

    // Modal elements
    var modal = document.getElementById('becModalBackdrop');
    var modalClose = document.getElementById('becModalCloseBtn');
    var modalCancel = document.getElementById('becModalCancelBtn');
    var modalConfirm = document.getElementById('becModalConfirmBtn');
    var pageInput = document.getElementById('becPageRangeInput');
    var feedback = document.getElementById('becSelectionFeedback');
    var feedbackText = document.getElementById('becFeedbackText');

    // A. Abrir/Expandir barra al hacer click en el botón colapsado
    pill.addEventListener('click', function(e) {
      if (pill.classList.contains('is-collapsed')) {
        pill.classList.remove('is-collapsed');
        pill.classList.add('is-expanded');
      }
    });

    // B. Cerrar/Contraer barra al hacer click en la X
    btnClose.addEventListener('click', function(e) {
      e.stopPropagation();
      pill.classList.remove('is-expanded');
      pill.classList.add('is-collapsed');
    });

    // C. Regresar al menú de libros
    btnReturn.addEventListener('click', function(e) {
      e.stopPropagation();
      window.location.href = 'menu.html';
    });

    // D. Cambiar a 1 Hoja
    btnView1.addEventListener('click', function(e) {
      e.stopPropagation();
      applyView('Single');
    });

    // E. Cambiar a 2 Hojas
    btnView2.addEventListener('click', function(e) {
      e.stopPropagation();
      applyView('Spread');
    });

    // F. Descargar PDF Completo (Ctrl + P)
    btnDownloadAll.addEventListener('click', function(e) {
      e.stopPropagation();
      printAllPages();
    });

    // G. Abrir Modal de Descarga Selectiva
    btnDownloadSel.addEventListener('click', function(e) {
      e.stopPropagation();
      openSelectiveModal();
    });

    // H. Cerrar Modal
    function closeModal() {
      modal.classList.remove('is-visible');
    }
    modalClose.addEventListener('click', closeModal);
    modalCancel.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
        closeModal();
      }
    });

    // I. Chips de selección rápida
    document.querySelectorAll('.bec-chip').forEach(function(chip) {
      chip.addEventListener('click', function() {
        var range = chip.getAttribute('data-range');
        pageInput.value = range;
        validatePages();
      });
    });

    // J. Validación en tiempo real del input de páginas
    pageInput.addEventListener('input', validatePages);

    function validatePages() {
      var val = pageInput.value.trim();
      if (!val) {
        feedback.className = 'bec-selection-feedback is-empty';
        feedbackText.innerHTML = 'Escribe el rango de páginas a descargar';
        modalConfirm.disabled = true;
        return [];
      }

      var pages = parsePageRange(val);
      if (pages.length === 0) {
        feedback.className = 'bec-selection-feedback is-error';
        feedbackText.innerHTML = 'Ninguna página válida encontrada en el rango ingresado.';
        modalConfirm.disabled = true;
        return [];
      }

      var firstPage = pages[0];
      var lastPage = pages[pages.length - 1];
      var startDesc = PAGE_TITLES[firstPage] || ('Pág. ' + firstPage);
      var endDesc = PAGE_TITLES[lastPage] || ('Pág. ' + lastPage);

      var hint = '';
      if (lastPage === 10 && pages.indexOf(9) !== -1) {
        hint = '<span style="display:block;margin-top:5px;font-size:12px;color:#b45309;line-height:1.4;">⚠️ <strong>Atención:</strong> La hoja de ilustraciones con <strong>Plantas y Frutas</strong> es la <strong>Pág. 9</strong>. La <strong>Pág. 10</strong> incluye ejercicios de escritura. Si solo deseas hasta las plantas, cambia el rango a <strong>5-9</strong>.</span>';
      } else if (lastPage === 9 && firstPage === 5) {
        hint = '<span style="display:block;margin-top:5px;font-size:12px;color:#15803d;line-height:1.4;">✨ Rango exacto de vocabulario ilustrado de la Lección 1 (termina en Plantas).</span>';
      }

      feedback.className = 'bec-selection-feedback is-valid';
      feedbackText.innerHTML = '<div><strong>✓ ' + pages.length + ' hoja' + (pages.length === 1 ? '' : 's') + ' seleccionada' + (pages.length === 1 ? '' : 's') + '</strong> <span style=\"opacity:.85\">(' + startDesc + ' → ' + endDesc + ')</span>' + hint + '</div>';
      modalConfirm.disabled = false;
      return pages;
    }

    // K. Confirmar Descarga Selectiva e Imprimir
    modalConfirm.addEventListener('click', function() {
      var selected = validatePages();
      if (!selected.length) return;

      closeModal();
      printSelectedPages(selected);
    });
  }

  // ══════════════════════════════════════════════════════
  // 5. CAMBIO DINÁMICO DE VISTA (1 Hoja vs 2 Hojas)
  // ══════════════════════════════════════════════════════
  function applyView(newView) {
    currentView = newView;
    localStorage.setItem('bec_book_view', currentView);
    syncViewButtons();

    // Actualizar props en tiempo de ejecución de dc-runtime
    if (window.__dcSetProps && window.__dcRootName) {
      var root = window.__dcRootName();
      window.__dcSetProps(root, { view: currentView });
    }
  }

  function syncViewButtons() {
    var btn1 = document.getElementById('becBtnView1');
    var btn2 = document.getElementById('becBtnView2');
    if (!btn1 || !btn2) return;

    if (currentView === 'Single') {
      btn1.classList.add('is-active');
      btn2.classList.remove('is-active');
    } else {
      btn2.classList.add('is-active');
      btn1.classList.remove('is-active');
    }
  }

  // ══════════════════════════════════════════════════════
  // 6. DESCARGA SELECTIVA: PARSER Y GENERADOR
  // ══════════════════════════════════════════════════════
  function openSelectiveModal() {
    var modal = document.getElementById('becModalBackdrop');
    var input = document.getElementById('becPageRangeInput');
    modal.classList.add('is-visible');
    input.focus();
    input.select();
  }

  function parsePageRange(str) {
    var set = new Set();
    var parts = str.split(/[,;\s]+/);

    parts.forEach(function(p) {
      p = p.trim();
      if (!p) return;
      var rangeMatch = p.match(/^(\d+)-(\d+)$/);
      if (rangeMatch) {
        var start = parseInt(rangeMatch[1], 10);
        var end = parseInt(rangeMatch[2], 10);
        if (start > end) { var temp = start; start = end; end = temp; }
        for (var i = start; i <= end; i++) {
          if (i >= 1 && i <= TOTAL_PAGES) set.add(i);
        }
      } else {
        var num = parseInt(p, 10);
        if (!isNaN(num) && num >= 1 && num <= TOTAL_PAGES) {
          set.add(num);
        }
      }
    });

    return Array.from(set).sort(function(a, b) { return a - b; });
  }

  function printAllPages() {
    var allPageElements = document.querySelectorAll('[data-page]');
    var allNums = [];
    for (var i = 1; i <= allPageElements.length; i++) allNums.push(i);
    printSelectedPages(allNums);
  }

  function printSelectedPages(pageNumbers) {
    var pageSet = new Set(pageNumbers);
    var allPageElements = document.querySelectorAll('[data-page]');

    if (!allPageElements.length) {
      window.print();
      return;
    }

    // 1. Obtener o crear portal de impresión aislado
    var portal = document.getElementById('becPrintPortal');
    if (!portal) {
      portal = document.createElement('div');
      portal.id = 'becPrintPortal';
      document.body.appendChild(portal);
    }
    portal.innerHTML = '';

    // 2. Filtrar y clonar ÚNICAMENTE las páginas seleccionadas
    var count = 0;
    allPageElements.forEach(function(origEl, idx) {
      var pageNum = idx + 1; // 1-indexado
      if (pageSet.has(pageNum)) {
        count++;
        var clone = origEl.cloneNode(true);
        clone.className = (clone.className || '') + ' bec-portal-page';
        // Establecer dimensiones A4 exactas para eliminar cualquier overflow
        clone.style.width = '210mm';
        clone.style.height = '297mm';
        clone.style.maxHeight = '297mm';
        clone.style.margin = '0';
        clone.style.padding = '0';
        clone.style.boxShadow = 'none';
        clone.style.overflow = 'hidden';
        clone.style.boxSizing = 'border-box';
        clone.style.position = 'relative';
        portal.appendChild(clone);
      }
    });

    if (count === 0) return;

    // 3. Marcar la última página para que NO rompa página después de ella (evita la hoja blanca)
    var cloned = portal.querySelectorAll('.bec-portal-page');
    if (cloned.length > 0) {
      cloned[cloned.length - 1].classList.add('bec-portal-last');
    }

    // 4. Inyectar estilos dedicados al portal de impresión
    var style = document.getElementById('becSelectivePrintStyle');
    if (!style) {
      style = document.createElement('style');
      style.id = 'becSelectivePrintStyle';
      document.head.appendChild(style);
    }

    style.textContent = `
      @media print {
        @page {
          size: 210mm 297mm;
          margin: 0 !important;
        }
        html, body {
          background: #fff !important;
          margin: 0 !important;
          padding: 0 !important;
          height: auto !important;
          min-height: 0 !important;
        }
        /* Ocultar todo el árbol de la aplicación normal */
        #dc-root,
        .sc-host,
        [data-desk],
        .bec-fab-root,
        .bec-modal-backdrop {
          display: none !important;
        }
        /* Mostrar ÚNICAMENTE el portal de páginas seleccionadas */
        #becPrintPortal {
          display: block !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        #becPrintPortal .bec-portal-page {
          display: block !important;
          width: 210mm !important;
          height: 297mm !important;
          max-height: 297mm !important;
          margin: 0 !important;
          padding: 0 !important;
          box-shadow: none !important;
          break-after: page !important;
          page-break-after: always !important;
          overflow: hidden !important;
          box-sizing: border-box !important;
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }
        /* La última hoja NO debe saltar página para eliminar la hoja blanca final */
        #becPrintPortal .bec-portal-page.bec-portal-last {
          break-after: avoid !important;
          page-break-after: avoid !important;
        }
      }
    `;

    // 5. Invocar el diálogo de impresión
    setTimeout(function() {
      window.print();

      // 6. Limpieza garantizada después de imprimir
      var cleanup = function() {
        if (portal) portal.innerHTML = '';
        if (style && style.parentNode) style.parentNode.removeChild(style);
        window.removeEventListener('afterprint', cleanup);
      };

      window.addEventListener('afterprint', cleanup);
      setTimeout(cleanup, 20000);
    }, 150);
  }

  function removePrintFilter() {
    var portal = document.getElementById('becPrintPortal');
    if (portal) portal.innerHTML = '';
    var style = document.getElementById('becSelectivePrintStyle');
    if (style && style.parentNode) {
      style.parentNode.removeChild(style);
    }
  }

  // ══════════════════════════════════════════════════════
  // 7. INICIALIZACIÓN
  // ══════════════════════════════════════════════════════
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToolbar);
  } else {
    initToolbar();
  }

  // Re-aplicar vista persistida si es 'Single' una vez que arranque dc-runtime
  window.addEventListener('load', function() {
    if (currentView === 'Single' && window.__dcSetProps && window.__dcRootName) {
      setTimeout(function() {
        applyView('Single');
      }, 300);
    }
  });

})();
