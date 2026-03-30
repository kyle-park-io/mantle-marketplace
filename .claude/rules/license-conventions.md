---
description: Default license (MIT), supported license types, and LICENSE file format.
---

# License Conventions

## Default

- Always use **MIT License** unless the user specifies otherwise

## Supported Licenses

| License        | Use case                                                                                            |
| -------------- | --------------------------------------------------------------------------------------------------- |
| `MIT`          | Open source, maximum permissiveness — anyone can use, modify, distribute, sublicense, sell          |
| `Apache-2.0`   | Open source with patent protection — similar to MIT but explicitly grants patent rights             |
| `GPL-3.0`      | Copyleft — any derivative work must also be GPL-3.0 (use when you want changes to stay open source) |
| `LGPL-3.0`     | Weak copyleft — libraries that can be used in proprietary software without triggering copyleft      |
| `ISC`          | Functionally identical to MIT, just shorter text                                                    |
| `BSD-2-Clause` | Similar to MIT, minimal restrictions                                                                |
| `BSD-3-Clause` | BSD-2 plus non-endorsement clause                                                                   |
| `MPL-2.0`      | File-level copyleft — modified files must stay MPL, but can be combined with proprietary code       |
| `AGPL-3.0`     | GPL extended to network use — SaaS apps must also open source (strongest copyleft)                  |
| `Unlicense`    | Public domain dedication — no restrictions whatsoever                                               |
| `BUSL-1.1`     | Business Source License — source available but commercial use restricted until a date               |
| `Proprietary`  | All rights reserved — no permissions granted without explicit agreement                             |

## LICENSE File Contents

When creating a LICENSE file, include:

- Full license text (not just a reference)
- Current year
- Author/organization name

### MIT Template

```
MIT License

Copyright (c) <YEAR> <AUTHOR>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Rules

- Always create a `LICENSE` file in the project root
- If the user requests a specific license, use that — otherwise default to MIT
- Never mix incompatible licenses (e.g. GPL code inside a proprietary project)
- If unsure about compatibility, ask the user before proceeding
