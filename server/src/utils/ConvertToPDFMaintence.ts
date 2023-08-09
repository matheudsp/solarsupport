


import ConvertAPI from 'convertapi';
import fs from 'fs';
import path from 'node:path';
import { Request, Response } from 'express'
const OUTPUT_PDF = 'cache/proposta-manutencao.pdf';

class ConvertToPdfService {
  
  async execute() {
    

    try {
     
      const convertapi = new ConvertAPI('iLRaEC899dUflho3', { conversionTimeout: 60 });

      await convertapi.convert('pdf', { File: 'cache/proposta-manutencao.docx' }).then(function (result) {
          
          // console.log("Converted file url: " + result.file.url);
          
          return result.file.save('cache/proposta-manutencao.pdf');
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


    return (OUTPUT_PDF);
  }

}

export class ConvertToPdfMaintenceController {
  
  async handle(req: Request, res: Response) {

    if (fs.existsSync(OUTPUT_PDF)) {
      fs.unlink(OUTPUT_PDF, (e) => {
        if (e) {
          // console.error('Error deleting file:', err);
          return res.json(e);
        }

      });
    }
  
    const convertToPDF = new ConvertToPdfService();

    const FilePdf = await convertToPDF.execute();

    return res.download(FilePdf);


  }
}




