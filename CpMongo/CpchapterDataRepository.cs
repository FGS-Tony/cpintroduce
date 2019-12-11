using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cpmongo
{
    public class MoCpchapterDataRepository : DataAccess<MoCpchapter>, IMoCpchapterDataRepository
    {
        public MoCpchapterDataRepository(IOptions<MongoDbSettings> dbSettings) : base(dbSettings)
        {

        }
    }

}