const gDataTableLanguage = {
    "sEmptyTable": "Nenhum registro encontrado",
    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
    "sInfoPostFix": "",
    "sInfoThousands": ".",
    "sLengthMenu": "_MENU_ resultados por página",
    "sLoadingRecords": "Carregando...",
    "sProcessing": "Processando...",
    "sZeroRecords": "Nenhum registro encontrado",
    "sSearch": "Localizar",
    "oPaginate": {
        "sNext": "Próximo",
        "sPrevious": "Anterior",
        "sFirst": "Primeiro",
        "sLast": "Último"
    },
    "oAria": {
        "sSortAscending": ": Ordenar colunas de forma ascendente",
        "sSortDescending": ": Ordenar colunas de forma descendente"
    },
    "select": {
        "rows": {
            "_": "Selecionado %d linhas",
            "0": "Nenhuma linha selecionada",
            "1": "Selecionado 1 linha"
        }
    }
};

window.addEventListener('load', () => {



})

function IsNull(pText) {

    if (pText == '' || pText == null || pText == undefined)
        return true;
    return false;

}

function FormatDateHours(date) {
    var date, day, month, year, hour;

    day = date.getDate().toString().padStart(2, '0');
    month = (date.getMonth() + 1).toString().padStart(2, '0')
    year = date.getFullYear();

    hour = date.getHours().toString().padStart(2, '0');
    min = date.getMinutes().toString().padStart(2, '0');
    secs = date.getSeconds().toString().padStart(2, '0');

    return day + '/' + month + '/' + year + ' ' + hour + ':' + min;
}

function RetornaLogin() {
    var url = window.location.origin + "/Login/Index?id=" + idPrestadora
    window.location.href = url;
}

Element.prototype.CreateOptions = function (value, text) {

    var option = document.createElement('option');

    option.value = value;
    option.innerHTML = text;


    this.appendChild(option);

    return option;
}

Element.prototype.SelectOption = function (value) {

    if (this.value == value)
        this.setAttribute('selected', 'selected');
}

Element.prototype.RemoveAllOptions = function () {


    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }

    this.CreateOptions('', '-- Selecione uma opção --').SelectOption('');

}

function Navega(Controle) {
    var url = window.location.origin + "/" + Controle + "/Index?id=" + idPrestadora
    window.location.href = url;
}

function ExecutaModal(Nome, Abre) {
    var myModal = new bootstrap.Modal(document.getElementById(Nome), {
        keyboard: false
    })
    if (Abre) {

        myModal.show();
    }
    else {

      myModal.show('hide')
    }

}