export default {
  post: {
    tags: ['Auth'],
    description: 'Sign up to the DB.',
    operationId: 'register',
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
                description: 'User phone number',
                example: 'marimba',
              },
              email: {
                type: 'string',
                description: 'User email.',
                example: 'test1@test.com',
              },
              password: {
                type: 'string',
                description: ' ',
                example: 'sanlorenzo18',
              },
              repeat_password: {
                type: 'string',
                description: ' Must be the same as password.',
                example: 'sanlorenzo18',
              },
              
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Successful signup.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
          },
        },
      },
      400: {
        description: 'One of the input body must be wrong',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorValidate',
            },
          },
        },
      },
    },
  },
};