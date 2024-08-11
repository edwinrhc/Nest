import axios from 'axios';

export interface HttpAdapter {
    get<T>(url: string):Promise<T>;
}

export class PokeApiFetchAdapter implements HttpAdapter {
   async get<T>(url:string): Promise<T>{
        const resp = await fetch(url);
        const data: T = await resp.json();
        console.log('fetch', data);
        return data;
    }
}

export class PokeApiAdapter implements  HttpAdapter{
    // private readonly axios = axios;
     readonly axios = axios;

   async get<T>(url: string): Promise<T> {

        // petición get
       const { data } = await axios.get<T>(url);
       console.log('Con axios',data)
        return data;
    }
/*
    async post( url: string, data: any){

    }

    async patch(url: string, data: any){

    }

    async  delete(url: string){

    }*/
}
