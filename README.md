![Portfolio+ Logo](https://portfolio.talkinglands.com/static-assests/images/PortfolioPlusLogo.svg)

## Overview

This repo holds the source code for [Portfolio+](https://portfolio.talkinglands.com), a portfolio manager for the Talking Lands community.

---

## Setting up development environment

### Prerequisites

- Node.js
- Yarn
- Git
- Nginx

---

### Nginx setup

1. Navigate to the nginx folder.
2. In the nginx.conf file. inside the http block add the following:

```nginx
    server {
        listen 3000;
        server_name portfolio.tl.localhost;

        location / {
            proxy_pass http://localhost:3005;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
```

3. Restart the nginx service by running `start nginx` from the nginx folder.

---

### Codebase Setup

1. Clone the repo: `git clone https://github.com/TalkingLands/tl-portfolio-plus-ui.git`
2. Install dependencies: `yarn install`
3. Refer the environment variables used in the source code from .env.example file and set them in .env.local file.
4. Run `yarn dev` to start the development server.
5. Run `yarn build` to build the production bundle.
6. Run `yarn preview` to start the production server.
