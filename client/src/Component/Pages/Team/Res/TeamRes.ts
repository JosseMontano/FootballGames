import { DivisionFormDTO } from "../../Divisions/Dtos/DivisionFormDto"
import { DivisionResType } from "../../Divisions/Types/DivisionsRes"
import { TeamFormDTO } from "../Dtos/TeamForm"

export interface TeamResType extends TeamFormDTO{
    id: number
    division:DivisionResType
  }
  