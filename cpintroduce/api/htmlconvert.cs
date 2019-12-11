using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace cpintroduce.api
{
    public class htmlconvert: IDisposable
    {
        bool disposed = false;
        //置換html 至純文字
        public string ReplaceHtmlTag(string Html)
        {
            Html = Regex.Replace(Html, "<[^>]*>", "");
            return Html;
        }


        //置換html 保留image 與 p
        public string replaceHtml(string str)
        {
            if (str != "" && str != null)
            {
                //删除内含的 
                Regex CutStyle = new Regex(@"<style([^>])*>(\w|\W)*?</style([^>])*>", RegexOptions.IgnoreCase);
                String TempStr = CutStyle.Replace(str, "");

                //測試
                //TempStr = TempStr.Replace("</p", "@q</p");
                //TempStr = TempStr.Replace("<p", "@p<p");

                //<([^>]+)> 不過濾 img
                TempStr = TempStr.Replace("</p>", "[/p]");
                TempStr = TempStr.Replace("</P>", "[/p]");
                TempStr = TempStr.Replace("<p>", "<p>");
                TempStr = TempStr.Replace("<P>", "[p]");
               



                Regex BrHtml = new Regex("<br(.*?)>", RegexOptions.IgnoreCase);
                TempStr = BrHtml.Replace(TempStr, "[br/]");
                //Regex SpanHtml1 = new Regex("<span", RegexOptions.IgnoreCase);
                //TempStr = SpanHtml1.Replace(TempStr, "[span");
                //Regex SpanHtml2 = new Regex("</span>", RegexOptions.IgnoreCase);
                //TempStr = SpanHtml2.Replace(TempStr, "[/span]");
                Regex ImgHtml = new Regex("<img", RegexOptions.IgnoreCase);
                TempStr = ImgHtml.Replace(TempStr, "[img");
                Regex ImgHtml_A = new Regex("<a", RegexOptions.IgnoreCase);
                TempStr = ImgHtml_A.Replace(TempStr, "[a");
                Regex ImgHtml_A_1 = new Regex("</a>", RegexOptions.IgnoreCase);
                TempStr = ImgHtml_A_1.Replace(TempStr, "[/a]");                           
                Regex CutHtml = new Regex("<([^>]+)>", RegexOptions.IgnoreCase);
                TempStr = CutHtml.Replace(TempStr, "");
                //TempStr = TempStr.Replace ("/>" , ">");
                //Regex ImgHtml=new Regex("<img",RegexOptions.IgnoreCase);

                //TempStr = HttpUtility.HtmlEncode(TempStr);
                //rt.replace(/<\/?(?!img)[^>]*>/g, '');
                //TempStr = TempStr.Replace ("/>" , ">");
                //Regex ImgHtml=new Regex("<img",RegexOptions.IgnoreCase);

                //TempStr = HttpUtility.HtmlEncode(TempStr);

                //測試
                //TempStr = TempStr.Replace("@q", "</p>");
                //TempStr = TempStr.Replace("@p", "<p>");
                //TempStr = TempStr.Replace("\n", "");

                //粗體
                TempStr = TempStr.Replace("@B", "<b>");
                TempStr = TempStr.Replace("@E", "</b>");
                //行靠右
                TempStr = TempStr.Replace("@R", "<p align='right'>");
                TempStr = TempStr.Replace("@L", "</p>");
                TempStr = TempStr.Replace("[img", "<img");
                TempStr = TempStr.Replace("[a", "<a");
                TempStr = TempStr.Replace("[/a]", "</a>");
                

                //TempStr = TempStr.Replace("[span", "<span");
                TempStr = TempStr.Replace("[p]", "");
                TempStr = TempStr.Replace("[/p]", "<br/>");

                TempStr = TempStr.Replace("[br/]", "<br/>");
                //TempStr = TempStr.Replace("[/span]", "</span>");
                TempStr = TempStr.Replace("<br/><br/><br/>", "<br/>");
                TempStr = TempStr.Replace("<br/>", "<br/><br/>");
                TempStr = TempStr.Replace("<br/><br/><br/><br/>", " <br/><br/>");
                return TempStr;

            }
            else
            {
                return "";
            }
        }

        // Public implementation of Dispose pattern callable by consumers.
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        // Protected implementation of Dispose pattern.
        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                // Free any other managed objects here.
                //
            }

            // Free any unmanaged objects here.
            //
            disposed = true;
        }

        ~htmlconvert()
        {
            Dispose(false);
        }

    }
}
