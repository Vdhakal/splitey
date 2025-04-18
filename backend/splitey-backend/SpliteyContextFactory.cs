using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using splitey_backend.Context;

public class SpliteyContextFactory : IDesignTimeDbContextFactory<SpliteyContext>
{
    public SpliteyContext CreateDbContext(string[] args)
    {
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory()) // 👈 Exactly this!
            .AddJsonFile("appsettings.json")
            .Build();

        Console.WriteLine("Current Directory: " + Directory.GetCurrentDirectory());
        var builder = new DbContextOptionsBuilder<SpliteyContext>();
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        builder.UseNpgsql(connectionString,
            opt => opt.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null));

        return new SpliteyContext(builder.Options);
    }
}
