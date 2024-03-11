using Microsoft.EntityFrameworkCore;
using server.Constants;
using server.Models;

namespace server.Data
{
    public class DBContext : DbContext
    {
        private readonly IHttpContextAccessor contextAccessor;
        public DBContext(DbContextOptions<DBContext> options, IHttpContextAccessor _contextAccessor) : base(options)
        {
            contextAccessor = _contextAccessor;
        }

        public DbSet<User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {



            //* ===================== START: Relation =====================

   
            //* ===================== END: Relation =====================

            //* ===================== START: DATA =====================

            //? User
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Gmail = "eljosema505@gmail.com", Password = "123456" }
            );


            //* ===================== START: Get just states actives =====================
        
            //* ===================== END: Get just states actives =====================

        }



        //* ===================== START: MIddelware =====================   
        private void UpdateSoftDeleteStatuses()
        {
            foreach (var entry in ChangeTracker.Entries()
                .Where(c => c.State == EntityState.Deleted || c.State == EntityState.Added || c.State == EntityState.Modified)
            )
            {
                if (entry.State == EntityState.Deleted)
                {
                    entry.State = EntityState.Modified;
                    entry.CurrentValues["Estado"] = States.DELETED;
                }
                if (entry.State == EntityState.Added)
                {
                    var token = ObtenerIdUsuarioDesdeToken();
                    if (token != null)
                    {
                        entry.CurrentValues["IdUsrCreacion"] = token;
                    }
                }
                if (entry.State == EntityState.Modified)
                {
                    var token = ObtenerIdUsuarioDesdeToken();
                    if (token != null)
                    {
                        entry.CurrentValues["IdUsrModificacion"] = token;
                    }
                }
                var date = DateTime.UtcNow;
                if (entry.State == EntityState.Added)
                {
                    entry.CurrentValues["FechaCreacion"] = date;
                    entry.CurrentValues["FechaModificacion"] = date;
                }
                if (entry.State == EntityState.Modified)
                {
                    entry.CurrentValues["FechaModificacion"] = date;
                }
            }
        }

        private int? ObtenerIdUsuarioDesdeToken()
        {
            var tokenId = contextAccessor?.HttpContext?.User.FindFirst("Id")?.Value;
            if (tokenId == null) return null;
            int id = int.Parse(tokenId);
            return id;
        }

        public override int SaveChanges()
        {
            UpdateSoftDeleteStatuses();
            return base.SaveChanges();
        }
        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            UpdateSoftDeleteStatuses();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }
    }

    //* ===================== end: MIddelware =====================   
}

