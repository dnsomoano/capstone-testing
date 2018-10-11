using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using capstone_testing.Models;
using Microsoft.AspNetCore.Authorization;

namespace capstone_testing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        // private string _getUserId(System.Security.Claims.ClaimsPrincipal user)
        // {
        //     var userId = user.Claims.First(f => f.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
        //     return userId;
        // }
        public DailyMap2Context db { get; set; }

        public EventsController()
        {
            this.db = new DailyMap2Context();
        }

        // GET api/events
        [HttpGet]
        public IOrderedQueryable<Events> Get(int id)
        {
            // var _userId = _getUserId(User);
            var events = this.db.Events.OrderByDescending(o => o.DateCreated);
            return events;

        }//END

        [HttpPost]
        public Events Post([FromBody] Events evt)
        {
            // var _userId = _getUserId(User);
            // evt.UserId = _userId;
            this.db.Events.Add(evt);
            this.db.SaveChanges();
            return evt;
        }//END 

        // // GET api/events/{id}
        // [HttpGet("{id}")]
        // public ActionResult<Events> Get(int id)
        // {
        //     // returns first value that matches id
        //     return this.db.Events.FirstOrDefault(f => f.Id == id);
        // }

        // TODO fix input for name and location, plus time start and end.
        // POST api/events
        //     [HttpPost]
        //     public Events Post([FromBody] EventsModel data)
        //     {
        //         var event = new Events
        //             {
        //                 EventName = data.name,
        //                 EventAddress = data.address
        // };
        //             this.db.Events.Add(event);
        //             this.db.SaveChanges();
        //             return event;
        // }

        // TODO fix patch request for profile
        // TODO possibly add a patch request for email, username, and address
        // PATCH api/events/{id}
        // [HttpPatch("{id}")]
        // public Events Patch(int id, [FromBody] string value)
        // {
        //     var editedValue = this.db.Events.Where(f => f.EmailAddress.Contains(value) || f.UserName.Contains(value) || f.Address.Contains(value));
        //     this.db.SaveChanges(editedValue);
        //     return editedValue;
        // }

        // DELETE api/events/{id}
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var evt = this.db.Events.FirstOrDefault(f => f.Id == id);
            this.db.Events.Remove(evt);
            this.db.SaveChanges();
            return Ok(new { success = true });
        }
    }
}
