const form = document.querySelector('form');
const tbody = document.querySelector('tbody#lista');
const inputProduto = document.querySelector('input#produto');

window.addEventListener('load', function (e) {
  e.preventDefault();

  if (localStorage.getItem("Produtos") === null) {
    localStorage.setItem("Produtos", "[]");
  } else {
    localData = JSON.parse(localStorage.getItem("Produtos"));
    for (let i = 0; i < localData.length; i++) {
      listStorage(localData[i]);
    }
  }
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  let dataStorage = inputProduto.value;

  if (typeof (Storage) !== 'undefined') {
    if (localStorage.hasOwnProperty("Produtos")) {
      dataStorage = JSON.parse(localStorage.getItem("Produtos"))
    }
    dataStorage.push(inputProduto.value);
    localStorage.setItem("Produtos", JSON.stringify(dataStorage));
  }
  listStorage(inputProduto);
  M.toast({html: 'Item adicionado!'});
});

tbody.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.type === 'submit') {
    vetStorage = JSON.parse(localStorage.getItem("Produtos"));
    vetStorage.splice(vetStorage.indexOf(produto), 1);
    localStorage.setItem("Produtos", JSON.stringify(vetStorage));
      e.target.parentElement.parentElement.remove();
      M.toast({html: 'Item removido!'});
  }
});

const listStorage = function (k) {
  let produto;
  if (typeof k == 'string') {
    produto = k;
  } else {
    produto = k.value;
  }
  const bt = `<button class="btn">Excluir</button>`;
  const tds = `<td>${produto}</td><td>${bt}</td>`;
  const row = `<tr>${tds}</tr>`;
  tbody.innerHTML += row;
}
