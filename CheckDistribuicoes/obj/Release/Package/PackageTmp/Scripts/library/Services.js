function GET(url, data = {}, customHeader = {}) {
    if (Object.keys(customHeader).indexOf('dataType') == -1) customHeader.dataType = 'json';
    if (Object.keys(customHeader).indexOf('contentType') == -1) customHeader.contentType = 'application/json; charset=utf-8';

    return DoRequest('GET', url, data, customHeader);
}

function POST(url, data = {}, customHeader = {}) { return DoRequest('POST', url, data, customHeader); }

function PUT(url, data = {}, customHeader = {}) { return DoRequest('PUT', url, data, customHeader); }

function DELETE(url, data = {}, customHeader = {}) { return DoRequest('DELETE', url, data, customHeader); }

function DoRequest(type, url, data, customHeader) {

    var response;

    if (url == null || url == '' || url == undefined) return false;

    $.ajax(
        constructHeader(type, url, data, customHeader)
    ).done((json) => {
        response = json;
    }).fail((error) => {
        debugger;
        console.log(error.responseText);
        ShowTempo(10500, "Falha no painel,verifique registro de erro no log");
        gravaerro(url, error.responseText);
    });

    return response;
}

function constructHeader(type, url, data, customHeader) {

    var objectReturn = {
        type: type,
        //url: env + url,
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

function gravaerro(url, mensagem) {
    DoRequest('POST', 'Painel/Log', { Mensagem: mensagem, Processo: url }, {});
}