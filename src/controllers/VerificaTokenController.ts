import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

export default {
	async verifica(request: Request, response: Response){
		const { token } = request.params;

		jwt.verify(token, authConfig.jwt.secret, function(err, decoded) {
			if (err) 
				return response.status(500).send({ auth: false, descricao: 'Failed to authenticate token.' });
			else
			   return response.status(200).send("OK");	
		});

	}
}