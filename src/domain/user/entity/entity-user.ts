export type UseruserProps = {
  User_Id?: number;
  User_Name: string;
  User_Email: string;
  User_Password: string;
  User_Username: string;
  User_Avatar?: string;
  User_Overall_Rating: number;
  User_Questions_Answers: number;
  User_Points_Earned: number;
  User_Total_Question_Add: number;
  User_Register_Date: Date
};

export class User {
  private constructor(private userProps: UseruserProps) {};

  public static create(User_Name: string, User_Email: string, User_Password: string, User_Username: string) {
    return new User({
      User_Name,
      User_Email,
      User_Password,
      User_Username, 
      User_Avatar: '../../../uploads/userdefault.png',
      User_Overall_Rating: 0,
      User_Questions_Answers: 0,
      User_Points_Earned: 0,
      User_Total_Question_Add: 0,
      User_Register_Date: new Date(),
    })
  };

  public addAnswerQuestion() {
    this.userProps.User_Questions_Answers ++;
    this.calculateOverRating();
  };

  public addQuestion() {
    this.userProps.User_Total_Question_Add ++
  };

  public calculatePoints(points: number) {
    this.userProps.User_Points_Earned += points;
    this.calculateOverRating();
  };

  private calculateOverRating() {
    this.userProps.User_Overall_Rating = this.userProps.User_Questions_Answers / this.userProps.User_Total_Question_Add;
  };

  public updateName(newName: string) {
    this.userProps.User_Name = newName;
  };

  public updateUsername(newUserName: string) {
    this.userProps.User_Username = newUserName;
  };

  public get User_Name(){
    return this.userProps.User_Name;
  };

  public get User_Id(){
    return this.userProps.User_Id;
  };

  public get User_Email(){
    return this.userProps.User_Email;
  };

  public get User_Username(){
    return this.userProps.User_Username;
  };

  public get User_Avatar(){
    return this.userProps.User_Avatar;
  };

  public get User_Overall_Rating(){
    return this.userProps.User_Overall_Rating;
  };

  public get User_Questions_Answers(){
    return this.userProps.User_Questions_Answers;
  };

  public get User_Points_Earned(){
    return this.userProps.User_Points_Earned;
  };

  public get User_Total_Question_Add(){
    return this.userProps.User_Total_Question_Add;
  };

  public get User_Register_Date(){
    return this.userProps.User_Register_Date;
  };
};