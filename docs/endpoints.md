# Documentation

## **Módulo barbeiro**

**POST: [https://barber-shop-village-api.herokuapp.com/barber/register](https://barber-shop-village-api.herokuapp.com/barber/register)**

Cadastro de babeiro

```json
header {
	Content-Type: "multipart/form-data"
}
```

```json

{
	"name": "Pedro",
	"email": ["pedro@gmail.com](mailto:%22pedro@gmail.com)",
	"password": "pedro123",
	"passwordConfirmation": "pedro123",
	"cutPrice": 60.00,
	"haircutType": ["CRISP", "WAVY"],
	"description": "Eu faço uns cortes maneiros",
	"workTime": {
		"day": "2020-12-10",
		"hours": ["2020-12-10T13:00:00.00", "2020-12-10T14:00:00.00", "2020-12-10T15:00:00.00"]
	},
	"image": multipart
}
```

**GET: [https://barber-shop-village-api.herokuapp.com/barber/find](https://barber-shop-village-api.herokuapp.com/barber/find)**

Listagem de todos os barbeiros

```json
[
    {
        "_id": "5fcd66496e9f127c3114f546",
        "active": true,
        "haircutType": [
            "CRISP",
            "STRAIGHT"
        ],
        "userId": "5fcd66496e9f127c3114f545",
        "cutPrice": 80,
        "workTime": [
            {
                "hours": [
                    "2020-12-10T16:00:00.000Z",
                    "2020-12-10T15:00:00.000Z",
                    "2020-12-10T17:00:00.000Z"
                ],
                "_id": "5fcd66496e9f127c3114f547",
                "day": "2020-12-10T00:00:00.000Z"
            }
        ],
        "description": "Faço uns cortes maneiros",
        "createdAt": "2020-12-06T23:16:25.788Z",
        "updatedAt": "2020-12-06T23:16:25.788Z",
        "__v": 0,
        "name": "pedro",
        "email": "pedro@gmail.com"
    },
    {
        "_id": "5fcd66cbea0a19866453a21f",
        "active": true,
        "haircutType": [
            "CRISP",
            "STRAIGHT"
        ],
        "userId": "5fcd66cbea0a19866453a21e",
        "cutPrice": 80,
        "workTime": [
            {
                "hours": [
                    "2020-12-10T16:00:00.000Z"
                ],
                "_id": "5fcd66cbea0a19866453a220",
                "day": "2020-12-10T00:00:00.000Z"
            }
        ],
        "description": "Faço uns cortes maneiros",
        "createdAt": "2020-12-06T23:18:35.687Z",
        "updatedAt": "2020-12-06T23:18:35.687Z",
        "__v": 0,
        "name": "paulo",
        "email": "paulo@gmail.com"
    },
    {
        "_id": "5fce6ce1c722ce00212ce942",
        "active": true,
        "haircutType": [
            "CURLY"
        ],
        "userId": "5fce6ce1c722ce00212ce941",
        "cutPrice": 10,
        "workTime": [
            {
                "hours": [],
                "_id": "5fce6ce1c722ce00212ce943",
                "day": "2020-12-10T00:00:00.000Z"
            }
        ],
        "portfolio": [
            "natan10@gmail.com/profilePicture (3).png",
            "natan10@gmail.com/profilePicture.png",
            "natan10@gmail.com/profilePicture (3).png",
            "natan10@gmail.com/profilePicture.png",
            "natan10@gmail.com/profilePicture (3).png",
            "natan10@gmail.com/profilePicture.png"
        ],
        "createdAt": "2020-12-07T17:56:49.437Z",
        "updatedAt": "2020-12-07T18:19:08.132Z",
        "__v": 0,
        "name": "natan",
        "email": "natan10@gmail.com"
    },
    {
        "_id": "5fce748cd81efc002198c9cb",
        "active": true,
        "haircutType": [
            "CURLY"
        ],
        "userId": "5fce748cd81efc002198c9ca",
        "cutPrice": 10,
        "workTime": [
            {
                "hours": [],
                "_id": "5fce748cd81efc002198c9cc",
                "day": "2020-12-10T00:00:00.000Z"
            }
        ],
        "description": "cortador master",
        "createdAt": "2020-12-07T18:29:32.577Z",
        "updatedAt": "2020-12-07T19:59:19.737Z",
        "__v": 0,
        "portfolio": [
            {
                "path": "natan101@gmail.com/astronaut_portal_neon_141352_3840x2160.jpg12-7-2020.jpeg",
                "active": true
            },
            {
                "path": "natan101@gmail.com/astronaut_portal_neon_141352_3840x216012-7-2020.jpeg",
                "active": true
            },
            {
                "path": "natan101@gmail.com/mushrooms_toadstools_glow_135444_3840x216012-7-2020.jpeg",
                "active": true
            },
            {
                "path": "natan101@gmail.com/astronaut_portal_neon_141352_3840x2160-12-7-2020.jpeg",
                "active": true
            },
            {
                "path": "natan101@gmail.com/mushrooms_toadstools_glow_135444_3840x2160-12-7-2020.jpeg",
                "active": true
            }
        ],
        "name": "natan",
        "email": "natan101@gmail.com"
    },
    {
        "_id": "5fcec0496905020c8cb0bb97",
        "active": true,
        "haircutType": [
            "CRISP",
            "STRAIGHT"
        ],
        "userId": "5fcec0496905020c8cb0bb96",
        "cutPrice": 80,
        "workTime": [
            {
                "hours": [
                    "2020-12-10T16:00:00.000Z"
                ],
                "_id": "5fcec0496905020c8cb0bb98",
                "day": "2020-12-10T00:00:00.000Z"
            }
        ],
        "description": "Faço uns cortes maneiros",
        "createdAt": "2020-12-07T23:52:41.887Z",
        "updatedAt": "2020-12-07T23:52:41.887Z",
        "__v": 0,
        "name": "ana julia",
        "email": "anajuliabitgmail.com"
    }
]
```

**POST: [https://barber-shop-village-api.herokuapp.com/b](https://barber-shop-village-api.herokuapp.com/barber/register)arber/images/upload**

Upload de imagens para o portfolio do barbeiro

![Backend%20Doc%20e2b0b23a601b4e2192913ca44594684e/Untitled.png](Backend%20Doc%20e2b0b23a601b4e2192913ca44594684e/Untitled.png)

Criar um multipart e adicionar as imagens todas com o nome "images", o caminho das imagens serão todos salvos na collection "barbers" na array de portfolio.

GET**: [https://barber-shop-village-api.herokuapp.com/b](https://barber-shop-village-api.herokuapp.com/barber/register)arber/images/get**

Traz os paths das imagens do barbeiro

PUT: [**https://barber-shop-village-api.herokuapp.com**](https://barber-shop-village-api.herokuapp.com/barber/register)[/barber/edit](http://localhost:3000/barber/edit)

É reconhecido o usuário logado a partir da session do JWT

```json
header {
	Content-Type: "application/json"
}
```

No body deve enviar as propriedades do barbeiro que serão alteradas

```json
 {
    name?: string
    email?: string
    password?: string
    passwordConfirmation?: string
    cutPrice?: number
    haircutType?: EHaircutType[]
    description?: string
    workTime?: WorkTime[]
}
```

**POST**: [**https://barber-shop-village-api.herokuapp.com**](https://barber-shop-village-api.herokuapp.com/barber/register)[/b](http://localhost:3000/barber/edit)arber/images/delete

```jsx
sheader {
	Authorization: "Bearer TOKEN"
}
```

```jsx
body {
	"imagePaths": [
		"natan101@gmail.com/astronaut_portal_neon_141352_3840x2160.jpg12-7-2020.jpeg"
	]
}
```

**GET: [https://barber-shop-village-api.herokuapp.com](https://barber-shop-village-api.herokuapp.com/barber/register)**[/b](http://localhost:3000/barber/edit)arber/:id

```json
{
        "_id": "5fcec0496905020c8cb0bb97",
        "active": true,
        "haircutType": [
            "CRISP",
            "STRAIGHT"
        ],
        "userId": "5fcec0496905020c8cb0bb96",
        "cutPrice": 80,
        "workTime": [
            {
                "hours": [
                    "2020-12-10T16:00:00.000Z"
                ],
                "_id": "5fcec0496905020c8cb0bb98",
                "day": "2020-12-10T00:00:00.000Z"
            }
        ],
        "description": "Faço uns cortes maneiros",
        "createdAt": "2020-12-07T23:52:41.887Z",
        "updatedAt": "2020-12-07T23:52:41.887Z",
        "__v": 0,
        "name": "ana julia",
        "email": "anajuliabitgmail.com"
    }
```

## **Módulo cliente**

**POST: [https://barber-shop-village-api.herokuapp.com/client/register](https://barber-shop-village-api.herokuapp.com/user/register)**

Cadastro de cliente

```json
header {
	Content-Type: "multipart/form-data"
}
```

```json
{
"name": "Paulo",
"email": ["paulo@gmail.com](mailto:%22paulo@gmail.com)",
"password": "paulo123",
"passwordConfirmation": "paulo123",
"image": multipart
}
```

PUT: [**https://barber-shop-village-api.herokuapp.com**](https://barber-shop-village-api.herokuapp.com/barber/register)[/](http://localhost:3000/barber/edit)client/edit

É reconhecido o usuário logado a partir da session do JWT

```json
header {
	Content-Type: "application/json"
}
```

No body deve enviar as propriedades do barbeiro que serão alteradas

```json
{
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
}
```

## Módulo Auth

**POST:** [https://barber-shop-village-api.herokuapp.com/auth/login](https://barber-shop-village-api.herokuapp.com/auth/login)

- Request

    ```json
    {
        "email": "paulo@gmail.com",
        "password": "paulo123"
    }
    ```

- Response

    ```json
    {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2QxYjlhNzQ2OGY5ZjQ4OWVhNGVlNiIsInBlcm1pc3Npb25zIjpbIkNMSUVOVCJdLCJpYXQiOjE2MDcyODIxMDh9.-2zJE4HxiwI1LrSE2XTQrslv2fhZl97M0loZPL0L2zg",
        "payload": {
            "id": "5fcd1b9a7468f9f489ea4ee6",
            "permissions": [
                "CLIENT"
            ]
        }
    }
    ```

**GET:** [https://barber-shop-village-api.herokuapp.com/auth/](https://barber-shop-village-api.herokuapp.com/auth/login)me

- Response (role BARBER)

    ```json
    {
        "_id": "5fcec0496905020c8cb0bb97",
        "active": true,
        "haircutType": [
            "CRISP",
            "STRAIGHT"
        ],
        "userId": "5fcec0496905020c8cb0bb96",
        "cutPrice": 80,
        "workTime": [
            {
                "hours": [
                    "2020-12-10T16:00:00.000Z"
                ],
                "_id": "5fcec0496905020c8cb0bb98",
                "day": "2020-12-10T00:00:00.000Z"
            }
        ],
        "description": "Teste 3",
        "createdAt": "2020-12-07T23:52:41.887Z",
        "updatedAt": "2020-12-08T00:19:26.637Z",
        "__v": 0,
        "profilePicture": "anajuliabitgmail.com/profilepicture.png",
        "name": "ana julia",
        "email": "anajuliabitgmail.com"
    }
    ```

- Response (role CLIENT)

    ```json
    {
        "roles": [
            "CLIENT"
        ],
        "_id": "5fcd60c1dc44fa49abd74e64",
        "name": "ana",
        "email": "anajulia@gmail.com"
    }
    ```

## Módulo Schedule

**POST: [https://barber-shop-village-api.herokuapp.com/](https://barber-shop-village-api.herokuapp.com/barber/register)schedule/create**

Apenas usuários com a role CLIENT ou ADMIN tem acesso a este endpoint

- Request

    ```json
    {
        "date": "2020-12-10T17:00:00.000Z",
        "clientId": "5fcd60c1dc44fa49abd74e64",
        "barberId": "5fcd66496e9f127c3114f546"
    }
    ```

- Response

    ```json
    {
        "active": true,
        "_id": "5fce5ac4eab7384271937dd4",
        "date": "2020-12-10T15:00:00.000Z",
        "clientId": "5fcd60c1dc44fa49abd74e64",
        "barberId": "5fcd66496e9f127c3114f546",
        "status": "PENDING",
        "createdAt": "2020-12-07T16:39:32.881Z",
        "updatedAt": "2020-12-07T16:39:32.881Z",
        "__v": 0
    }
    ```

**PUT: [https://barber-shop-village-api.herokuapp.com/schedule/change-status?id={scheduleId}&status={EScheuleStatus}](https://barber-shop-village-api.herokuapp.com/schedule/change-status?id={scheduleId}&status={EScheuleStatus})**

- Request

    > [http://localhost:3000/schedule/change-status?id=5fcd6ebf77bf898fca1c2a09&status=SCHEDULED](http://localhost:3000/schedule/change-status?id=5fcd6ebf77bf898fca1c2a09&status=SCHEDULED)

- Response

    ```json
    {
        "active": true,
        "_id": "5fcd6ebf77bf898fca1c2a09",
        "date": "2020-12-10T16:00:00.000Z",
        "clientId": "5fcd60c1dc44fa49abd74e64",
        "barberId": "5fcd66496e9f127c3114f546",
        "status": "SCHEDULED",
        "createdAt": "2020-12-06T23:52:31.583Z",
        "updatedAt": "2020-12-07T16:49:06.677Z",
        "__v": 0
    }

    ```

**GET**: [https://barber-shop-village-api.herokuapp.com/](https://barber-shop-village-api.herokuapp.com/)schedule/barber/:id

Apenas usuários com a role BARBER ou ADMIN tem acesso

```json
[
    {
        "active": true,
        "_id": "5fcd6ebf77bf898fca1c2a09",
        "date": "2020-12-10T16:00:00.000Z",
        "clientId": "5fcd60c1dc44fa49abd74e64",
        "barberId": "5fcd66496e9f127c3114f546",
        "status": "SCHEDULED",
        "createdAt": "2020-12-06T23:52:31.583Z",
        "updatedAt": "2020-12-07T16:49:06.677Z",
        "__v": 0
    },
    {
        "active": true,
        "_id": "5fce5ad3eab7384271937dd5",
        "date": "2020-12-10T17:00:00.000Z",
        "clientId": "5fcd60c1dc44fa49abd74e64",
        "barberId": "5fcd66496e9f127c3114f546",
        "status": "PENDING",
        "createdAt": "2020-12-07T16:39:47.840Z",
        "updatedAt": "2020-12-07T16:39:47.840Z",
        "__v": 0
    }
]
```

**GET**: [https://barber-shop-village-api.herokuapp.com/](https://barber-shop-village-api.herokuapp.com/)schedule/client/:id

Apenas usuários com a role CLIENT ou ADMIN tem acesso

```json
[
    {
        "active": true,
        "_id": "5fcd6ebf77bf898fca1c2a09",
        "date": "2020-12-10T16:00:00.000Z",
        "clientId": "5fcd60c1dc44fa49abd74e64",
        "barberId": "5fcd66496e9f127c3114f546",
        "status": "SCHEDULED",
        "createdAt": "2020-12-06T23:52:31.583Z",
        "updatedAt": "2020-12-07T16:49:06.677Z",
        "__v": 0
    },
    {
        "active": true,
        "_id": "5fce5ad3eab7384271937dd5",
        "date": "2020-12-10T17:00:00.000Z",
        "clientId": "5fcd60c1dc44fa49abd74e64",
        "barberId": "5fcd66496e9f127c3114f546",
        "status": "PENDING",
        "createdAt": "2020-12-07T16:39:47.840Z",
        "updatedAt": "2020-12-07T16:39:47.840Z",
        "__v": 0
    }
]
```

**GET**: [https://barber-shop-village-api.herokuapp.com](https://barber-shop-village-api.herokuapp.com/)[/schedule/agenda-barber/](http://localhost:3000/schedule/agenda-barber/5fcd66496e9f127c3114f546):barberId

Retorna a agenda disponível do barbeiro

```json
[
    {
        "hours": [
            "2020-12-10T16:00:00.000Z"
        ],
        "_id": "5fcd66496e9f127c3114f547",
        "day": "2020-12-10T00:00:00.000Z"
    }
]
```