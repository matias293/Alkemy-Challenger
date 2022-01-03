export default {
  post: {
    tags: ['Auth'],
    description: 'Log in to the system.',
    operationId: 'login',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
                description: 'User username.',
                example: 'marimba',
              },
              password: {
                type: 'string',
                description: 'User password.',
                example: 'sanlorenzo18',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Successful Login.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  $ref: '#/components/schemas/Token',
                },
              },
            },
          },
        },
      },
      400: {
        description: ' email and/or password wrong or is not found.',
        content: {
          'application/json': {
            schema: {
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
        description: '',
        content: {
          'application/json': {
            schema: {
              properties: {
                errUnahutorized: {
                  $ref: '#/components/schemas/ErrorUnahutorized',
                },
              },
            },
          },
        },
      },
    },
  },
};