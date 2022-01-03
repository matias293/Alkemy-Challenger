export default {
  delete: {
    tags: ['Movie'],
    description: 'Delete a movie',
    operationId: 'deleteMovie',
    parameters: [
      {
        name: 'Bearer-Token',
        in: 'header',
        schema: {
          $ref: '#/components/schemas/Token',
        },
        description: 'An authorization header',
        required: true,
        type: 'string',
      },
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/MovieId',
        },
        required: true,
        description: 'A movie id',
      },
    ],
    responses: {
      200: {
        description: 'Character delete',
        content: {
          'application/json': {
            schema: {
              description: 'Pelicula borrada',
            },
          },
        },
      },

      401: {
        description: 'Login Error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorUnahutorized',
            },
          },
        },
      },

      500: {
        description: 'The token has expired',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                ErrorExpires: {
                  type: 'object',
                  description: ``,
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Message of error',
                      example: `JWT has expired`,
                    },
                    status: {
                      type: 'number',
                      description: 'Number of error',
                      example: '500',
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
