import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies, destroyCookie } from 'nookies'
import { AuthTokenError } from '../services/errors/AuthTokenError'


//funcao para paginas que só users logados podem ter acesso.
export function canSSRAdmin<P>(fn: GetServerSideProps<P>){
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);    
    
    const token = cookies['@nextauth.tokenAdmin'];
    

    if(!token){
      return{
        redirect:{
          destination: '/admin',
          permanent: false,
        }
      }
    }

    try{
      
      return await fn(ctx);
      
    }catch(err){
      if(err instanceof AuthTokenError){
        destroyCookie(ctx, '@nextauth.tokenAdmin');

        return{
          redirect:{
            destination: '/admin',
            permanent: false
          }
        }

      }
    }


  }

}