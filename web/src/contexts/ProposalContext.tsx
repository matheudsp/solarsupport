import { apiAdmin } from '@/services/apiClient';
import { createContext, FormEvent, ReactNode, useEffect, useState } from 'react';

import { toast } from 'react-toastify'

type ProposalContextData = {
    handleCreateMaintenance:(event: FormEvent) => Promise<void>
   
}

type ProposalProviderProps = {
    children: ReactNode;
}

export const clientTypeList = [
    { id: 1, nome: "CPF" },
    { id: 2, nome: "CNPJ" }
  ]
export const stepList = [
    { nome: "Cliente" },
    { nome: "Equipamento" },
    { nome: "Responsável" },
  ]
  
  type sellerProps = {
    nome: string;
  }

export const ProposalContext = createContext({} as ProposalContextData)

export function ProposalProvider({ children }: ProposalProviderProps) {
    // INPUT STATES
    const [cliente, setCliente] = useState('');
    const [clienteId, setClienteId] = useState('');
    const [clientType, setClientType] = useState(-1)
    const [clienteEmail, setClienteEmail] = useState('');
    const [mediaConsumo, setMediaConsumo] = useState('');
    const [potenciaProjeto, setPotenciaProjeto] = useState('');
    const [responsavel, setResponsavel] = useState(-1);
    const [precoTotal, setPrecoTotal] = useState('');
    // PAGE STATES
    
    const [SellerList, SetSellerList] = useState<sellerProps []>([])
    const [BlobDOC, setBlobDOC] = useState(null)
    const [BlobPDF, setBlobPDF] = useState(null)
    const [loading, setLoading] = useState(false)
    const [proposalSelected, setProposalSelected] = useState(-1);
    const [proposalCreated, setProposalCreated] = useState(false)
    

    const blobpdf = new Blob([BlobPDF], { type: 'application/pdf' });
    const blobdoc = new Blob([BlobDOC], { type: 'application/msword' });
    const pdfurl = URL.createObjectURL(blobpdf)
    const docxurl = URL.createObjectURL(blobdoc)

    useEffect(() => {

        async function GetSellers(){
            try{
                await apiAdmin.get('/admin/usuarios/nome').then(response => {
                    SetSellerList(response.data);
                    
                  }).catch((err) => {
                    //em caso de erro, realiza o logout do usuario
                    console.log(err)
                  })
            }catch(err){
                console.log(err)
            }
        }
        GetSellers()
    }, [SellerList])

    function ChangeLoading(state:boolean){
        setLoading(state)
    }

    async function handleDownloadPDF() {
        setLoading(true);
        try {
            const response = await apiAdmin.get('/admin/gerar-proposta/converter', { responseType: 'blob' });
            if (response.status === 200) {
                const blobPDF = new Blob([response.data], { type: 'application/pdf' });
                const urlPDF = URL.createObjectURL(blobPDF);
                window.open(urlPDF, "Proposta");

            }
        } catch (err) {
            console.log(err);
            toast.error('Erro ao gerar arquivo PDF. Contate o gerente do projeto!');
        }
        setLoading(false);
    }

    function formatCnpjCpf(value) {
        const inputValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

        if (inputValue.length <= 11) {
            // Formata CPF
            const formattedCPF = inputValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            setClienteId(formattedCPF);
        } else {
            // Formata CNPJ
            const formattedCNPJ = inputValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
            setClienteId(formattedCNPJ);
        }

    }
    const handleChangeCurrency = (event) => {
        const inputValue = event.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

        const formattedMoney = formatCurrency(inputValue);
        setPrecoTotal(formattedMoney);
    };

    const formatCurrency = (value) => {
        const options = {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        };

        const formatter = new Intl.NumberFormat('pt-BR', options);
        const formattedValue = formatter.format(value / 100); // Divide por 100 para considerar os centavos

        return formattedValue;
    };

    function handleNewProposal() {
        setCliente('');
        setClienteEmail('');
        setClienteId('');
        setMediaConsumo('');
        setPotenciaProjeto('');
        setPrecoTotal(''),
            setResponsavel(-1);
        setProposalCreated(false)
        ResetBlob()
    }

    async function handleCreateMaintenance(event: FormEvent) {
        ResetBlob()
        event.preventDefault();
        setBlobPDF(null)
        setBlobDOC(null)

        setLoading(true)


        if (cliente === '' || responsavel === -1 || precoTotal === '') {

            toast.error("Os campos com * devem ser respondidos.");

            setLoading(false)
            return;
        }

        let vendedor = SellerList[responsavel].nome

        let data = {
            cliente,
            clienteId,
            clienteEmail,
            mediaConsumo,
            potenciaProjeto,
            vendedor,
            precoTotal
        }




        try {
            const response = await apiAdmin.post('/admin/gerar-proposta/manutencao', data, { responseType: 'blob' })
            // console.log(response)
            if (response.status === 200) {
                setBlobDOC(response.data)

            }
            toast.success("Proposta gerada.")

        } catch (err) {
            console.log(err)
            toast.error('Erro ao gerar proposta. Contate o gerente do projeto!')
            setLoading(false)
            return
        }

        setProposalCreated(true)
        setLoading(false)
    }


    function handleDonwloadDOCX() {

        const link = document.createElement('a');
        link.href = docxurl;
        link.setAttribute('download', `proposta-${cliente.replace(/\s/g, '')}.docx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function ResetBlob() {
        URL.revokeObjectURL(null);
        URL.revokeObjectURL(null);
    }



    function handleChangeProposal(event) {

        const selectedIndex = event.target.value;

        if (selectedIndex === "-1") {
            // Opção "Selecione uma proposta" selecionada
            setProposalSelected(-1);

        } else {
            setProposalSelected(event.target.value)

        }

    }

    function handleChangeSeller(event) {

        const selectedIndex = event.target.value;

        if (selectedIndex === "-1") {
            // Opção "Selecione um vendedor" selecionada
            setResponsavel(-1);

        } else {
            setResponsavel(event.target.value)

        }

    }

    function handleChangeClientType(event) {

        const selectedIndex = event.target.value;

        if (selectedIndex === "-1") {
            // Opção "Selecione um vendedor" selecionada
            setResponsavel(-1);

        } else {
            setClientType(event.target.value)

        }

    }




    return (
        <ProposalContext.Provider value={{
            
            handleCreateMaintenance,
           
        }}>
            {children}
        </ProposalContext.Provider>
    )
}