import { baseServices } from '../module/base.Services';
export class CpBclassServices extends baseServices {
    private bclasssorturl = "cpbclass/getmaxbclasssort";
    public resetItem(dataItem: any) {

        if (!dataItem) { return; }
        //find orignal data item
        var data1 = this.getData();
        const originalDataItem = data1.find(item => item.cpbclass_no === dataItem.cpbclass_no);

    }

    public GetMaxBclassSort() {
        
        return this.http.get(this.appset.api_url + this.bclasssorturl);
    }
}