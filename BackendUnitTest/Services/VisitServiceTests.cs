using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Backend.Data.Entities.Auth;
using Backend.Data.Entities.Visit;
using Backend.Data.Repositories;
using Backend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Moq;

namespace BackendUnitTest.Services
{
    public class VisitServiceTests
    {
        private Mock<IConfiguration> _configuration;
        private Mock<UserManager<ApplicationUser>> _userManager;
        private Mock<IVisitRepository> _visitRepository;

        private IVisitService _visitService;

        private List<Visit> _visits;

        private ApplicationUser _user;

        private Guid _fakeGuid;

        [SetUp]
        public void Setup()
        {
            _configuration = new Mock<IConfiguration>();
            _userManager = new Mock<UserManager<ApplicationUser>>(Mock.Of<IUserStore<ApplicationUser>>(), null, null, null, null, null, null, null, null);
            _visitRepository = new Mock<IVisitRepository>();
            _visitService = new VisitService(_configuration.Object, _userManager.Object, _visitRepository.Object);

            _fakeGuid = new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");

            _visits = new List<Visit>();
            _visits.Add(new Visit() { Id = _fakeGuid, Code = 1, DurationInMinutes = 5, StartDate = DateTime.Now, Owner = null, OwnerId = null});
            _visits.Add(new Visit() { Id = new Guid(), Code = 2, DurationInMinutes = 5, StartDate = DateTime.Now, Owner = null, OwnerId = null });
            _visits.Add(new Visit() { Id = new Guid(), Code = 3, DurationInMinutes = 5, StartDate = DateTime.Now, Owner = null, OwnerId = null });
            _visits.Add(new Visit() { Id = new Guid(), Code = 4, DurationInMinutes = 5, StartDate = DateTime.Now, Owner = null, OwnerId = _fakeGuid.ToString() });
            _visits.Add(new Visit() { Id = new Guid(), Code = 5, DurationInMinutes = 5, StartDate = DateTime.Now, Owner = null, OwnerId = null });
            _visits.Add(new Visit() { Id = new Guid(), Code = 6, DurationInMinutes = 5, StartDate = DateTime.Now, Owner = null, OwnerId = null });
            _visits.Add(new Visit() { Id = new Guid(), Code = 7, DurationInMinutes = 5, StartDate = DateTime.Now, Owner = null, OwnerId = null });

            _user = new ApplicationUser();
        }

        [Test]
        public async Task GetLast7Async_ReturnsAll()
        {
            _configuration.Setup(x => x["DisplayBoard:Password"]).Returns("Test");
            _visitRepository.Setup(x => x.GetLast7Async()).ReturnsAsync(_visits);

            var result = await _visitService.GetLast7Async("Test");

            Assert.AreEqual(7, result.Data.Count());
        }

        [Test]
        public async Task GetSpecialistVisitsAsync_ReturnsSpecialistVisits()
        {
            _visitRepository.Setup(x => x.GetAllOfSpecialistAsync(_fakeGuid)).ReturnsAsync(new List<Visit>(){ _visits[3] });

            var result = await _visitService.GetSpecialistVisitsAsync(_fakeGuid);

            Assert.AreEqual(4, result.Data.FirstOrDefault().Code);
        }

        [Test]
        public async Task GetVisitAsync_ReturnsVisit()
        {
            _visitRepository.Setup(x => x.GetAsync(_fakeGuid)).ReturnsAsync(_visits[0]);

            var result = await _visitService.GetVisitAsync(_fakeGuid);

            Assert.AreEqual(1, result.Data.Code);
        }

        [Test]
        public async Task GetVisitByCodeAsync_ReturnsVisit()
        {
            _visitRepository.Setup(x => x.GetByCodeAsync(1)).ReturnsAsync(_visits[0]);

            var result = await _visitService.GetVisitByCodeAsync(1);

            Assert.AreEqual(1, result.Data.Code);
        }

        [Test]
        public async Task CreateAsync_ReturnsCreatedId()
        {
            _userManager.Setup(x => x.FindByIdAsync(_user.Id)).ReturnsAsync(_user);
            _visitRepository.Setup(x => x.CreateAsync(It.IsAny<Visit>())).ReturnsAsync(new Visit() { Id = _fakeGuid });

            var result = await _visitService.CreateAsync(new Guid(_user.Id));

            Assert.AreEqual(_fakeGuid, result.Data);
        }
    }
}
