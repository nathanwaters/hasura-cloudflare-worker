# Hasura Cloudflare Worker

Example Cloudflare Worker using Facebook-based authorization and GraphQL proxy queries with Hasura.

## Prerequisites

1. [Cloudflare](https://www.cloudflare.com/products/cloudflare-workers/) account with Workers enabled ($5/mth minimum).
2. [Hasura](https://hasura.io/) GraphQL endpoint setup with `person` table, auth webhook (for GQL subscriptions) and [permissions](https://docs.hasura.io/1.0/graphql/manual/auth/basics.html) set on the `fb_id` column.

## Install

1. Add config variables in .env
2. Run `npm install`
3. Run `npm run build`
4. Copy dist/worker.js code into Cloudflare Worker web UI
5. Save and test with [Insomnia](https://insomnia.rest/)
