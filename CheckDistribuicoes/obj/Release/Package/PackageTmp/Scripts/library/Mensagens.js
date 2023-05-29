function ShowOk(Mensagem, Titulo, Tipo) {
    var botao;

    if (Tipo == "ERRO")
        botao = "error";
    else if (Tipo == "SUCESSO")
        botao = "success";
    else if (Tipo == "INFO")
        botao = "info"
    else if (Tipo == "PERIGO")
        botao = "warning"
    else if (Tipo == "PERGUNTA")
        botao = "question"
    Swal.fire({
        position: 'center',
        icon: botao,
        //text: Mensagem,
        html: Mensagem,
        title: Titulo,
        showConfirmButton: true,
    })
}

function ShowConfirma(Mensagem) {

}

function ShowAtiva(id, Tipo) {
    var Mensagem;
    if (Tipo == 'ATIVA')
        Mensagem = "Deseja ativar esse registro?";
    else
        Mensagem = "Deseja desativar esse registro?";
    Swal.fire({
        title: 'ATENÇÃO',
        text: Mensagem,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#198754',
        confirmButtonText: 'Confirma'
    }).then((result) => {
        if (result.isConfirmed)
            AtivaDesativa(id);

    });
}



function ShowTempo(Tempo, Titulo) {
    let timerInterval
    Swal.fire({
        title: Titulo,
        html: 'Estou fechando depois de alguns segundos.',
        timer: Tempo,
        timerProgressBar: true,
        willOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                    const b = content.querySelector('b')
                    if (b) {
                        b.textContent = Swal.getTimerLeft()
                    }
                }
            }, 100)
        },
        onClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })
}
function ShowExclui(controle, mensagem) {


    Swal.fire({
        title: 'ATENÇÃO',
        html: mensagem,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirma'
    }).then((result) => {
        if (result.isConfirmed) {
         
            controle.click();

        }
        else { return false; }
    })

}

