import { basePopupEditServices} from '../module/basePopupEdit.Services';

export class CpChapterTreeServices extends basePopupEditServices {

    private bclassurl = "cpchapter/getcpchapter";
    maxsorturl: string = "cpchapter/getmaxcpchaptersort";
    public resetItem(dataItem: any) {

        if (!dataItem) { return; }
        //find orignal data item
        var data1 = this.getData();
        const originalDataItem = data1.find(item => item.cpchapter_no === dataItem.cpchapter_no);

    }
    public GetBclassData(querystr: string = "ALL") {
        return this.http.get(this.appset.api_url + this.bclassurl + "/" + querystr);
        //.map(response => reponse.json());

    }
    public doQueryByBookParam(queryparam: number) {     
        this.doQuery(queryparam.toString());

    }
    public GetMaxCpchapterSort() {
        return this.http.get(this.appset.api_url + this.maxsorturl);
    }

}