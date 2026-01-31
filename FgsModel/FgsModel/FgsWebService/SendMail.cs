using System;
using System.Collections.Generic;
using System.Text;

using System.Threading.Tasks;
//using EipService;

namespace FgsModel.FgsWebService
{
  public class SendMail
    {

       public async Task<string> sendMailToAsync(string ls_to,string ls_to_name, string ls_f_name, string ls_subject,string ls_body)
        {
            //EipService.WS_FGS_VLTSoapClient sendMailService = new WS_FGS_VLTSoapClient(WS_FGS_VLTSoapClient.EndpointConfiguration.WS_FGS_VLTSoap);
            //return await sendMailService.Send_Mail_3Async(ls_to, ls_to_name, ls_f_name, ls_subject, ls_body);
            return "success";
        }
      
        

    }
}
