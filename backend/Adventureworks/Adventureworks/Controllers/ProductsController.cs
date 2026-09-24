using Adventureworks.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TuProyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AdventureWorksContext _context;

        public ProductsController(AdventureWorksContext context)
        {
            _context = context;
        }

        // GET: api/products
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products
                .Include(p => p.ProductCategory)
                .Select(p => new
                {
                    p.ProductId,
                    p.Name,
                    p.ProductNumber,
                    p.Color,
                    p.ListPrice,
                    CategoryName = p.ProductCategory != null ? p.ProductCategory.Name : "Sin categoría",
                    // NUEVO: Convertimos los bytes a string Base64 para el catálogo
                    ThumbnailPhoto = p.ThumbNailPhoto != null ? Convert.ToBase64String(p.ThumbNailPhoto) : null
                })
                .Take(50)
                .ToListAsync();

            return Ok(products);
        }

        // GET: api/products/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            // 1. Buscamos el producto base, su categoría y su imagen
            var productBase = await _context.Products
                .Include(p => p.ProductCategory)
                .Where(p => p.ProductId == id)
                .Select(p => new
                {
                    p.ProductId,
                    p.Name,
                    p.ProductNumber,
                    p.Color,
                    p.ListPrice,
                    p.Size,
                    p.Weight,
                    CategoryName = p.ProductCategory != null ? p.ProductCategory.Name : "Sin categoría",
                    // NUEVO: Extraemos y convertimos la imagen
                    ThumbnailPhoto = p.ThumbNailPhoto != null ? Convert.ToBase64String(p.ThumbNailPhoto) : null
                })
                .FirstOrDefaultAsync();

            if (productBase == null) return NotFound("Producto no encontrado.");

            // 2. Usamos tu modelo de vista VProductAndDescription para sacar la descripción (cultura inglés 'en')
            var viewData = await _context.VProductAndDescriptions
                .Where(v => v.ProductId == id && v.Culture == "en")
                .FirstOrDefaultAsync();

            // 3. Unimos todo en la respuesta final
            var result = new
            {
                productBase.ProductId,
                productBase.Name,
                productBase.ProductNumber,
                productBase.Color,
                productBase.ListPrice,
                productBase.Size,
                productBase.Weight,
                productBase.CategoryName,
                ModelName = viewData != null ? viewData.ProductModel : "Sin modelo",
                Description = viewData != null ? viewData.Description : "Sin descripción disponible",
                // NUEVO: Añadimos la imagen al objeto final que se envía a React
                productBase.ThumbnailPhoto
            };

            return Ok(result);
        }
    }
}