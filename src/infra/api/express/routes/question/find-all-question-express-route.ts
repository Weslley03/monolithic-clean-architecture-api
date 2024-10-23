import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route } from "../routes";
import { FindAllQuestionOutputDto, 
  FindAllQuestionUsecase 
} from "../../../../../usecases/question/find-all-question-usecase";

export class FindAllQuestionRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly findAllQuestionService: FindAllQuestionUsecase
  ) {};

  public static create(findAllQuestionService: FindAllQuestionUsecase) {
    return new FindAllQuestionRoute(
      '/question-findall',
      HttpMethod.GET,
      findAllQuestionService,
    );  
  };

  public getHandler() {
    return [
      
      async (req: Request, res: Response, next: NextFunction) => {
        try{
          const output: FindAllQuestionOutputDto = await this.findAllQuestionService.execute(); 
          res.status(200).json(output).send();
        }catch(err){
          next(err);
        };
      },

    ];
  };

  public getPath(): string {
    return this.path;
  };

  public getMethod(): HttpMethod {
    return this.method;
  };
}