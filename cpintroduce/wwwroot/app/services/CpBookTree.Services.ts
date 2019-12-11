import { baseServices } from '../module/base.Services';
 
export class CpBookTreeServices extends baseServices {

    private bclassurl = "cpbclass/getcpbclass";
    private booksorturl = "cpbook/getmaxbooksort";
    public resetItem(dataItem: any) {

        if (!dataItem) { return; }
        //find orignal data item
        var data1 = this.getData();
        const originalDataItem = data1.find(item => item.cpook_no === dataItem.cpbook_no);

    }
    public GetBclassData(querystr: string = "ALL") {
        return this.http.get(this.appset.api_url + this.bclassurl + "/" + querystr);
        //.map(response => reponse.json());

    }
    public doQueryByParam(queryparam: number) {
     
        this.doQuery(queryparam.toString());

    }
    public GetMaxBookSort() {
        return this.http.get(this.appset.api_url + this.booksorturl);
    }
   
}