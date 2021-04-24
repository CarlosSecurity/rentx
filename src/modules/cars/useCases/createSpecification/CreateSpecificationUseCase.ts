import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor( // Recebemos o repositório nos parâmetros, quando estamos instânciando o serviço.
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) {}
    
    async execute({name, description}: IRequest): Promise<void> {
        
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

        if(specificationAlreadyExists) {
            throw new Error("Specification Already Exists!");
        }

        this.specificationsRepository.create({ name, description });
    }
};

export { CreateSpecificationUseCase };