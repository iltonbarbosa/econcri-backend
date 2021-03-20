import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

export default function verificaAutenticacao(
	request:Request, 
	response:Response, 
	next: NextFunction):void {

	//Validação do token JWT
	const authHeader = request.headers.authorization;

	if(!authHeader){
		throw new Error ('JWT token is missing');
	}

	const [, token] = authHeader.split(' ');

	try{
		const decoded = verify(token, authConfig.jwt.secret);

		const { sub } = decoded as TokenPayload;

/*		request.usuario = {
			id: sub,
		}
*/
		return next();
	}catch (err){
		throw new Error('Token inválido!');	
	}
}

