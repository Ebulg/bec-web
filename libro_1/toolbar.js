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
            <button class="bec-chip" type="button" data-range="1-8">★ Lección 1 (1-8)</button>
            <button class="bec-chip" type="button" data-range="1-20">Primeras 20 páginas</button>
            <button class="bec-chip" type="button" data-range="1-50">Primeras 50 páginas</button>
            <button class="bec-chip" type="button" data-range="1-204">Todo el libro (1-204)</button>
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
      // Eliminar cualquier filtro previo de impresión
      removePrintFilter();
      window.print();
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
        feedbackText.textContent = 'Escribe el rango de páginas a descargar';
        modalConfirm.disabled = true;
        return [];
      }

      var pages = parsePageRange(val);
      if (pages.length === 0) {
        feedback.className = 'bec-selection-feedback is-error';
        feedbackText.textContent = 'Ninguna página válida encontrada en el rango ingresado.';
        modalConfirm.disabled = true;
        return [];
      }

      feedback.className = 'bec-selection-feedback is-valid';
      feedbackText.textContent = '✓ ' + pages.length + ' hoja' + (pages.length === 1 ? '' : 's') + ' seleccionada' + (pages.length === 1 ? '' : 's') + ' (Pág. ' + (pages.length <= 8 ? pages.join(', ') : pages.slice(0, 6).join(', ') + '… ' + pages[pages.length - 1]) + ')';
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

  function printSelectedPages(pageNumbers) {
    var pageSet = new Set(pageNumbers);
    var pageElements = document.querySelectorAll('[data-page]');

    // Si aún no están cargadas o hay discrepancia, usar fallback
    if (!pageElements.length) {
      window.print();
      return;
    }

    // Marcar los elementos seleccionados
    pageElements.forEach(function(el, idx) {
      var pageNum = idx + 1; // 1-indexado
      if (pageSet.has(pageNum)) {
        el.classList.add('bec-selected-page');
      } else {
        el.classList.remove('bec-selected-page');
      }
    });

    // Inyectar CSS de impresión selectiva
    var style = document.getElementById('becSelectivePrintStyle');
    if (!style) {
      style = document.createElement('style');
      style.id = 'becSelectivePrintStyle';
      document.head.appendChild(style);
    }

    style.textContent = `
      @media print {
        [data-desk] { padding: 0 !important; gap: 0 !important; display: block !important; zoom: 1 !important; }
        [data-row] { display: block !important; gap: 0 !important; }
        [data-ph], [data-scan], [data-noprint] { display: none !important; }
        [data-page] { display: none !important; }
        [data-page].bec-selected-page {
          display: block !important;
          break-after: page !important;
          page-break-after: always !important;
          margin: 0 !important;
          box-shadow: none !important;
        }
      }
    `;

    // Disparar diálogo de impresión
    setTimeout(function() {
      window.print();

      // Limpiar al terminar
      var cleanup = function() {
        if (style && style.parentNode) style.parentNode.removeChild(style);
        document.querySelectorAll('.bec-selected-page').forEach(function(el) {
          el.classList.remove('bec-selected-page');
        });
        window.removeEventListener('afterprint', cleanup);
      };

      window.addEventListener('afterprint', cleanup);
      // Fallback por si afterprint no dispara
      setTimeout(cleanup, 60000);
    }, 150);
  }

  function removePrintFilter() {
    var style = document.getElementById('becSelectivePrintStyle');
    if (style && style.parentNode) {
      style.parentNode.removeChild(style);
    }
    document.querySelectorAll('.bec-selected-page').forEach(function(el) {
      el.classList.remove('bec-selected-page');
    });
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
