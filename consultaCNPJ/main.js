function checkCNPJ(cnpj) {
    console.log(cnpj);


    if (cnpj == "") {
        alert("DIGITE ALGUM CNPJ !!!")
    } else {
        $.ajax({
            'url': 'https://receitaws.com.br/v1/cnpj/' + cnpj.replace(/[^0-9]/g, ''),
            'type': "GET",
            'dataType': 'jsonp',
            'success': function (dado) {
                if (dado.nome == undefined) {
                    alert(dado.status + ' ' + dado.message);
                } else {
                    document.getElementById("campoRazaoSocial").value = dado.nome;
                    document.getElementById("campoNomeFantasia").value = dado.fantasia;
                    document.getElementById("campoLogradouro").value = dado.logradouro;
                    document.getElementById("campoNumero").value = dado.numero;
                    document.getElementById("campoMunicipio").value = dado.municipio;
                    document.getElementById("campoUF").value = dado.uf;
                    document.getElementById("campoAbertura").value = dado.abertura;
                    document.getElementById("campoBairro").value = dado.bairro;
                }
                console.log(dado);
            }

        })
    }
}