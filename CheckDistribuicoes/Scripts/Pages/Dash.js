window.addEventListener("load", function () {
    LeServidores();
});




function LeAmbientes(event, value) {

    var resp = POST("Dash/GetAmbiente", {Dominio:value})

    MontaTabela(resp)
    document.getElementById("NomeServ").innerHTML = "LISTA AMBIENTE SERVIDOR : " + resp[0].Servidor

}

function LeServidores(){

    var text = "";
    
    resp = POST('dash/GetServidores', {})
    if (resp.length > 0) {
        text += "<option value='0'> -- Selecione Um Servidor-- </option>";
        for (ii = 0; ii < resp.length; ii++) {
            text += "<option value='" + resp[ii].Dominio + "'>" + resp[ii].Servidor + "</option >";
        }
        $("#CmbServidores").html(text);
    }
}

function MontaTabela(carga) {
    var acao1;
    var acao2;
    var acao3;
    $('#grdHistorico').dataTable({
        data: carga,
        columns: [

            {
                data: (function (data) {
                    return "<div class='text-center'>" + data.Ambiente + "</div>";
                })
            },
            {
                data: (function (data) {
                    return "<div class='text-center'>" + data.Diretorio + "</div>";
                })
            },
            {
                data: (function (data) {
                    return "<div class='text-center'>" + data.url + "</div>";
                })
            },
            {
                data: (function (data) {
                    return "<div class='text-center'>" + data.versao + "</div>";
                })
            },
            {
                data: (function (data) {
                    return "<div class='text-center'>" + data.Atualizacao + "</div>";
                })
            },
            {
                data: (function (data) {
                    return "<div class='text-center'>" + data.Inclusao + "</div>";
                })
            },

            {
                orderable: false,
                data: (function (data) {
                    acao1 = "<div class='text-center'>";
                    acao2 = "<a href='#' style='margin-left:10px' data-toggle='tooltip' title='HISTÓRICO AMBIENTE'  onclick =Detalhe('" + data.Ambiente + "')><span aria-hidden='true' class='fa fa-eye fa-2x text-primary'></span></a>";
                    return acao1 + acao2 + " </div>";
                })
            }

        ],

        paging: true,
        info: true,
        responsive: true,
        destroy: true,
        colReorder: {
            allowReorder: true
        },

        language: gDataTableLanguage

    });
}
function Detalhe(ambiente) {
    var carga = POST("Dash/GetDeploys", { Dominio: document.querySelector("#CmbServidores").value, NomeAmbiente: ambiente })

    // monta os cards
    var appendHere = document.querySelector('#DetAmb');

    while (appendHere.firstChild) {
        appendHere.removeChild(appendHere.firstChild);
    }

    for (var i = 0; i < carga.length; i++) {
        var divCol = document.createElement('div');
        divCol.classList.add('col-md-12');

        var divCard = document.createElement('div');
        divCard.classList.add('card', 'bg-info');

        var divHeader = document.createElement('div');
        divHeader.classList.add('card-header', 'bg-info','text-bold');



        var divFooter = document.createElement('div');
        divFooter.classList.add('card-footer');
        if (carga[i].status == 'DEPLOYED')
            divFooter.style.backgroundColor = "green";
        else
            divFooter.style.backgroundColor = "red";

        var lblTitulo = document.createElement('label');
        lblTitulo.innerHTML = 'DEPLOY NUMERO ' + carga[i].number;
        divHeader.appendChild(lblTitulo);

        var divBody = document.createElement('div');
        divBody.classList.add('card-body', 'text-primary');
       

        var lblStatus = document.createElement('label');
        lblStatus.innerHTML = carga[i].status;
        lblStatus.style.fontWeight = "bold";
        lblStatus.style.color = "white";
        lblStatus.classList.add('text-center');
        divFooter.appendChild(lblStatus);
        var dirRow1 = document.createElement('div');
        dirRow1.classList.add('row');
        var dirRow2 = document.createElement('div');
        dirRow1.classList.add('row');
        var lblVersao = document.createElement('label');
        lblVersao.innerHTML = " Versão : " + carga[i].version + "</br>";
        var lblnexus = document.createElement('label');
        lblnexus.innerHTML = "URL : " + carga[i].nexus_url + "</br>";

        var lbldir = document.createElement('label');
        lbldir.innerHTML = "DIR : " + carga[i].dir + "</br>";

        var lblDte = document.createElement('label');
        var lblDtaAtua = document.createElement('label');

        if (carga[i].date == null) {
            lblDte.innerHTML = "Data : " + carga[i].init_date + "</br>";
            lblDtaAtua.innerHTML = "Atualização : " + carga[i].last_change_date + "</br>";
        }
        else {
            lblDte.innerHTML = "Data : " + carga[i].date + "</br>";
            lblDtaAtua.innerHTML = "  ;                    "
        }
        dirRow1.appendChild(lblDte)
        dirRow2.appendChild(lblDtaAtua)
        var lblLinha = document.createElement('label');
        lblLinha.innerHTML = "                                                "
        divBody.appendChild(lblVersao);
        divBody.appendChild(lblnexus);
        divBody.appendChild(lbldir);
        divBody.appendChild(dirRow1);
        if (carga[i].date == null)
            divBody.appendChild(dirRow2);
        divCard.appendChild(divHeader);
        divCard.appendChild(divBody);
        divCard.appendChild(divFooter);

        divCol.appendChild(divCard);


        appendHere.appendChild(divCol)






    }

    $("#ModalDetalhe").modal('show');
}

function GetAtualizacao() {
    if ((document.querySelector('#CmbServidores').value == 0) || (document.querySelector('#CmbServidores').value == null)) {
          ShowOk("Selecione um serivdor!", "ATENÇÃO", "ERROR");
        return;
    }
    var carga = POST("Dash/GetAtualizacoesBanco", { Dominio: document.querySelector("#CmbServidores").value });
    MontaAtualizacaoBanco(carga);
    $("#ModalBanco").modal('show');
}

function MontaAtualizacaoBanco(carga) {
        
    $('#grdAtualizacao').dataTable({
        data: carga,
        columns: [

            {
                data: (function (data) {
                    return "<div class='text-center'>" + data.Banco + "</div>";
                })
            },
            {
                data: (function (data) {
                    return "<div class='text-center'>" + data.Data + "</div>";
                })
            }

        ],
        location: false,
        searching: false, 
        paging: false,
        info: false,
        responsive: true,
        destroy: true,
        colReorder: {
            allowReorder: true
        },

        language: gDataTableLanguage

    });
}

function NavegaGrafena() {
    var resp = POST("Dash/GetEndGrafana", {})
    if (resp == '') {
        ShowOk("Falha ao pegar o endereço do grafana!", "ATENÇÃO", "ERRO");
        return;
    }

    window.open(resp, '_blank').focus();
   // window.location.href = resp;

}