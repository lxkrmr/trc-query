import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import * as rm from 'typed-rest-client/RestClient';

@Controller()
export class AppController {
  private client: rm.RestClient;

  constructor() {
    this.client = new rm.RestClient('my-user-agent', 'http://localhost:3000');
  }

  @Get()
  async get(): Promise<Message> {
    const response: rm.IRestResponse<Message> = await this.client.get<Message>(
      '/get-query',
      this.createQueryParamOptions(),
    );

    return response.result;
  }

  @Get('/get-query')
  getQuery(@Query('param') queryParam: string): Message {
    return this.createMessage('GET', queryParam);
  }

  @Post()
  async post(): Promise<Message> {
    const response: rm.IRestResponse<Message> =
      await this.client.create<Message>(
        '/post-query',
        this.createQueryParamOptions(),
      );

    return response.result;
  }

  @Post('/post-query')
  postQuery(@Query('param') queryParam: string): Message {
    return this.createMessage('POST', queryParam);
  }

  @Patch()
  async patch(): Promise<Message> {
    const response: rm.IRestResponse<Message> =
      await this.client.update<Message>(
        '/patch-query',
        this.createQueryParamOptions(),
      );

    return response.result;
  }

  @Patch('/patch-query')
  patchQuery(@Query('param') queryParam: string): Message {
    return this.createMessage('PATCH', queryParam);
  }

  @Put()
  async put(): Promise<Message> {
    const response: rm.IRestResponse<Message> =
      await this.client.replace<Message>(
        '/put-query',
        this.createQueryParamOptions(),
      );

    return response.result;
  }

  @Put('/put-query')
  putQuery(@Query('param') queryParam: string): Message {
    return this.createMessage('PUT', queryParam);
  }

  @Delete()
  async delete(): Promise<Message> {
    const response: rm.IRestResponse<Message> = await this.client.del<Message>(
      '/delete-query',
      this.createQueryParamOptions(),
    );

    return response.result;
  }

  @Delete('/delete-query')
  deleteQuery(@Query('param') queryParam: string): Message {
    return this.createMessage('DELETE', queryParam);
  }

  private createQueryParamOptions() {
    return {
      queryParameters: {
        params: {
          param: 'myNiceQueryParam',
        },
      },
    };
  }

  private createMessage(httpVerb: HttpVerb, queryParam: string): Message {
    return {
      message: `When one does a ${httpVerb} request via type-rest-client then the query param is: ${queryParam}`,
    };
  }
}

type Message = { message: string };

type HttpVerb = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
