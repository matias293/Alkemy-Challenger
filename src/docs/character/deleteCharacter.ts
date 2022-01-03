export default {
  delete: {
    tags: ['Character'],
    description: 'Delete a character',
    operationId: 'deleteCharacter',
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
          $ref: '#/components/schemas/CharacterId',
        },
        required: true,
        description: 'A character id',
      },
    ],
    responses: {
      200: {
        description: 'Character delete',
        content: {
          'application/json': {
            schema: {
              description: 'Personaje borrado',
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
