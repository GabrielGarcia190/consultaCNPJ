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
                    document.getElementById("campoSit").value = dado.situacao;
                    document.getElementById("campoCEP").value = dado.cep;
                    document.getElementById("campoCap").value = dado.capital_social;
                }
                console.log(dado);
            }

        })
    }
}

function limpar() {
    document.getElementById("campoRazaoSocial").value = " ";
    document.getElementById("campoRazaoSocial").value = " ";
    document.getElementById("campoNomeFantasia").value = "";
    document.getElementById("campoLogradouro").value = "";
    document.getElementById("campoNumero").value = "";
    document.getElementById("campoMunicipio").value = "";
    document.getElementById("campoUF").value = "";
    document.getElementById("campoAbertura").value = "";
    document.getElementById("campoBairro").value = "";
    document.getElementById("campoSit").value = "";
    document.getElementById("campoCEP").value = "";
    document.getElementById("campoCap").value = "";
    document.getElementById("CNPJ").value = "";
}