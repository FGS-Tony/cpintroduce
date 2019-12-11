using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace FgsModel.EntityRespositorys
{
   
        public class EntityBaseRepositor<T> : IEntityBaseRespository<T> where T : class, IEntityBase, new()
        {
            private DbContext _context;
            public EntityBaseRepositor(DbContext context)
            {
                this._context = context;
       
            }

            public virtual void Add(T entity)
            {
                EntityEntry dbEntityEntry = _context.Entry<T>(entity);
                _context.Set<T>().Add(entity);
            }

            public virtual IEnumerable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties)
            {
                IQueryable<T> query = _context.Set<T>();
                foreach (var includeProperty in includeProperties)
                {
                    query = query.Include(includeProperty);
                }
                return query.AsEnumerable();
            }

            public void Commit()
            {
                _context.SaveChanges();
            }

            public int CountWhere(Expression<Func<T, bool>> predicate)
            {

                return _context.Set<T>().Count(predicate);
            }
            public int Count()
            {
                return _context.Set<T>().Count();
            }

            public virtual void Delete(T entity)
            {
                EntityEntry dbEntityEntry = _context.Entry<T>(entity);
                dbEntityEntry.State = EntityState.Deleted;

            }

            public virtual void DeleteWhere(Expression<Func<T, bool>> predicate)
            {
                IEnumerable<T> entities = _context.Set<T>().Where(predicate);

                foreach (var entity in entities)
                {
                    _context.Entry<T>(entity).State = EntityState.Deleted;
                }

            }

            public virtual IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate)
            {
                return _context.Set<T>().Where(predicate);
            }

            public virtual IEnumerable<T> GetAll()
            {
           
                return _context.Set<T>().AsEnumerable();
            }

            public virtual T GetSingle(Expression<Func<T, bool>> predicate)
            {
                return _context.Set<T>().FirstOrDefault(predicate);
            }


            public virtual T GetSingle(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties)
            {
                IQueryable<T> query = _context.Set<T>();
                foreach (var includeProperty in includeProperties)
                {
                    query = query.Include(includeProperty);
                }

                return query.Where(predicate).FirstOrDefault();
            }

            public virtual void Update(T entity)
            {
                EntityEntry dbEntityEntry = _context.Entry<T>(entity);
                dbEntityEntry.State = EntityState.Modified;
            }
        public virtual IEnumerable<T> FindByOrderby<TOrderBy>(Expression<Func<T, bool>> predicate, Expression<Func<T,TOrderBy>> ordercol)
        {
            return _context.Set<T>().Where(predicate).OrderBy(ordercol);
        }

    }
 
}
