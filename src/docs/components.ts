export default {
  components: {
    schemas: {
      CharacterId: {
        type: 'number',
        description: 'An id of a character',
        example: '2',
      },
      GenreId: {
        type: 'number',
        description: 'An id of a genre',
        example: '2',
      },
      MovieId: {
        type: 'number',
        description: 'An id of a movie',
        example: '2',
      },
      Token: {
        type: 'string',
        description: 'The token from user',
        example:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjUxOTc0NzcyZjUwZjFkZDk4ZmJmYyIsImlhdCI6MTYzOTU3MTkyNSwiZXhwIjoxNjM5NTg2MzI1fQ.HF9g9hN0-tdpAJXdP_b4Gwrf2OmbTLnVHpCwCzZg9FI',
      },
      UserId: {
        type: 'number',
        description: 'An id of a user',
        example: '2',
      },

      User: {
        type: 'object',
        description: 'User data',
        properties: {
          id: {
            $ref: '#/components/schemas/UserId',
          },
          username: {
            type: 'string',
            description: 'User name.',
            example: 'marimba',
          },
          email: {
            type: 'string',
            description: 'User email.',
            example: 'test1@test.com',
          },
          password: {
            type: 'string',
            description: 'User password.',
            example:
              '$2b$10$COGraf90Hk280601bdep9eezCbW/Cz3JzuWTS9aMJMkuRuyrQKgWK',
          },
        },
      },
      Movie: {
        type: 'object',
        description: 'Movie data',
        properties: {
          id: {
            $ref: '#/components/schemas/CharacterId',
          },
          imagen: {
            type: 'string',
            description: 'id of a image',
            example: '2aa9b21f-499a-4905-b510-61e14317d2711.png',
          },
          title: {
            type: 'string',
            description: 'title of the movie',
            example: 'Titanica',
          },
          createdAt: {
            type: 'string',
            description: 'Date that was created',
            example: '12/09/2022 14:12:31',
          },
          calification: {
            type: 'number',
            description: 'Calification of the movie',
            example: '5',
          },
        },
      },
      Character: {
        type: 'object',
        description: 'Character data',
        properties: {
          id: {
            $ref: '#/components/schemas/MovieId',
          },
          name: {
            type: 'string',
            description: 'Name of the character',
            example: 'Leo Di Caprio',
          },
          picture: {
            type: 'string',
            description: 'picture of the movie',
            example: '2aa9b21f-499a-4905-b510-61e14317d2711.png',
          },
          age: {
            type: 'number',
            description: 'Age of the character',
            example: '23',
          },
          weight: {
            type: 'number',
            description: 'Weight of the character',
            example: '75',
          },
          history: {
            type: 'string',
            description: 'Hisotory of the character',
            example:
              'He protagonize a lot of movies like Plainer,The wolf of wallstreet',
          },
        },
      },
      MovieInput: {
        type: 'object',
        description: 'Movie data',
        properties: {
          imagen: {
            type: 'array',
            description: 'Product images.',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
          title: {
            type: 'string',
            description: 'title of the movie',
            example: 'Titanica',
          },
          calification: {
            type: 'number',
            description: 'Calification of the movie',
            example: '5',
          },
        },
      },
      CharacterInputAdd: {
        type: 'object',
        description: 'Character data',
        properties: {
          name: {
            type: 'string',
            description: 'Name of the character',
            example: 'Leo Di Caprio',
          },
          picture: {
            type: 'array',
            description: 'Product images.',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
          age: {
            type: 'number',
            description: 'Age of the character',
            example: '23',
          },
          weight: {
            type: 'number',
            description: 'Weight of the character',
            example: '75',
          },
          history: {
            type: 'string',
            description: 'Hisotory of the character',
            example:
              'He protagonize a lot of movies like Plainer,The wolf of wallstreet',
          },
        },
      },
      Genero: {
        type: 'object',
        description: 'Gender data',
        properties: {
          id: {
            $ref: '#/components/schemas/GenreId',
          },
          name: {
            type: 'string',
            description: 'Name of the gender',
            example: 'Horror',
          },
          imagen: {
            type: 'string',
            description: 'picture of the gender',
            example: '2aa9b21f-499a-4905-b510-61e14317d2711.png',
          },
        },
      },
      ErrorValidate: {
        type: 'object',
        description: `One ore more of the must be wrong`,
        properties: {
          message: {
            type: 'string',
            description: 'Message of error',
            example:
              '"someimput" must be a string or "someimput" it s required',
          },
          status: {
            type: 'number',
            description: 'Number of error',
            example: '400',
          },
        },
      },
      ErrorUnahutorized: {
        type: 'object',
        description: `Something went wrong in the login`,
        properties: {
          message: {
            type: 'string',
            description: 'Message of error',
            example: 'Unauthorized',
          },
          status: {
            type: 'number',
            description: 'Number of error',
            example: '401',
          },
        },
      },
      ErrorValidateJWT: {
        type: 'object',
        description: `Something went wrong with the token`,
        properties: {
          message: {
            type: 'string',
            description: 'Message of error',
            example:
              'Unauthorized || Token no válido || No hay token en la petición',
          },
          status: {
            type: 'number',
            description: 'Number of error',
            example: '401',
          },
        },
      },
    },
  },
};
