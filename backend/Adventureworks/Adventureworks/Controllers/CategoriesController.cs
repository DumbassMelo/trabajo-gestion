using Adventureworks.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TuProyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly AdventureWorksContext _context;

        public CategoriesController(AdventureWorksContext context)
        {
            _context = context;
        }

        // GET: api/categories
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.ProductCategories
                // Traemos solo categorías principales para simplificar el menú
                .Where(c => c.ParentProductCategoryId == null)
                .Select(c => new
                {
                    c.ProductCategoryId,
                    c.Name
                })
                .ToListAsync();

            return Ok(categories);
        }
    }
}