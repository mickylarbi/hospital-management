# Hospital Mangement System Backend

## Stack

- NestJS
- Prisma
- PostgreSQL
- Google Gemini
- Passport

<br><br>

## Endpoints

### POST `/auth/signup`:

endpoint for registering new users

##### Request body

```json
{
  "name": "string",
  "email": "string",
  "password": "base64 string"
}
```

<br>

### POST `/auth/login`:

endpoint for authenticating

##### Request body

```json
{
  "email": "string",
  "password": "base64 string"
}
```

##### Response body

```json
{
  "access_token": "string"
}
```

<br>

### GET `/doctors`:

endpoint for getting all doctors. only patients can access this endpoint

##### Response body

```json
[
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "DOCTOR"
  }
]
```

<br>

### GET `/patients`:

endpoint for getting a doctors patients. only doctors can access this endpoint

##### Response body

```json
[
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "PATIENT"
  }
]
```

<br>

### POST `/doctors/{doctorId}/assign`:

endpoint for assigning doctors to patients. only patients can access this endpoint

<br>

### PATCH `/patients/{patientId}/notes`:

endpoint for adding doctor notes. accessible to doctors only

##### Request body

```json
{
  "notes": "string"
}
```

<br>

### GET `/patients/{patientId}/actionable-items`:

endpoint for getting a patient's actionable items. accessible to doctors only

##### Response body

```json
{
  "checklist": ["string"],
  "plans": [
    {
      "action": "string",
      "schedule": [
        {
          "dayOfWeek": "string",
          "timeOfDay": "string"
        }
      ]
    }
  ]
}
```

<br>

### GET `/doctors/{doctorId}/actionable-items`:

endpoint for getting a doctor's actionable items. accessible to patients only

##### Response body

```json
{
  "checklist": ["string"],
  "plans": [
    {
      "action": "string",
      "schedule": [
        {
          "dayOfWeek": "string",
          "timeOfDay": "string"
        }
      ]
    }
  ]
}
```

<br><br>

## Authentication

- Used the Local Strategy from [PassportJS](https://www.passportjs.org/) for `/auth/login`.
- And also JWT Strategy for all other routes except `/auth/signup`

## Database

- Used PostgreSQL database from [Supabase](https://supabase.com)
- Used [Prisma](https://prisma.io) ORM

## Generative AI

- Used [Gemini 2.0 Flash](https://deepmind.google/technologies/gemini/flash/) as the underlying model
- Used [Genkit](https://firebase.google.com/docs/genkit) API from Google

<br><br>

## Running the app

#### Install dependencies

```bash
$ npm install --legacy-peer-deps
```

#### Sync database with Prisma

```bash
$ npx prisma migrate dev --name init
```

#### Build app

```bash
$ npm run build
```

#### Run app

```bash
$ npm run start:prod
```

<br><br>

## Noteworthy

You should have the following variables in your .env (project level).

- `ACCESS_TOKEN_SECRET`: secret for signing jwts
- `DATABASE_URL`: from supabase or whatever postgres db
- `DIRECT_URL`: from supabase or whatever postgres db
- `GOOGLE_GENAI_API_KEY`: api key from Google AI Studio

<!-- <p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!-- [![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

<!-- ## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. -->

<!-- ## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
``` -->
<!--
## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
``` -->
<!--
## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE). -->
