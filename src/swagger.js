import dotenv from 'dotenv';

dotenv.config();

export default {
  info: {
    title: 'node js test app',
    version: '1.0.0',
    description: 'Make For node js test.'
  },
  host: process.env.NODE_ENV ? 'yapptoys.herokuapp.com:4000' : 'localhost:4000',
  basePath: '/',
  contact: {
    email: 'kyujong93@naver.com'
  },
  components: {
    res: {
      BadRequest: {
        description: '잘못된 요청.',
        schema: {
          $ref: '#/components/errorResult/Error'
        }
      },
      Forbidden: {
        description: '권한이 없습니다.',
        schema: {
          $ref: '#/components/errorResult/Error'
        }
      },
      NotFound: {
        description: '없는 리소스 요청.',
        schema: {
          $ref: '#/components/errorResult/Error'
        }
      }
    },
    errorResult: {
      Error: {
        type: 'object',
        properties: {
          errMsg: {
            type: 'string',
            description: '에러 메시지 전달.'
          }
        }
      }
    }
  },
  schemes: ['http', 'https'],
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [{ jwt: [] }]
};
