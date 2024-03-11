using Microsoft.AspNetCore.Mvc;

namespace server.Utils
{
    public  class IResponse
    {
        public required string Message { get; set; }
        public required int Status { get; set; }
        public required dynamic Data { get; set; }
    }
    public class Response
    {
        public IActionResult SuccessResponse(string message, dynamic data)
        {
            return new OkObjectResult(new IResponse
            {
                Message = message,
                Data = data,
                Status = 200
            });
        }

        public IActionResult NotFoundResponse(string message)
        {
            return new NotFoundObjectResult(new IResponse
            {
                Message = message,
                Data = "",
                Status = 404
            });
        }

        public IActionResult BadRequestResponse(string message)
        {
            return new BadRequestObjectResult(new IResponse
            {
                Message = message,
                Data = "",
                Status = 500
            });
        }
    }
}
