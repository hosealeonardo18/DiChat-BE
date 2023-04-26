<br />
<p align="center">
<div align="center">
  <img height="150" <img src="https://res.cloudinary.com/dklpoff31/image/upload/v1681702183/Asset_1_pwbeti.png" alt="logo" border="0"/>
</div>
  <h3 align="center">DiChat</h3>
  <p align="center">
    <a href="https://github.com/hosealeonardo18/DiChat-BE"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://dichat.vercel.app/">View Demo</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->

## About The Project

The Realtime Chat website with the name DiChat is an online platform that allows users to chat in real-time with other users who are connected to the application. DiChat was developed using React.js and Redux frontend technologies to optimize display performance and efficiency as well as state management. In addition, this website uses the socket.io library to implement the realtime chat feature.

On the backend, DiChat uses Express.js technology which functions as a server to manage data retrieved from Cloudinary. Cloudinary functions as an image data store so that it allows users to easily send and view images from every message sent.

# Documentation Basic Backend

## Third Party Module

| Third Party | NPM Install              |
| :---------- | :----------------------- |
| Express     | `npm i express`          |
| Nodemon     | `npm i nodemon --D`      |
| Morgan      | `npm i morgan`           |
| PostgreSQL  | `npm i pg`               |
| Dotenv      | `npm i dotenv`           |
| CORS        | `npm i cors`             |
| Eslint      | `npm i eslint`           |
| Http-errors | `npm i http-errors`      |
| Helmet      | `npm i helmet`           |
| XSS-Clean   | `npm i xss-clean --save` |
| Bcrypt      | `npm i bcryptjs`         |
| Multer      | `npm i multer`           |
| Uuid        | `npm i uuid`             |
| JWT         | `npm i jsonwebtoken`     |

## Documentation Third Party

| Third Party                                                        |
| :----------------------------------------------------------------- |
| [Express](https://expressjs.com/)                                  |
| [Nodemon](https://www.npmjs.com/package/nodemon)                   |
| [Morgan](https://www.npmjs.com/package/morgan)                     |
| [PostgreSQL](https://www.postgresql.org/)                          |
| [Dotenv](https://www.npmjs.com/package/dotenv)                     |
| [CORS](https://www.npmjs.com/package/cors)                         |
| [Eslint](https://www.npmjs.com/package/eslint)                     |
| [Http-errors](https://www.npmjs.com/package/http-errors)           |
| [Helmet](https://www.npmjs.com/package/helmet)                     |
| [XSS-Clean](https://www.npmjs.com/package/xss-clean)               |
| [Bcrypt](https://www.npmjs.com/package/bcryptjs?activeTab=readme)  |
| [Multer](https://www.npmjs.com/package/multer)                     |
| [Uuid](https://www.npmjs.com/package/uuid)                         |
| [JWT](https://www.npmjs.com/package/jsonwebtoken?activeTab=readme) |

## Documentation Postman

[Documentation Postman](https://documenter.postman.com/preview/24895506-272b67f9-f306-4527-b5ee-63d8942fe480?environment=&versionTag=latest&apiName=CURRENT&version=latest&documentationLayout=classic-double-column&right-sidebar=303030&top-bar=FFFFFF&highlight=EF5B25)

## Deployment

| Deployment                       | Database                                    |
| :------------------------------- | :------------------------------------------ |
| [Railway](https://dichat-be.up.railway.app/)  | [postgreSQL](https://www.postgresql.org/)   |

- [API Login](https://dichat-be.up.railway.app/user/auth/login)
- [API Register](https://dichat-be.up.railway.app/user/auth/register)
- [API Profile User](https://dichat-be.up.railway.app/user/auth/profile)
- [API Refresh Token](https://dichat-be.up.railway.app/user/auth/refresh-token)

- [API Get All User](https://dichat-be.up.railway.app/user)
- [API Get Detail User](https://dichat-be.up.railway.app/user/${id})
- [API Update User](https://dichat-be.up.railway.app/user/auth/${id})
- [API Delete User](https://dichat-be.up.railway.app/user/auth/${id})

- [API Contact](https://dichat-be.up.railway.app/contact)
- [API Add Contact](https://dichat-be.up.railway.app/contact)
- [API Delete Contact](https://dichat-be.up.railway.app/contact/${id})

- [API Contact](https://dichat-be.up.railway.app/message/${id_receiver})
- [API Add Contact](https://dichat-be.up.railway.app/message/${id_receiver})
- [API Delete Contact](https://dichat-be.up.railway.app/message/${id_message})

API endpoint list are also available as published postman documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/24895506-cafe7c8b-ec35-4f76-bc6a-54125bf44cf9?action=collection%2Ffork&collection-url=entityId%3D24895506-cafe7c8b-ec35-4f76-bc6a-54125bf44cf9%26entityType%3Dcollection%26workspaceId%3D25508b07-7224-4d37-90f4-034a0c8d7342)

## Authors

- [@hosealeonardo18](https://github.com/hosealeonardo18)

## Installation Node_Modules

```bash
  npm install
```

## Running Server

```bash
   npm run server-start
```

## Debug

```bash
  npm run lint
```

## Related Project

:rocket: [`Frontend DiChat Realtime Chat`](https://github.com/hosealeonardo18/DiChat-FE)

:rocket: [`Backend DiChat Realtime Chat`](https://github.com/hosealeonardo18/DiChat-BE)

:rocket: [`Demo DiChat Realtime Chat`](https://dichat.vercel.app/)
