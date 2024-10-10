<h3 align="center">
  <img
    src="https://quantaquestapp.com/logo.png"
    height="200"
  >
</h3>
<div>
  <p align="center">
    <a href="https://x.com/ethanfrostlove">
      <img src="https://img.shields.io/badge/Follow%20on%20X-000000?style=for-the-badge&logo=x&logoColor=white" alt="Follow on X" />
    </a>
    <a href="https://discord.gg/v5Ns5m7H">
      <img src="https://img.shields.io/badge/Join%20our%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Join our Discord" />
    </a>
  </p>
</div>

# What's Quanta Quest?

## Quanta Quest's goals

1. Help users easily store all their data from Gmail, Notion, Dropbox, Calendar, Docs, Drive, iCloud, etc. locally and process it with a vector database (important data localized for storage and backup, preventing data loss)

2. “Edge-side LLMs + personal data" ➡️ "Personalized, private, edge-side LLMs (important data localized)" ➡️ "The LLMs that knows you best, the most private LLMs". Use your personal data combined with increasingly common edge-side LLMs to train the safest, most privacy-focused, and most personalized edge-side LLMs that understands you best.

## Current version of Quanta Quest

1. Supports users in connecting cloud data from Notion, Dropbox, Raindrops, Gmail, etc. to AWS's vector database.

2. Combines LLMs like ChatGPT and Claude, using RAG to achieve personalized AI-powered search (Perplexica handles all public information, while Quanta Quest focuses on processing all personal data. Regular users can't ask Perplexica "What meetings do I have tomorrow", "What lessons were learned from xx project", "Which newsletters have I subscribed to", etc., but you can ask Quanta Quest all these questions related to you).

## Detailed Use Case Diagram

1. Asking "What newsletters have I subscribed to?"

![newsletters](https://quantaquestapp.com/imgs/newsletters.png)

2. Which AI projects have recently received funding?

![aistartups](https://quantaquestapp.com/imgs/aistartups.png)

# How to deploy

## Projects

The application is divided into **two parts**:

- Current project (Next.js): In this project, it's mainly used for page rendering, authentication, basic data queries, etc.
- quanta-quest-server (FastAPI): This project contains logic for data processing, AI queries, generation, etc., as well as some more complex logic. All data definitions are based on this project.

## Third-party dependencies

- Kinde
  - Used for user login and registration, implementing multi-tenancy
- Stripe
  - Used for paid subscriptions after user trial
- Database - PostgreSQL
  - Database for application data

## Environment Variables

- DATABASE_URL - Database connection
- BASE_URL - Access URL for current project
- SERVER_URL - Access URL for the backend project
- PRISMA_LOG_LEVEL - Prisma log level configuration
- KINDE_CLIENT_ID - Unique project ID on Kinde
- KINDE_CLIENT_SECRET - Project secret on Kinde (DO NOT SHARE)
- KINDE_ISSUER_URL - Application URL on Kinde
- KINDE_SITE_URL - URL where the application is running
- KINDE_POST_LOGOUT_REDIRECT_URL - Redirect URL after user logout
- KINDE_POST_LOGIN_REDIRECT_URL - Redirect URL after user login
- KINDE_DEBUG_MODE - Kinde debug mode
- STRIPE_MONTHLY_PRICE_ID - Stripe monthly subscription price
- STRIPE_QUARTERLY_PRICE_ID - Stripe quarterly subscription price
- STRIPE_YEARLY_PRICE_ID - Stripe yearly subscription price
- NEXT_PUBLIC_PUBLISHABLE_KEY - Stripe publishable key
- STRIPE_SECRET_KEY - Stripe secret key

# Roadmap

- [x] Notion
- [ ] Gmail
- [x] Dropbox
- [x] Raindrops
- [ ] Optimize RAG query intent
- [ ] Optimize RAG query result reranking
- [ ] Handle CASA security certification for Google Workspace application approval
- [ ] Support vector search within data source scope
- [ ] Support for more data sources

## License

Copyright 2024 Quanta Quest Private Limited

Licensed under the Quanta Quest License; you may not use this file except in compliance with the License.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
