export interface IUser {
     user_no: string;
     user_name: string;
     unit_no: string;
    unit_name: string;
    user_id: string;
} 

export interface IUserGroup {
   id : string;
   user_no : string;
   group_no: string;
   group_name : string;
   group_desc: string;
   ismember : boolean;
   unit_no : string;
   user_name: string;
}
export interface IUnit {
    unit_no: string;
    unit_name: string;
}