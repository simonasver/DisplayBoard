namespace Backend.Services
{
    public class VisitUpdateService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

        public VisitUpdateService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await UpdateVisitsAsync();

                await Task.Delay(TimeSpan.FromSeconds(3), stoppingToken);
            }
        }
        private async Task UpdateVisitsAsync()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var visitService = scope.ServiceProvider.GetRequiredService<IVisitService>();
                await visitService.UpdateVisitsAsync();
            }
        }
    }

}
