# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copy the project file and restore dependencies
COPY *.csproj .
RUN dotnet restore

# Copy the rest of the application code
COPY . .
RUN dotnet publish -c Release -o /app --no-restore

# Use the official ASP.NET Core runtime image for the final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app .

# Expose the port the app runs on (default for Web API is 8080 or 8081 for HTTPS)
# Adjust if your app uses a different port
EXPOSE 8080
EXPOSE 8081

# Define the entry point for the container
# Replace 'backend.dll' with the actual name of your project's output DLL if different
ENTRYPOINT ["dotnet", "backend.dll"]
