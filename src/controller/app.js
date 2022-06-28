const { ipcRenderer } = require('electron')
const Swal  = require('sweetalert2');

const pnForm = document.querySelector('#pnForm');
const Nomepn = document.querySelector('#Nomepn');
const pn = document.querySelector('#pn');
const pnEtiqueta = document.querySelector('#pnEtiqueta');
const pnCliente = document.querySelector('#pnCliente');
const senhaPn = document.querySelector('#senhaPn');
const celulapn = document.querySelector('#celula');
const pnlado = document.querySelector('#pnlado');
const pnTubo = document.querySelector('#pnTubo');

// Atualizar sequencia: SELECT setval('"RECEITA_id_seq"'::regclass, (SELECT MAX (id) FROM public."RECEITA"), true);

pnForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Verificar campo em branco
    let campoVazio = false;
    if (Nomepn.value.length == 0){
        campoVazio = true;
        Swal.fire({
            text: 'Campo de descrição deve ser preenchido',
            confirmButtonText: 'OK'
          });
    } else if (pn.value.length == 0){
        campoVazio = true;
        Swal.fire({
            text: 'Campo de partnumber deve ser preenchido',
            confirmButtonText: 'OK'
          })
    } else if (pnEtiqueta.value.length == 0) {
        campoVazio = true;
        Swal.fire({
            text: 'Campo de etiqueta deve ser preenchido',
            confirmButtonText: 'OK'
          })
    } else if (pnCliente.value.length == 0) {
        campoVazio = true;
        Swal.fire({
            text: 'Campo de código do cliente deve ser preenchido',
            confirmButtonText: 'OK'
          })
    } else if (senhaPn.value == "marelli@1234" && !campoVazio) {

        const partNumber = {
            celula: celulapn.value,
            codigo: pn.value,
            tpressao: pnTubo.value,
            nome: Nomepn.value,
            etq: pnEtiqueta.value,
            cliente: pnCliente.value ,
            lado: pnlado.value
        }
    
        ipcRenderer.send('new-pn', partNumber);
    } else {
        Swal.fire({
            text: 'Senha Incorreta',
            confirmButtonText: 'OK'
          })
    }

})

ipcRenderer.on("pnCreated", (e, arg) => {
    Swal.fire({
        title: arg,
        text: arg == "Sucesso"? "Partnumber Salvo" : "Erro ao salvar partnumber",
        confirmButtonText: 'OK'
    })

    if (arg == "Sucesso") pnForm.reset();
})

celulapn.addEventListener('change', (e) => {
    let celAtual = document.querySelector('#celula').value;

    if (celAtual == "Cel8me") {
        document.querySelector("#ladoDaEtiqueta").style.display = "block";
    } else {
        document.querySelector("#ladoDaEtiqueta").style.display = "none";
    }

    if (celAtual == "Cel10me") {
        document.querySelector("#tuboDePressao").style.display = "block";
    } else {
        document.querySelector("#tuboDePressao").style.display = "none";
    }
})