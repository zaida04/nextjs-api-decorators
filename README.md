# `nextjs-api-decorators`

[![GitHub](https://img.shields.io/github/license/zaida04/nextjs-api-decorators)](https://github.com/zaida04/nextjs-api-decorators/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/nextjs-api-decorators?color=crimson&logo=npm)](https://www.npmjs.com/package/nextjs-api-decorators)
[![CI workflows](https://github.com/zaida04/nextjs-api-decorators/actions/workflows/ci.yml/badge.svg)](https://github.com/zaida04/nextjs-api-decorators/actions/workflows/ci.yml)

## ❓ About

This package is an addon to next.js that allows you to use decorators in a class setting to structure your Next.JS API. This was created due to the age old problem in Next.JS of having to do

```typescript
if(req.method === "POST") {
  ...
} else if (req.method === "POST") {
  ...
}
```

in every API file. This leads to clutter, or you having to duplicate a hot glue fix using the map solution implemented in this library across all your files.

## 📥 Installation

You can install this package from [NPM](https://www.npmjs.com/package/nextjs-api-decorators)

-   `npm install nextjs-api-decorators`
-   `yarn add nextjs-api-decorators`

## ⚡ Usage

Demo file based on a template project generated with next-create-app  
`pages/api/items/[itemId].tsx`

```typescript
import { NextApiRequest, NextApiResponse } from "next";
import { http, genAPIRoute } from "nextjs-api-decorators";

// You can name the class whatever you want, doesn't matter. It's only there for us to be able to use decorators
class ItemRoutes {
    @http("ItemRoutes")
    GET(req: NextApiRequest, res: NextApiResponse) {
        return res.status(200).json({ success: true });
    }
}

export default genAPIRoute("ItemRoutes");
```

## ✋ Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please ensure any and all commits pass our linting and build steps as described in the root package.json.

## ⚖️ LICENSE

Licensed under the [MIT License](https://github.com/zaida04/nextjs-api-decorators/blob/main/LICENSE)
