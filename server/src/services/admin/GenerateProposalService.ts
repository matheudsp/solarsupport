
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

const INPUT = 'src/template/template.docx';
export const OUTPUT_DOCX = 'cache/proposta.docx';
export const OUTPUT_PDF = 'cache/proposta.pdf';

class GenerateProposalService {

  async execute({ cliente, clienteId, clienteEmail, mediaConsumo, potenciaProjeto, vendedor, precoTotal }: docData) {


    try {
      const t = new YumTemplate();
      const i = path.resolve(process.cwd(), INPUT);
      const outputDocx = path.resolve(process.cwd(), OUTPUT_DOCX);
      // const oPdf = path.resolve(process.cwd(), OUTPUT_PDF);
      await t.load(i);
      // await t.render(req.body);

      const dataAtual = new Date();

      const dia = dataAtual.getDate();
      const mes = dataAtual.getMonth() + 1;
      const ano = dataAtual.getFullYear();
      // await t.render({
      //   cliente: 'Fulano de Tal',
      //   clienteId: '068.438.293-59',
      //   email: "cliente@gmail.com",
      //   mediaConsumo: "9999",
      //   potenciaProjeto: "9999",
      //   data: `${dia}/${mes}/${ano}`,
      //   vendedor: 'Clicano de Sousa',
      //   precoTotal: '1.200,50',

      // });

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

      const convertapi = new ConvertAPI('iLRaEC899dUflho3', { conversionTimeout: 60 });

      await convertapi.convert('pdf', { File: 'cache/proposta.docx' })
        .then(function (result) {
          
          // console.log("Converted file url: " + result.file.url);
          
          return result.file.save('cache/proposta.pdf');
        })
        // .then(function (file) {
        //   // console.log("File saved: " + file);
        // })
        .catch(function (e) {
          return(e.toString());
        });
    } catch (e) {
      return e;
    }


    return OUTPUT_PDF;
  }
}


export { GenerateProposalService }

