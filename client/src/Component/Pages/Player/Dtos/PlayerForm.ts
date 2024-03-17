export interface PlayerType {
    ci: string
    names: string
    lastnames: string
    date: string
    cellphone: string
    photo: string
    teamid: number
    age:number;
  }

 export interface PlayerFormDTO extends Omit<PlayerType, 'age'>{

  }

/*   export interface PlayerFormDTO {
    ci: string
    names: string
    lastnames: string
    date: string
    cellphone: string
    photo: string
    teamid: number
  } */