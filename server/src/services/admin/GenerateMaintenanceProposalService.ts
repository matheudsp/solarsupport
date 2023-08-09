
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

const INPUT = 'template/template-manutencao.docx';
export const OUTPUT_DOCX = 'cache/proposta-manutencao.docx';


class GenerateMaintenanceProposalService {

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
        cliente: cliente,
        clienteId: clienteId,
        email: clienteEmail,
        mediaConsumo: mediaConsumo,
        potenciaProjeto: potenciaProjeto,
        data: `${dia}/${mes}/${ano}`,
        vendedor: vendedor,
        precoTotal: precoTotal,

      });
      
      await t.saveAs(outputDocx);
    } catch (e) {
      return e;
    }


    return (OUTPUT_DOCX);
  }
}


export { GenerateMaintenanceProposalService }

