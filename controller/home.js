import {
  pegarToken,
  pegarPerfilUsuario,
  pegarPlaylists,
} from "./../service/spotify-service.js";
let usuarioLogado = {};
let playlists = [];

async function setup() {
  try {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    await pegarToken(code);
    usuarioLogado = await pegarPerfilUsuario();
    mostrarUsuario();
    mostrarPlaylists();
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}

function mostrarUsuario() {
  document.getElementById(
    "titulo"
  ).innerHTML = `Seja bem-vind@ ${usuarioLogado.nome}`;
}

async function mostrarPlaylists() {
  playlists = await pegarPlaylists();
  let sectionPlaylist = document.getElementById("sectionPlaylist");
  console.log(playlists);
  sectionPlaylist.innerHTML = "";
  for (let item of playlists) {
    sectionPlaylist.innerHTML += `
        <div class="col s12 m6 l4">
            <div class="card grey darken-3 waves-effect waves-light">
                <div class="card-image">
                    <img src="${ item.images[0].url }">
                    <span class="card-title">${ item.name }</span>
                </div>
                <div class="card-content white-text">
                    <p>${ item.description }</p>
                </div>
            </div>
        </div>
        `;
  }
}

async function cadastrarPlaylist() {
  const body = {}
  body.name = document.getElementById("inputNome").value
  body.description = document.getElementById("inputDescricao").value
  body.collaborative = document.getElementById("checkboxColaborativa").value
  // body.public = ?
  console.log(body);
}

function acionarColaborativa() {
  const checkboxColab = document.getElementById("checkboxColaborativa")
  if(checkboxColab.value == "on") checkboxColab.value = "off"
  else checkboxColab.value = "on" 
}

document.body.onload = setup;
document.getElementById("btnRecarregar").onclick = mostrarPlaylists
document.getElementById("btnSalvar").onclick = cadastrarPlaylist
document.getElementById("inputColaborativa").onclick = acionarColaborativa
