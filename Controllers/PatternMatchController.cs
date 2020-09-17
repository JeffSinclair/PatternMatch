using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AEMO.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PatternMatchController : ControllerBase
    {
        private readonly ILogger<PatternMatchController> _logger;

        public PatternMatchController(ILogger<PatternMatchController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IEnumerable<int> Get([FromBody] MatchData matchData )
        {
            Regex regex = new Regex(Regex.Escape(matchData.subtext), RegexOptions.IgnoreCase);

            var Matches = regex.Matches(matchData.text);

            IList<int> result = new List<int>();
            foreach(Match m in Matches)
            {
                result.Add(m.Index);
            }
            return result;
        }
    }
}
