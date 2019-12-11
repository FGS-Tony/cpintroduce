using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Cpmongo
{
    public interface IDataBaseAccess<T> where T : class, new()
    {
        IMongoDatabase getDb();
        IMongoCollection<T> getCollection(string collectionname);
        IEnumerable<T> GetAll( string collectionName);
        int Count(string collectionName);
        int CountWhere(string collectionName,Expression<Func<T, bool>> predicate);
        T GetSingle(string collectionName, Expression<Func<T, bool>> predicate );
        IEnumerable<T> FindBy(string collectionName, Expression<Func<T, bool>> predicate );
        void Add(string collectionName, T entity);
        void Update(string collectionName, T entity,Expression<Func<T, bool>> predicate);
        void Delete(string collectionName, Expression<Func<T, bool>> predicate);
        int maxId(string colectionName, Expression<Func<T, int>> predicate);
         
    }
}
