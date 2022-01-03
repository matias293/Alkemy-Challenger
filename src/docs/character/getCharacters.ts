export default {
  get: {
    tags: ['Character'],
    description: 'Get a character.',
    operationId: 'getCharacter',
    parameters: [
      {
        name: 'name',
        in: 'query',
        schema: {
          type: 'string',
        },
        description: 'A character name.',
        example: 'Leo Di Caprio',
      },
      {
        name: 'age',
        in: 'query',
        schema: {
          type: 'number',
        },
        description: 'An age of a character',
        example: '23',
      },
      {
        name: 'movies',
        in: 'query',
        schema: {
          type: 'number',
        },
        description: 'A movie id',
        example: '2',
      },
    ],

    responses: {
      200: {
        description: 'Get a single o many character',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                Characters: {
                  type: 'object',
                  description: ``,
                  properties: {
                    picture: {
                      type: 'string',
                      description: 'Picture of the character',
                      example: `2aa9b21f-499a-4905-b510-61e14317d2711.png`,
                    },
                    name: {
                      type: 'string',
                      description: 'Name of the character',
                      example: 'Leo Di Caprio',
                    },
                  },
                },
              },
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
