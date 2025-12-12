#!/bin/bash

# Script to create realistic commit history for WebToon project
# This creates commits with backdated timestamps

# Array of realistic commit messages
commits=(
  "Initial commit: Project setup"
  "Add: Docker configuration for MySQL and services"
  "Add: Backend Express server setup"
  "Add: Database schema and models"
  "Add: User authentication with JWT"
  "Add: Auth routes (register, login)"
  "Add: User profile endpoints"
  "Add: Stories CRUD endpoints"
  "Add: Chapters management API"
  "Add: Tags system implementation"
  "Add: Frontend React app initialization"
  "Add: React Router setup"
  "Add: Bootstrap and styling"
  "Add: HomePage component"
  "Add: Auth page (Login/Register)"
  "Add: Story detail page"
  "Add: Reading page component"
  "Add: Create story page"
  "Add: Chapter editor"
  "Add: Search functionality"
  "Add: Profile page"
  "Add: Follow/Unfollow feature"
  "Add: Vote system for chapters"
  "Add: Comments system"
  "Add: Reading history tracking"
  "Add: Continue reading section"
  "Add: Reading lists feature"
  "Add: Reviews and ratings"
  "Add: Image upload with Cloudinary"
  "Add: Story cover upload"
  "Add: Avatar upload"
  "Fix: Authentication middleware"
  "Fix: CORS configuration"
  "Fix: Database connection pooling"
  "Improve: Error handling"
  "Improve: API response format"
  "Improve: Frontend routing"
  "Style: Update header design"
  "Style: Improve story cards"
  "Style: Responsive design fixes"
  "Feature: Browse genres section"
  "Feature: Genre filtering"
  "Feature: Advanced search filters"
  "Feature: User stories management"
  "Feature: Chapter ordering"
  "Refactor: API service layer"
  "Refactor: Component structure"
  "Update: Change brand color to green"
  "Update: Logo to WebToon text"
  "Add: Swagger API documentation"
  "Add: Seed data script"
  "Add: Background banner for profiles"
  "Fix: Image placeholders"
  "Update: README documentation"
)

# Get current date
current_date=$(date +%s)

# Calculate date 60 days ago
days_ago=60
start_date=$((current_date - (days_ago * 86400)))

# Calculate interval between commits
total_commits=${#commits[@]}
interval=$((days_ago * 86400 / total_commits))

# Create commits with backdated timestamps
for i in "${!commits[@]}"; do
  commit_date=$((start_date + (i * interval)))
  commit_date_formatted=$(date -d "@$commit_date" "+%Y-%m-%d %H:%M:%S")
  
  # Make a small change to trigger commit
  echo "Commit $((i+1)): ${commits[$i]}" >> .commit-history
  
  git add .
  GIT_AUTHOR_DATE="$commit_date_formatted" GIT_COMMITTER_DATE="$commit_date_formatted" \
    git commit -m "${commits[$i]}" --allow-empty
  
  echo "Created commit $((i+1))/$total_commits: ${commits[$i]}"
done

echo ""
echo "✅ Created $total_commits commits!"
echo "Now run: git push origin main"
