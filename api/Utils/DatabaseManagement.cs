using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Utils
{
    public static class DatabaseManagement
    {
        public static void MigrationInitialisation(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                serviceScope.ServiceProvider.GetService<AppDbContext>().Database.Migrate();
            }
        }
    }
}
