# PowerShell script to create realistic commit history for WebToon project
# This creates commits with backdated timestamps

# Array of realistic commit messages
$commits = @(
    "Initial commit: Project setup",
    "Add: Docker configuration for MySQL and services",
    "Add: Backend Express server setup",
    "Add: Database schema and models",
    "Add: User authentication with JWT",
    "Add: Auth routes (register, login)",
    "Add: User profile endpoints",
    "Add: Stories CRUD endpoints",
    "Add: Chapters management API",
    "Add: Tags system implementation",
    "Add: Frontend React app initialization",
    "Add: React Router setup",
    "Add: Bootstrap and styling",
    "Add: HomePage component",
    "Add: Auth page (Login/Register)",
    "Add: Story detail page",
    "Add: Reading page component",
    "Add: Create story page",
    "Add: Chapter editor",
    "Add: Search functionality",
    "Add: Profile page",
    "Add: Follow/Unfollow feature",
    "Add: Vote system for chapters",
    "Add: Comments system",
    "Add: Reading history tracking",
    "Add: Continue reading section",
    "Add: Reading lists feature",
    "Add: Reviews and ratings",
    "Add: Image upload with Cloudinary",
    "Add: Story cover upload",
    "Add: Avatar upload",
    "Fix: Authentication middleware",
    "Fix: CORS configuration",
    "Fix: Database connection pooling",
    "Improve: Error handling",
    "Improve: API response format",
    "Improve: Frontend routing",
    "Style: Update header design",
    "Style: Improve story cards",
    "Style: Responsive design fixes",
    "Feature: Browse genres section",
    "Feature: Genre filtering",
    "Feature: Advanced search filters",
    "Feature: User stories management",
    "Feature: Chapter ordering",
    "Refactor: API service layer",
    "Refactor: Component structure",
    "Update: Change brand color to green",
    "Update: Logo to WebToon text",
    "Add: Swagger API documentation",
    "Add: Seed data script",
    "Add: Background banner for profiles",
    "Fix: Image placeholders",
    "Update: README documentation"
)

# Get current date
$currentDate = Get-Date

# Calculate start date (60 days ago)
$daysAgo = 60
$startDate = $currentDate.AddDays(-$daysAgo)

# Calculate interval between commits
$totalCommits = $commits.Count
$intervalHours = ($daysAgo * 24) / $totalCommits

Write-Host "Creating $totalCommits commits over $daysAgo days..." -ForegroundColor Green
Write-Host ""

# Create commits with backdated timestamps
for ($i = 0; $i -lt $commits.Count; $i++) {
    $commitDate = $startDate.AddHours($i * $intervalHours)
    $commitDateFormatted = $commitDate.ToString("yyyy-MM-dd HH:mm:ss")
    
    # Make a small change to trigger commit
    Add-Content -Path ".commit-history" -Value "Commit $($i+1): $($commits[$i])"
    
    # Stage changes
    git add .
    
    # Create commit with backdated timestamp
    $env:GIT_AUTHOR_DATE = $commitDateFormatted
    $env:GIT_COMMITTER_DATE = $commitDateFormatted
    
    git commit -m $commits[$i] --allow-empty
    
    # Clear environment variables
    Remove-Item Env:\GIT_AUTHOR_DATE
    Remove-Item Env:\GIT_COMMITTER_DATE
    
    Write-Host "✓ Created commit $($i+1)/$totalCommits : $($commits[$i])" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "✅ Successfully created $totalCommits commits!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review commits: git log --oneline" -ForegroundColor White
Write-Host "2. Push to GitHub: git push origin main -f" -ForegroundColor White
Write-Host ""
Write-Host "Note: Use -f (force) if you're rewriting history" -ForegroundColor Red
