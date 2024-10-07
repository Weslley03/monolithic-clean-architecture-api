export type QuestionProps = {
  Question_Id: string;
  Question_Category: string;
  Question_Difficulty: number;
  Question_Is_Approved: boolean;
  Question_Approved_Count: Number;
  Question_Statement: string;
  Question_Figure: string;
  Question_Text_Body: string;
  Question_Resolution: string;
  Question_Gabarito: string;
  Question_Id_User_Internal: string;
  Question_Name_User_Internal: string;
  Question_Register_Date: Date;
  Question_Publication_Date: Date | null;
  Question_Reviewed_Date: Date | null;
  Question_Update_Date: Date | null;
  Question_Total_Use: number;
};

export class Question {
  private constructor(private questionProps: QuestionProps) {};

  public static create(
    Question_Difficulty: number, 
    Question_Statement: string, 
    Question_Figure: string, 
    Question_Text_Body: string, 
    Question_Resolution: string, 
    Question_Gabarito: string, 
    Question_Id_User_Internal: string, 
    Question_Name_User_Internal: string
  ) {
    return new Question({
      Question_Id: crypto.randomUUID().toString(),
      Question_Category: 'multipla escolha',
      Question_Difficulty: Question_Difficulty,
      Question_Is_Approved: false,
      Question_Approved_Count: 0,
      Question_Statement: Question_Statement,
      Question_Figure: Question_Figure,
      Question_Text_Body: Question_Text_Body,
      Question_Resolution: Question_Resolution,
      Question_Gabarito: Question_Gabarito,
      Question_Id_User_Internal: Question_Id_User_Internal,
      Question_Name_User_Internal: Question_Name_User_Internal,
      Question_Register_Date: new Date(),
      Question_Publication_Date: null,
      Question_Reviewed_Date: null,
      Question_Update_Date: null,
      Question_Total_Use: 0,
    });
  };

  public addUseQuestion() {
    this.questionProps.Question_Total_Use ++;
  };

  public approveQuestion() {
    this.questionProps.Question_Is_Approved = true;
  };

  public get Question_Id() {
    return this.questionProps.Question_Id;
  };
    
  public get Question_Category() {
    return this.questionProps.Question_Category;
  };

  public get Question_Difficulty() {
    return this.questionProps.Question_Difficulty;
  };

  public get Question_Is_Approved() {
    return this.questionProps.Question_Is_Approved;
  };

  public get Question_Approved_Count() {
    return this.questionProps.Question_Approved_Count;
  };

  public get Question_Statement() {
    return this.questionProps.Question_Statement;
  };

  public get Question_Figure() {
    return this.questionProps.Question_Figure;
  };

  public get Question_Text_Body() {
    return this.questionProps.Question_Text_Body;
  };

  public get Question_Resolution() {
    return this.questionProps.Question_Resolution;
  };

  public get Question_Gabarito() {
    return this.questionProps.Question_Gabarito;
  };

  public get Question_Id_User_Internal() {
    return this.questionProps.Question_Id_User_Internal;
  };

  public get Question_Register_Date() {
    return this.questionProps.Question_Register_Date;
  };

  public get Question_Publication_Date() {
    return this.questionProps.Question_Publication_Date;
  };

  public get Question_Reviewed_Date() {
    return this.questionProps.Question_Reviewed_Date;
  };

  public get Question_Update_Date() {
    return this.questionProps.Question_Update_Date;
  };

  public get Question_Total_Use() {
    return this.questionProps.Question_Total_Use;
  };
};