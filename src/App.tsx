import "./styles/modal.css";
import Modal from "react-modal";
import receitaIcon from "./assets/Logo_Receita_Federal_do_Brasil.svg";
import { useState } from "react";
import copy from "copy-to-clipboard";
import { Copy, Warning, X } from "phosphor-react";

Modal.setAppElement("#root");
interface CNPJProps {
  razao_social: string;
  estabelecimento: {
    nome_fantasia: string;
    situacao_cadastral: string;
  };
  situacao_cadastral: string;
  tipo_logradouro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  estado: {
    nome: string;
    sigla: string;
  };
  cidade: {
    cidade: string;
  };
}

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [copySucess, setcopySucess] = useState(false);

  const [resAPI, setresAPI] = useState({
    razao_social: "",
    estabelecimento: {
      nome_fantasia: "",
      situacao_cadastral: "",
      logradouro: "",
      tipo_logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cep: "",
      tipo: "",
      estado: {
        sigla: "",
      },
      cidade: {
        nome: "",
      },
      inscricoes_estaduais: [
        {
          inscricao_estadual: "",
        }
      ]
    },
    
  });

  const [apiCNPJ, useCNPJ] = useState({
    CNPJ: "",
    CNPJ_Limpo: "",
  });

  function handleCNPJChange(event: React.ChangeEvent<HTMLInputElement>) {
    const formattedCNPJ = event.target.value
      .replace(/\D+/g, "") // não deixa ser digitado nenhuma letra
      .replace(/(\d{2})(\d)/, "$1.$2") // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2") // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1"); // captura os dois últimos 2 números, com um - antes dos dois números

    useCNPJ({
      CNPJ: formattedCNPJ,
      CNPJ_Limpo: formattedCNPJ.replace(/\D+/g, ""),
    });
  }

  async function getCNPJ() {
    await fetch(`https://publica.cnpj.ws/cnpj/${apiCNPJ.CNPJ_Limpo}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 400) {
          setIsOpen(false);
          setModalError(true);
        } else {
          setIsOpen(true);
          setModalError(false);
          setresAPI(data);
          useCNPJ({
            CNPJ: "",
            CNPJ_Limpo: "",
          });
        }
      });
  }

  function copyToClipboard(Text: string) {
    copy(Text);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeModalError() {
    setModalError(false);
  }

  return (
    <div className="bg-[#E5E7EB] w-screen h-screen flex flex-col items-center justify-center">
      <div className="flex items-end justify-end">
        <h1 className="text-[#21262D] font-semibold text-7xl ml-5 ">
          Consulta CNPJ
        </h1>
        <img src={receitaIcon} className="w-[9vw] ml-4 mb-2 " />
      </div>
      <p className="mt-4">
        Não armazenamos nenhum tipo de dado, só realizamos consultas.
      </p>

      <input
        id="CNPJ"
        type="text"
        value={apiCNPJ.CNPJ}
        onChange={handleCNPJChange}
        className="bg-[#CECFD2] p-2 text-center text-[#21262D] mt-10 rounded-md w-[25vw]"
        placeholder="Digite um CNPJ"
      />
      <p className="text-[#AAA4A4]  mt-2 text-sm">Ex: 00.000.000/0000-00</p>

      <button
        className="  px-4 py-2 mt-3 uppercase text-white font-bold rounded-xl bg-[#003772]  hover:bg-[#21262D] hover:border-4 hover:border-[#003772]"
        data-modal-toggle="modal-resultado"
        type="submit"
        onClick={getCNPJ}
      >
        CONSULTAR
      </button>
      <div>
        <Modal
          isOpen={modalError}
          overlayClassName="modal-overlay"
          contentLabel="modal-resultado"
          className="flex flex-col rounded-lg  bg-[#E5E7EB] w-[30vw] h-[30vh] shadow-md"
        >
          <button onClick={closeModalError}>
            <X
              size={30}
              className="text-red-600 ml-[27vw] mt-2"
              weight="bold"
            />
          </button>
          <div className="bg-[#E5E7EB]  mx-auto flex h-[30vh] flex-col  items-center">
            <Warning size={50} color="red" />
            <h1 className="ml-4 text-black font-bold text-xl ">
              - Erro ao consultar -
            </h1>
            <p className="ml-4 mt-4">Por favor insira um CEP válido !!!</p>
          </div>
        </Modal>

        <Modal
          isOpen={modalIsOpen}
          overlayClassName="modal-overlay"
          contentLabel="modal-resultado"
          className="flex flex-col rounded-lg  bg-[#E5E7EB] w-[35vw] h-[73vh] shadow-xl"
        >
          <div className="bg-[#E5E7EB] text-[#AAA4A4] mx-auto flex flex-col mt-4 items-center">
            <div className="flex flex-col items-center justify-center">
              <button onClick={closeModal}>
                <X size={30} className="text-red-600 ml-[30vw]" weight="bold" />
              </button>
              <h1 className="font-bold text-[#303740] text-xl">
                - Resultado da Busca -
              </h1>
            </div>
            <div className="flex flex-row mt-5 text-center w-[30vw]">
              <p className="bg-[#CECFD2] p-2 w-full  text-[#303740] flex flex-row items-center justify-between rounded-lg">
                {resAPI.razao_social}
                <button onClick={() => copyToClipboard(resAPI.razao_social)}>
                  <Copy weight="bold" size={25} />
                </button>
              </p>
            </div>
            <div className="flex flex-row mt-5 text-center w-[30vw]">
              <p className="bg-[#CECFD2] p-2 w-full  text-[#303740] flex flex-row items-center justify-between rounded-lg">
                {resAPI.estabelecimento.nome_fantasia == null ? "******" : resAPI.estabelecimento.nome_fantasia}
                <button
                  onClick={() =>
                    copyToClipboard(resAPI.estabelecimento.nome_fantasia)
                  }
                >
                  <Copy weight="bold" size={25} />
                </button>
              </p>
            </div>
            <div className="flex flex-row mt-5 text-center w-[30vw]">
              <p className="bg-[#CECFD2] p-2 w-[24vw]  text-[#303740] flex flex-row items-center justify-between rounded-lg">
                {`${resAPI.estabelecimento.tipo_logradouro} ${resAPI.estabelecimento.logradouro}`}
                <button
                  onClick={() =>
                    copyToClipboard(resAPI.estabelecimento.logradouro)
                  }
                >
                  <Copy weight="bold" size={25} />
                </button>
              </p>
              <p className="bg-[#CECFD2] p-2 w-[8vw] ml-4 text-[#303740] flex flex-row items-center justify-between rounded-lg">
                {resAPI.estabelecimento.numero}
                <button
                  onClick={() => copyToClipboard(resAPI.estabelecimento.numero)}
                >
                  <Copy weight="bold" size={25} />
                </button>
              </p>
            </div>
            <div className="flex flex-row mt-5 text-center w-[30vw]">
              <p className="bg-[#CECFD2] p-2 w-[15vw]  text-[#303740] flex flex-row items-center justify-between rounded-lg">
                {resAPI.estabelecimento.bairro}
                <button
                  onClick={() => copyToClipboard(resAPI.estabelecimento.bairro)}
                >
                  <Copy weight="bold" size={25} />
                </button>
              </p>
              <p className="bg-[#CECFD2] p-2 w-[15vw] ml-4 text-[#303740] flex flex-row items-center justify-between rounded-lg">
                {resAPI.estabelecimento.complemento == null ? "****" : resAPI.estabelecimento.complemento}
                <button
                  onClick={() =>
                    copyToClipboard(resAPI.estabelecimento.complemento)
                  }
                >
                  <Copy weight="bold" size={25} />
                </button>
              </p>
            </div>
            <div className="flex flex-row mt-5 text-center w-[30vw]">
              <p className="bg-[#CECFD2] p-2 w-[10vw]  text-[#303740] flex flex-row items-center justify-between rounded-lg">
                {resAPI.estabelecimento.cidade.nome}
                <button onClick={() => copyToClipboard(resAPI.estabelecimento.cidade.nome)}>
                  <Copy weight="bold" size={25} />
                </button>
              </p>
              <p className="bg-[#CECFD2] p-2 w-[10vw] ml-4 text-[#303740] flex flex-row items-center justify-between rounded-lg">
                {resAPI.estabelecimento.estado.sigla}
                <button onClick={() => copyToClipboard(resAPI.estabelecimento.estado.sigla)}>
                  <Copy weight="bold" size={25} />
                </button>
              </p>
              <p className="bg-[#CECFD2] p-2 w-[10vw] ml-4 text-[#303740] flex flex-row items-center justify-between rounded-lg">
                {resAPI.estabelecimento.cep}
                <button onClick={() => copyToClipboard(resAPI.estabelecimento.cep)}>
                  <Copy weight="bold" size={25} />
                </button>
              </p>
            </div>
            <div className="flex flex-row mt-5 text-center w-[30vw]">
              <p className="bg-[#CECFD2] p-2 w-[15vw]  text-[#303740] flex flex-row items-center justify-between rounded-lg">
                {resAPI.estabelecimento.inscricoes_estaduais[0].inscricao_estadual}
                <button onClick={() => copyToClipboard("Nada Consta")}>
                  <Copy weight="bold" size={25} />
                </button>
              </p>
              <p className="bg-[#CECFD2] p-2 w-[15vw] ml-4 text-[#303740] flex flex-row items-center justify-between rounded-lg">
                {resAPI.estabelecimento.situacao_cadastral}
                <button
                  onClick={() =>
                    copyToClipboard(resAPI.estabelecimento.situacao_cadastral)
                  }
                >
                  <Copy weight="bold" size={25} />
                </button>
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;
