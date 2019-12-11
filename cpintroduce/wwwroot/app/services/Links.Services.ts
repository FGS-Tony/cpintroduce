import { baseServices } from '../module/base.Services';
export class LinksServices extends baseServices {
   
    public resetItem(dataItem: any) {

        if (!dataItem) { return; }
        //find orignal data item
        var data1 = this.getData();
        const originalDataItem = data1.find(item => item.links_no === dataItem.links_no);

    }
 
}