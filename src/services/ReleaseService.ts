import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import Release from '../models/Release';

interface IRelease{
	idcadastro:string,
	idrelease:string,
	release:string,
	linkportfolio:string
}

class ReleaseService {

	public async salvar (release:IRelease): Promise<Release>{

		const releaseRepositorio = getRepository(Release);
		let status = '';
				
		if(release.idrelease && release.idrelease != 'undefined'){
			status = 'alteracao';						  											  
		}else{
			release.idrelease = uuidv4();
		}
			
		const releaseDados = releaseRepositorio.create(release);

		try{
			if(status==='alteracao')
				await releaseRepositorio.update(release.idrelease, releaseDados);
			else
				await releaseRepositorio.save(releaseDados);

			return releaseDados;
		}catch (err) {
			throw new Error( err.message);
		}
	}
}

export default ReleaseService;