# Agent instructions

## Pull request workflow

- For implementation tasks, make the requested changes in the repository before reporting completion.
- After making changes, validate them using the project’s relevant checks. At minimum, run `npm run typecheck` and `npm run build` when the change affects application code or configuration.
- Open a pull request in ready-for-review mode, or update the existing pull request for the current task when one already exists.
- Never create, request, or leave a pull request in draft mode. If an existing pull request is draft, convert it to ready-for-review after confirming the requested implementation and relevant checks are complete.
- Do not merge the pull request unless the user explicitly asks for that action.
- When updating an existing pull request, verify its repository and head branch first so changes are pushed to the branch that actually backs the pull request.

## Reporting

- Distinguish clearly between local validation, remote CI status, mergeability, and deployment status.
- Report the pull request URL, draft/ready state, validation commands and results, and any remaining blockers.
