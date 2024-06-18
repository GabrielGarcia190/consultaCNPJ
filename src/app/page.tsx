export default function Home() {
  return (
    <div className="bg-[#E5E7EB] w-screen h-screen flex flex-col items-center justify-center text-[#21262D]">
    <div className="flex items-end justify-end">
      <h1 className="font-semibold text-7xl ml-5 ">
        Consulta CNPJ
      </h1>
    </div>
    <p className="mt-4 text-sm">
      Não armazenamos nenhum tipo de dado, só realizamos consultas.
    </p>

    <input
      id="CNPJ"
      type="text"
      className="bg-[#CECFD2] p-2 text-center text-[#21262D] mt-10 rounded-md w-[25vw]"
      placeholder="Digite um CNPJ"
    />
    <p className="text-[#AAA4A4]  mt-2 text-sm">Ex: 00.000.000/0000-00</p>

    <button
      className="  px-4 py-2 mt-3 uppercase text-white font-bold rounded-xl bg-[#003772]  hover:bg-[#21262D] hover:border-4 hover:border-[#003772]"
      type="submit"
    >
      CONSULTAR
    </button>
    {/* <div>
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
        className="flex flex-col rounded-lg  bg-[#E5E7EB] w-[35vw] h-full shadow-xl"
      >
        <div className="bg-[#E5E7EB] text-sm  text-[#AAA4A4] mx-auto flex flex-col mt-4 items-center">
          <div className="flex flex-col items-center justify-center">
            <button onClick={closeModal}>
              <X size={30} className="text-red-600 ml-[30vw]" weight="bold" />
            </button>
            <h1 className="font-bold text-[#303740] text-xl">
              - Resultado da Busca -
            </h1>
          </div>

          <div className="flex flex-col mt-5 text-start w-[30vw]">
            <p className="text-[#303740]">Razao Social:</p>
            <p className="bg-[#CECFD2] p-2 w-full  text-[#303740] flex flex-row items-center justify-between rounded-lg">
              {resAPI.razao_social}
              <button onClick={() => copyToClipboard(resAPI.razao_social)}>
                <Copy weight="bold" size={25} />
              </button>
            </p>
          </div>
          <div className="flex flex-col mt-5 text-start w-[30vw]">
            <p className="text-[#303740]">Nome Fantasia:</p>
            <p className="bg-[#CECFD2] p-2 w-full  text-[#303740] flex flex-row items-center justify-between rounded-lg">
              {resAPI.estabelecimento.nome_fantasia == null
                ? "******"
                : resAPI.estabelecimento.nome_fantasia}
              <button
                onClick={() =>
                  copyToClipboard(resAPI.estabelecimento.nome_fantasia)
                }
              >
                <Copy weight="bold" size={25} />
              </button>
            </p>
          </div>
          <div className="flex flex-col mt-5 text-start w-[30vw]">
            <div className="flex">
              <p className="w-[24vw] text-[#303740]"> Logradouro:</p>
              <p className=" text-[#303740]"> Número:</p>
            </div>
            <div className="flex flex-row">
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
                  onClick={() =>
                    copyToClipboard(resAPI.estabelecimento.numero)
                  }
                >
                  <Copy weight="bold" size={25} />
                </button>
              </p>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col mt-5 text-start w-[30vw]">
              <div className="flex">
                <p className="w-[15vw] text-[#303740]"> Bairro:</p>
                <p className=" ml-4 text-[#303740]"> Complemento:</p>
              </div>
              <div className="flex flex-row">
                <p className="bg-[#CECFD2] p-2 w-[15vw]  text-[#303740] flex flex-row items-center justify-between rounded-lg">
                  {resAPI.estabelecimento.bairro}
                  <button
                    onClick={() =>
                      copyToClipboard(resAPI.estabelecimento.bairro)
                    }
                  >
                    <Copy weight="bold" size={25} />
                  </button>
                </p>
                <p className="bg-[#CECFD2] p-2 w-[15vw] ml-4 text-[#303740] flex flex-row items-center justify-between rounded-lg">
                  {resAPI.estabelecimento.complemento == null
                    ? "****"
                    : resAPI.estabelecimento.complemento}
                  <button
                    onClick={() =>
                      copyToClipboard(resAPI.estabelecimento.complemento)
                    }
                  >
                    <Copy weight="bold" size={25} />
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5 text-start w-[30vw]">
            <div className="flex">
              <p className="w-[10vw] text-[#303740]"> Cidade:</p>
              <p className=" ml-4 w-[10vw] text-[#303740]"> Estado:</p>
              <p className=" ml text-[#303740]"> CEP:</p>
            </div>
            <div className="flex flex-row">
              <p className="bg-[#CECFD2] p-2 w-[10vw]  text-[#303740] flex flex-row items-center justify-between rounded-lg">
                {resAPI.estabelecimento.cidade.nome}
                <button
                  onClick={() =>
                    copyToClipboard(resAPI.estabelecimento.cidade.nome)
                  }
                >
                  <Copy weight="bold" size={25} />
                </button>
              </p>
              <p className="bg-[#CECFD2] p-2 w-[10vw] ml-4 text-[#303740] flex flex-row items-center justify-between rounded-lg">
                {resAPI.estabelecimento.estado.sigla}
                <button
                  onClick={() =>
                    copyToClipboard(resAPI.estabelecimento.estado.sigla)
                  }
                >
                  <Copy weight="bold" size={25} />
                </button>
              </p>
              <p className="bg-[#CECFD2] p-2 w-[10vw] ml-4 text-[#303740] flex flex-row items-center justify-between rounded-lg">
                {resAPI.estabelecimento.cep}
                <button
                  onClick={() => copyToClipboard(resAPI.estabelecimento.cep)}
                >
                  <Copy weight="bold" size={25} />
                </button>
              </p>
            </div>
          </div>
          <div className="flex flex-col mt text-start w-[30vw]">
          <div className="flex mt-5 ">
              <p className="w-[15vw] text-[#303740]"> País:</p>
              <p className="text-[#303740] ml-2"> Situação Cadastral:</p>
            </div>
            <div className="flex flex-row ">
              <p className="bg-[#CECFD2] p-2 w-[15vw]  text-[#303740] flex flex-row items-center justify-between rounded-lg">
                {resAPI.estabelecimento.pais.nome}
                <button
                  onClick={() =>
                    copyToClipboard(resAPI.estabelecimento.pais.nome)
                  }
                >
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
        </div>
      </Modal>
    </div> */}
  </div>
  );
}
