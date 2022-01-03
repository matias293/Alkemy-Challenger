export default {
  patch: {
    tags: ['Movie'],
    description: 'Update a movie',
    operationId: 'patch',
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
        description: 'A character id',
      },
    ],
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            $ref: '#/components/schemas/MovieInput',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Movie added',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Movie',
            },
          },
        },
      },

      400: {
        description: ``,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                errValidate: {
                  $ref: '#/components/schemas/ErrorValidate',
                },
              },
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
