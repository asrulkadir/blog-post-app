This is a Blog Post APP project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16.x or higher)
- [npm](https://www.npmjs.com/) (v8.x or higher)

### Installation

First, clone the repository:

```bash
git clone https://github.com/asrulkadir/blog-post-app.git
cd blog-post-app
```

Then, install the dependencies:

```bash
npm install
```

### Running the Development Server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Testing on your local using cypress
create cypress.env.json file and fill your gorest token:
you can get your token after you register [here](https://gorest.co.in/)

```bash
{
  "gorest_token": "your gorest token"
}
```

open cypress:

```bash
npm run cypress:open
```

run cypress:

```bash
npm run cypress:run
```

### Deployment

You can view the deployed application at [https://blog-post-app.asrulkadir.com](https://blog-post-app.asrulkadir.com).
