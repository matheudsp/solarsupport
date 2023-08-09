import { Request, Response } from 'express'
import fs from 'fs';
import path from 'node:path';
import { OUTPUT_DOCX } from '../../services/admin/GenerateMaintenanceProposalService';

import { GenerateMaintenanceProposalService } from '../../services/admin/GenerateMaintenanceProposalService';

class GenerateMaintenanceProposalController {

  async handle(req: Request, res: Response) {
    const inputDocx = path.resolve(process.cwd(), OUTPUT_DOCX);

    if (fs.existsSync(inputDocx)) {
      fs.unlink(inputDocx, (e) => {
        if (e) {
          // console.error('Error deleting file:', err);
          return res.json(e);
        }

      });
    }

    const {
      cliente,
      clienteId,
      clienteEmail,
      mediaConsumo,
      potenciaProjeto,
      vendedor,
      precoTotal
    } = req.body;

    const generateProposal = new GenerateMaintenanceProposalService();

    const proposalInfo = await generateProposal.execute({
      cliente,
      clienteId,
      clienteEmail,
      mediaConsumo,
      potenciaProjeto,
      vendedor,
      precoTotal
    });

    return res.download(proposalInfo);


  }
}


export { GenerateMaintenanceProposalController }

