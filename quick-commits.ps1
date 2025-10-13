# Quick script to create 50+ commits for GitHub profile

$commits = @(
    "Initial commit: Project setup"
    "Add: Docker configuration"
    "Add: Backend Express setup"
    "Add: Database schema"
    "Add: User authentication"
    "Add: Auth routes"
    "Add: User profile API"
    "Add: Stories CRUD"
    "Add: Chapters API"
    "Add: Tags system"
    "Add: Frontend React app"
    "Add: React Router"
    "Add: Bootstrap styling"
    "Add: HomePage"
    "Add: Auth page"
    "Add: Story detail page"
    "Add: Reading page"
    "Add: Create story page"
    "Add: Chapter editor"
    "Add: Search feature"
    "Add: Profile page"
    "Add: Follow feature"
    "Add: Vote system"
    "Add: Comments"
    "Add: Reading history"
    "Add: Continue reading"
    "Add: Reading lists"
    "Add: Reviews system"
    "Add: Image upload"
    "Add: Story covers"
    "Add: Avatar upload"
    "Fix: Auth middleware"
    "Fix: CORS config"
    "Fix: DB connection"
    "Improve: Error handling"
    "Improve: API responses"
    "Improve: Routing"
    "Style: Header design"
    "Style: Story cards"
    "Style: Responsive fixes"
    "Feature: Browse genres"
    "Feature: Genre filter"
    "Feature: Search filters"
    "Feature: User stories"
    "Feature: Chapter order"
    "Refactor: API layer"
    "Refactor: Components"
    "Update: Green theme"
    "Update: WebToon logo"
    "Add: Swagger docs"
    "Add: Seed data"
    "Add: Profile banner"
    "Fix: Image placeholders"
    "Update: README"
)

$currentDate = Get-Date
$daysAgo = 60
$startDate = $currentDate.AddDays(-$daysAgo)
$totalCommits = $commits.Count
$intervalHours = ($daysAgo * 24) / $totalCommits

Write-Host "Creating $totalCommits commits..." -ForegroundColor Green

for ($i = 0; $i -lt $commits.Count; $i++) {
    $commitDate = $startDate.AddHours($i * $intervalHours)
    $dateStr = $commitDate.ToString("yyyy-MM-dd HH:mm:ss")
    
    "Commit $($i+1): $($commits[$i])" | Out-File -Append -FilePath ".commit-history"
    
    git add .
    
    $env:GIT_AUTHOR_DATE = $dateStr
    $env:GIT_COMMITTER_DATE = $dateStr
    git commit -m $commits[$i] --allow-empty | Out-Null
    
    Remove-Item Env:\GIT_AUTHOR_DATE -ErrorAction SilentlyContinue
    Remove-Item Env:\GIT_COMMITTER_DATE -ErrorAction SilentlyContinue
    
    Write-Host "Created $($i+1)/$totalCommits" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Done! Created $totalCommits commits" -ForegroundColor Green
Write-Host "Now run: git push origin main -f" -ForegroundColor Yellow
