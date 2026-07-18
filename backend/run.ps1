$port = 8080
$process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess

if ($process) {
    Write-Host "Killing process on port $port (PID: $process)..."
    Stop-Process -Id $process -Force
    Start-Sleep -Milliseconds 500
}

Write-Host "Starting backend..."
go run main.go
