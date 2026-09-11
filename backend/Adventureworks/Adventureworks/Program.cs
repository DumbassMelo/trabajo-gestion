using Adventureworks.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// --- 1. REGISTRO DE SERVICIOS (Dependency Injection) ---

// Base de datos
builder.Services.AddDbContext<AdventureWorksContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("sql")));

// CONFIGURACIÓN DE CORS
var misReglasCors = "ReglasCorsFrontend";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: misReglasCors,
        policy =>
        {
            policy.AllowAnyOrigin()   // Permite peticiones desde cualquier origen (ideal para desarrollo)
                  .AllowAnyHeader()   // Permite encabezados como 'Content-Type' y 'Authorization'
                  .AllowAnyMethod();  // Permite GET, POST, PUT, DELETE, OPTIONS
        });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Autenticación JWT
var jwtKey = builder.Configuration["Jwt:Key"];
if (string.IsNullOrEmpty(jwtKey))
{
    throw new InvalidOperationException("La clave secreta 'Jwt:Key' no está configurada en appsettings.json");
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"]
        };
    });

var app = builder.Build();

// --- 2. CONFIGURACIÓN DEL PIPELINE HTTP (Middlewares) ---

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ORDEN CRUCIAL: UseCors debe ir ANTES de UseAuthentication y UseAuthorization
app.UseCors(misReglasCors);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
