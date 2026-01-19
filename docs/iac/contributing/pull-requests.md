# Pull Request Guidelines

How to submit changes to the project.

## Before You Start

1. **Check existing issues** - Is there an issue for your change?
2. **Discuss major changes** - Open an issue first for large features
3. **Read the code style guide** - Follow project conventions

## Creating a Branch

```bash
# Update main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# Or for fixes
git checkout -b fix/issue-description
```

### Branch Naming

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/description` | `feature/add-srv-records` |
| Fix | `fix/description` | `fix/ttl-validation` |
| Docs | `docs/description` | `docs/update-readme` |
| Refactor | `refactor/description` | `refactor/schema-types` |

## Making Changes

### 1. Write Code

Follow the [code style guide](./code-style).

### 2. Write Tests

Add tests for new functionality. See [testing guide](./testing).

### 3. Update Documentation

- Update TSDoc comments
- Update markdown docs if needed
- Add examples for new features

### 4. Run Checks

```bash
# Run all checks
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Committing

### Commit Message Format

```
type(scope): brief description

Longer description if needed.

Fixes #123
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code change, no new feature |
| `test` | Adding tests |
| `chore` | Maintenance |

### Examples

```
feat(records): add SRV record builder

Adds createSRVRecord function for service discovery records.

fix(validation): handle empty hostname

Fixes validation error when hostname is empty string.
Fixes #42
```

## Submitting the PR

### 1. Push Your Branch

```bash
git push origin feature/your-feature-name
```

### 2. Create Pull Request

1. Go to GitHub
2. Click "Compare & pull request"
3. Fill out the template

### PR Template

```markdown
## Description

Brief description of changes.

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist

- [ ] Tests pass locally
- [ ] Linting passes
- [ ] Documentation updated
- [ ] Types updated

## Related Issues

Fixes #123
```

## Review Process

### What Reviewers Look For

- ✅ Code follows style guide
- ✅ Tests are comprehensive
- ✅ Documentation is updated
- ✅ No breaking changes (or documented)
- ✅ CI passes

### Responding to Feedback

- Address all comments
- Push fixes as new commits
- Request re-review when ready

## After Merge

### Cleanup

```bash
# Switch to main
git checkout main
git pull origin main

# Delete local branch
git branch -d feature/your-feature-name
```

## Quick Reference

```bash
# Full workflow
git checkout -b feature/my-feature
# ... make changes ...
pnpm lint && pnpm test && pnpm build
git add .
git commit -m "feat(scope): description"
git push origin feature/my-feature
# ... create PR on GitHub ...
```

## See Also

- [Development Setup](./development) - Environment setup
- [Code Style](./code-style) - Coding standards
- [Testing Guide](./testing) - Writing tests

