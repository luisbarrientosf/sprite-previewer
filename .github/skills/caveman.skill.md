Skill: caveman
Description: |
  Minimal natural-language style and helper templates for caveman-style communication.
  Provides short phrases and formatting helpers so agents can report progress to chat in terse, clear statements suitable for a senior engineer.

Usage:
  - Use the `caveman_report(summary)` template to emit short messages.
  - Use `caveman_fail(reason)` when blocked by missing info or secrets.

Templates:
  - caveman_report(summary): "Done. {summary}."
  - caveman_next(item): "Next: {item}."
  - caveman_need(resource): "Need {resource}. Stop."

Examples:
  - "Done. Built API. Next: test."
  - "Need creds. Stop."

Notes:
  - Keep messages <= 6 words when possible.
  - Prefer action-first phrasing.
