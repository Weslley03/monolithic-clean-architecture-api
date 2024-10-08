export type ChoiceProps = {
  Question_Choice_Id:  string;
  Question_Id: string;
  Choice_Text: string;
  Question_Choice_Is_Correct: boolean; 
};

export class Choice {
  private constructor(private choiceProps: ChoiceProps) {};

  public static create(
    Question_Id: string,
    Choice_Text: string,
    Question_Choice_Is_Correct: boolean,   
  ) {
    return new Choice({
      Question_Choice_Id:  crypto.randomUUID().toString(),
      Question_Id: Question_Id,
      Choice_Text: Choice_Text,
      Question_Choice_Is_Correct: Question_Choice_Is_Correct, 
    });
  };

  public getProps() {
    return this.choiceProps;
  }
};  