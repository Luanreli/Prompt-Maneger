//Chave de identificação dados salvos no navegador
const STORAGE_KEY = "prompt_data"

//Carregamento dos promps salvos
const state = {
  prompts:[],
  selectedId: null,
}

const elements = {
  promptTitle: document.getElementById("prompt-title"),
  promptContent: document.getElementById("prompt-content"),
  titleWrapper: document.getElementById("title-wrapper"),
  contentWrapper: document.getElementById("content-wrapper"),
  btnOpen: document.getElementById("btn-open"),
  btnClose: document.getElementById("btn-close"),
  btnSave: document.getElementById("btn-save"),
  list: document.getElementById("prompt-list"),
  search: document.getElementById("search-input"),
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

  function save() {
    const title = elements.promptTitle.textContent.trim()
    const content = elements.promptContent.innerHTML.trim()
    const hasContent = elements.promptContent.textContent.trim()

    if (!title || !hasContent) {
      alert("O Titulo e conteudo não pode estar vazio.")
      return
    }

    if(state.selectedId){
      
    } else {
      const newPrompt = {
        id: Date.now().toString(36),
        title,
        content,
      }
      state.prompts.unshift(newPrompt)
      state.selectedId = newPrompt.id
    }

    persist()
  }

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.prompts))
    alert("Prompt salvo com sucesso!")
  } catch (error) {
    console.error("Erro ao salvar os dados no localStorage:", error)
  }
}

function load() {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY)
    state.prompts = storedData ? JSON.parse(storedData) : []
    state.selectedId = null

    console.log(state.prompts)
  } catch (error) {
    console.error("Erro ao carregar os dados do localStorage:", error)
  }
}

function createPrompItem(prompt) {
  return `
    <li class="prompt-item" data-id="${prompt.id}">
      <div class="prompt-item-content">
        <span class="prompt-item-title">${prompt.title}</span>
        <span class="prompt-item-description">${prompt.content}</span>
      </div>

      <button class="btn-icon" title="Remover" data-action="remove-prompt"> 
        <img src="assets/remove.svg" alt="Remover" class="icon icon-trash"/>
      </button>
    </li>
  `
}

function renderList(filterText = "") {
  const filteredPrompts = state.prompts.filter((prompt) =>
    prompt.title.toLowerCase().includes(filterText.toLowerCase().trim())
  ).map((p) => createPrompItem(p)).join("")

  elements.list.innerHTML = filteredPrompts

}
  //Eventos
  elements.btnSave.addEventListener("click", save)
  elements.search.addEventListener("input", function (event){
    renderList(event.target.value)
  })

  elements.list.addEventListener("click", function (event){

  })

function init() {
  load()
  renderList("")
  attachAllEditableHandlers()
  updateAllEditableStates()

    elements.btnOpen.addEventListener("click", openSidebar)
    elements.btnClose.addEventListener("click", closeSidebar)
    sidebar.style.display = "flex"
    elements.btnOpen.style.display = "none"
}

init()
