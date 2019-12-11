
import { ExternalBaseService } from './ExternalBase.Service';
export class BclassExternalEditService extends ExternalBaseService {

    preUpdateRow(data:any,alldata:any) {
      
        var pkey = data.bclass_no;
      
        this.oldItem = this.data.find(item => item.bclass_no == pkey);
 
    }
     
}