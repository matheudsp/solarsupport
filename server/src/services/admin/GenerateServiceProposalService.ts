
import { YumTemplate } from '@yumdocs/yumdocs';
import path from 'node:path';

import ConvertAPI from 'convertapi';

interface docData {
  cliente: string
  clienteId: string
  clienteEmail: string
  mediaConsumo: string
  potenciaProjeto: string
  vendedor: string
  precoTotal: string
}

const INPUT = 'template/template-servico.docx';
export const OUTPUT_DOCX = 'cache/proposta-servico.docx';
export const OUTPUT_PDF = 'cache/proposta-servico.pdf';

class GenerateServiceProposalService {

  async execute({ cliente, clienteId, clienteEmail, mediaConsumo, potenciaProjeto, vendedor, precoTotal }: docData) {


    try {
      const t = new YumTemplate();
      const i = path.resolve(process.cwd(), INPUT);
      const outputDocx = path.resolve(process.cwd(), OUTPUT_DOCX);
      
      await t.load(i);
      

      const dataAtual = new Date();

      const dia = dataAtual.getDate();
      const mes = dataAtual.getMonth() + 1;
      const ano = dataAtual.getFullYear();
      await t.render({
        contratante: 'Fulano de Tal',
        tipoId:'CPF',
        id:'068.438.293-59',
        rua: "Rua Joao Dantas",
        numeroCasa:"1438",
        bairro: "Irapuá I",
        cep: "64800-380",
        cidade:"Floriano",
        estado:"PI",
        potencia:"12.21",
        equipamento1:"22 módulos RENOSOLA BIFACIAL 555W",
        equipamento2:"1 inversor SAJ",
        geracao:"1.600",
        dia: `${dia}`,
        mes:`${mes}`,
        ano:`${ano}`,
        precoTotal: '40.000,00',
        precoEntrada:'20.000,00',
        dataPrecoEntrada:'23/06/2023',
        precoConclusao:'20.000,00'

      });
      
      await t.saveAs(outputDocx);
    } catch (e) {
      return e;
    }

    
    return OUTPUT_DOCX;
  }
}


export { GenerateServiceProposalService }

