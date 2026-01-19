# Contributing

Thank you for your interest in contributing to Polaris DNS! This guide will help you get started.

## Code of Conduct

Please be respectful and constructive in all interactions. We're all here to build great software together.

## Ways to Contribute

### Bug Reports

If you find a bug:

1. Check if it's already reported in [GitHub Issues](https://github.com/vladzaharia/dns/issues)
2. If not, create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (Node.js version, OS, etc.)

### Feature Requests

Have an idea for improvement?

1. Check existing issues for similar requests
2. Open a new issue describing:
   - The problem you're trying to solve
   - Your proposed solution
   - Alternative approaches considered

### Code Contributions

Ready to contribute code?

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Run tests (`pnpm test`)
5. Run linting (`pnpm lint`)
6. Commit with a clear message
7. Push and create a Pull Request

## Development Workflow

### Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/dns.git
cd dns

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Making Changes

1. Create a branch for your work
2. Make changes to the relevant package(s)
3. Add/update tests as needed
4. Update documentation if applicable

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests for a specific package
cd packages/dnscontrol-types && pnpm test
```

### Linting & Formatting

```bash
# Check linting
pnpm lint

# Fix auto-fixable issues
pnpm lint:fix

# Format code
pnpm format
```

## Pull Request Guidelines

### Before Submitting

- [ ] Tests pass locally (`pnpm test`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Documentation updated (if applicable)
- [ ] Commit messages are clear and descriptive

### PR Description

Include in your PR description:

- What changes were made
- Why the changes were needed
- How to test the changes
- Screenshots (if UI changes)

### Review Process

1. A maintainer will review your PR
2. Address any feedback
3. Once approved, the PR will be merged

## Project Structure

See [Project Structure](../getting-started/structure) for detailed information about the codebase organization.

## Documentation

When contributing documentation:

- Use clear, concise language
- Include code examples where helpful
- Follow the existing documentation style
- Test any code snippets

## Questions?

If you have questions about contributing:

- Check existing documentation
- Open a GitHub Discussion
- Ask in the PR or issue comments

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
