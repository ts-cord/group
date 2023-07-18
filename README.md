![tscord-logo](tscord-logo.jpg)

# Group

`@ts-cord/group` is a powerful set of utility data structures that extends Map.

## Installation

```bash
npm i @ts-cord/group
```

## Example

```ts
import { Collection } from '@ts-cord/group';

const someGroup = new Group<Snowflake, UserObject>()
    .set('963124227911860264', coolUserObject);

someGroup.fallback('963123217911860264', () => someUserObject);
```

## Useful links

- [Discord server](https://discord.gg/bpTKU5a5Zb)
- [Discord API server](https://discord.com/invite/discord-api)
- [Github](https://github.com/ts-cord/builders)
- [Npm](https://www.npmjs.com/package/@ts-cord/builders)
- [Other libraries](https://discord.com/developers/docs/topics/community-resources#libraries)

## Help

If you don't understand something or it's not clear, please consider joining our support [server](https://discord.gg/bpTKU5a5Zb).
