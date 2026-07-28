using Microsoft.EntityFrameworkCore;

namespace HairDesk.Infrastructure.Persistence;

public class HairDeskDbContext : DbContext
{
    public HairDeskDbContext(DbContextOptions<HairDeskDbContext> options)
        : base(options)
    {
    }
}
