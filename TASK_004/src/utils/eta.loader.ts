import {Eta} from "eta";
import path from "node:path";

export default class EtaLoader{

    private static etaLoader:EtaLoader|null=null;

    eta:Eta|null;

    private constructor(){
        this.eta=new Eta({
            views:path.join(import.meta.dirname,"../views"),
        })
    }

    static getEtaLoader():EtaLoader{
        if(EtaLoader.etaLoader) return EtaLoader.etaLoader;

        EtaLoader.etaLoader=new EtaLoader();

        return EtaLoader.etaLoader;
    }   
}