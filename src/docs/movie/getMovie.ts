export default {
  get: {
    tags: ['Movie'],
    description: 'Get a movie.',
    operationId: 'getMovie',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/MovieId',
        },
        required: true,
        description: 'A character id',
      },
    ],

    responses: {
      200: {
        description: 'Get a single character',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
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
                    personajes: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Character',
                      },
                    },
                    genre: {
                      $ref: '#/components/schemas/Genero',
                    },
                  },
                },
              },
            },
          },
        },
      },

      404: {
        description: `Didn't find any movie`,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                ErrorCharacters: {
                  type: 'object',
                  description: ``,
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Message of error',
                      example: `Did't find any movie`,
                    },
                    status: {
                      type: 'number',
                      description: 'Number of error',
                      example: '404',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
