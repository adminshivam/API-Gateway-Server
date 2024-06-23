import { UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

export const getBasicAuthCredentials = (req: Request, res: Response, next: any) => {  
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      res.setHeader('WWW-Authenticate', 'Basic realm="example"');
      throw new UnauthorizedException('No authorization header provided');
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    return { username, password };
}