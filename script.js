const elements = {
  promptTitle: document.getElementById("prompt-title"),
  promptContent: document.getElementById("prompt-content"),
  titleWrapper: document.getElementById("title-wrapper"),
  contentWrapper: document.getElementById("content-wrapper"),
  btnOpen: document.getElementById("btn-open"),
  btnClose: document.getElementById("btn-close"),
}

function updateEditableWrapperState(element, wrapper) {
  const hasText = element.textContent.trim().length > 0
  wrapper.classList.toggle("is-empty", !hasText)
}

function updateAllEditableStates() {
  updateEditableWrapperState(elements.promptTitle, elements.titleWrapper)
  updateEditableWrapperState(elements.promptContent, elements.contentWrapper)
}

function attachAllEditableHandlers() {
  elements.promptTitle.addEventListener("input", function () {
    updateEditableWrapperState(elements.promptTitle, elements.titleWrapper)
  })
  elements.promptContent.addEventListener("input", function () {
    updateEditableWrapperState(elements.promptContent, elements.contentWrapper)
  })
}

  // Lógica de abrir/fechar aside.sidebar
  const sidebar = document.querySelector(".sidebar")
  function openSidebar() {
    sidebar.style.display = "flex"
    elements.btnOpen.style.display = "none"
  }


  function closeSidebar() {
    sidebar.style.display = "none"
    elements.btnOpen.style.display = "block"
  }

function init() {
  attachAllEditableHandlers()
  updateAllEditableStates()

  if (elements.btnOpen && elements.btnClose && sidebar) {
    elements.btnOpen.addEventListener("click", openSidebar)
    elements.btnClose.addEventListener("click", closeSidebar)
    // Estado inicial: sidebar visível, botão open oculto
    sidebar.style.display = "flex"
    elements.btnOpen.style.display = "none"
  }
}

init()
