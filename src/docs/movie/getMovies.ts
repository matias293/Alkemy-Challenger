export default {
  get: {
    tags: ['Movie'],
    description: 'Get  movies',
    operationId: 'getMovies',
    parameters: [
      {
        name: 'name',
        in: 'query',
        schema: {
          type: 'string',
        },
        description: 'A movie name.',
        example: 'Leo Di Caprio',
      },
      {
        name: 'genre',
        in: 'query',
        schema: {
          type: 'number',
        },
        description: 'A genre id',
        example: '2',
      },
      {
        name: 'order',
        in: 'query',
        schema: {
          type: 'string',
        },
        description: 'A movie id',
        example: 'order',
      },
    ],

    responses: {
      200: {
        description: 'Get a single o many movies',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                Movie: {
                  type: 'object',
                  description: 'Movie data',
                  properties: {
                    imagen: {
                      type: 'string',
                      description: 'id of a image',
                      example: '2aa9b21f-499a-4905-b510-61e14317d2711.png',
                    },
                    title: {
                      type: 'string',
                      description: 'title of the movie',
                      example: 'Titanic',
                    },
                    createdAt: {
                      type: 'string',
                      description: 'Date that was created',
                      example: '12/09/2022 14:12:31',
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
