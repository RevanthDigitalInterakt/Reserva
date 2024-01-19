last_tag=$(git describe --tags `git rev-list --tags --max-count=1`)

git tag -d "$last_tag"

git push --delete origin "$last_tag"