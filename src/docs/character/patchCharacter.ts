export default {
  patch: {
    tags: ['Character'],
    description: 'Update a character',
    operationId: 'patchCharacter',
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
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            $ref: '#/components/schemas/CharacterInputAdd',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Character added',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Character',
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

      422: {
        description: `Didn't select any image`,
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
                      example: `Select a image`,
                    },
                    status: {
                      type: 'number',
                      description: 'Number of error',
                      example: '422',
                    },
                  },
                },
              },
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
