
function formatar(src, mask, e) {
    var tecla = ""
    if (document.all) // Internet Explorer
        tecla = event.keyCode;
    else
        tecla = e.which;
    //code = evente.keyCode;
    if (tecla != 8) {


        if (src.value.length == src.maxlength) {
            return;
        }
        var i = src.value.length;
        var saida = mask.substring(0, 1);
        var texto = mask.substring(i);
        if (texto.substring(0, 1) != saida) {
            src.value += texto.substring(0, 1);
        }
    }
}
var mask = {
    money: function () {
        var el = this
            , exec = function (v) {
                v = v.replace(/\D/g, "");
                v = new String(Number(v));
                var len = v.length;
                if (1 == len)
                    v = v.replace(/(\d)/, "0.0$1");
                else if (2 == len)
                    v = v.replace(/(\d)/, "0.$1");
                else if (len > 2) {
                    v = v.replace(/(\d{2})$/, '.$1');
                }
                return v;
            };

        setTimeout(function () {
            el.value = exec(el.value);
        }, 1);
    }

}
//***************************************************
//* FUNÇÃO QUE PERMITE SOMENTE LETRAS  *
//***************************************************
function SomenteLetras() {
    if (!(event.keyCode < 48 || event.keyCode > 57)) {
        return false;
    }
    else {
        return true;
    }
}

//***************************************************
//* FUNÇÃO QUE PERMITE SOMENTE LETRAS E NUMEROS *
//***************************************************
function SomenteLetraseNumeros(controle) {
    if (!(event.keyCode >= 63 && event.keyCode <= 93) && !(event.keyCode >= 97 && event.keyCode <= 122) && !(event.keyCode >= 32 && event.keyCode <= 59) && !(event.keyCode == 231) && !(event.keyCode >= 192)) {
        if (event.keyCode == 13) {
            controle.focus();
        }
        else {
            return false;
        }
    }
}
//***************************************************
//* FUNÇÃO PARA LIBERAR SOMENTE NUMEROS *
//***************************************************
function SomenteNumero(e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
    }
    else {
        return true;
    }
}
//*****************************************************
//* FUNÇÃO DE VALIDAÇÃO DE DATAS *
//*****************************************************
function ValidaData(data) {
    reg = /[^\d\/\.]/gi;                  // Mascara = dd/mm/aaaa | dd.mm.aaaa
    var valida = data.replace(reg, '');    // aplica mascara e valida só numeros
    if (valida && valida.length == 10) {  // é válida, então ;)
        var ano = data.substr(6),
            mes = data.substr(3, 2),
            dia = data.substr(0, 2),
            M30 = ['04', '06', '09', '11'],
            v_mes = /(0[1-9])|(1[0-2])/.test(mes),
            v_ano = /(19[1-9]\d)|(20\d\d)|2100/.test(ano),
            rexpr = new RegExp(mes),
            fev29 = ano % 4 ? 28 : 29;

        if (v_mes && v_ano) {
            if (mes == '02') return (dia >= 1 && dia <= fev29);
            else if (rexpr.test(M30)) return /((0[1-9])|([1-2]\d)|30)/.test(dia);
            else return /((0[1-9])|([1-2]\d)|3[0-1])/.test(dia);
        }
    }
    return false                           // se inválida :(dd
}

//***************************************************************
// FUÇÃO PARA FORMATAR DATAS
//***************************************************************
function formattedDate(d = new Date) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${day}/${month}/${year}`;
}

//===================================================
// PEGA DO SISTEMA
//===================================================
function DataHoje() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    return today;
}



function constructHeader(type, url, data, customHeader) {

    var objectReturn = {
        type: type,
        url: url,
        data: data,
        async: false
    };

    if (Object.keys(customHeader).length) {

        const keyNames = Object.keys(customHeader);

        keyNames.forEach((element) => {
            objectReturn[element] = customHeader[element];
        });

    }

    return objectReturn;
}

