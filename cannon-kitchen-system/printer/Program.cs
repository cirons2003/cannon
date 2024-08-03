using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using StarMicronics.StarIO;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

builder.Services.AddSingleton<PrintHandler>();

builder.WebHost.UseUrls("https://localhost:5001");

var app = builder.Build();

app.UseHttpsRedirection();

app.MapPost("/printOrders", (PrintHandler printHandler) =>
{
    try
    {
        printHandler.printOrders();
        return Results.Ok("Successfully completed print jobs");
    }
    catch (PortException)
    {
        return Results.Ok("port exception");
    }
    catch (Exception e)
    {
        return Results.Ok("other error");
    }
})
.WithOpenApi();

app.Run();

public record Order(int orderId, string orderName);

record PrintRequest(List<Order> orderList);