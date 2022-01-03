export default {
  get: {
    tags: ['Character'],
    description: 'Get a character.',
    operationId: 'getCharacter',
    parameters: [
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
        description: 'Get a single character',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Character',
            },
          },
        },
      },

      404: {
        description: `Didn't find any character`,
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
                      example: `Did't find any character`,
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
