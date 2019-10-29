const form = document.querySelector('form');
const tbody = document.querySelector('tbody#fichas');
const inputNome = document.querySelector('input#nome');
const inputCpf = document.querySelector('input#cpf');
const inputCidade = document.querySelector('input#cidade');
const txtCurriculo = document.querySelector('textarea#curriculo-txt');

window.addEventListener('load', function (e) {
  e.preventDefault();

  if (localStorage.getItem("Fichas") === null) {
    localStorage.setItem("Fichas", "[]");
  } else {
    localData = JSON.parse(localStorage.getItem("Fichas"));
    for (let i = 0; i < localData.length; i++) {
      listStorage(
          JSON.parse(localData[i]).nome,
          JSON.parse(localData[i]).cpf,
          JSON.parse(localData[i]).cidade,
          JSON.parse(localData[i]).curriculo
          );
    }
  }
});


form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (typeof (Storage) !== 'undefined') {
    if (localStorage.hasOwnProperty("Fichas")) {
      dataStorage = JSON.parse(localStorage.getItem("Fichas"));
    }
    vetALL = '{"nome":"'+inputNome.value+'", "cpf":"'+inputCpf.value+'", "cidade":"'+inputCidade.value+'", "curriculo":"'+txtCurriculo.value+'"}';
    dataStorage = JSON.parse(localStorage.getItem("Fichas"));
    dataStorage.push(vetALL);
    localStorage.setItem("Fichas", JSON.stringify(dataStorage));
  }
  listStorage(inputNome, inputCpf, inputCidade, txtCurriculo);
  M.toast({html: 'Ficha adicionada!'});
});

tbody.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.type === 'submit') {
    vetStorage = JSON.parse(localStorage.getItem("Fichas"));
    for (let j = 0; j < vetStorage.length; j++) {
        vetStorage.splice(vetStorage[j], 1);
        localStorage.setItem("Fichas", JSON.stringify(vetStorage));
        e.target.parentElement.parentElement.remove();
        M.toast({html: 'Ficha removida!'});
          
    }
  }
});

const listStorage = function (n, c, cd, txtC) {
  let nome, cpf, cidade, curriculo;
  if ((typeof n == 'string') 
  && (typeof c == 'string')
  && (typeof cd == 'string')
  && (typeof txtC == 'string')) 
  {
    nome = n;
    cpf = c;
    cidade = cd;
    curriculo = txtC
  } else {
    nome = n.value;
    cpf = c.value;
    cidade = cd.value;
    curriculo = txtC.value
  }
  const bt = `<td><button class="btn">Excluir</button></td>`;
  const tdNome = `<td>${nome}</td>`;
  const tdCpf = `<td>${cpf}</td>`;
  const tdCidade = `<td>${cidade}</td>`;
  const tdCurriculo = `<td>${curriculo}</td>`;
  const row = `<tr>${tdNome}${tdCpf}${tdCidade}${tdCurriculo}${bt}</tr>`;
  tbody.innerHTML += row;
}
