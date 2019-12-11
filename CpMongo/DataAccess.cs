using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Linq;
using Microsoft.Extensions.Options;

namespace Cpmongo
{

  public  class DataAccess<T>:IDataBaseAccess<T> where T:class,new()
    {
        MongoClient _client = null;
        MongoDB.Driver.IMongoDatabase _db;
        private string connectstr;
        private string dbname;

        public DataAccess(IOptions<MongoDbSettings> dbSettings)
        {
            _client = new MongoClient(dbSettings.Value.ConnectionString);
            _db = _client.GetDatabase(dbSettings.Value.Database);
        }

        public DataAccess(string connectstr, string dbname)
        {
            this.connectstr = connectstr;
            this.dbname = dbname;
        }

        public  IMongoDatabase  getDb()
        {
            return _db;
        }
        public IMongoCollection<T> getCollection(string collectionName)
        {
            return _db.GetCollection<T>(collectionName);
        }
        public  IEnumerable<T> FindBy(string collectionName,Expression<Func<T, bool>> predicate)
        {
             return _db.GetCollection<T>(collectionName).AsQueryable().Where(predicate);
            
        }
        public void Add(string collectionName, T entity)
        {
            _db.GetCollection<T>(collectionName).InsertOne(entity);
        }

        public IEnumerable<T> GetAll(string collectionName)
        {
            return _db.GetCollection<T>(collectionName).AsQueryable();
        }

        public int Count(string collectionName)
        {
            return _db.GetCollection<T>(collectionName).AsQueryable().Count();
        }

        public int CountWhere(string collectionName,Expression<Func<T, bool>> predicate)
        {
            return _db.GetCollection<T>(collectionName).AsQueryable().Where(predicate).Count();
        }

        public T GetSingle(string collectionName,Expression<Func<T, bool>> predicate)
        {
            return _db.GetCollection<T>(collectionName).AsQueryable().Where(predicate).FirstOrDefault();
        }

 
        public void Update(string collectionName, T entity, Expression<Func<T, bool>> predicate)
        {
            _db.GetCollection<T>(collectionName).ReplaceOne(predicate, entity, new UpdateOptions { IsUpsert = true });
        }


        public void Delete(string collectionName, Expression<Func<T, bool>> predicate)
        {
            _db.GetCollection<T>(collectionName).DeleteOne(predicate);
        }

        public int maxId(string collectionName, Expression<Func<T,int>> predicate)
        {
            int maxId = 1;
            if (_db.GetCollection<T>(collectionName).AsQueryable().Count() > 0)
            {
                maxId = _db.GetCollection<T>(collectionName).AsQueryable().Max(predicate) + 1;
            }
            return maxId;
        }

    }
}
